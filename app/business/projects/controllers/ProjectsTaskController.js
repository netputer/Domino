/**
 * @file 任务处理页面 controller
 *
 * @author  miaojian(miaojian@wandoujia.com)
 * @date 2014/03/17
 */

define([ 'angular', '_', 'moment'], function (angular, _, moment) {
    var ProjectsTaskController = function ($scope, $location, $route, projectsDao, $routeParams, confirm, socket, notification) {

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

        //$scope.totalItems = 64;
        //$scope.currentPage = 4;

        // get project list
        projectsDao.project.getTasks({ title: $routeParams.title }).$promise.then(function (tasks) {

            // TODO filter
            _.forEach(tasks.body, function (item, name) {
                filterTask(item);
            });

            $scope.tasks = tasks.body;
        });

        // 过滤处理item数据
        function filterTask(item) {

            item.duration =  getDuration(item, item);

            item.startTimeStr = moment(item.startTime).format('YYYY-MM-DD hh:mm:ss');

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

            duration = moment.duration(duration).asMilliseconds();

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
        socket.on('task.add', function (data) {

            console.info('task.add:', data);

            // progress 初始化为空
            data.log = '';

            // 关闭所有console 面板
            _.forEach($scope.tasks, function (task) {

                task.showConsole = false;
            });

            // 主动打开当前console panle
            data.showConsole = true;

            // 添加到tasks列表
            $scope.tasks.unshift(filterTask(data));
        });

        /**
         * 当task的任何一个值变化的时候触发
         */
        socket.on('task.change', function (data) {

            console.info('task.change:', data);
            _.forEach($scope.tasks, function (task, name, tasks) {

                if (task.id === data.id) {

                    // 状态变化的时候，fail or success会触发notification
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

                    task.status = data.status;
                    task.duration = getDuration(data, task);
                    $scope.$apply();
                }
            });
        });

        socket.on('task.progress', function (data) {

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
    };

    ProjectsTaskController.$inject = [ '$scope', '$location', '$route', 'projectsDao', '$routeParams', 'confirm', 'socket', 'notification' ];

    return ProjectsTaskController;
});
