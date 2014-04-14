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

                        //表单处理,传递给下层进行处理，其余进行统一弹窗处理
                        // if (status === 508) {

                        // }
                        if (status === 403) {

                            $rootScope.accountService.isLogin = false;
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
