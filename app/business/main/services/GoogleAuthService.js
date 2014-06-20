/* global gapi */
(function (window) {
    define([], function () {
        var googleAuth = function ($q, $rootScope, accountDao) {
            var googleHasInit = false;

            var loadScript = function () {
                // load google sign in Script
                (function () {
                    var po = document.createElement('script');
                    po.type = 'text/javascript';
                    po.async = true;
                    po.src = 'https://apis.google.com/js/client:plusone.js?onload=GOOGLE_GET_AUTH';
                    var s = document.getElementsByTagName('script')[0];
                    s.parentNode.insertBefore(po, s);
                })();
            };

            var renderSignIn = function (callback, fallback) {
                console.log('googleHasInit', googleHasInit);
                // 防止多次加载 Google API
                if (googleHasInit) {
                    fallback();
                    return;
                }

                googleHasInit = true;
                loadScript();

               /**
                * Google API 回调函数
                *
                * @const
                */
                window.GOOGLE_GET_AUTH = function () {
                    var additionalParams = {
                        theme: 'dark',
                        clientid: '389328904191.apps.googleusercontent.com',
                        cookiepolicy: 'single_host_origin',
                        requestvisibleactions: 'http://schemas.google.com/AddActivity',
                        scope: ' https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read',
                        callback: function (authResult) {
                            // 授权成功
                            if (authResult.status.signed_in) {
                                console.log('google sign in success');
                                callback(authResult);
                            }
                            else {
                                console.log('google sign in error:' + authResult.error);
                                fallback();
                            }
                        }
                    };
                    gapi.signin.render('googleLogin', additionalParams);
                };
            };

            return {
                renderSignIn: renderSignIn
            };
        };

        googleAuth.$inject = ['$q', '$rootScope', 'accountDao'];

        return googleAuth;
    });
}(this));
