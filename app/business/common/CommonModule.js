/**
 * @file common modules
 *
 * @author  miaojian(miaojian@wandoujia.com)
 */

define([
    'angular',
    'common/Http',
    'common/Dao',
    'common/Modal',
    'common/Socketio',
    'common/ServerEventCenter',
    'common/Config',
    'common/CommonDirective'
], function (
    angular
) {

    angular.module('dmnCommon', [
        'httpModule', 'daoModule', 'modalModule',
        'configModule', 'ioModule', 'serverEventCenterModule',
        'directiveModule'
    ]);
});
