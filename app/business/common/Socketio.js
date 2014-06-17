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
        .factory('socket', ['$rootScope', '$timeout', 'CONFIG',
            function ($rootScope, $timeout, CONFIG) {
                var socket;

                function createSocket() {
                    // TODO 连接成功时，可能页面还没有初始化完毕，page intialize时
                    var server = 'http://' + location.hostname + ':1337';
                    socket = io.connect(server, {
                        transports: ['websocket', 'polling']
                        // resource: window.API_URL_PREFIX ? 'socket.io' : 'api/socket.io'
                    });

                    socket.on('connect', function () {
                        console.log('socket connect success');
                    });

                    socket.on('disconnect', function () {
                        console.log('socket has disconnect');
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
