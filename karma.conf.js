// Karma configuration

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',

    // testing frameworks to use
    frameworks: ['mocha', 'chai', 'sinon'],

    // list of files / patterns to load in the browser. order matters!
    files: [
      // angular source
      'lib/ionic/js/ionic.bundle.js'

      // our app code
      'www/controllers.js',
      'www/app/**/*.js',

      // our spec files - in order of the README
      'specs/www/controllerSpec.js',
    ],

    // test results reporter to use
    reporters: ['nyan', 'unicorn'],

    // start these browsers. PhantomJS will load up in the background
    browsers: ['PhantomJS'],

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // if true, Karma exits after running the tests.
    singleRun: true

  });
};
