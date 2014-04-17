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
    'common/Notification',
    'common/ServerEventCenter',
    'common/Config',
    'common/CommonDirective'
], function (
    angular
) {

    angular.module('dmnCommon', [
        'httpModule',
        'daoModule',
        'modalModule',
        'notificationModule',
        'configModule',
        'ioModule',
        'serverEventCenterModule',
        'directiveModule'
    ]);
});
