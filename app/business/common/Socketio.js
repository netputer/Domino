/**
 * socket id adapter
 *
 * @author  miaojian(miaojian@wandoujia.com)
 */

define([
    'angular',
    'io'
], function (angular, io) {
    'use strict';

    angular.module('ioModule', [])

    .factory('socket', [ '$rootScope', '$timeout', 'CONFIG',

        function ($rootScope, $timeout, CONFIG) {

            // TODO 连接成功时，可能页面还没有初始化完毕，page intialize时
            var socket = io.connect(CONFIG.API_URL_PREFIX, {

                transports : [ 'websocket', 'polling' ]
            });

            socket.on('connect', function () {
                console.log('socket connect success');

                socket.on('disconnect', function () {

                    console.log('socket has disconnect');
                });
            });

            return socket;
        }
    ]);
});
