/**
 * common filter
 *
 * @author  miaojian@wandoujia.com
 */

define([ 'angular', '_' ], function (angular, _) {

    angular.module('filterModule', [])

    // get github url from git url
    .filter('getGithubUrl', ['$timeout', function ($timeout) {
        return function (input) {

            var reg    = /^((git|ssh|https?)|(git@[\w.]+))(:(\/\/)?)([\w.@:\/\-~]+)(\.git)(\/)?$/;
            var prefix = 'https://github.com/';
            var regUrl;

            if (input) {
                regUrl = input.match(reg);

                if (regUrl) {
                    return prefix + regUrl[6].replace('github.com/', '');
                }
            }

            return '';
        };
    }])

    .filter('isProjectManager', ['$rootScope', function ($rootScope) {
        return function (arr) {

            var userInfo    = $rootScope.userInfo;
            var accountName = userInfo.accountName;
            var isSuperAuth = userInfo.auth ? userInfo.auth.super : false;

            return isSuperAuth || _.contains(arr, accountName);
        };
    }]);
});
