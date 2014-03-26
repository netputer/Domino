require(['RequireConfig', 'app'], function () {
    
    var angular = require('angular');

    // 如果search包含e2e，则为e2e测试
    if ( window.location.search.indexOf('e2e') !== -1) {
        
        require(['/e2e-mocks.js'], function () {
            
            angular.bootstrap(document, ['domino']);
        });
    }
    else {
        
        angular.bootstrap(document, ['domino']);
    }
});
