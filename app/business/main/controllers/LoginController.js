(function (window) {
    define([], function () {

        var LoginController = function ($scope, $location, AccountService) {
            $scope.accountService = AccountService;

            // if (AccountService.isLogin) {
            //     $location.path('/main');
            // }

            // $scope.$watch(function () {
            //     return AccountService.isLogin;
            // }, function (newVal, oldVal) {
            //     if (newVal) {
            //         $location.path('/projects');
            //     } else {
            //         $location.path('/');
            //     }
            // });

        };

        LoginController.$inject = ['$scope', '$location', 'AccountService'];

        return LoginController;
    });
}(this));
