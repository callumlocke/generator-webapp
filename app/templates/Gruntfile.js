/*jshint indent:4 */

// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

<% if (includeModernizr) { %>
var modernizrConf = require('./modernizr.json');
<% } %>

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({

        // Project settings
        yeoman: {
            app: 'app',
            dist: 'dist'
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['<%%= yeoman.app %>/scripts/{,*/}*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            compass: {
                files: ['<%%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass:server', 'autoprefixer']
            },
            styles: {
                files: ['<%%= yeoman.app %>/styles/{,*/}*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            },<% if (includeHandlebars) { %>
            templates: {
                files: ['<%%= yeoman.app %>/templates/{,*/}*.hbs'],
                tasks: ['templates']
            },<% } %>
            livereload: {
                options: {
                    livereload: '<%%= connect.options.livereload %>'
                },
                files: [
                    ['<%%= yeoman.app %>/*.html'<% if (includePublisher) { %>, '!<%%= yeoman.app %>/publish.html'<% } %>],
                    '.tmp/styles/{,*/}*.css',
                    '.tmp/scripts/{,*/}*.js',
                    '<%%= yeoman.app %>/images/{,*/}*'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                hostname: '0.0.0.0'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%%= yeoman.app %>'
                    ]
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                        '.tmp',
                        'test',
                        '<%%= yeoman.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%%= yeoman.dist %>',
                    livereload: false
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%%= yeoman.dist %>/*',
                        '!<%%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            upload: '.tmp/.upload',
            server: '.tmp'
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%%= yeoman.app %>/scripts/vendor/*'
            ]
        },

<% if (testFramework === 'mocha') { %>
        // Mocha testing framework configuration options
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://<%%= connect.test.options.hostname %>:<%%= connect.test.options.port %>/index.html']
                }
            }
        },<% } else if (testFramework === 'jasmine') { %>
        jasmine: {
            all: {
                options: {
                    specs: 'test/spec/{,*/}*.js'
                }
            }
        },<% } %>
        compass: {
            options: {
                sassDir: '<%%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%%= yeoman.app %>/images',
                javascriptsDir: '<%%= yeoman.app %>/scripts',
                fontsDir: '<%%= yeoman.app %>/styles/fonts',
                importPath: '<%%= yeoman.app %>/bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false,
                assetCacheBuster: false
            },
            dist: {
                options: {
                    generatedImagesDir: '<%%= yeoman.dist %>/images/generated'
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the HTML file
        'bower-install': {
            app: {
                html: '<%%= yeoman.app %>/index.html',
                ignorePath: '<%%= yeoman.app %>/'
            }
        },

<% if (includeHandlebars) { %>
        concat: {
            handlebars: {
                src: [
                    'node_modules/grunt-contrib-handlebars/node_modules/handlebars/dist/handlebars.runtime.js',
                    '.tmp/jst/{,*/}*.js'
                ],
                dest: '.tmp/scripts/templates.js'
            }
        },

<% } %>
        uglify: {
            options: {
                preserveComments: 'some'
            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%%= yeoman.dist %>/styles/{,*/}*.css',
                        ['<%%= yeoman.dist %>/images/**/*', '!<%%= yeoman.dist %>/images/content/**/*'],
                        '<%%= yeoman.dist %>/styles/fonts/**/*.{eot,woff,ttf}'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%%= yeoman.dist %>'
            },
            html: ['<%%= yeoman.app %>/index.html'<% if (includePublisher) { %>,'<%%= yeoman.app %>/publish.html'<% } %>]
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                dirs: ['<%%= yeoman.dist %>']
            },
            html: ['<%%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%%= yeoman.dist %>/styles/{,*/}*.css']
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/images',
                    src: '**/*.{gif,jpeg,jpg,png}',
                    dest: '<%%= yeoman.dist %>/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            // This task is pre-configured if you do not wish to use Usemin
            // blocks for your CSS. By default, the Usemin block from your
            // `index.html` will take care of minification, e.g.
            //
            //     <!-- build:css({.tmp,app}) styles/main.css -->
            //
            // dist: {
            //     files: {
            //         '<%%= yeoman.dist %>/styles/main.css': [
            //             '.tmp/styles/{,*/}*.css',
            //             '<%%= yeoman.app %>/styles/{,*/}*.css'
            //         ]
            //     }
            // }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: false,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.dist %>',
                    src: '{,*/}*.html',
                    dest: '<%%= yeoman.dist %>'
                }]
            }
        },
        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%%= yeoman.app %>',
                    dest: '<%%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/**/*.{webp,gif}',
                        '{,*/}*.html',
                        'styles/fonts/**/*.{eot,woff,ttf}'
                    ]
                }]
            },
            upload: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.dist %>',
                    src: ['**/*'],
                    dest: '.tmp/.upload'
                }],
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },<% if (includeHandlebars) { %>
        handlebars: {
            dist: {
                files: {
                    '.tmp/jst/handlebars.js': ['<%%= yeoman.app %>/templates/{,*/}*.hbs']
                },
                options: {
                    namespace: 'JST',
                    partialsUseNamespace: true,
                    processContent: function(content) {
                        content = content.replace(/^[\x20\t]+/mg, '').replace(/[\x20\t]+$/mg, '');
                        content = content.replace(/^[\r\n]+/, '').replace(/[\r\n]*$/, '');
                        return content;
                    },
                    processAST: function(ast) {
                        return ast;
                    },
                    processName: function(filePath) {
                        var pieces = filePath.split('/');
                        return pieces[pieces.length - 1].replace(/\..*$/, '').replace(/\ /g, '_');
                    },
                    processPartialName: function(filePath) {
                        var pieces = filePath.split('/');
                        return pieces[pieces.length - 1].replace(/\..*$/, '').replace(/\ /g, '_').replace(/^_+/, '');
                    }
                }
            }
        },<% } %>
        igdeploy: {
            options: {
                src: '.tmp/.upload',
                server: 'ftlnx109-lviw-uk-p.osb.ft.com',
                baseURL: 'http://www.ft.com/ig/',
                targetRoot: '/var/opt/customer/apps/interactive.ftdata.co.uk/var/www/html',
                targets: {
                    demo: '<%= deployBase %>/demo',
                    live: '<%= deployBase %>/live'
                }
            }
        },
        open: {
            demo: {
                path: '<%%= igdeploy.options.baseURL %><%%= igdeploy.options.targets.demo %>/'
            },
            live: {
                path: '<%%= igdeploy.options.baseURL %><%%= igdeploy.options.targets.live %>/'
            }
        },<% if (includeModernizr) { %>
        modernizr: {
            parseFiles: false,
            outputFile: '.tmp/scripts/vendor/modernizr.js',
            uglify: false,
            extra: modernizrConf.extra,
            extensibility : modernizrConf.extensibility,
            tests: modernizrConf.tests,
        },<% } %>
        embed: {
            options: {
                threshold: '7KB'
            },
            dist: {
                files: {
                    '<%%= yeoman.dist %>/index.html': '<%%= yeoman.dist %>/index.html'
                }
            }
        },
        report: {
            demo: {
                url: '<%%= igdeploy.options.baseURL %><%%= igdeploy.options.targets.demo %>/'
            },
            live: {
                url: '<%%= igdeploy.options.baseURL %><%%= igdeploy.options.targets.live %>/'
            }
        },
        cdnify: {
            demo: {
                files: [{
                    expand: true,
                    cwd: '.tmp/.upload',
                    src: '**/*.{css,html}',
                    dest: '.tmp/.upload'
                }],
                options: {
                    base: '//interactivegraphics.ft-static.com/<%%= igdeploy.options.targets.demo %>/'
                }
            },
            live: {
                files: [{
                    expand: true,
                    cwd: '.tmp/.upload',
                    src: '**/*.{css,html}',
                    dest: '.tmp/.upload'
                }],
                options: {
                    base: '//interactivegraphics.ft-static.com/<%%= igdeploy.options.targets.live %>/'
                }
            }
        },
        concurrent: {
            server: [<% if (includeHandlebars) { %>
                'templates',<% } %><% if (includeModernizr) { %>
                //'modernizr',<% } %>
                'compass:server',
                'copy:styles'
            ],
            test: [<% if (includeHandlebars) { %>
                'templates',<% } %>
                'copy:styles'
            ],
            dist: [<% if (includeHandlebars) { %>
                'templates',<% } %><% if (includeModernizr) { %>
                //'modernizr',<% } %>
                'compass',
                'copy:styles',
                'imagemin',
                'svgmin'
            ]
        }
    });


    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });
    
    // short alias for server
    grunt.registerTask('s', 'serve');

    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run([target ? ('serve:' + target) : 'serve']);
    });

    <% if (includeHandlebars) { %>grunt.registerTask('templates', [
        'handlebars',
        'concat:handlebars'
    ]);<% } %>

    grunt.registerTask('test', function (target) {
        if (target !== 'watch') {
            grunt.task.run([
                'clean:server',
                'concurrent:test',
                'autoprefixer'
            ]);
        }

        grunt.task.run([
            'connect:test',<% if (testFramework === 'mocha') { %>
            'mocha'<% } else if (testFramework === 'jasmine') { %>
            'jasmine'<% } %>
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'rev',
        'usemin',
        'htmlmin'//,
        // 'embed:dist'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
    //    'test',
        'build'
    ]);

    grunt.registerTask('deploy', function (target) {
        if (!grunt.file.isDir('dist')) {
            grunt.fail.fatal('Couldn\'t find "dist" - please build before deploying!');
            return;
        }

        if (grunt.option('force')) {
            grunt.fail.fatal('You cannot use the force flag to deploy');
            return;
        }

        if (!target) {
            grunt.fail.fatal('You must define a deploy target. Choose one of the following:\n\tgrunt deploy:demo\n\tgrunt deploy:live');
            return;
        }

        grunt.task.run([
            'clean:upload',
            'copy:upload',
            'cdnify:' + target,
            'igdeploy:' + target,
            'report:' + target,
            'open:' + target
        ]);
    });
};
