/**
 * @file header 指令
 */
define([
    'text!main/templates/header.html'
], function (template) {

    var HeaderDirective = function (AccountService, $q, $location) {
        return {
            restrict: 'EA',
            replace : true,
            template : template,
            controller : ['$scope', 'AccountService', function ($scope, AccountService) {
                $scope.sidebarIsShow = true;
            }],
            link : function ($scope, $element, $attributes) {
                //alert(111);
            }
        };
    };

    HeaderDirective.$inject = ['AccountService', '$q', '$location'];

    return HeaderDirective;
});
