/**
 * @file config
 *
 * @author miaojian(miaojian@wandoujia.com)
 */

define(['angular'], function (angular) {
    angular.module('configModule', [])
        .factory('CONFIG', function () {
            var API_PROTOCAL = 'http';
            var API_HOST = 'domino.wandoulabs.com';
            var API_URL_PREFIX = API_PROTOCAL + '://' + API_HOST + '/api/';

            return {
                API_PROTOCAL : API_PROTOCAL,
                API_HOST : API_HOST,
                API_URL_PREFIX : API_URL_PREFIX
            };
        });
});
