(function (window) {
    define([
        'text!main/templates/login.html'
    ], function (template) {

        var LoginDirective = function (AccountService, $q, $route, $rootScope, googleAuth) {
            return {
                replace : true,
                template : template,
                link : function ($scope, $element, $attributes) {

                    function loginAsync(authResult) {
                        var deferred = $q.defer();

                        AccountService.loginAsync(authResult).then(deferred.resolve, deferred.reject);

                        return deferred.promise;
                    }

                    /**
                     * 此处的登录逻辑为：
                     * 1. 每次加载页面都会向google获取数据
                     * 分为3种逻辑情况
                     * 1. session过期，google过期
                     * 2. session没有过期，google账户过期（此处还需要登录google账户，取回用户数据）
                     * 3. session过期，google账户没有过期
                     */
                    $scope.$watch(function () {

                        return AccountService.isLogin;
                    }, function (isLogin) {

                        if (!isLogin) {

                            googleAuth.renderSignIn(
                                function (authResult) {
                                    // google auth登录succ, 进一步进行系统后台验证
                                    loginAsync(authResult)
                                        .then(
                                            function (data) {
                                                console.info('auth succ');
                                                // 登录成功后，刷新当前view, 以便获取数据
                                                $route.reload();
                                            }
                                        )
                                        .finally(
                                            function () {
                                                $rootScope.loginPanelShow = false;
                                                $rootScope.isLoading = false;
                                            }
                                        );
                                },
                                function () {
                                    // 授权失败，打开登录弹层，以便用户点击登录
                                    $rootScope.$apply(function () {
                                        $rootScope.isLoading = false;
                                        $rootScope.loginPanelShow = true;
                                    });

                                }
                            );
                        }

                    });
                }
            };
        };

        LoginDirective.$inject = ['AccountService', '$q', '$route', '$rootScope', 'googleAuth'];

        return LoginDirective;
    });
}(this));
