(function (window) {
    define([ '_' ], function (_) {
        var AccountDaoService = function ($resource, $rootScope, CONFIG) {

            var actions = {
                login: 'account/auth',
                logout: 'account/logout'
            };

            for (var key in actions) {
                if (actions.hasOwnProperty(key)) {
                    actions[key] = CONFIG.API_URL_PREFIX + actions[key];
                }
            }

            var googleApi = 'https://www.googleapis.com/plus/v1/people/me';

            return {
                login: $resource(actions.login, {}, {
                    save: {
                        method: 'POST',
                        noLoading: true
                    }
                }),

                logout: $resource(actions.logout),

                user: $resource(googleApi, {}, {
                    get: {
                        method: 'GET',
                        noLoading: true,
                        withCredentials: false
                    }
                })
            };
        };

        AccountDaoService.$inject = [ '$resource', '$rootScope', 'CONFIG' ];

        return AccountDaoService;
    });
}(this));
