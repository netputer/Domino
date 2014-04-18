/**
 * socket id adapter
 *
 * @author  miaojian(miaojian@wandoujia.com)
 */

define([
    'angular',
    'io',
    '_'
], function (angular, io, _) {
    'use strict';

    angular.module('ioModule', [])

    .factory('socket', [ '$rootScope', '$timeout', 'CONFIG',

        function ($rootScope, $timeout, CONFIG) {

            var socket;

            function createSocket() {
                // TODO 连接成功时，可能页面还没有初始化完毕，page intialize时
                socket = io.connect(CONFIG.API_URL_PREFIX, {

                    transports : [ 'websocket', 'polling' ]
                });

                socket.on('connect', function () {
                    console.log('socket connect success');

                    socket.on('disconnect', function () {

                        console.log('socket has disconnect');
                    });
                });
            }

            function addEventName() {
                _.forEach(arguments, function (name) {
                    socket.on(name, function (data) {
                        $rootScope.$broadcast('io.' + name, data);
                    });
                });
            }

            return {
                init: createSocket,
                addEventName: addEventName,
                io: socket
            };
        }
    ]).run(['socket', function (socket) {

        socket.init();
    }]);
});
