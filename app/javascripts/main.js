(function (window) {
    define([
        'angular',
        'ngRouter',
        'ngAnimate',
        'CONFIG',
        'modules/main/controllers/MainController',
        'modules/main/controllers/LoginController',
        'modules/main/controllers/NavbarController',
        'modules/main/directives/LoginDirective',
        'modules/main/directives/NavbarDirective',
        'modules/main/services/AccountService',
        'modules/projects/services/ProjectsService',
        'modules/utils/controllers/UtilsController'
    ], function (
        angular,
        ngRouter,
        ngAnimate,
        CONFIG,
        MainController,
        LoginController,
        NavbarController,
        LoginDirective,
        NavbarDirective,
        AccountService,
        ProjectsService,
        UtilsController
    ) {
        angular.module('domino', ['ngRoute', 'ngAnimate'])
            .factory('CONFIG', CONFIG)
            .factory('AccountService', AccountService)
            .factory('ProjectsService', ProjectsService)
            .controller('LoginController', LoginController)
            .controller('NavbarController', NavbarController)
            .controller('ProjectsListController', ['$scope', 'ProjectsService', function ($scope, ProjectsService) {
                $scope.projects = [];
                ProjectsService.syncAsync().then(function (projects) {
                    $scope.projects = projects;
                });
            }])
            .directive('dmnLogin', LoginDirective)
            .directive('dmnNavbar', NavbarDirective)
            .config(['$routeProvider', function ($routeProvider, $locationProvider) {
                // // $locationProvider.html5Mode(true);

                $routeProvider.when('/projects', {
                    templateUrl : 'javascripts/modules/projects/templates/main.html'
                });

                // $routeProvider.when('/main', {
                //     templateUrl : 'javascripts/modules/main/templates/main.html',
                //     controller : function () {

                //     }
                // }).when('/login', {
                //     controller : function () {

                //     }
                // }).when('/', {
                //     controller : function () {

                //     }
                // }).when('/utils', {
                //     templateUrl : 'javascripts/modules/utils/templates/utils.html',
                //     controller : UtilsController
                // });
            }]);

        angular.bootstrap(document, ['domino']);
    });
}(this));
