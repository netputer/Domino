require(['RequireConfig', 'app'], function () {
    
    var angular = require('angular');

    if (window.debuger) {
        
        require(['/e2e-mocks.js'], function () {
            
            angular.bootstrap(document, ['domino']);
        });
    }
    else {
        
        angular.bootstrap(document, ['domino']);
    }
});
