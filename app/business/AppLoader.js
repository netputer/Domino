require.config({
    baseUrl: '/business',
    paths: {
        jQuery: '../components/jquery/dist/jquery',
        _: '../components/underscore/underscore',
        moment: '../components/moment/min/moment.min',
        angular: '../components/angular/angular',
        ngRouter: '../components/angular-route/angular-route',
        ngAnimate: '../components/angular-animate/angular-animate',
        ngResource: '../components/angular-resource/angular-resource',
        ngMock:     '../components/angular-mocks/angular-mocks',
        ngSanitize: '../components/angular-sanitize/angular-sanitize',
        uiBootstrap: '../components/angular-bootstrap/ui-bootstrap-tpls',
        text: '../components/requirejs-text/text',
        io: '../components/socket.io-client/dist/socket.io'
    },
    shim : {
        _: {
            exports: '_'
        },
        angular: {
            deps: ['jQuery'],
            exports: 'angular'
        },
        ngRouter: {
            deps: ['angular', 'jQuery'],
            exports: 'ngRouter'
        },
        jQuery: {
            exports: 'jQuery'
        },
        ngAnimate: {
            deps: ['angular'],
            exports: 'ngAnimate'
        },
        ngResource: {
            deps: ['angular'],
            exports: 'ngResource'
        },
        ngMock: {
            deps: ['angular'],
            exports: 'ngMock'
        },
        ngSanitize: {
            deps: ['angular'],
            exports: 'ngSanitize'
        },
        uiBootstrap: {
            deps: ['angular'],
            exports: 'uiBootstrap'
        },
        io: {
            exports: 'io'
        }
    }
});

require([ 'app' ], function (app) {

    var angular = require('angular');

    // 如果 `location.search` 包含 `e2e`，则为 E2E 测试
    if (window.location.search.indexOf('e2e') !== -1) {
        require(['/e2e-mocks.js'], function () {
            angular.bootstrap(document, ['domino']);
        });
    } else {
        angular.bootstrap(document, ['domino']);
    }
});
