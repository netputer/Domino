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

                var API_PREFIX = /\/api\//;
                function isApi(config) {
                    return API_PREFIX.test(config.url);
                }

                return {
                    request: function (config) {
                        if (isApi(config) && config.noLoading !== true) {
                            $rootScope.isLoading = true;
                        }
                        return config;
                    },

                    response: function (response) {
                        if (isApi(response.config) && response.config.noLoading !== true) {
                            $rootScope.isLoading = false;
                        }
                        return response;
                    },

                    responseError: function (response) {
                        if (response.config.noLoading !== true) {
                            $rootScope.isLoading = false;
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
