(function (window) {
    define([
        'angular',

        'main/services/AccountService',
        'main/services/AccountDaoService',

        'main/controllers/LoginController',

        'main/directives/LoginDirective',
        'main/directives/HeaderDirective',
        'main/directives/NavbarDirective'

    ], function (
        angular,

        AccountService,
        AccountDaoService,

        LoginController,

        LoginDirective,
        HeaderDirective,
        NavbarDirective
    ) {
        angular.module('dmnMain', [])

        .factory('accountDao', AccountDaoService)
        .factory('AccountService', AccountService)
        .controller('LoginController', LoginController)
        .directive('dmnLogin', LoginDirective)
        .directive('dmnHeader', HeaderDirective)
        .directive('dmnNavbar', NavbarDirective)
        .run(['AccountService', '$rootScope', function (accountService, $rootScope) {

            // 记录并初始化所有的rootScope的全局变量，以便查阅
            var config = {

                //全局账户信息配置
                accontService: accountService,

                //用于记录全局loading状态
                isLoading: false,

                //用来记录登录面板的状态
                loginPanelShow: false
            };

            for (var key in config) {

                if (config.hasOwnProperty(key)) {

                    $rootScope[key] = config[key];
                }
            }
        }]);

    });
}(this));
