(function (window) {
    define([], function () {
        var AccountService = function ($q, $http, CONFIG) {
            var isLogin = false;



            var accountService = {

                init: false, //标记当前登录google和后台验证是否初始化完毕
                userInfo: '', //标记登录后的用户信息,

                loginAsync : function (user) {
                    var deferred = $q.defer();

                    user = user || {};

                    $http({
                        method : 'POST',
                        url : CONFIG.ACTIONS.ACCOUNT_LOGIN,
                        data : {
                            token: user.token || ''
                        }
                    }).success(function (data, status, headers, config) {
                        console.info('data:', data);
                        console.info('status:', status);
                        if (data.status === 200) {
                        
                            isLogin = true;
                            accountService.userInfo = data;
                            deferred.resolve(data);
                        } else {
                            alert(222);
                        
                            isLogin = false;
                            accountService.user = '';
                            deferred.reject(user);
                        }
                        
                    }).error(function (data, status, headers, config) {

                        isLogin = false;
                        accountService.userInfo = '';
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
                        accountService.userInfo = '';
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