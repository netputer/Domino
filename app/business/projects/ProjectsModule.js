/**
 * @file projects module
 *
 * @author  miaojian(miaojian@wandoujia.com)
 * @date    2014/03/10
 */

define([
    'angular',
    'ngRouter',
    'projects/services/ProjectsDaoService',
    'projects/controllers/ProjectsListController', //项目列表
    'projects/controllers/ProjectsEditController', //项目编辑
    'projects/controllers/ProjectsTaskController', //项目任务编辑
    'projects/controllers/ProjectsHookListController', //项目hook列表
    'projects/controllers/ProjectsCronListController',
    'projects/controllers/ProjectsCronEditController',

    'projects/directives/editScriptDirective',
    'projects/directives/editModalDirective'
], function (
    angular,
    ngRouter,
    ProjectsDaoService,
    ProjectsListController,
    ProjectsEditController,
    ProjectsTaskController,
    ProjectsHookListController,
    ProjectsCronListController,
    ProjectsCronEditController,

    editScriptDirective,
    editModalDirective
) {
    angular.module('dmnProjects', [])

    .factory('projectsDao', ProjectsDaoService)

    .controller('ProjectsListController', ProjectsListController)

    .controller('ProjectsEditController', ProjectsEditController)

    .controller('ProjectsTaskController', ProjectsTaskController)

    .controller('ProjectsHookListController', ProjectsHookListController)

    .controller('ProjectsCronListController', ProjectsCronListController)

    .controller('ProjectsCronEditController', ProjectsCronEditController)

    .directive('dmnScriptEdit', editScriptDirective)

    .directive('dmnModalEdit', editModalDirective)

    .run(['socket', function (socket) {

        // 添加project模块的所有socket配置
        socket.addEventName('task.add', 'task.change', 'task.progress');
    }]);

});
