/**
 * @file 项目编辑 controller
 *
 * @author  miaojian(miaojian@wandoujia.com)
 * @date 2014/03/10
 */

define([ 'angular', '_' ], function (angular, _) {
    var ProjectsCronEditController = function (
            $scope, $location, $window, projectsDao,
            confirm, $routeParams, statusMsgMapping, accountDao
        ) {

        // 初始化
        $scope.saved = {};
        $scope.isModify = false; // 默认为新建页面


        // 检测是否为修改页面
        if (typeof $routeParams.title !== 'undefined') {

            $scope.isModify = true;

            // 获取当前project的content
            projectsDao.cron.get(
                {
                    projectTitle: $routeParams.projectTitle,
                    title       : $routeParams.title
                }).$promise.then(function (data) {

                    var body = data.body;

                    $scope.cron = body;
                });
        }


        $scope.saveFun = function (cron) {

            if ($scope.newForm.$valid) {

                $scope.saved = angular.copy(cron);

                // 如果为新建页面，则做creat操作，否则做update操作
                var req;
                if ($scope.isModify) {

                    req = projectsDao.cron.update(
                        {
                            projectTitle: $routeParams.projectTitle,
                            title       : $routeParams.title
                        },
                        $scope.saved
                    );
                }
                else {

                    req = projectsDao.cron.save(
                        {
                            projectTitle: $routeParams.projectTitle
                        },
                        $scope.saved
                    );
                }

                req.$promise.then(function (data) {

                    $location.path('/projects/' + $routeParams.projectTitle + '/crons');
                }, function (res) {

                    if (res.status === 508) {
                        $scope.newForm.serverInvalid = res.data.error;
                    }
                });

            }
            else {

                var form = $scope.newForm;

                angular.forEach(form, function (input, key) {

                    if (input.hasOwnProperty('$dirty')) {
                        if (input.$pristine && (input.$viewValue === null || input.$viewValue === undefined)) {
                            input.$setViewValue('');
                        }
                        else {
                            input.$setViewValue(input.$viewValue);
                        }

                    }
                });
            }
        };

        /**
         * 返回到上一步
         */
        $scope.fallback = function () {

            //$window.history.back(-1);
            $location.path(
                $scope.isModify ?  '/projects/' + $routeParams.projectTitle + '/task': '/projects'
            );
        };

    };

    ProjectsCronEditController.$inject = [
        '$scope', '$location', '$window', 'projectsDao',
        'confirm', '$routeParams', 'statusMsgMapping', 'accountDao'
    ];

    return ProjectsCronEditController;
});
