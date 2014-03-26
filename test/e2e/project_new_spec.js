/* global describe,beforeEach,browser,it,expect,element,by,driver, protractor */

describe('projects/new', function () {
    'use strict';

    //browser.debugger();
    function hintFun(input, wrap, hint, error, hintMsg) {
        expect(hint.getText()).toEqual(hintMsg);
        expect(hint.isDisplayed()).toBe(true);
        expect(error.isPresent()).toBe(false);
    }

    // blan error
    function blank(input, wrap, hint, error, errorMsg) {

        input.sendKeys(111);
        input.clear();
        input.sendKeys(' ').then(function () {
            expect(wrap.getAttribute('class')).toMatch('has-error');
            expect(error.getText()).toEqual(errorMsg);
            expect(hint.isDisplayed()).toBe(false);
        });

    }

    // valid
    function valid(text, input, wrap, hint, error) {
        input.clear();
        input.sendKeys(text).then(function () {
            expect(wrap.getAttribute('class')).not.toMatch('has-error');
            expect(error.isPresent()).toBe(false);
            expect(hint.isDisplayed()).toBe(true);
        });
    }

    // invalid
    function invalid(text, input, wrap, hint, error, errorMsg) {
        input.clear();
        input.sendKeys(text).then(function () {
            expect(wrap.getAttribute('class')).toMatch('has-error');
            expect(error.isPresent()).toBe(true);
            expect(error.getText()).toEqual(errorMsg);
            expect(hint.isDisplayed()).toBe(false);
        });
    }



    // open new page
    browser.get('/projects/new?e2e');

    describe('title', function () {
        var input, wrap, hint, error;

        //beforeEach(function () {
        input = element(by.model('project.title'));
        wrap  = element(by.css('#projectTitleWrap'));
        hint  = wrap.element(by.css('span[for=projectTitle] .form-hint'));
        error = wrap.element(by.repeater('errorMsg in errorMsgs').row(0));
        //});

        it('hint', function () {

            hintFun(input, wrap, hint, error, 'ex.Domino');
        });

        it('input blank error', function () {
        
            blank(input, wrap, hint, error, 'Not allow blank');
        });

        it('input text correct', function () {

            valid('project one', input, wrap, hint, error);
        });

    });

    describe('url', function () {
        var input, wrap, hint, error;

        //beforeEach(function () {
        input = element(by.model('project.url'));
        wrap  = element(by.css('#projectUrlWrap'));
        hint  = wrap.element(by.css('span[for=gitUrl] .form-hint'));
        error = wrap.element(by.repeater('errorMsg in errorMsgs'));
        //});

        it('hint', function () {

            hintFun(input, wrap, hint, error, 'ex. https://github.com/wandoulab.git');
        });

        it('input blank error', function () {
            
            blank(input, wrap, hint, error, 'Not allow blank');
        });

        describe('input validate', function () {
            
            it('www.wandoulab.com', function () {
                invalid('www.wandoulab.com', input, wrap, hint, error, 'Not a url');
            });

            it('http://www.wandoulab.com', function () {
                valid('http://www.wandoulab.com', input, wrap, hint, error);
            });
        });

    });

    describe('stagingServers', function () {
        var input, wrap, hint, error;

        //beforeEach(function () {
        input = element(by.model('project.stagingServers'));
        wrap  = element(by.css('#stagingServersWrap'));
        hint  = wrap.element(by.css('span[for=stagingServers] .form-hint'));
        error = wrap.element(by.repeater('errorMsg in errorMsgs').row(0));
        //});

        it('hint', function () {

            hintFun(input, wrap, hint, error, 'ex. 127.0.0.1 | tc00.xx.xxx');
        });

        it('input blank error', function () {

            blank(input, wrap, hint, error, 'Not allow blank');
        });

        describe('input validate', function () {

            //text, input, wrap, hint, error
            it('111', function () {
                invalid('111', input, wrap, hint, error,  'Input is not invalid');
            });
            
            it('|111.222.333', function () {
                invalid('|111.222.333', input, wrap, hint, error,  'Input is not invalid');
            });

            it('111.222.333', function () {
                valid('111.222.333', input, wrap, hint, error);
            });

            it('111.222.333|333.444.555', function () {
                valid('111.222.333|333.444.555', input, wrap, hint, error);
            });
        });
    });

    describe('productionServers', function () {
        var input, wrap, hint, error;

        //beforeEach(function () {
        input = element(by.model('project.productionServers'));
        wrap  = element(by.css('#productionServersWrap'));
        hint  = wrap.element(by.css('span[for=productionServers] .form-hint'));
        error = wrap.element(by.repeater('errorMsg in errorMsgs').row(0));
        //});

        it('hint', function () {

            hintFun(input, wrap, hint, error, 'ex. 127.0.0.1 | tc00.xx.xxx');
        });

        it('input blank error', function () {

            blank(input, wrap, hint, error, 'Not allow blank');
        });

        describe('input validate', function () {

            //text, input, wrap, hint, error
            it('111', function () {
                invalid('111', input, wrap, hint, error, 'Input is not invalid');
            });
            
            it('|111.222.333', function () {
                invalid('|111.222.333', input, wrap, hint, error, 'Input is not invalid');
            });

            it('111.222.333', function () {
                valid('111.222.333', input, wrap, hint, error);
            });

            it('111.222.333|333.444.555', function () {
                valid('111.222.333|333.444.555', input, wrap, hint, error);
            });
        });
    });

    describe('submit', function () {
        it('invalid submit', function () {
            var submitBtn = element(by.css('button[type=submit]'));

            submitBtn.click();

            browser.getCurrentUrl().then(function (url) {
                
                expect(url).toEqual(browser.baseUrl + '/projects?e2e');
            });
        });
    });
});