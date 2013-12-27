module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        compass: {
            dist: {
                options: {
                }
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: './lib',
                    layout: 'byType',
                    install: true,
                    verbose: false,
                    cleanTargetDir: true,
                    cleanBowerDir: false
                }
            }
        },
        jshint: {
            options: {
                node: true
            },
            files: {
                src: [ 'Gruntfile.js', 'assets/js/*.js' ]
            }
        },
        clean: [
            'styleguide',
            'release'
        ],
        sass: {
            compile: {
                expand: true,
                flatten: true,
                src: ['assets/scss/*.scss'],
                dest: 'assets/css',
                ext: '.css'
            }
        },
        shell: {
            styleguide: {
                command: 'mkdir styleguide; cat assets/css/*.css assets/styleguide/kss.css > styleguide/_kss.css; kss-node assets/scss styleguide --css styleguide/_kss.css'
            }
        },
        pngmin: {
            compile: {
                options: {
                    ext: '.png',
                    force: true
                },
                files: [{
                    src: 'assets/img/*.png',
                    dest: 'release/image/'
                }]
            }
        },
        cssmin: {
            combine: {
                files: {
                    'release/css/style.min.css': ['assets/css/*.css']
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'release/js/script.min.js': ['assets/js/*.js']
                }
            }
        },
        jade: {
            release: {
                options: {
                    data: {
                        debug: false
                    }
                },
                files: {
                    "release/index.html": "jade/*.jade"
                }
            }
        },
        watch: {
            jade: {
                files: ['jade/*.jade'],
                tasks: ['jade']
            },
            sass: {
                files: ['assets/scss/*.scss'],
                tasks: ['sass', 'cssmin']
            },
            js: {
                files: ['assets/js/*.js'],
                tasks: ['uglify']
            }
        }
    });
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-styleguide');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-compass');
    grunt.loadNpmTasks('grunt-pngmin');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['clean', 'bower:install', 'jshint', 'jade', 'sass', 'shell', 'cssmin', 'uglify']);
};
