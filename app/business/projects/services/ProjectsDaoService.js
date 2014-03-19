(function (window) {
    define([ '_' ], function (_) {
        var ProjectsDaoService = function ($resource, $rootScope) {
            var API_PROTOCAL = 'http';
            var API_HOST = '127.0.0.1';
            var API_PORT = 9999;
            var API_PROFIX = '';

            var API_URL_PREFIX = API_PROTOCAL + '://' + API_HOST + ':' + API_PORT + '/' + API_PROFIX;

            var actions = {

                projectApi: 'project/:id',
                projectTasksList: 'project/:id/tasks',
                hookApi: 'hook/:id',
                hookRun: 'hook/:id/run',
                taskApi: 'task/:id'
            };

            for (var key in actions) {

                if (actions.hasOwnProperty(key)) {

                    actions[key] = API_URL_PREFIX + actions[key];
                }
            }

            return {
                project: $resource(actions.projectApi, {}, {
                    getTasks: {
                        url: actions.projectTasksList,
                        method: 'get',
                        isArray: true
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

        ProjectsDaoService.$inject = [ '$resource', '$rootScope' ];

        return ProjectsDaoService;
    });
}(this));
