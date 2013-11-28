(function (window) {
    define(['_'], function (_) {
        var DATA = {
            OS : [{
                string : navigator.platform,
                subString : 'Win',
                identity : 'Windows'
            }, {
                string : navigator.platform,
                subString : 'Mac',
                identity : 'Mac'
            }, {
                string : navigator.userAgent,
                subString : 'iPhone',
                identity : 'iPhone/iPod'
            }, {
                string : navigator.userAgent,
                subString : 'iPad',
                identity : 'iPad'
            }, {
                string : navigator.platform,
                subString : 'Linux',
                identity : 'Linux'
            }],
            CPU_CLASS : [{
                string : navigator.userAgent,
                subString : 'WOW64',
                identity : '64bit'
            }, {
                string : navigator.userAgent,
                subString : 'Win64',
                identity : '64bit'
            }, {
                string : window.navigator.platform,
                subString : 'Linux x86_64',
                identity : '64bit'
            }]
        };

        var searchString = function (data) {
            var target = _.find(data, function (item) {
                return item.string.indexOf(item.subString) >= 0;
            });

            return target !== undefined ? target.identity : undefined;
        };

        var EnvironmentSniffer = function () {
            var OS = searchString.call(this, DATA.OS) || 'Unknown OS. ';

            var CPU_CLASS = '64bit';
            if (OS === 'Windows' || OS === 'Linux') {
                CPU_CLASS = searchString.call(this, DATA.CPU_CLASS) || '32bit';
            }

            return {
                OS : OS,
                CPU_CLASS : CPU_CLASS
            };
        };

        return EnvironmentSniffer;
    });
}(this));
