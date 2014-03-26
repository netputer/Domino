'use strict';

// configurable paths
var pathConfig = {
    app : 'app',
    dist : 'dist',
    tmp : '.tmp',
    test : 'test',
    mock: 'mock'
};

var lrSnippet = require('connect-livereload')();

var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // 动态数据构造, 映射到mock文件夹
    var mockConnect = function (req, res, next) {
        grunt.log.writeln(req.url);
        // 测试数据，没有ext的暂定为服务器请求
        if (require('path').extname(req.url) === '') {

            var filePath = __dirname + '/' + pathConfig.mock + req.url + '/' + req.method;
            //var fileStr = require('fs').readFileSync( filePath , 'utf-8');

            // 删除数据缓存,以免修改后不更新
            delete require.cache[filePath];
            // 请求数据文件ç
            var fileJson = require(filePath);
            //grunt.log.writeln(fileJson);
            var fileStr  = JSON.stringify(fileJson);

            grunt.log.writeln(res.statusCode);
            grunt.log.writeln(req.method);

            if (req.method == 'PUT') {

                res.statusCode = '508';
            }
            //grunt.log.writeln(fileStr);
            res.end(fileStr);
        }
        else {

            next();
        }
    };


    grunt.initConfig({
        paths : pathConfig,
        watch : {
            compass : {
                files : ['<%= paths.app %>/compass/{,*/}*/{,*/}*.{scss,sass,png,ttf}'],
                tasks : ['compass:server']
            },
            test : {
                files : ['<%= paths.app %>/javascripts/**/*.js', '<%= paths.test %>/**/*.js'],
                tasks : ['jshint:test', 'karma:server:run'],
                options : {
                    spawn : false
                }
            },
            livereload: {
                files: [
                    '<%= paths.app %>/*.html',
                    '<%= paths.app %>/javascripts/**/*.js',
                    '<%= paths.app %>/images/**/*.*',
                    '<%= paths.tmp %>/stylesheets/**/*.css',
                    '<%= paths.tmp %>/images/**/*.*'
                ],
                options : {
                    livereload : true,
                    spawn : false
                }
            }
        },
        connect : {
            options : {
                port : 9999,
                hostname : '0.0.0.0'
            },
            server : {
                options : {
                    middleware : function (connect) {
                        return [
                            lrSnippet,
                            require('connect-modrewrite')([
                                //'^/$ /home [R]',
                                //'^/account/?.*$ /templates/account/index.html',
                                '^/(projects|utils)/?[^.]*$ /index.html [L]'
                            ]),
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, pathConfig.app)
                        ];
                    }
                }
            },
            build: {
                options : {
                    middleware : function (connect) {
                        return [
                            lrSnippet,
                            require('connect-modrewrite')([
                                //'^/$ /home [R]',
                                //'^/account/?.*$ /templates/account/index.html',
                                '^/(projects|utils)/?[^.]*$ /index.html [L]'
                            ]),
                            mountFolder(connect, pathConfig.dist),
                            mockConnect
                        ];
                    }
                }
            }
        },
        open: {
            server : {
                path : 'http://127.0.0.1:<%= connect.options.port %>',
                app : 'Google Chrome Canary'
            }
        },
        clean : {
            dist : ['<%= paths.tmp %>', '<%= paths.dist %>'],
            server : '<%= paths.tmp %>'
        },
        useminPrepare : {
            html : ['<%= paths.app %>/*.html'],
            options : {
                dest : '<%= paths.dist %>'
            }
        },
        usemin: {
            html : ['<%= paths.dist %>/*.html'],
            options : {
                dirs : ['<%= paths.dist %>']
            }
        },
        htmlmin : {
            dist : {
                files : [{
                    expand : true,
                    cwd : '<%= paths.app %>',
                    src : ['*.html'],
                    dest : '<%= paths.dist %>'
                }]
            }
        },
        copy : {
            dist : {
                files : [{
                    expand : true,
                    dot : true,
                    cwd : '<%= paths.app %>',
                    dest : '<%= paths.dist %>',
                    src : [
                        'images/**/*.{webp,gif,png,jpg,jpeg}',
                        'lib/**/*',
                        '**/*.{sh,bat}'
                    ]
                }]
            }
        },
        compass : {
            options : {
                sassDir : '<%= paths.app %>/compass/sass',
                imagesDir : '<%= paths.app %>/compass/images',
                fontsDir : '/images/fonts',
                relativeAssets : true
            },
            dist : {
                options : {
                    cssDir : '<%= paths.dist %>/stylesheets',
                    generatedImagesDir : '<%= paths.dist %>/images',
                    outputStyle : 'compressed'
                }
            },
            server : {
                options : {
                    cssDir : '<%= paths.tmp %>/stylesheets',
                    generatedImagesDir : '<%= paths.tmp %>/images',
                    debugInfo : true
                }
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= paths.dist %>/business/**/*.js',
                        '<%= paths.dist %>/stylesheets/**/*.css',
                        '<%= paths.dist %>/images/**/*.*'
                    ]
                }
            }
        },
        imagemin : {
            dist : {
                files : [{
                    expand : true,
                    cwd : '<%= paths.dist %>/images',
                    src : '**/*.{png,jpg,jpeg}',
                    dest : '<%= paths.dist %>/images'
                }]
            }
        },
        requirejs : {
            options: {
                appDir : '<%= paths.app %>/business',
                dir :　'<%= paths.dist %>/business',
                baseUrl : './',
                mainConfigFile : '<%= paths.app %>/business/RequireConfig.js',
                optimize : 'uglify',
                removeCombined: true,
                wrap: true,
                useStrict: false,
                preserveLicenseComments: true
            },
            dist : {
                options : {
                    almond : true,
                    replaceRequireScript: [
                        {
                            files: ['<%= paths.dist %>/index.html'],
                            module: 'AppLoader'
                        }
                    ],
                    modules : [{
                        name : 'AppLoader'
                    }]
                }
            }
        },
        concurrent: {
            dist : ['copy:dist', 'compass:dist']
        },
        jshint : {
            options : {
                jshintrc : '.jshintrc'
            },
            test : ['<%= paths.app %>/business/**/*.js']
        },
        karma : {
            options : {
                configFile : '<%= paths.test %>/karma.conf.js',
                browsers : ['Chrome_without_security']
            },
            server : {
                reporters : ['progress'],
                background : true
            },
            test : {
                reporters : ['progress', 'junit', 'coverage'],
                preprocessors : {
                    '<%= paths.app %>/javascripts/**/*.js' : 'coverage'
                },
                junitReporter : {
                    outputFile : '<%= paths.test %>/output/test-results.xml'
                },
                coverageReporter : {
                    type : 'html',
                    dir : '<%= paths.test %>/output/coverage/'
                },
                singleRun : true
            },
            travis : {
                browsers : ['PhantomJS'],
                reporters : ['progress'],
                singleRun : true
            }
        },
        bump : {
            options : {
                files : ['package.json', 'bower.json'],
                updateConfigs : [],
                commit : true,
                commitMessage : 'Release v%VERSION%',
                commitFiles : ['-a'],
                createTag : true,
                tagName : 'v%VERSION%',
                tagMessage : 'Version %VERSION%',
                push : false
            }
        }
    });

    grunt.registerTask('server', [
        'clean:server',
        'compass:server',
        'connect:server',
        'karma:server',
        'open',
        'watch'
    ]);

    grunt.registerTask('test', [
        'jshint:test',
        'karma:test'
    ]);

    grunt.registerTask('test:travis', [
        'jshint:test',
        'karma:travis'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'concurrent:dist',
        'requirejs:dist',
        'useminPrepare',
        'concat',
        'uglify',
        'imagemin',
        'htmlmin',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('serve:build', [
        'build',
        'connect:build:keepalive'
    ]);

};
