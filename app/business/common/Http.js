/**
 * http dealwith
 *
 * @author  miaojian(miaojian@wandoujia.com)
 */

define(['angular', 'common/statusMsgMapping'], function (angular, statusMsgMapping) {
    'use strict';

    angular.module('httpModule', [])

        .constant('statusMsgMapping', statusMsgMapping)

        .factory('httpInterceptor', ['$q', '$rootScope', '$window', 'statusMsgMapping',

            function ($q, $rootScope, window, statusMsgMapping) {

                return {
                    request: function (config) {

                        if (config.noLoading !== true) {

                            //loading状态
                            $rootScope.isLoading = true;

                        }
                        return config;
                    },

                    response: function (response) {

                        if (response.config.noLoading !== true) {

                            $rootScope.isLoading = false;
                        }


                        return response;
                    },

                    responseError: function (response) {
                        var status = response.status;
                        var data   = response.data;

                        // 没有权限
                        if (status === 403) {

                            //目前为非登录状态
                            if (data.msg === 'NO_LOGIN') {
                                $rootScope.accountService.isLogin = false;
                                $rootScope.viewNeedRerander = true;
                            }
                            else {
                                if (response.config.noLoading !== true) {

                                    $rootScope.isLoading = false;
                                }
                                window.alert(statusMsgMapping[data.msg]);
                            }
                        }
                        else {

                            if (response.config.noLoading !== true) {

                                $rootScope.isLoading = false;
                            }

                            //window.alert(statusMsgMapping[data.error.msg]);

                            return $q.reject(response);

                            // Alert(httpStatusMsg[data.error.msg]);
                        }

                        return $q.reject(response);
                    }
                };
            }
        ])

        .config(['$httpProvider',
            function ($httpProvider) {
                // $httpProvider.defaults.transformRequest.push(function (data) {
                //     console.log(data);
                //     return data;
                // });
                $httpProvider.interceptors.push('httpInterceptor');
            }
        ]);
});
