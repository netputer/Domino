(function (window) {
    define([ '_' ], function (_) {
        var AccountDaoService = function ($resource, $rootScope, CONFIG) {
            var actions = {
                accountApi: 'account/:accountName'
            };

            for (var key in actions) {
                if (actions.hasOwnProperty(key)) {
                    actions[key] = CONFIG.API_URL_PREFIX + actions[key];
                }
            }

            return {
                account: $resource(actions.accountApi)
            };
        };

        AccountDaoService.$inject = ['$resource', '$rootScope', 'CONFIG'];

        return AccountDaoService;
    });
}(this));

