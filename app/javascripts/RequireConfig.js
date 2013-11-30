require.config({
    paths : {
        jQuery : '../components/jquery/jquery',
        _ : '../components/underscore/underscore',
        angular : '../components/angular/angular',
        ngRouter : '../components/angular-route/angular-route',
        ngAnimate : '../components/angular-animate/angular-animate',
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
        }
    }
});
