define(['_'], function (_) {
    var UtilsController = function (
        $scope,
        $http,
        Environment,
        UtilsUrlList
    ) {
        $scope.os = [{
            label : 'Mac OS',
            value : 'Mac',
            cate : 'Mac'
        }, {
            label : 'Windows 32bit',
            value : 'Windows|32bit',
            cate : 'Windows'
        }, {
            label : 'Windows 64bit',
            value : 'Windows|64bit',
            cate : 'Windows'
        }, {
            label : 'Linux 32bit',
            value : 'Linux|32bit',
            cate : 'Linux'
        }, {
            label : 'Linux 64bit',
            value : 'Linux|64bit',
            cate : 'Linux'
        }];

        if (Environment.OS === 'Mac') {
            $scope.target = $scope.os[0];
        } else {
            $scope.target = _.find($scope.os, function (o) {
                return o.value === (Environment.OS + '|' + Environment.CPU_CLASS);
            });
        }

        $scope.clickBtnDownload = function () {
            var paras = $scope.target.value.split('|');
            var url = UtilsUrlList.downloadSetupScript + '?' + ['os=' + paras[0], 'cpu=' + (paras[1] || '')].join('&');

            $scope.downloadURL = url;

            var iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            iframe.src = url;
        };

    };

    UtilsController.$inject = [ '$scope', '$http', 'Environment', 'UtilsUrlList' ];

    return UtilsController;
});