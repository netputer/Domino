/**
 * @file common modules
 *
 * @author  miaojian(miaojian@wandoujia.com)
 */

define([
	'angular',
	'common/Http',
	'common/Modal',
	'common/ServerEventCenter'
], function (
	angular
) {

	angular.module('dmnCommon', [ 'httpModule', 'modalModule', 'serverEventCenterModule' ]);
});