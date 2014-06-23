/**
 * @file modal window
 *
 * @author  miaojian(miaojian@wandoujia.com)
 */

define(['angular'], function (angular) {
    'use strict';
    angular.module('modalModule', [])

    .provider('confirm', function () {

        this.$get = [ '$q', '$modal', function ($q, $modal) {

            function confirm(msg) {
                var deferred = $q.defer();

                $modal.open({
                    template: '' +
                        '<div class="modal-body">' +
                            '<h3>' + msg + '</h3>' +
                        '</div>' +
                        '<div class="modal-footer">' +
                            '<button class="btn btn-primary" ng-click="ok()">OK</button>' +
                            '<button class="btn btn-warning" ng-click="cancel()">Cancel</button>' +
                        '</div>',

                    controller: [ '$scope', '$modalInstance', function ($scope, $modalInstance) {

                        $scope.ok = function () {
                            $modalInstance.close();
                        };

                        $scope.cancel = function () {
                            $modalInstance.dismiss();
                        };
                    } ]
                }).result.then(function () {

                    deferred.resolve();
                }, function () {

                    deferred.reject();
                });

                return deferred.promise;
            }

            return confirm;
        }];
    })
    .provider('Alert', function () {

        this.$get = [ '$q', '$modal', function ($q, $modal) {

            function confirm(msg) {
                var deferred = $q.defer();

                $modal.open({
                    template: '' +
                        '<div class="modal-body">' +
                            '<h3>' + msg + '</h3>' +
                        '</div>' +
                        '<div class="modal-footer">' +
                            '<button class="btn btn-primary" ng-click="ok()">sure</button>' +
                        '</div>',

                    controller: [ '$scope', '$modalInstance', function ($scope, $modalInstance) {

                        $scope.ok = function () {
                            $modalInstance.close();
                        };
                    } ]
                }).result.then(function () {

                    deferred.resolve();
                });

                return deferred.promise;
            }

            return confirm;
        }];
    });
});
