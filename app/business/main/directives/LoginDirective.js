/* global gapi */
(function (window) {
    define([
        'text!main/templates/login.html'
    ], function (template) {

        var LoginDirective = function (AccountService, $q, $route, $rootScope) {
            return {
                replace: true,
                template: template,
                controller: 'LoginController',
                link: function ($scope, $element, $attributes) {
                    $scope.googleLogin = {
                        authResult : ''
                    };
                    $scope.googleHasInit = false;

                    // 页面加载时需要去google验证是否已经登录，此时为loading状态
                    $rootScope.isLoading = true;

                    function loginAsync() {
                        var deferred = $q.defer();

                        AccountService.loginAsync($scope.googleLogin.authResult).then(deferred.resolve, deferred.reject);

                        return deferred.promise;
                    }

                    $scope.$watch(function () {
                        return $rootScope.accountService.isLogin;
                    }, function (isLogin) {
                        if (!isLogin) {
                            renderGoogleSignIn();
                        }
                    });

                    function renderGoogleSignIn() {
                        // 防止多次加载google api
                        if ($scope.googleHasInit) {
                            // 打开登录弹层，以便用户重新登录
                            $rootScope.loginPanelShow = true;
                            return;
                        }

                        $scope.googleHasInit = true;

                        // load google sign in Script
                        (function () {
                            var po = document.createElement('script');
                            po.type = 'text/javascript';
                            po.async = true;
                            po.src = 'https://apis.google.com/js/client:plusone.js?onload=GOOGLE_GET_AUTH';
                            var s = document.getElementsByTagName('script')[0];
                            s.parentNode.insertBefore(po, s);

                        })();

                       /**
                        * google api回调函数
                        *
                        * @const
                        */
                        window.GOOGLE_GET_AUTH = function () {

                            var additionalParams = {
                                theme : 'dark',
                                clientid: '389328904191.apps.googleusercontent.com',
                                cookiepolicy: 'single_host_origin',
                                requestvisibleactions: 'http://schemas.google.com/AddActivity',
                                scope: ' https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read',
                                callback: function (authResult) {
                                    // 授权成功
                                    if (authResult.status.signed_in) {
                                        $scope.googleLogin.authResult = authResult;

                                        // google auth登录succ, 进一步进行系统后台验证
                                        loginAsync().then(
                                            function () {
                                                console.info('replace');

                                                // 登录成功后，刷新当前view, 以便获取数据
                                                //$route.reload();
                                            }
                                        ).finally(function () {
                                            $rootScope.loginPanelShow = false;
                                            $rootScope.isLoading = false;
                                        });
                                    } else {
                                        // 授权失败，打开登录弹层，以便用户点击登录
                                        $scope.$apply(function () {
                                            $scope.googleLogin.token = '';
                                            $rootScope.loginPanelShow = true;
                                            $rootScope.isLoading = false;
                                        });

                                        console.log('google sign in error:' + authResult.error);
                                    }
                                }
                            };

                            gapi.signin.render('googleLogin', additionalParams);

                        };
                    }
                }
            };
        };

        LoginDirective.$inject = ['AccountService', '$q', '$route', '$rootScope'];

        return LoginDirective;
    });
}(this));
