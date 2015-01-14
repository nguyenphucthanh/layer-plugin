module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - built on <%= grunt.template.today("dd-mm-yyyy") %> */\n',
      views: 'source/views/',
      assets: 'source/assets/',
      build: 'public/',
      reports: 'reports/'
    },
    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: [{
          expand: true,
          cwd: '<%= meta.views %>',
          src: ['*.jade'],
          dest: '<%= meta.build %>',
          ext: '.html'
        }]
      }
    },
    less: {
      build: {
        options: {
          compress: false
        },
        files: [{
          '<%= meta.build %>css/style.css': '<%= meta.assets %>css/style.less',
          '<%= meta.build %>css/ie.css': '<%= meta.assets %>css/ie.less',
          '<%= meta.build %>css/print.css': '<%= meta.assets %>css/print.less'
        }]
      }
    },
    concat: {
      dist: {
        files: [{
          '<%= meta.build %>js/modernizr.js': '<%= meta.assets %>js/libs/modernizr.2.8.3.js',
          '<%= meta.build %>js/libs.js': ['<%= meta.assets %>js/libs/jquery-1.11.2.js', '<%= meta.assets %>js/libs/plugins/*.js'],
          '<%= meta.build %>js/l10n.js': '<%= meta.assets %>js/l10n.js',
          '<%= meta.build %>js/script.js': ['<%= meta.assets %>js/site.js', '<%= meta.assets %>js/plugins/*.js']
        }]
      }
    },
    copy: {
      data: {
        files: [{
          expand: true,
          cwd: '<%= meta.views %>data/',
          src: '**/*',
          dest: '<%= meta.build %>data/'
        }]
      },
      images: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>images/',
          src: '**/*',
          dest: '<%= meta.build %>images/'
        }]
      },
      icons: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>icons/',
          src: '**/*',
          dest: '<%= meta.build %>'
        }]
      },
      video: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>video/',
          src: '**/*',
          dest: '<%= meta.build %>video/'
        }]
      },
      audio: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>audio/',
          src: '**/*',
          dest: '<%= meta.build %>audio/'
        }]
      },
      xml: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>xml/',
          src: '**/*',
          dest: '<%= meta.build %>xml/'
        }]
      },
      fonts: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>fonts/',
          src: '**/*',
          dest: '<%= meta.build %>fonts/'
        }]
      },
      htaccess: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>htaccess/',
          src: '.htaccess',
          dest: '<%= meta.build %>'
        }]
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: ['<%= meta.assets %>js/plugins/*.js', '<%= meta.assets %>js/*.js']
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      files: ['<%= meta.build %>css/*.css']
    },
    htmlhint: {
      options: {
        htmlhintrc: '.htmlhintrc'
      },
      files: ['<%= meta.build %>*.html']
    },
    watch: {   
      options: {
        spawn: false,
        interrupt: true
      },
      js: {
        files: ['<%= meta.assets %>js/plugins/*.js', '<%= meta.assets %>js/*.js'],
        tasks: ['jshint', 'concat']
      },
      jade: {
        files: ['<%= meta.views %>**/*.jade'],
        tasks: ['jade', 'htmlhint']
      },
      data: {
        files: ['<%= meta.views %>data/**/*.*'],
        tasks: ['copy:data']
      },
      less: {
        files: ['<%= meta.assets %>css/**/*.less'],
        tasks: ['less', 'autoprefixer', 'csslint']
      },
      fonts: {
        files: ['<%= meta.assets %>fonts/**/*'],
        tasks: ['copy:fonts']
      },
      images: {
        files: ['<%= meta.assets %>images/**/*'],
        tasks: ['copy:images']
      },
      videos: {
        files: ['<%= meta.assets %>videos/**/*'],
        tasks: ['copy:videos']
      },
      xml: {
        files: ['<%= meta.assets %>xml/**/*'],
        tasks: ['copy:xml']
      }
    },
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3,
          progressive: true
        },
        files: [{
          expand: true,
          cwd: '<%= meta.build %>images/',
          src: '**/*.{png,jpg,gif}',
          dest: '<%= meta.build %>images/'
        }]
      }
    },
    cssmin: {
      options: {
        banner: '<%= meta.banner %>',
        keepSpecialComments: false,
        compatibility: 'ie8'
      },
      compress: {
        files: [{
          '<%= meta.build %>css/style.css': '<%= meta.build %>css/style.css',
          '<%= meta.build %>css/ie.css': '<%= meta.build %>css/ie.css',
          '<%= meta.build %>css/print.css': '<%= meta.build %>css/print.css'
        }]
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>',
        compress: true,
        beautify: false,
        preserveComments: false
      },
      dist: {
        files: [{
          '<%= meta.build %>js/modernizr.js': '<%= meta.assets %>js/libs/modernizr.2.8.3.js',
          '<%= meta.build %>js/libs.js': ['<%= meta.assets %>js/libs/jquery-1.11.2.js', '<%= meta.assets %>js/libs/plugins/*.js'],
          '<%= meta.build %>js/l10n.js': '<%= meta.assets %>js/l10n.js',
          '<%= meta.build %>js/script.js': ['<%= meta.assets %>js/site.js', '<%= meta.assets %>js/plugins/*.js']
        }]
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 3 versions']
      },
      files: {
        expand: true,
        src: '<%= meta.build %>css/*.css'
      }
    },  
    nodemon: {
      dev: {
        script: 'source/server.js'
      }
    },
    concurrent: {
      options: {
        limit: 3
      },
      dev: {
        tasks: ['nodemon:dev', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    qunit: {
      options: {
        timeout: 10000,
        '--cookies-file': 'test/cookies.txt'
      },
      all: {
        options: {
          urls: [
            'http://localhost:8000/test/test.html'
          ]
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: '.'
        }
      }
    },
    clean: {
      build: ['public']
    }
  });
  grunt.file.expand('./node_modules/grunt-*/tasks').forEach(grunt.loadTasks);
  require('time-grunt')(grunt);
  grunt.registerTask('build', ['clean', 'concat', 'less', 'jade', 'copy', 'autoprefixer', 'htmlhint', 'jshint', 'csslint']);
  grunt.registerTask('default', ['build', 'concurrent:dev']);
  grunt.registerTask('test', ['connect:server', 'qunit']);
  grunt.registerTask('release', ['build', 'test', 'imagemin', 'uglify', 'cssmin']);
};
