(function (window) {
    define([ '_' ], function (_) {
        var UtilsUrl = function (CONFIG) {
            var actions = {

                downloadSetupScript: 'util/devEnvSetup/get'
            };

            for (var key in actions) {

                if (actions.hasOwnProperty(key)) {

                    actions[key] = CONFIG.API_URL_PREFIX + actions[key];
                }
            }

            return actions;
        };

        UtilsUrl.$inject = [ 'CONFIG' ];

        return UtilsUrl;
    });
}(this));
