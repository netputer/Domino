require.config({
    baseUrl: '/base/',
    paths : {
        _ : 'app/components/underscore/underscore'
    },
    shim : {
        _ : {
            exports : '_'
        }
    }
});

(function () {
    require(['test/specs/test-loader'], function () {
        window.__karma__.start();
    });
}(this));
