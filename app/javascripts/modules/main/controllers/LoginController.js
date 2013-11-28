(function (window) {
    define([], function () {
        var LoginController = function ($scope, $location, AccountService) {
            if (AccountService.isLogin) {
                $location.path('/main');
            } else {
                $scope.user = {
                    username : '',
                    password : ''
                };

                $scope.login = function () {
                    AccountService.loginAsync($scope.user).then(function (user) {
                        $location.path('/main');
                    }, function (user) {
                    });
                };
            }
        };

        LoginController.$injection = ['$scope', '$location', 'AccountService'];

        return LoginController;
    });
}(this));
