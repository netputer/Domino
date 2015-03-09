/**
 * @file 项目编辑 controller
 *
 * @author  miaojian(miaojian@wandoujia.com)
 * @date 2014/03/10
 */

define([ 'angular', '_' ], function (angular, _) {
    var ProjectsEditController = function (
            $scope, $location, $window, projectsDao,
            confirm, $routeParams, statusMsgMapping, accountDao,
            $rootScope, isProjectManagerFilter
        ) {

        // 初始化
        $scope.saved = {};
        $scope.isModify = false; // 默认为新建页面
        $scope.project = {
            type: 0
        };

        $scope.members = [];

        // 请求所有用户列表
        // todo:  前期用户少，全部请求，后期可以做suggestion
        accountDao.account.get().$promise.then(function (data) {

            var body = data.body;

            $scope.members = body;

            if (!$scope.isModify) {

                var unregister = $scope.$watch(function () {

                    return $rootScope.userInfo.accountName;

                }, function (accountName) {

                    if (accountName) {

                        // 初始化所有成员为当前创立用户
                        $scope.project.developers = [ accountName ];
                        $scope.project.designers  = [ accountName ];
                        $scope.project.managers   = [ accountName ];
                        unregister();
                    }
                });
            }
        });


        //console.info('routeParams', $routeParams.id);

        // 检测是否为修改页面
        if (typeof $routeParams.title !== 'undefined') {

            // 当前类型
            $scope.isModify = true;

            // 获取当前project的content
            projectsDao.project.get({ title: $routeParams.title }).$promise.then(function (data) {

                var body = data.body;
                // ....
                body.stagingServers = body.stagingServers.join('|');
                body.productionServers = body.productionServers.join('|');
                body.notificationList = body.notificationList.join('|');

                $scope.project = body;


                var unregister = $scope.$watch(function () {
                    return $rootScope.userInfo.accountName;
                }, function (accountName) {

                    if (accountName) {
                        // 修改需要disabled判断
                        var dis = !isProjectManagerFilter(body.managers);
                        $scope.disabledMangerSele = dis;
                        unregister();
                    }
                });
            });
        }


        $scope.saveFun = function (project) {

            if ($scope.newForm.$valid) {

                $scope.saved = angular.copy(project);

                console.info(JSON.stringify($scope.saved));

                // 如果为新建页面，则做creat操作，否则做update操作
                var req;
                if ($scope.isModify) {

                    req = projectsDao.project.update({ title: $routeParams.title }, $scope.saved);
                }
                else {

                    req = projectsDao.project.save($scope.saved);
                }

                req.$promise.then(function (data) {

                    $location.path('/projects');
                }, function (res) {

                    if (res.status === 514 || res.status === 512) {

                        // _.forEach(res.data.error, function (val, name, item) {

                        //     item[name] = statusMsgMapping[val];
                        // });
                        console.log(res.data);

                        $scope.newForm.serverInvalid = res.data.err;
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
                $scope.isModify ?  '/projects/' + $routeParams.title + '/task': '/projects'
            );
        };

        /**
         * 建立modal window
         */
        $scope.cancel = function () {
            confirm('Are you sure to cancel it?').then(function () {
                $scope.fallback();
            });
        };
    };

    ProjectsEditController.$inject = [
        '$scope', '$location', '$window', 'projectsDao',
        'confirm', '$routeParams', 'statusMsgMapping', 'accountDao',
        '$rootScope', 'isProjectManagerFilter'
    ];

    return ProjectsEditController;
});
