/**
 * @file hooks列表 controller
 *
 * @author  miaojian(miaojian@wandoujia.com)
 * @date 2014/03/10
 */

define([ 'angular', '_' ], function (angular, _) {
    var ProjectsHookListController = function ($scope, $location, $route, projectsDao, $modal, $routeParams, $window) {

        $scope.hooks = [];

        /**
         * 保存当前的script修改
         * @param  {string} script 脚本
         * @param  {number} id  当前id
         */
        $scope.save = function (script, id) {

            var item, index;
            for (var i = 0, len = $scope.hooks.length; i < len; i++) {

                item = $scope.hooks[i];
                if (item.id === id) {
                    index = i;
                    break;
                }
            }

            item = angular.copy(item);
            item.script = script;

            projectsDao.hook.update({ id:  id }, item).$promise.then(function (hooks) {

                //$scope.hooks[index] = hooks.body;
                $scope.hooks[index] = item;
            });
        };

        $scope.run = function (id) {
            var hook = _.find($scope.hooks, function (hook) {
                return hook.id === id;
            });

            // trigger current hook
            projectsDao.project.trigger({ evt: hook.event,  title: $routeParams.title })
                .$promise.then(function (hook) {
                    // 跳转到task页面查看task log
                    $location.path('/projects/' + $routeParams.title + '/task/open');
                });
        };

        $scope.fallback = function () {
            //$window.history.go(-1);
            $location.path('/projects/' + $routeParams.title + '/task');
        };

        // get hook run
        //projectsDao.hook.run({ id: id }).$promise.then(function (result) {
        projectsDao.project.getHooks({ title:  $routeParams.title }).$promise.then(function (hooks) {

            $scope.hooks = hooks.body;
        });
    };

    ProjectsHookListController.$inject = [ '$scope', '$location', '$route', 'projectsDao', '$modal', '$routeParams', '$window' ];

    return ProjectsHookListController;
});
