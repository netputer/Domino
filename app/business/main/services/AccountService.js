(function (window) {
    define([], function () {
        var AccountService = function ($q, $rootScope, accountDao) {
            var isLogin;

            var accountService = {

                isLogin: true,

                userInfo: '', //标记登录后的用户信息,

                loginAsync : function (user) {
                    var deferred = $q.defer();

                    user = user || {};

                    accountDao.login.save({
                        access_token: user.access_token,
                        code: user.code,
                        id_token: user.id_token,
                        token_type: user.token_type,
                        expires_in: user.expires_in
                    }).$promise.then(
                        function (data) {

                            // 获取用户数据
                            accountDao.user.get({access_token: user.access_token}).$promise.then(function (data) {
                                accountService.isLogin = true;
                                accountService.userInfo = data;
                                deferred.resolve(data);
                            });
                        },
                        function () {
                            accountService.isLogin = false;
                            accountService.userInfo = '';
                            deferred.reject(user);
                        }
                    );

                    return deferred.promise;
                },

                logoutAsync : function () {
                    var deferred = $q.defer();

                    accountDao.logout.save().$promise.then(
                        function () {
                            accountService.isLogin = false;
                            accountService.userInfo = '';
                            deferred.resolve();
                        },
                        function () {
                            deferred.reject();
                        }
                    );

                    return deferred.promise;
                }
            };

            // Object.defineProperties(accountService, {
            //     isLogin : {
            //         get : function () {
            //             return isLogin;
            //         }
            //     }
            // });

            return accountService;
        };

        AccountService.$inject = ['$q', '$rootScope', 'accountDao'];

        return AccountService;
    });
}(this));
