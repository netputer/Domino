/**
 * common directive
 *
 * @author  miaojian@wandoujia.com
 */

define([ 'angular', '_' ], function (angular, _) {

    angular.module('directiveModule', [])

    // form verification tooltip
    .directive('formTooltip', ['$timeout', 'statusMsgMapping', function ($timeout, statusMsgMapping) {

        return {
            restrict: 'EA',
            require: '^form',
            replace: true,
            scope: {
                custom: '=custom'
            },

            templateUrl: '/business/common/templates/formTooltip.html',
            link: function ($scope, el, attrs, ctrl) {

                $scope.showHint = true;
                $scope.hint = attrs.hint || '';

                var fieldName = attrs['for'];
                var fieldCtrl = ctrl[fieldName];

                if (fieldCtrl) {
                    
                    fieldCtrl.$formatters.push(validateFn);
                    fieldCtrl.$parsers.push(validateFn);
                }

                // listen custom, access custom show status
                $scope.$watch('custom', function (msg) {

                    $scope.customMsg = msg ? (statusMsgMapping[msg] ? statusMsgMapping[msg] : '') : '';

                    if (msg) {

                        showCustomError();
                    }
                });

                function validateFn(value) {

                    $timeout(function () {

                        validate();
                    });

                    return value;
                }

                function validate() {

                    var isValid = fieldCtrl.$valid;
                    var isDirty = fieldCtrl.$dirty;

                    if (!isDirty || isValid) {
                        
                        showHint();
                    }
                    else {

                        showError();
                    }
                }

                /**
                 * show hint dom, hide errir dom
                 */
                function showHint() {

                    $scope.showHint = true;
                    $scope.errorMsgs = [];
                    $scope.custom = '';
                }

                /**
                 * show error dom, hide hint custom dom
                 */
                function showError() {
                    $scope.showHint = false;

                    $scope.errorMsgs = [];
                    _.forEach(fieldCtrl.$error, function (val, key) {

                        if (val) {

                            $scope.errorMsgs.push(statusMsgMapping[attrs[key]] || 'error');
                        }
                    });

                    $scope.custom = '';
                }

                /**
                 * show custom dom, hide hint and error dom
                 */
                function showCustomError() {

                    $scope.showHint = false;
                    $scope.errorMsgs = [];
                }
            }
        };
    }]);
});