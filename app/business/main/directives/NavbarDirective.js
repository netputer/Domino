(function (window) {
    define([
        'angular',
        'text!main/templates/navbar.html'
    ], function (angular, template) {

        var NavbarDirective = function ($location) {
            return {
                //scope: true,
                //replace : true,
                template : template,
                controller : [ '$scope', function ($scope) {
                    // 转到不同的导航

                    $scope.nav = function (target) {
                        $location.path('/' + target);
                        //alert($location.path());
                    };

                } ],
                link : function ($scope, $element, $attributes) {

                    // 监听path变化，更改sidebar
                    // todo： 需要优化
                    $scope.$on('$locationChangeSuccess', changeNavStyleStatus);

                    function changeNavStyleStatus() {
                        var path = $location.path().substring(1).split('/')[0];

                        // if blank, default projects
                        path = path || 'projects';

                        angular.element('#navMenu > li')
                            .removeClass('active');

                        angular.element('#navMenu > li[data-type="' + path + '"]')
                            .addClass('active');

                    }
                }
            };
        };

        NavbarDirective.$inject = ['$location'];

        return NavbarDirective;
    });
}(this));
