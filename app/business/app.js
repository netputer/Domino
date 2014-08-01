(function (window) {
    define([
        'angular',
        'ngRouter',
        'ngAnimate',
        'ngResource',
        'ngSanitize',
        'uiBootstrap',
        'ngUiSelect2',

        'common/CommonModule',
        'main/mainModule',
        'projects/ProjectsModule',
        'utils/UtilsModule'
    ], function (
        angular
    ) {
        angular.module('domino', [
            'ngRoute', 'ngAnimate', 'ngResource', 'ngSanitize', 'ui.bootstrap', 'dmnCommon', 'dmnMain', 'dmnProjects',
            'dmnUtils', 'ui.select2'
        ])

        .config(['bugsnagProvider', function (bugsnagProvider) {
            bugsnagProvider
                .apiKey('b6a065f7d9c5e19f272cdc06881f6067')
                .releaseStage(window.JS_ENV)
                .notifyReleaseStages(['staging', 'production'])
                .user({
                    id: 'domino.id',
                    name: 'domino'
                })
                .appVersion('0.1.0')
                .beforeNotify(['$log', function ($log) {
                    return function (error, metaData) {
                        $log.debug('error:' + error.name + ' has notified the bugsnag');
                        return true;
                    };
                }]);
        }])

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

            .when('/projects/:title/task/:isOpen?', {

                templateUrl : '/business/projects/templates/task.html',
                controller : 'ProjectsTaskController'
            })

            .when('/projects/:title/hooks', {

                templateUrl : '/business/projects/templates/hookList.html',
                controller : 'ProjectsHookListController'
            })

            .when('/projects/:title/crons', {

                templateUrl : '/business/projects/templates/cronList.html',
                controller : 'ProjectsCronListController'
            })

            .when('/projects/:projectTitle/crons/new', {

                templateUrl : '/business/projects/templates/cronEdit.html',
                controller : 'ProjectsCronEditController'
            })

            .when('/projects/:projectTitle/crons/:title', {

                templateUrl : '/business/projects/templates/cronEdit.html',
                controller : 'ProjectsCronEditController'
            })

            .when('/utils', {

                templateUrl : '/business/utils/templates/utils.html',
                controller : 'UtilsController'
            });
        }]);
    });
}(this));
