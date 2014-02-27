(function (window) {
    define([], function () {
        var AccountService = function ($q, $http, CONFIG) {
            var isLogin = true;

            var accountService = {
                init: false,
                loginAsync : function (user) {
                    var deferred = $q.defer();

                    user = user || {};

                    // $http({
                    //     method : 'POST',
                    //     url : CONFIG.ACTIONS.ACCOUNT_LOGIN,
                    //     data : {
                    //         token: user.token || ''
                    //     }
                    // }).success(function (data, status, headers, config) {
                    //     if (data.status === 200) {
                    //         isLogin = true;
                    //         deferred.resolve(data);
                    //     } else {
                    //         isLogin = false;
                    //         deferred.reject(user);
                    //     }
                    // }).error(function (data, status, headers, config) {
                    //     isLogin = false;
                    //     deferred.reject(user);
                    // });
                    
                    if (user.token) {
                        isLogin = true;
                        deferred.resolve();
                    }
                    else {
                        isLogin = false;
                        deferred.reject();
                    }


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

            //accountService.isLogin = isLogin;
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
