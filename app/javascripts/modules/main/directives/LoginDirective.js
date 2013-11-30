(function (window) {
    define([
        'text!modules/main/templates/login.html'
    ], function (template) {

        var LoginDirective = function (AccountService, $q) {
            return {
                replace : true,
                template : template,
                controller : 'LoginController',
                link : function ($scope, $element, $attributes) {
                    $scope.user = {
                        username : '',
                        password : ''
                    };

                    $scope.loginAsync = function () {
                        var deferred = $q.defer();

                        AccountService.loginAsync($scope.user).then(deferred.resole, deferred.reject);

                        return deferred.promise;
                    };
                }
            };
        };

        LoginDirective.$injection = ['AccountService', '$q'];

        return LoginDirective;
    });
}(this));
