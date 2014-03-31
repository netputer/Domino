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

    'projects/directives/editScriptDirective'
], function (
    angular,
    ngRouter,
    ProjectsDaoService,
    ProjectsListController,
    ProjectsEditController,
    ProjectsTaskController,
    ProjectsHookListController,
    editScriptDirective
) {
    angular.module('dmnProjects', [])

    .factory('projectsDao', ProjectsDaoService)

    .controller('ProjectsListController', ProjectsListController)

    .controller('ProjectsEditController', ProjectsEditController)

    .controller('ProjectsTaskController', ProjectsTaskController)

    .controller('ProjectsHookListController', ProjectsHookListController)

    .directive('dmnScriptEdit', editScriptDirective);

});
