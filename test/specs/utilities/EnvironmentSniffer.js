/*global describe, it*/
(function () {
    define(['app/javascripts/utilities/EnvironmentSniffer'], function (EnvironmentSniffer) {
        EnvironmentSniffer = new EnvironmentSniffer();

        describe('EnvironmentSniffer', function () {
            it('Should have `OS` property. ', function (done) {
                if (EnvironmentSniffer.OS !== undefined) {
                    done();
                } else {
                    done('Should have `OS` property. ');
                }
            });
            it('Should have `CPU_CLASS` property. ', function (done) {
                if (EnvironmentSniffer.CPU_CLASS !== undefined) {
                    done();
                } else {
                    done('Should have `CPU_CLASS` property. ');
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

                it('Should `CPU_CLASS` equals `64bit` under MacOS', function (done) {
                    if (EnvironmentSniffer.CPU_CLASS === '64bit') {
                        done();
                    } else {
                        done('Should `CPU_CLASS` equals `64bit` under MacOS. ');
                    }
                });
            }

            if (navigator.platform.indexOf('Win') >= 0) {
                it('Should `OS` equals `Windows` under Windows. ', function (done) {
                    if (EnvironmentSniffer.OS === 'Windows') {
                        done();
                    } else {
                        done('Should `OS` equals `Windows` under Windows. ');
                    }
                });

                if (navigator.userAgent.indexOf('WOW64')) {
                    it('Should `CPU_CLASS` equals `64bit` under Windows 64bit version. ', function (done) {
                        if (EnvironmentSniffer.CPU_CLASS === '64bit') {
                            done();
                        } else {
                            done('Should `CPU_CLASS` equals `64bit` under Windows 64bit version. ');
                        }
                    });
                } else {
                    it('Should `CPU_CLASS` equals `32bit` under Windows 32bit version. ', function (done) {
                        if (EnvironmentSniffer.CPU_CLASS === '32bit') {
                            done();
                        } else {
                            done('Should `CPU_CLASS` equals `32bit` under Windows 32bit version. ');
                        }
                    });
                }
            }

            if (navigator.platform.indexOf('Linux') >= 0) {
                it('Should `OS` equals `Linux` under Linux. ', function (done) {
                    if (EnvironmentSniffer.OS === 'Linux') {
                        done();
                    } else {
                        done('Should `OS` equals `Linux` under Linux. ');
                    }
                });

                if (navigator.userAgent.indexOf('Linux x86_64')) {
                    it('Should `CPU_CLASS` equals `64bit` under Linux 64bit version. ', function (done) {
                        if (EnvironmentSniffer.CPU_CLASS === '64bit') {
                            done();
                        } else {
                            done('Should `CPU_CLASS` equals `64bit` under Linux 64bit version. ');
                        }
                    });
                } else {
                    it('Should `CPU_CLASS` equals `32bit` under Linux 32bit version. ', function (done) {
                        if (EnvironmentSniffer.CPU_CLASS === '32bit') {
                            done();
                        } else {
                            done('Should `CPU_CLASS` equals `32bit` under Linux 32bit version. ');
                        }
                    });
                }
            }
        });
    });
}(this));
