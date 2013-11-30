(function (window) {
    define([], function () {
        var AccountService = function ($q, $http, CONFIG) {
            var isLogin = true;

            var accountService = {
                loginAsync : function (user) {
                    var deferred = $q.defer();

                    user = user || {};

                    $http({
                        method : 'POST',
                        url : CONFIG.ACTIONS.ACCOUNT_LOGIN,
                        data : {
                            username : user.username || '',
                            password : user.password || ''
                        }
                    }).success(function (data, status, headers, config) {
                        if (data.status === 200) {
                            isLogin = true;
                            deferred.resolve();
                        } else {
                            isLogin = false;
                            deferred.reject();
                        }
                    }).error(function (data, status, headers, config) {
                        isLogin = false;
                        deferred.reject(user);
                    });

                    return deferred.promise;
                },
                logoutAsync : function () {
                    var deferred = $q.defer();

                    $http({
                        method : 'GET',
                        url : CONFIG.ACTIONS.ACCOUNT_LOGOUT,
                    }).success(function (data, status, headers, config) {
                        isLogin = false;
                        deferred.resolve();
                    }).error(function (data, status, headers, config) {
                        deferred.reject();
                    });

                    return deferred.promise;
                }
            };

            Object.defineProperties(accountService, {
                isLogin : {
                    get : function () {
                        return isLogin;
                    }
                }
            });

            return accountService;
        };

        AccountService.$injection = ['$q', '$http', 'CONFIG'];

        return AccountService;
    });
}(this));
