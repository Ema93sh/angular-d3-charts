module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'build/chart.js',
        dest: 'build/chart.min.js'
      }
    },
    ngtemplates:  {
      chart:  {
        cwd: 'src/partials',
        src: '*.html',
        dest: 'build/app.templates.js',
        options: {
          module: 'ui.chart',
        }
      }
    },
    concat: {
      js:  {
        src:  ['src/js/main.js', 'src/js/barChart.js', 'src/js/pieChart.js', '<%= ngtemplates.chart.dest %>'],
        dest: 'build/chart.js',
      },
      css: {
        src: ['src/css/*.css'],
        dest: 'build/chart.css',
      }
    },
    karma: {
      debug: {
        configFile: 'test/karma.conf.js',
        autoWatch: true,
      },
      test: {
        configFile: 'test/karma.conf.js',      
        singleRun: true,
      }
    },
    clean: {
      templates: {
        src: ["<%= ngtemplates.chart.dest %>"]
      }
    },
    watch: {
      scripts: {
        files: ['src/**/*.*'],
        tasks: ['build'],
        options: {
          spawn: false,
        },
      },
      css: {
        files: ['**/*.css'],
        tasks: ['karma:test'],
        options: {
          spawn: false,
        },
      }
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('build', ['karma:test', 'ngtemplates', 'concat', 'uglify', 'clean']);
  grunt.registerTask('test', ['karma:test']);
};