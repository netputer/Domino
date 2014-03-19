/**
 * server event center
 *
 * @author  miaojian(miaojian@wandoujia.com)
 */

define(['angular'], function (angular) {
    'use strict';

    angular.module('serverEventCenterModule', [])
    
        .factory('serverEventCenter', [ '$rootScope', '$resource', '$timeout',

            function ($rootScope, $resource, $timeout) {

                var center = $resource('/api/server/event/center', {}, {
                    query: {method: 'get', toArray: true, noLoading: true}
                });

                function init() {
    
                    $timeout(polling, 5000);
                }

                function polling() {

                    center.query().$promise.then(function (data) {
                        broadcast(data);

                        $timeout(polling, 5000);
                    }, function () {

                        $timeout(polling, 5000);
                    });
                }

                function broadcast(data) {

                    $rootScope.$broadcast('eventcenter.server', data);
                }

                
                return {
                    init: init
                };
            }
        ])
        .run(['serverEventCenter',
            function (serverEventCenter) {
                //serverEventCenter.init();
            }
        ]);
});
