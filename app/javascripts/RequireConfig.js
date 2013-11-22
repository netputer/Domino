require.config({
    paths : {
        _ : '../components/underscore/underscore',
        angular : '../components/angular/angular'
    },
    shim : {
        _ : {
            exports : '_'
        },
        angular : {
            exports : 'angular'
        }
    }
});
