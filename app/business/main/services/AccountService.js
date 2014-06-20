(function (window) {
    define(['_'], function (_) {
        var AccountService = function ($q, $rootScope, accountDao) {
            var isLogin;

            var accountService = {
                isLogin: false,
                userInfo: {}, //标记登录后的用户信息,
                loginAsync : function (user) {
                    var deferred = $q.defer();

                    user = user || {};

                    // 获取用户数据
                    accountDao.user.get({access_token: user.access_token}).$promise.then(function (data) {

                        console.log('get account data from google:', data);

                        accountDao.login.save({
                            access_token: user.access_token,
                            code: user.code,
                            id_token: user.id_token,
                            token_type: user.token_type,
                            expires_in: user.expires_in,
                            // data from google
                            displayName: data.displayName,
                            domain: data.domain,
                            accountName: _.find(data.emails, function (item) {
                                return item.type === 'account';
                            }).value.split('@')[0]
                        }).$promise.then(function (userData) {
                                accountService.isLogin = true;
                                data.auth = userData.body.auth;
                                accountService.userInfo = data;
                                deferred.resolve(data);
                            },
                            function () {
                                accountService.isLogin = false;
                                accountService.userInfo = '';
                                deferred.reject(user);
                            }
                        );
                    });

                    return deferred.promise;
                },
                logoutAsync: function () {
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

            return accountService;
        };

        AccountService.$inject = ['$q', '$rootScope', 'accountDao'];

        return AccountService;
    });
}(this));
