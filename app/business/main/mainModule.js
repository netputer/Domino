(function (window) {
    define([
        'angular',

        'main/directives/HeaderDirective',
        'main/directives/NavbarDirective'

    ], function (
        angular,

        HeaderDirective,
        NavbarDirective
    ) {
        angular.module('dmnMain', [])

        .directive('dmnHeader', HeaderDirective)
        .directive('dmnNavbar', NavbarDirective);

    });
}(this));
