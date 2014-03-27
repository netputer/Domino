/**
 * @file hook script edit 指令
 */
define([
    'text!projects/templates/partials/scriptEditModal.html'
], function (modalTemplate) {

    var editScriptDirective = function ($modal, $q) {
        return {
            restrict: 'A',
            scope: {
                script: '=script',
                save: '&save'
            },
            link : function ($scope, $element, $attributes) {
                
                $element.bind('click', function () {
                    $modal.open({
                        template: modalTemplate,
                        controller: [ '$scope', '$modalInstance', 'script', function ($scope, $modalInstance, script) {
                                
                            $scope.hook = {};
                            $scope.hook.script = script;

                            $scope.ok = function () {
                                
                                $modalInstance.close($scope.hook.script);
                            };
                            $scope.cancel = function () {
                                $modalInstance.dismiss();
                            };
                        } ],
                        resolve: {
                            script: function () {
                                return $scope.script;
                            }
                        }
                    }).result.then(function (script) {

                        $scope.save({ script: script});
                           
                    });

                });
            }
        };
    };

    editScriptDirective.$inject = ['$modal', '$q'];

    return editScriptDirective;
});