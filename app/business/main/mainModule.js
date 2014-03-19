(function (window) {
    define([
        'angular',
        'common/CONFIG',

        'main/services/AccountService',

        'main/controllers/LoginController',

        'main/directives/LoginDirective',
        'main/directives/HeaderDirective',
        'main/directives/NavbarDirective'

    ], function (
        angular,
        CONFIG,

        AccountService,

        LoginController,

        LoginDirective,
        HeaderDirective,
        NavbarDirective
    ) {
        angular.module('dmnMain', [])

        .factory('CONFIG', CONFIG)
        .factory('AccountService', AccountService)
        .controller('LoginController', LoginController)
        .directive('dmnLogin', LoginDirective)
        .directive('dmnHeader', HeaderDirective)
        .directive('dmnNavbar', NavbarDirective);
    });
}(this));
