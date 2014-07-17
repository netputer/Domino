/**
 * @file cron列表 controller
 *
 * @author  miaojian(miaojian@wandoujia.com)
 */

define([ 'angular', '_' ], function (angular, _) {
    var ProjectsCronListController = function ($scope, $location, $route, projectsDao, $modal, $routeParams, $window, isProjectManagerFilter) {

        $scope.crons = [];

        var projectTitle = $routeParams.title;

        $scope.goCreate = function () {
            $location.path('/projects/' + projectTitle + '/crons/new');
        };

        $scope.goEdit = function (title) {
            $location.path('/projects/' + projectTitle + '/crons/' + title);
        };

        $scope.toggleCron = function (title, status) {

            projectsDao.cron.toggle(
                { projectTitle:  projectTitle, title: title },
                { status: status}
            ).$promise.then(function (crons) {


            });
        };

        $scope.canOperate = true;
        projectsDao.project.get({ title: projectTitle }).$promise.then(function (data) {

            var body = data.body;

            $scope.$watch(function () {

                return isProjectManagerFilter(body.managers);
            }, function (isCan) {

                $scope.canOperate = isCan;
            });
        });

        projectsDao.cron.get({ projectTitle:  projectTitle }).$promise.then(function (crons) {

            $scope.crons = crons.body;
        });
    };

    ProjectsCronListController.$inject = [ '$scope', '$location', '$route', 'projectsDao', '$modal', '$routeParams', '$window', 'isProjectManagerFilter' ];

    return ProjectsCronListController;
});
