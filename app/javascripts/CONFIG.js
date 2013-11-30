(function () {
    define(['_'], function (_) {
        var API_PROTOCAL = 'http';
        var API_HOST = '127.0.0.1';
        var API_PORT = 1337;

        var API_URL_PREFIX = API_PROTOCAL + '://' + API_HOST + ':' + API_PORT + '/';

        var CONFIG = function () {
            var actions = {
                ACCOUNT_LOGIN : 'account/login',
                ACCOUNT_LOGOUT : 'account/logout',
                DOWNLOAD_SETUP_SCRIPT : 'util/devEnvSetup/get',

                PROJECTS_SYNC : 'project'
            };

            var key;
            for (key in actions) {
                if (actions.hasOwnProperty(key)) {
                    actions[key] = API_URL_PREFIX + actions[key];
                }
            }

            return {
                ACTIONS : actions
            };
        };

        return CONFIG;
    });
}(this));
