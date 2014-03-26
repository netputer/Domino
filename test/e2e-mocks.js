define(['angular', 'ngMock'], function (angular) {

    angular.module('e2e-mocks', ['ngMockE2E'])
    .run([ '$httpBackend', 'CONFIG', function ($httpBackend, CONFIG) {
        'use strict';

        // template pass, don't mock
        $httpBackend.whenGET(/\.html/).passThrough();

        // Do your mock
        var baseApiUrl = CONFIG.API_URL_PREFIX;

        var projectRes = {
            'status': '200'
        };

        var projectListRes = {
            body: [
                {
                    'id': 0,
                    'title': 'project-one11111',
                    'status': 0,
                    'lastBuildDate': '2014/03/10',
                    'lastStagingBuild' : {
                        'status': 0,
                        'version': '1.10.1'
                    },
                    'lastProdctuionBuild' : {
                        'status': 1,
                        'version': '2.10.1'
                    }
                },
                {
                    'id': 1,
                    'title': 'project-two',
                    'status': 1,
                    'lastBuildDate': '2014/03/10',
                    'lastStagingBuild' : {
                        'status': 2,
                        'version': '1.10.1'
                    },
                    'lastProdctuionBuild' : {
                        'status': 1,
                        'version': '2.10.1'
                    }
                }
            ]
        };

        $httpBackend.whenGET(baseApiUrl + 'project')
            .respond(projectListRes);

        $httpBackend.whenPOST(baseApiUrl + 'project')
            .respond(projectRes);
          
        // For everything else, don't mock
        $httpBackend.whenGET(/^\w+.*/).passThrough();
        $httpBackend.whenPOST(/^\w+.*/).passThrough();
        $httpBackend.whenPUT(/^\w+.*/).passThrough();
        $httpBackend.whenDELETE(/^\w+.*/).passThrough();
    }]);
    
    angular.module('domino').requires.push('e2e-mocks');
});