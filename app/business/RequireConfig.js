console.info(111);
require.config({
    baseUrl: '/business',
    paths : {
        jQuery : '../components/jquery/jquery',
        _ : '../components/underscore/underscore',
        moment: '../components/moment/min/moment.min',
        angular : '../components/angular/angular',
        ngRouter : '../components/angular-route/angular-route',
        ngAnimate : '../components/angular-animate/angular-animate',
        ngResource : '../components/angular-resource/angular-resource',
        ngMock :     '../components/angular-mocks/angular-mocks',
        uiBootstrap: '../components/angular-bootstrap/ui-bootstrap-tpls',
        text : '../components/requirejs-text/text'
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
        ngMock : {
            deps : ['angular'],
            exports : 'ngMock'
        },
        uiBootstrap: {
            deps : ['angular'],
            exports : 'uiBootstrap'
        }
    }
});
