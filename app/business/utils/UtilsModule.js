define([
    'angular',
    'utils/services/EnvironmentSniffer',
    'utils/services/UtilsUrlListService',
    'utils/controllers/UtilsController'
], function (
    angular,
    EnvironmentSniffer,
    UrlList,
    UtilsController
) {

    angular.module('dmnUtils', [])
        .controller('UtilsController', UtilsController)
        .factory('Environment', EnvironmentSniffer)
        .factory('UtilsUrlList', UrlList);

});
