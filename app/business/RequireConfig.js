require.config({
    baseUrl : '/business',
    paths : {
        jQuery : '../components/jquery/jquery',
        _ : '../components/underscore/underscore',
        moment: '../components/moment/min/moment.min',
        angular : '../components/angular/angular',
        ngRouter : '../components/angular-route/angular-route',
        ngAnimate : '../components/angular-animate/angular-animate',
        ngResource : '../components/angular-resource/angular-resource',
        uiBootstrap: '../components/angular-bootstrap/ui-bootstrap-tpls',
        text : '../components/requirejs-text/text',
        io : '../components/socket.io-client/dist/socket.io'
    },
    shim : {
        _ : {
            exports : '_'
        },
        angular : {
            deps : ['jQuery'],
            exports : 'angular'
        },
        ngRouter : {
            deps : ['angular', 'jQuery'],
            exports : 'ngRouter'
        },
        jQuery : {
            exports : 'jQuery'
        },
        ngAnimate : {
            deps : ['angular'],
            exports : 'ngAnimate'
        },
        ngResource : {
            deps : ['angular'],
            exports : 'ngResource'
        },
        uiBootstrap : {
            deps : ['angular'],
            exports : 'uiBootstrap'
        },
        io : {
            exports : 'io'
        }
    }
});


