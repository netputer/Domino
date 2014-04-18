/**
 * tool method
 *
 * @author  miaojian(miaojian@wandoujia.com)
 */

define([
    'angular',
    'io',
    '_'
], function (angular, io, _) {
    'use strict';

    angular.module('utilModule', [])

    .value('util', {

        // 函数节流
        throttle: function (fn, delay) {
            var time = null;

            return function () {
                var context = this;
                var args    = arguments;

                clearTimeout(time);
                time = setTimeout(function () {

                    fn.apply(context, args);
                }, delay);
            };
        }
    });

});
