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

            return {
                OS : OS
            };
        };

        return new EnvironmentSniffer();
    });
}(this));
