(function (window) {
    define([ '_' ], function (_) {
        var ProjectsDaoService = function ($resource, $rootScope, CONFIG) {

            var actions = {
                projectApi: 'project/:title',
                projectTasksList: 'project/:title/task',
                projectHooksList: 'project/:title/hooks',
                trigger: 'project/:title/trigger/:evt',
                rollback: 'project/:title/rollback',
                hookApi: 'hook/:id',
                hookRun: 'hook/:title/run',
                taskApi: 'task/:title',
                taskReview: 'task/review',
                cronApi: 'project/:projectTitle/cron/:title',
                cronToggle: 'project/:projectTitle/cron/:title/toggle',
                taskLog: 'task/:taskId/log'
            };

            for (var key in actions) {
                if (actions.hasOwnProperty(key)) {
                    actions[key] = CONFIG.API_URL_PREFIX + actions[key];
                }
            }

            return {
                project: $resource(actions.projectApi, {}, {
                    getUnloading: {
                        method: 'get',
                        noLoading: true
                    },
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
                        method: 'put'
                    },
                    rollback: {
                        url: actions.rollback,
                        method: 'get',
                        noLoading: true
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

                task: $resource(actions.taskApi, {}, {
                    review: {
                        url: actions.taskReview,
                        method: 'put'
                    },
                    getLog: {
                        url: actions.taskLog,
                        method: 'get'
                    }
                }),

                cron: $resource(actions.cronApi, {}, {
                    toggle: {
                        url: actions.cronToggle,
                        method: 'put'
                    },
                    update: {
                        method: 'put'
                    },
                })
            };
        };

        ProjectsDaoService.$inject = [ '$resource', '$rootScope', 'CONFIG' ];

        return ProjectsDaoService;
    });
}(this));
