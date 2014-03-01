(function (window) {
    define([], function () {
        var NavbarController = function ($scope, $location, AccountService) {
            $scope.accountService = AccountService;

            // 转到不同的导航
            $scope.nav = function (target) {
                $location.path('/' + target);
            };

            // 退出登录
            $scope.logout = function() {

                AccountService.logoutAsync();
            };
        };

        NavbarController.$injection = ['$scope', '$location', 'AccountService'];

        return NavbarController;
    });
}(this));
