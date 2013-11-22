(function () {
    define([], function () {

        var API_PROTOCAL = 'http';
        var API_HOST = '127.0.0.1';
        var API_PORT = 1337;

        var API_URL_PREFIX = API_PROTOCAL + '://' + API_HOST + ':' + 1337 + '/';

        var CONFIG = function () {
            return {
                ACTIONS : {
                    DOWNLOAD_SETUP_SCRIPT : API_URL_PREFIX + 'util/devEnvSetup/get'
                }
            };
        };

        return CONFIG;
    });
}(this));
