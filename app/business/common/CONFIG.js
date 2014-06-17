/**
 * @file config
 *
 * @author miaojian(miaojian@wandoujia.com)
 */

define(['angular'], function (angular) {
    angular.module('configModule', [])
        .factory('CONFIG', function () {
            // http config
            var API_PROTOCAL = 'http';
            var API_HOST = location.hostname;
            var API_URL_PREFIX = API_PROTOCAL + '://' + API_HOST + '/api/';

            // projects task status
            var STATUS_CLASS = {
                0 : 'info',
                1 : 'warning',
                2 : 'default',
                3 : 'warning',
                4 : 'danger',
                5 : 'default',
                6 : 'success'
            };
            var STATUS_TEXT  = {
                0 : 'created',
                1 : 'queue',
                2 : 'executing',
                3 : 'pause',
                4 : 'fail',
                5 : 'force executing',
                6 : 'success'
            };

            return {
                // http config
                API_PROTOCAL   : API_PROTOCAL,
                API_HOST       : API_HOST,
                API_URL_PREFIX : window.API_URL_PREFIX || API_URL_PREFIX,

                // projects task status
                STATUS_CLASS: STATUS_CLASS, // 状态对应的样式
                STATUS_TEXT : STATUS_TEXT // 状态对应的文本
            };
        });
});
