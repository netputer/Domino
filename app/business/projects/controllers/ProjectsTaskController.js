/**
 * @file 任务处理页面 controller
 *
 * @author  miaojian(miaojian@wandoujia.com)
 * @date 2014/03/17
 */

define([ 'angular', '_', 'moment'], function (angular, _, moment) {
    var ProjectsTaskController = function ($scope, $location, $route, $q, projectsDao, $routeParams, confirm, notification, AccountService) {

        $scope.tasks = [];

        // 根据返回的status，添加状态class
        $scope.statusClass = [ 'info', 'warning', 'default', 'warning', 'danger', 'default', 'success' ];

        $scope.statusText = {
            0 : 'created',
            1 : 'queue',
            2 : 'executing',
            3 : 'pause',
            4 : 'fail',
            5 : 'force executing',
            6 : 'success'
        };

        $scope.title = $routeParams.title;

        $scope.page = 1;
        $scope.pageSize = 10;

        // 观察page，向后端获取数据
        $scope.setPage = function (page) {
            var deferred = $q.defer();

            // get project list
            projectsDao.project.getTasks(
                { title: $routeParams.title, page: page, pageSize: $scope.pageSize }
            )
                .$promise.then(function (tasks) {

                    // TODO filter
                    _.forEach(tasks.body, function (item, name) {
                        filterTask(item);
                    });

                    $scope.tasks = tasks.body;
                    $scope.max   = tasks.max;

                    deferred.resolve(tasks.body);
                });

            return deferred.promise;
        };

        // 第一次进入页面获取数据
        $scope.setPage($scope.page).then(function (tasks) {
            if (typeof $routeParams.isOpen !== 'undefined') {
                // 第一次进入页面，打开第一个console
                // FIXED: 由于task与hook之间没有对应关系，此处当从hook run跳过来后
                // 直接以打开第一个task console（当此间有人又build的时候，可以会有问题，但问题不大）

                // 主动打开当前console panle
                tasks[0].showConsole = true;
            }
        });


        // 获取project 内容
        projectsDao.project.getUnloading({ title: $scope.title }).$promise.then(function (data) {

            var body = data.body;

            $scope.project = body;
        });


        // 过滤处理item数据
        function filterTask(item) {
            item.duration =  getDuration(item, item);

            item.startTimeStr = moment(item.startTime).fromNow();

            item.initor = item.initor || '-';

            return item;

        }

        /**
         * 获取持续时间，note: 在change 的过程中没有结束时间
         * @param  {Object} item 获取结束时间
         * @param  {Object} task 用来获取开始时间
         */
        function getDuration(item, task) {
            var endTime = item.endTime || (new Date());
            var duration = moment(endTime).valueOf() - moment(task.startTime).valueOf();

            duration = moment.duration(duration, 'milliseconds').asSeconds();

            return duration;
        }

        /**
         * publish hooks
         * @param  {string} evt staging or producting
         */
        $scope.publish = function (evt) {

            //$scope['disabled-hookItem' + id] = true;
            projectsDao.project.trigger({ evt: evt,  title: $routeParams.title })
                .$promise.then(function (result) {
                    var taskId = result.id;

                    // projectsDao.task.get({ id: taskId }).$promise.then(function (task) {

                    //     filterTask(task);
                    //     $scope.tasks.unshift(task);
                    // });
                });
        };

        $scope.goHookList = function () {
            $location.path('/projects/' + $routeParams.title + '/hooks');
        };

        $scope.goEdit = function () {
            $location.path('/projects/' + $routeParams.title);
        };

        // 删除当前项目
        $scope.delete = function () {

            confirm('Are you sure to delete this Project?').then(function () {

                projectsDao.project.delete({title:  $routeParams.title}).$promise.then(function () {

                    //删除成功后返回到list页面
                    $location.path('/projects');

                });
            });
        };


        $scope.toggleConsole = function (id) {

            var tasks = $scope.tasks;

            _.forEach(tasks, function (task) {

                if (task.id === id) {

                    task.showConsole = !task.showConsole;
                }
                else {

                    task.showConsole = false;
                }

            });
        };


        /**
         * socket listen
         *
         */
        $scope.$on('io.task.add', function (event, data) {

            console.info('task.add:', data);

            // progress 初始化为空
            data.log = '';

            // 当此task操作人为当前用户时，打开log panel
            if (data.accountName === AccountService.userInfo.accountName) {

                // 关闭所有 console 面板
                _.forEach($scope.tasks, function (task) {

                    task.showConsole = false;
                });

                // 主动打开当前console panle
                data.showConsole = true;

            }

            // 添加到tasks列表
            $scope.tasks.unshift(filterTask(data));
        });

        /**
         * 当task的任何一个值变化的时候触发
         */
        $scope.$on('io.task.change', function (event, data) {

            console.info('task.change:', data);
            _.forEach($scope.tasks, function (task, name, tasks) {

                if (task.id === data.id) {

                    task.status = data.status;
                    task.duration = getDuration(data, task);
                    $scope.$apply();

                    clearInterval(task.timer);
                    task.timer = setInterval(function () {
                        $scope.$apply(function () {
                            task.duration = getDuration({}, task);
                        });
                    }, 1000);

                    // build完成后，停止监听
                    if (data.status === 4 || data.status === 6) {

                        clearInterval(task.timer);
                    }


                    // 状态变化的时候，fail or success会触发notification
                    // 可能两个change的status是一样的
                    if (task.status !== data.status) {
                        //添加通知
                        switch (data.status) {
                        case 4:
                            notification.createNotification('Fail', {
                                icon: '/images/fail.png',
                                body: data.title + ' of ' + data.projectTitle + ' build fail'
                            });

                            break;
                        case 6:
                            notification.createNotification('Success', {
                                icon: '/images/success.png',
                                body: data.title + ' of ' + data.projectTitle + ' build success'
                            });

                            break;
                        }
                    }
                }
            });
        });

        $scope.$on('io.task.progress', function (event, data) {

            console.info('task.progress:', data.id, data);

            _.forEach($scope.tasks, function (task) {

                if (data.id === task.id) {

                    $scope.$apply(function () {

                        task.duration = getDuration(data, task);

                        // log 增量
                        task.incrementLog = data.progress;
                        task.log += data.progress;
                    });
                }
            });
        });

        $scope.$on('$destroy', function () {
            // 干掉监听器
            _.forEach($scope.tasks, function (task) {

                clearInterval(task.timer);
            });
        });
    };

    ProjectsTaskController.$inject = [ '$scope', '$location', '$route', '$q', 'projectsDao', '$routeParams', 'confirm', 'notification', 'AccountService' ];

    return ProjectsTaskController;
});
