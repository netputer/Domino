/**
 * @file 项目列表 controller
 *
 * @author  miaojian(miaojian@wandoujia.com)
 * @date 2014/03/10
 */

define([ '_' ], function (_) {
    var ProjectsListController = function ($scope, $location, $route, projectsDao, confirm) {

        $scope.projects = [];

        // 根据返回的status，添加状态class
        $scope.statusClass = [ 'info', 'info', 'danger' ];

        // 根据后台返回的status，更新dom的class
        $scope.statusMap = {
            style: [ 'success', 'warning', 'important' ],
            text: [ 'Success', 'Pending', 'failed' ]
        };

        $scope.statusText = {
            0 : 'created',
            1 : 'executing',
            2 : 'pause',
            3 : 'fail',
            4 : 'executing',
            5 : 'success'
        };

        // 进入新建项目页面
        $scope.createProject = function () {
            $location.path('/projects/new');
        };

        // get project list
        projectsDao.project.get().$promise.then(function (projects) {
            $scope.projects = projects.body;
        });
    };

    ProjectsListController.$inject = [ '$scope', '$location', '$route', 'projectsDao', 'confirm' ];

    return ProjectsListController;
});