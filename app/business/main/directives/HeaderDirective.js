/**
 * @file header 指令
 */
define([
    'text!main/templates/header.html'
], function (template) {

    var HeaderDirective = function () {
        return {
            restrict: 'EA',
            replace : true,
            template : template,
            controller : [ '$scope', function ($scope) {
                $scope.sidebarIsShow = true;
            } ]
        };
    };

    return HeaderDirective;
});
