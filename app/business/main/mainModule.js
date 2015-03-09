(function (window) {
    define([
        'angular',

        'main/services/AccountDaoService',

        'main/directives/HeaderDirective',
        'main/directives/NavbarDirective'

    ], function (
        angular,

        AccountDaoService,

        HeaderDirective,
        NavbarDirective
    ) {
        angular.module('dmnMain', [])

        .factory('accountDao', AccountDaoService)

        .directive('dmnHeader', HeaderDirective)
        .directive('dmnNavbar', NavbarDirective);

    });
}(this));
