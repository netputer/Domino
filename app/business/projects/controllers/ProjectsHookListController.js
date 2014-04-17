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
            $scope['disabled-hookItem' + id] = true;
            projectsDao.hook.run({ id: id }).$promise.then(function (result) {

                //$scope['disabled-hookItem' + id] = false;
            });
        };

        $scope.fallback = function () {
            //$window.history.go(-1);
            $location.path('/projects/task/' + $routeParams.title);
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
