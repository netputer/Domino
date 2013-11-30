(function (window) {
    define([
        'text!modules/main/templates/navbar.html'
    ], function (template) {

        var NavbarDirective = function () {
            return {
                replace : true,
                template : template,
                controller : 'NavbarController',
                link : function ($scope, $element, $attributes) {

                }
            };
        };

        NavbarDirective.$injection = [];

        return NavbarDirective;
    });
}(this));
