(function (window) {
    define([], function () {
        var ProjectsService = function ($q, $http, CONFIG) {
            var projects = [];

            var projectsService = {
                syncAsync : function () {
                    var deferred = $q.defer();

                    $http({
                        method : 'GET',
                        url : CONFIG.ACTIONS.PROJECTS_SYNC,
                    }).success(function (data, status, headers, config) {
                        projects = data;
                        deferred.resolve(data);
                    }).error(function (data, status, headers, config) {
                        deferred.reject();
                    });

                    return deferred.promise;
                }
            };

            Object.defineProperties(projectsService, {
                projects : {
                    get : function () {
                        return projects;
                    }
                }
            });

            return projectsService;
        };

        ProjectsService.$injection = ['$q', '$http', 'CONFIG'];

        return ProjectsService;
    });
}(this));
