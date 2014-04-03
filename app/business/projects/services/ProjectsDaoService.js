(function (window) {
    define([ '_' ], function (_) {
        var ProjectsDaoService = function ($resource, $rootScope, CONFIG) {

            var actions = {
                projectApi: 'project/:title',
                projectTasksList: 'project/:title/task',
                projectHooksList: 'project/:title/hooks',
                trigger: 'project/:title/trigger/:evt',
                hookApi: 'hook/:title',
                hookRun: 'hook/:title/run',
                taskApi: 'task/:title'
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
                    },
                    getHooks: {
                        url: actions.projectHooksList,
                        method: 'get'
                    },
                    trigger: {
                        url: actions.trigger,
                        method: 'get'
                    }
                }),

                hook: $resource(actions.hookApi, {}, {
                    run: {
                        url: actions.hookRun,
                        method: 'get'
                    },
                    update: {
                        method: 'put'
                    }
                }),

                task: $resource(actions.taskApi, {})
            };
        };

        ProjectsDaoService.$inject = [ '$resource', '$rootScope', 'CONFIG' ];

        return ProjectsDaoService;
    });
}(this));
