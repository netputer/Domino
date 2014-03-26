/**
 * @file config
 *
 * @author miaojian(miaojian@wandoujia.com)
 */

define([ 'angular' ], function (angular) {
    angular.module('configModule', [])
        .factory('CONFIG', function () {
            var API_PROTOCAL = 'http';
            var API_HOST = '127.0.0.1';
            var API_PORT = 1337;

            var API_URL_PREFIX = API_PROTOCAL + '://' + API_HOST + ':' + API_PORT + '/';

            return {
                API_PROTOCAL : API_PROTOCAL,
                API_HOST : API_HOST,
                API_PORT : API_PORT,
                API_URL_PREFIX : API_URL_PREFIX,
                ACTIONS : ''
            };
        });
});
