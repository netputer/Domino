(function (window) {
    define([
        'angular',

        'main/services/AccountService',

        'main/controllers/LoginController',

        'main/directives/LoginDirective',
        'main/directives/HeaderDirective',
        'main/directives/NavbarDirective'

    ], function (
        angular,

        AccountService,

        LoginController,

        LoginDirective,
        HeaderDirective,
        NavbarDirective
    ) {
        angular.module('dmnMain', [])

        .factory('AccountService', AccountService)
        .controller('LoginController', LoginController)
        .directive('dmnLogin', LoginDirective)
        .directive('dmnHeader', HeaderDirective)
        .directive('dmnNavbar', NavbarDirective);
    });
}(this));
