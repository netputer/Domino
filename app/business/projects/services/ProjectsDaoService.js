(function (window) {
    define([ '_' ], function (_) {
        var ProjectsDaoService = function ($resource, $rootScope, CONFIG) {

            var actions = {

                projectApi: 'project/:id',
                projectTasksList: 'project/:id/tasks',
                hookApi: 'hook/:id',
                hookRun: 'hook/:id/run',
                taskApi: 'task/:id'
            };

            for (var key in actions) {

                if (actions.hasOwnProperty(key)) {

                    actions[key] = CONFIG.API_URL_PREFIX + actions[key];
                }
            }

            return {
                project: $resource(actions.projectApi, {}, {
                    getTasks: {
                        url: actions.projectTasksList,
                        method: 'get'
                    },
                    update: {
                        method: 'put'
                    }
                }),

                hook: $resource(actions.hookApi, {}, {
                    run: {
                        url: actions.hookRun,
                        method: 'get'
                    }
                }),

                task: $resource(actions.taskApi, {})
            };
        };

        ProjectsDaoService.$inject = [ '$resource', '$rootScope', 'CONFIG' ];

        return ProjectsDaoService;
    });
}(this));
