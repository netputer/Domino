/**
 * @file hook script edit 指令
 */
define([
    'text!projects/templates/partials/editModal.html'
], function (modalTemplate) {

    var editModalDirective = function ($modal, $q) {
        return {
            restrict: 'A',
            scope: {
                data: '@',
                onok: '&'
            },
            link : function ($scope, $element, $attributes) {

                $element.bind('click', function () {

                    $modal.open({
                        template: modalTemplate,
                        controller: [ '$scope', '$modalInstance', 'data', function ($scope, $modalInstance, data) {

                            $scope.data = data || {};

                            $scope.ok = function () {
                                //console.log('$scope.newForm:', $scope);

                                //todo: 为啥拿不到form的引用
                                if ($scope.data.branch) {

                                    $modalInstance.close($scope.data);
                                }
                            };
                            $scope.cancel = function () {
                                $modalInstance.dismiss();
                            };
                        } ],
                        resolve: {
                            data: function () {
                                console.info($scope.data);
                                var data = $scope.$eval($scope.data);

                                return data;
                            }
                        }
                    }).result.then(function (data) {

                        $scope.onok({data: data});
                    });

                });
            }
        };
    };

    editModalDirective.$inject = ['$modal', '$q'];

    return editModalDirective;
});
