/**
 * @file dao
 *
 * @author miaojian(miaojian@wandoujia.com)
 */

define([
    'angular',
    'common/httpStatusMsg'
], function (angular, httpStatusMsgService) {

    angular.module('daoModule', [])

    .constant('httpStatusMsg', httpStatusMsgService)
    // TODO 换成resource
    .factory('dao', [ '$rootScope', '$q', '$http', 'httpStatusMsg', 'Alert', function ($rootScope, $q, $http, httpStatusMsg, Alert) {
        
        //var domain = 'http://localhost:1337';
        var domain = '';

        function dao(cfg) {
            var deferred = $q.defer();

            cfg = cfg || {};
            var method = cfg.method || 'GET';
            var url    = domain + cfg.url + (cfg.params ? '/' + cfg.params : '');
            var data   = typeof cfg.data === 'undefined' ? '' : cfg.data;

            //loading状态
            $rootScope.isLoading = true;

            $http({
                method : method,
                url    : url,
                data   : data
            }).success(function (data, status) {

                $rootScope.isLoading = false;
                deferred.resolve(data);
            }).error(function (data, status) {

                $rootScope.isLoading = false;

                //表单处理,传递给下层进行处理，其余进行统一弹窗处理
                if (status === '508') {
                    
                    deferred.reject(data, status);
                }
                else {

                    Alert(httpStatusMsg[data.error.msg]);
                }

                deferred.reject(data, status);
            });

            return deferred.promise;
        }

        return {
            get: function (url, params) {

                return dao({
                    method: 'GET',
                    url   : url,
                    params: params
                });
            },

            post: function (url, data) {

                return dao({
                    method: 'POST',
                    url   : url,
                    data  : data
                });
            },

            put: function (url, params, data) {
                return dao({
                    method: 'PUT',
                    url   : url,
                    params: params,
                    data  : data
                });
            },

            delete: function (url, params) {

                return dao({
                    method: 'DELETE',
                    url   : url,
                    params: params
                });
            }
        };
    }]);
});