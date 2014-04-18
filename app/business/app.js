(function (window) {
    define([
        'angular',
        'ngRouter',
        'ngAnimate',
        'ngResource',
        'ngSanitize',
        'uiBootstrap',

        'common/CommonModule',
        'main/mainModule',
        'projects/ProjectsModule',
        'utils/UtilsModule'
    ], function (
        angular
    ) {
        angular.module('domino', [
            'ngRoute', 'ngAnimate', 'ngResource', 'ngSanitize', 'ui.bootstrap', 'dmnCommon', 'dmnMain', 'dmnProjects',
            'dmnUtils'
        ])

        .config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
            $httpProvider.defaults.withCredentials = true;

            $locationProvider.html5Mode(true);

            $routeProvider

            .when('/', {

                templateUrl : '/business/projects/templates/list.html',
                controller : 'ProjectsListController'
            })

            .when('/projects', {

                templateUrl : '/business/projects/templates/list.html',
                controller : 'ProjectsListController'
            })

            .when('/projects/new', {

                templateUrl : '/business/projects/templates/edit.html',
                controller : 'ProjectsEditController'
            })

            .when('/projects/:title', {

                templateUrl : '/business/projects/templates/edit.html',
                controller : 'ProjectsEditController'
            })

            .when('/projects/:title/task', {

                templateUrl : '/business/projects/templates/task.html',
                controller : 'ProjectsTaskController'
            })

            .when('/projects/:title/hooks', {

                templateUrl : '/business/projects/templates/hookList.html',
                controller : 'ProjectsHookListController'
            })

            .when('/utils', {

                templateUrl : '/business/utils/templates/utils.html',
                controller : 'UtilsController'
            });
        }]);
    });
}(this));
