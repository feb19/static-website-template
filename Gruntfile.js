module.exports = function (grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
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
        src: [ 'Gruntfile.js' ]
      }
    },
    clean: [
        'styleguide'
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
        command: 'mkdir styleguide && cat assets/css/*.css assets/styleguide/kss.css > styleguide/_kss.css && kss-node assets/scss styleguide --css styleguide/_kss.css'
      }
    },
    watch: {
      sass: {
        files: ['assets/scss/*.scss'],
        tasks: ['sass']
      },
      shell: {
        files: ['assets/scss/*.scss'],
        tasks: ['clean', 'shell']
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
  grunt.registerTask('default', ['clean', 'bower:install', 'jshint', 'sass', 'shell']);
};
