/**
 * @author  miaojian(miaojian@wandoujia.com)
 */

define(['angular'], function (angular) {
    'use strict';

    angular.module('ssoLoginModule', [])
        .constant('ssoConfig', {
            loginUrl: 'http://sso.wandoulabs.com/?redirect=',
            infoUrl : 'http://sso.wandoulabs.com/getUserInfo/?jsonp=JSON_CALLBACK',
            infoUrlByServer: 'account/auth'
        })

        .factory('loginService', [ '$location', 'ssoConfig', '$rootScope',
            function ($location, ssoConfig, $rootScope) {

                function redirectToLogin() {
                    var absUrl = $location.absUrl();
                    location.href = ssoConfig.loginUrl + encodeURIComponent(absUrl);
                }

                function loginSuccess(data) {
                    $rootScope.userInfo = data.body;
                    $rootScope.$broadcast('sso:info-success', data.result);
                }

                return {
                    redirectToLogin: redirectToLogin,
                    loginSuccess: loginSuccess
                };
            }
        ])

        .factory('loginDao', ['ssoConfig', '$http', 'loginService', 'CONFIG',
            function (ssoConfig, $http, loginService, CONFIG) {

                function getUserInfoByClient() {
                    $http.jsonp(ssoConfig.infoUrl).success(function (data) {
                        if (data.code === 200) {
                            loginService.loginSuccess(data);
                        } else {
                            loginService.redirectToLogin();
                        }
                    });
                }

                function getUserInfoByServer() {
                    $http.get(CONFIG.API_URL_PREFIX + ssoConfig.infoUrlByServer).success(function (data, status) {
                        if (status === 200) {
                            loginService.loginSuccess(data);
                        } else {
                            loginService.redirectToLogin();
                        }
                    });
                }

                return {
                    getUserInfoByClient: getUserInfoByClient,
                    getUserInfoByServer: getUserInfoByServer
                };
            }
        ])

        .factory('ssoInterceptor', ['$q', '$rootScope', 'loginService', 'ssoConfig',
            function ($q, $rootScope, loginService, ssoConfig) {
                return {
                    responseError: function (response) {
                        var status = response.status;
                        var data   = response.data;

                        if (status === 401) {
                            //目前为非登录状态
                            loginService.redirectToLogin();
                        }

                        return $q.reject(response);
                    }
                };
            }
        ])

        .run([ 'loginDao', function (loginDao) {
            loginDao.getUserInfoByServer();
        } ])

        .config(['$httpProvider',
            function ($httpProvider) {
                $httpProvider.interceptors.push('ssoInterceptor');
            }
        ]);
});
