angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("directives/decorators/bootstrap/strap/strapmultiselect.html","<div class=\"form-group\" ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess()}\">\r\n  <label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label>\r\n  <div class=\"form-group\">\r\n    <button type=\"button\" class=\"btn btn-default\" sf-changed=\"form\" ng-model=\"$$value$$\" schema-validate=\"form\" data-placeholder=\"{{form.placeholder || form.schema.placeholder || (\'placeholders.select\' | translate)}}\" data-multiple=\"1\" data-html=\"1\" ng-options=\"item.value as item.label for item in form.schema.items\" bs-select></button>\r\n    <span class=\"help-block\">{{ (hasError() && errorMessage(schemaError())) || form.description}}</span>\r\n  </div>\r\n</div>\r\n");
$templateCache.put("directives/decorators/bootstrap/strap/strapmultiselectdynamic.html","<script type=\'text/javascript\'>\r\n    angular.module(\'lightApp\').controller(\'StrapSelectController\', [\'$scope\', \'$http\', function ($scope, $http) {\r\n        $scope.getItem = {\r\n            readOnly: true\r\n        };\r\n\r\n        $scope.init = function(category, name) {\r\n          console.log(\'init is called\', name);\r\n          $scope.getItem.category = category;\r\n          $scope.getItem.name = name;\r\n        };\r\n\r\n        $scope.items = [];\r\n\r\n        $scope.fetchResult = function () {\r\n            $http.post(\'http://www.networknt.com/api/rs\', $scope.getItem)\r\n                    .success(function (result, status, headers, config) {\r\n                        $scope.items = result;\r\n                        console.log(\'items\', $scope.items);\r\n                    })\r\n        };\r\n        $scope.fetchResult();\r\n    }]);\r\n</script>\r\n<div class=\"form-group\" ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess()}\">\r\n  <label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label>\r\n  <div class=\"form-group\" ng-controller=\"StrapSelectController\" ng-init=\"init(form.options.category, form.options.name)\">\r\n    <button type=\"button\" class=\"btn btn-default\" sf-changed=\"form\" ng-model=\"$$value$$\" schema-validate=\"form\" data-placeholder=\"{{form.placeholder || form.schema.placeholder || (\'placeholders.select\' | translate)}}\" data-multiple=\"1\" data-html=\"1\" ng-options=\"item.value as item.label for item in items\" bs-select></button>\r\n    <span class=\"help-block\">{{ (hasError() && errorMessage(schemaError())) || form.description}}</span>\r\n  </div>\r\n</div>\r\n");
$templateCache.put("directives/decorators/bootstrap/strap/strapselect.html","<div class=\"form-group\" ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess()}\">\r\n  <label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label>\r\n  <div class=\"form-group\">\r\n    <button type=\"button\" class=\"btn btn-default\" sf-changed=\"form\" ng-model=\"$$value$$\" schema-validate=\"form\" data-placeholder=\"{{form.placeholder || form.schema.placeholder ||(\'placeholders.select\' | translate)}}\" data-html=\"1\" ng-options=\"item.value as item.label for item in form.schema.items\" bs-select></button>\r\n    <span class=\"help-block\">{{ (hasError() && errorMessage(schemaError())) || form.description}}</span>\r\n  </div>\r\n</div>\r\n");
$templateCache.put("directives/decorators/bootstrap/strap/strapselectdynamic.html","<script type=\'text/javascript\'>\r\n    angular.module(\'lightApp\').controller(\'StrapSelectController\', [\'$scope\', \'$http\', function ($scope, $http) {\r\n        $scope.getItem = {\r\n            readOnly: true\r\n        };\r\n\r\n        $scope.init = function(category, name) {\r\n          console.log(\'init is called\', category);\r\n            $scope.getItem.category = category;\r\n          $scope.getItem.name = name;\r\n        };\r\n\r\n        $scope.items = [];\r\n\r\n        $scope.fetchResult = function () {\r\n            $http.post(\'http://www.networknt.com/api/rs\', $scope.getItem)\r\n                    .success(function (result, status, headers, config) {\r\n                        $scope.items = result;\r\n                        console.log(\'items\', $scope.items);\r\n                    })\r\n        };\r\n        $scope.fetchResult();\r\n    }]);\r\n</script>\r\n<div class=\"form-group\" ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess()}\">\r\n  <label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label>\r\n  <div class=\"form-group\" ng-controller=\"StrapSelectController\" ng-init=\"init(form.options.category, form.options.name)\">\r\n    <button type=\"button\" class=\"btn btn-default\" sf-changed=\"form\" ng-model=\"$$value$$\" schema-validate=\"form\" data-placeholder=\"{{form.placeholder || form.schema.placeholder ||(\'placeholders.select\' | translate)}}\" data-html=\"1\" ng-options=\"item.value as item.label for item in items\" bs-select></button>\r\n    <span class=\"help-block\">{{ (hasError() && errorMessage(schemaError())) || form.description}}</span>\r\n  </div>\r\n</div>\r\n");}]);
angular.module('schemaForm').config(
['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
  function(schemaFormProvider,  schemaFormDecoratorsProvider, sfPathProvider) {

    var select = function(name, schema, options) {
      if (schema.type === 'string' && schema.format == 'strapselect') {
        var f = schemaFormProvider.stdFormObj(name, schema, options);
        f.key  = options.path;
        f.type = 'strapselect';
        options.lookup[sfPathProvider.stringify(options.path)] = f;
        return f;
      }
    };

    schemaFormProvider.defaults.string.unshift(select);

    var multiselect = function(name, schema, options) {
      if (schema.type === 'array' && schema.format == 'strapselect') {
        var f = schemaFormProvider.stdFormObj(name, schema, options);
        f.key  = options.path;
        f.type = 'strapmultiselect';
        options.lookup[sfPathProvider.stringify(options.path)] = f;
        return f;
      }
    };

    schemaFormProvider.defaults.array.unshift(multiselect);

    var selectdynamic = function(name, schema, options) {
      if (schema.type === 'string' && schema.format == 'strapselectdynamic') {
        var f = schemaFormProvider.stdFormObj(name, schema, options);
        f.key  = options.path;
        f.type = 'strapselectdynamic';
        options.lookup[sfPathProvider.stringify(options.path)] = f;
        return f;
      }
    };

    schemaFormProvider.defaults.string.unshift(selectdynamic);

    var multiselectdynamic = function(name, schema, options) {
      if (schema.type === 'array' && schema.format == 'strapselectdynamic') {
        var f = schemaFormProvider.stdFormObj(name, schema, options);
        f.key  = options.path;
        f.type = 'strapmultiselectdynamic';
        options.lookup[sfPathProvider.stringify(options.path)] = f;
        return f;
      }
    };

    schemaFormProvider.defaults.array.unshift(multiselectdynamic);

    //Add to the bootstrap directive
    schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'strapselect',
    'directives/decorators/bootstrap/strap/strapselect.html');
    schemaFormDecoratorsProvider.createDirective('strapselect',
    'directives/decorators/bootstrap/strap/strapselect.html');
    schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'strapmultiselect',
    'directives/decorators/bootstrap/strap/strapmultiselect.html');
    schemaFormDecoratorsProvider.createDirective('strapmultiselect',
    'directives/decorators/bootstrap/strap/strapmultiselect.html');

    schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'strapselectdynamic',
        'directives/decorators/bootstrap/strap/strapselectdynamic.html');
    schemaFormDecoratorsProvider.createDirective('strapselectdynamic',
        'directives/decorators/bootstrap/strap/strapselectdynamic.html');
    schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'strapmultiselectdynamic',
        'directives/decorators/bootstrap/strap/strapmultiselectdynamic.html');
    schemaFormDecoratorsProvider.createDirective('strapmultiselectdynamic',
        'directives/decorators/bootstrap/strap/strapmultiselectdynamic.html');

  }]);
