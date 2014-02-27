(function (window) {
    define([], function () {

        var LoginController = function ($scope, $location, AccountService) {
            //alert(111);
            $scope.accountService = AccountService;
            $scope.name = 'miaojian';
            //alert(222);

            if (AccountService.isLogin) {
                $location.path('/main');
            }

            $scope.$watch(function () {
                return AccountService.isLogin;
            }, function (newVal, oldVal) {
                if (newVal) {
                    $location.path('/dashboard');
                } else {
                    $location.path('/');
                }
            });

        };

        LoginController.$injection = ['$scope', '$location', 'AccountService'];

        return LoginController;
    });
}(this));
