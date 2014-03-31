require(['RequireConfig'], function () {
    require(['app', 'io'], function (app, io) {
        var socket = io.connect('http://127.0.0.1:1337', {
            transports : ['websocket', 'polling']
        });
        socket.on('messageName', function (data) {

        });
        socket.on('connect', function () {
            socket.on('disconnect', function () {

            });
        });
    });
});
