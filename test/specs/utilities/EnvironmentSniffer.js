(function () {
    define(['app/javascripts/utilities/EnvironmentSniffer'], function (EnvironmentSniffer) {
        describe('EnvironmentSniffer', function () {
            it('Should have `OS` property. ', function (done) {
                if (EnvironmentSniffer.OS !== undefined) {
                    done();
                } else {
                    done('Should have `OS` property. ');
                }
            });

            if (navigator.platform.indexOf('Mac') >= 0) {
                it('Should `OS` equals `Mac` under MacOS. ', function (done) {
                    if (EnvironmentSniffer.OS === 'Mac') {
                        done();
                    } else {
                        done('Should `OS` equals `Mac` under MacOS. ');
                    }
                });
            }

            if (navigator.platform.indexOf('Win') >= 0) {
                it('Should `OS` equals `Windows` under Windows. ', function (done) {
                    if (EnvironmentSniffer.OS === 'Windows') {
                        done();
                    } else {
                        done('Should `OS` equals `Windows` under MacOS. ');
                    }
                });
            }

            if (navigator.platform.indexOf('Linux') >= 0) {
                it('Should `OS` equals `Linux` under Linux. ', function (done) {
                    if (EnvironmentSniffer.OS === 'Linux') {
                        done();
                    } else {
                        done('Should `OS` equals `Linux` under MacOS. ');
                    }
                });
            }
        });
    });
}(this));
