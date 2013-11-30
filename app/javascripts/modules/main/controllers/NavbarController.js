(function (window) {
    define([], function () {
        var NavbarController = function ($scope, $location, AccountService) {
            $scope.accountService = AccountService;

            $scope.nav = function (target) {
                $location.path('/' + target);
            };
        };

        NavbarController.$injection = ['$scope', '$location', 'AccountService'];

        return NavbarController;
    });
}(this));
