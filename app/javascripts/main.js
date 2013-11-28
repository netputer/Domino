(function (window) {
    define([
        'angular',
        'ngRouter',
        'ngAnimate',
        'CONFIG',
        'modules/main/controllers/MainController',
        'modules/main/controllers/LoginController',
        'modules/main/controllers/NavbarController',
        'modules/main/services/AccountService'
    ], function (
        angular,
        ngRouter,
        ngAnimate,
        CONFIG,
        MainController,
        LoginController,
        NavbarController,
        AccountService
    ) {
        angular.module('domino', ['ngRoute', 'ngAnimate'])
            .factory('CONFIG', CONFIG)
            .factory('AccountService', AccountService)
            .controller('NavbarController', NavbarController)
            .config(['$routeProvider', function ($routeProvider, $locationProvider) {
                // $locationProvider.html5Mode(true);

                $routeProvider.when('/main', {
                    templateUrl : 'javascripts/modules/main/templates/main.html',
                    controller : MainController
                }).when('/login', {
                    templateUrl : 'javascripts/modules/main/templates/login.html',
                    controller : LoginController
                }).when('/', {
                    templateUrl : 'javascripts/modules/main/templates/login.html',
                    controller : LoginController
                });
            }]);

        angular.bootstrap(document, ['domino']);
    });
}(this));
