'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var port = grunt.option('port') || 8000;
  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner:
        '/*!\n' +
        ' * DevOpsOSSAzureDays presentation <%= pkg.version %>' +
        ' (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)\n' +
        ' * http://github.com/JJ/devops-days\n' +
        ' * Apache licensed\n' +
        ' *\n' +
        ' * Copyright (C) 2015 Hakim El Hattab, http://hakim.se\n' +
        ' * Copyright (C) 2015 JJ Merelo, http://jj.github.io' +
        ' (nuevo contenido)\n' +
        ' */'
    },

    qunit: {
      files: [ 'test/*.html' ]
    },

    sass: {
      core: {
        files: {
          'css/reveal.css': 'css/reveal.scss',
        }
      },
      themes: {
        files: {
          'css/theme/black.css': 'css/theme/source/black.scss',
          'css/theme/white.css': 'css/theme/source/white.scss',
          'css/theme/league.css': 'css/theme/source/league.scss',
          'css/theme/beige.css': 'css/theme/source/beige.scss',
          'css/theme/night.css': 'css/theme/source/night.scss',
          'css/theme/serif.css': 'css/theme/source/serif.scss',
          'css/theme/simple.css': 'css/theme/source/simple.scss',
          'css/theme/sky.css': 'css/theme/source/sky.scss',
          'css/theme/moon.css': 'css/theme/source/moon.scss',
          'css/theme/solarized.css': 'css/theme/source/solarized.scss',
          'css/theme/blood.css': 'css/theme/source/blood.scss'
        }
      }
    },

    autoprefixer: {
      dist: {
          src: 'css/reveal.css'
      }
    },

    cssmin: {
      compress: {
        files: {
            'css/reveal.min.css': [ 'css/reveal.css' ]
        }
      }
    },

    jshint: {
      options: {
        curly: false,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        eqnull: true,
        browser: true,
        expr: true,
        globals: {
            head: false,
            module: false,
            console: false,
            unescape: false,
            define: false,
            exports: false
        }
      },
      files: [ 'Gruntfile.js', 'js/reveal.js' ]
    },
    connect: {
      server: {
        options: {
          port: port,
          base: '.',
          livereload: true,
          open: true
        }
      }
    },

    zip: {
      'reveal-js-presentation.zip': [
        'index.html',
        'css/**',
        'js/**',
        'lib/**',
        'images/**',
        'plugin/**'
      ]
    },

    watch: {
      options: {
        livereload: true
      },
      js: {
        files: [ 'Gruntfile.js', 'js/reveal.js' ],
        tasks: 'js'
      },
      theme: {
        files: [ 'css/theme/source/*.scss', 'css/theme/template/*.scss' ],
        tasks: 'css-themes'
      },
      css: {
        files: [ 'css/reveal.scss' ],
        tasks: 'css-core'
      },
      html: {
        files: [ 'index.html']
      }
    },
    shell: {
      options: {
        stderr: false
      },
      target: {
        command: 'ls'
      }
    }

  });

  // Default task
  grunt.registerTask( 'default', [ 'css', 'js' ] );

  // Theme CSS
  grunt.registerTask( 'css-themes', [ 'sass:themes' ] );

  // Core framework CSS
  grunt.registerTask( 'css-core', [ 'sass:core', 'autoprefixer', 'cssmin' ] );

  // All CSS
  grunt.registerTask( 'css', [ 'sass', 'autoprefixer', 'cssmin' ] );

  // Package presentation to archive
  grunt.registerTask( 'package', [ 'default', 'zip' ] );

  // Serve presentation locally
  grunt.registerTask( 'serve', [ 'connect', 'watch' ] );

  // Run tests
  grunt.registerTask( 'test', [ 'jshint', 'qunit' ] );

  // Run vm
  grunt.registerTask( 'vm', [ 'shell' ] );

};
