/**
 * @file 项目列表 controller
 *
 * @author  miaojian(miaojian@wandoujia.com)
 * @date 2014/03/10
 */

define([ '_' ], function (_) {
    var ProjectsListController = function ($scope, $location, $route, projectsDao, confirm, CONFIG) {

        $scope.projects = [];

        // 根据返回的status，添加状态class
        $scope.statusClass = CONFIG.STATUS_CLASS;

        $scope.statusText = CONFIG.STATUS_TEXT;

        // 进入新建项目页面
        $scope.createProject = function () {
            $location.path('/projects/new');
        };

        // get project list
        projectsDao.project.get().$promise.then(function (projects) {
            $scope.projects = projects.body;
        });
    };

    ProjectsListController.$inject = [ '$scope', '$location', '$route', 'projectsDao', 'confirm', 'CONFIG' ];

    return ProjectsListController;
});
