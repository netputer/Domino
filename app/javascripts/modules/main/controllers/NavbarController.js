(function (window) {
    define([], function () {
        var NavbarController = function ($scope, $location, AccountService) {
            $scope.logout = function () {
                AccountService.logoutAsync().then(function () {
                    $location.path('/login');
                });
            };
        };

        NavbarController.$injection = ['$scope', '$location', 'AccountService'];

        return NavbarController;
    });
}(this));
