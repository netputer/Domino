/**
 * common directive
 *
 * @author  miaojian@wandoujia.com
 */

define([ 'angular', 'jQuery', '_' ], function (angular, $, _) {

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
    }])

    // console log
    .directive('logConsole', [ 'util', function (util) {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                allLog: '=allLog', // 所有的log
                incrementLog: '=incrementLog' // 增量log
            },
            templateUrl: '/business/common/templates/logConsole.html',
            link: function ($scope, el, attrs, ctrl) {

                $scope.isLoading = true;

                render($scope.allLog);

                // note: 此处监听allLog，如果监听incrementLog, 当每次增量log相同的时候不能更新
                $scope.$watch('allLog', function () {
                    render($scope.incrementLog);
                });

                function render(log) {
                    if (!log) {
                        return;
                    }

                    $scope.isLoading = false;

                    var arr = _.filter(log.split(/\r?\n/), function (line) {
                        return line !== '';
                    });

                    var currArr = _.map(arr, function (item) {
                        return '<p><a class="num"></a><span>' + item + '</span></p>';
                    });

                    el.find('.pre-log').append(currArr.join(''));
                }

                // toTopBtn add click event
                var btn  = el.find('.to-top-btn');

                btn.bind('click', btnClickHandler);
                function btnClickHandler() {
                    var panelPos = el.offset();
                    $(document).scrollTop(panelPos.top);
                }

                // 绑定滚动事件
                var getScrollHandler = _.throttle(scrollHandler, 64);

                $(window).bind('scroll', getScrollHandler);
                function scrollHandler() {
                    var panelPos      = el.offset();
                    var bodyScrollTop = $(document).scrollTop();

                    if (panelPos.top < bodyScrollTop) {

                        if (bodyScrollTop + $(window).height() < panelPos.top + el.height()) {
                            btn.css({
                                right:  $(window).width() - (panelPos.left + el.width() - 2),
                                bottom: 4,
                                position: 'fixed'
                            });
                        }
                        else {
                            btn.css({
                                right: 2,
                                bottom: 4,
                                position: 'absolute'
                            });
                        }
                        btn.show();
                    }
                    else {
                        btn.hide();
                    }
                }

                // dispose
                $scope.$on('$destroy', function () {

                    $(window).unbind('scroll', getScrollHandler);
                    getScrollHandler = null;

                    btn.unbind('click', btnClickHandler);
                });

            }
        };
    }])

    // 内部loading
    .directive('innerLoading', [function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                text: '@text'
            },
            templateUrl: '/business/common/templates/innerLoading.html'
        };
    }]);
});
