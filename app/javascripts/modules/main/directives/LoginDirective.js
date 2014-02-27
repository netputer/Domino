(function (window) {
    define([
        'text!modules/main/templates/login.html'
    ], function (template) {

        var LoginDirective = function (AccountService, $q, $location) {
            return {
                replace : true,
                template : template,
                controller : 'LoginController',
                link : function ($scope, $element, $attributes) {
                    $scope.googleLogin = {
                        token : '' // get google api token
                        //isLogin: false // 标示当前google login是否成功
                    };


                    var loginAsync = function () {
                        var deferred = $q.defer();

                        AccountService.loginAsync($scope.googleLogin).then(deferred.resolve, deferred.reject);
                        
                        return deferred.promise;
                    };

                    // load google sign in Script
                   (function() {
                        var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
                        po.src = 'https://apis.google.com/js/client:plusone.js?onload=GOOGLE_GET_AUTH';
                        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);

                   })();

                   /**
                    * google api回调函数
                    *
                    * @const
                    */
                   window.GOOGLE_GET_AUTH = function() {
                        
                        var additionalParams = {

                            theme : 'dark',
                            clientid: '389328904191.apps.googleusercontent.com',
                            cookiepolicy: 'single_host_origin',
                            requestvisibleactions: 'http://schemas.google.com/AddActivity',

                            callback: function(authResult) {

                                // 授权成功
                                if (authResult['status']['signed_in']) {

                                    //$scope.googleLogin.isLogin = true;
                                    $scope.googleLogin.token = authResult.access_token;
                                    //loginAsync();

                                }
                                else {

                                    //$scope.googleLogin.isLogin = false;
                                    $scope.googleLogin.token = '';
                                    //loginAsync();
                                    console.log('sign in state:' + authResult['error']);
                                }

                                // 登录状态验证完毕后显示页面，之前一片空白
                                loginAsync().then(
                                    function(){
                                        $scope.accountService.hasInit = true;
                                    },
                                    function(){
                                        $scope.accountService.hasInit = true;
                                    }
                                );
                            }
                        };

                        gapi.signin.render('googleLogin', additionalParams);

                   };
                }
            };
        };

        LoginDirective.$injection = ['AccountService', '$q', '$location'];

        return LoginDirective;
    });
}(this));
