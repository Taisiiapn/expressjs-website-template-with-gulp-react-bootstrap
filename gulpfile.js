var gulp = require('gulp');
var path = require('path');
var util = require('util');

/*
  DEFAULT PATHS
*/

var gpath = {
  REACT: path.join(__dirname, 'src/react/'),
  DEST_BUILD_REACT: path.join(__dirname, 'public/build/react'),
  DEST_BUILD_THIRD: path.join(__dirname, 'public/build/third')
}

/*
  DEBUG FLAGS
*/

var isDebug = true;

gulp.task('debug-false', function() {
  isDebug = false;
});

gulp.task('debug-true', function() {
  isDebug = true;
});

/*
  CLEAN build directories
*/

var del = require('del');

gulp.task('clean', function() {
  del([
      'public/build/**'
    ]);
});

/*
  BOWER
*/

var bower = require('gulp-bower');

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('public/third/'))
});

/*
  VENDORS
*/

var concat = require('gulp-concat');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify'); // js compress
var minifyCSS = require('gulp-minify-css'); // css compress

var vendors = [
        { type: 'js', path: './public/third/jquery/dist/jquery.js', varBrowserify: 'jquery', requireBrowserify: 'window.$' },
        { type: 'js', path: './public/third/bootstrap/dist/js/bootstrap.js' },
        { type: 'js', path: './public/third/bootstrap-dialog/dist/js/bootstrap-dialog.js', varBrowserify: 'BootstrapDialog', requireBrowserify: 'window.BootstrapDialog' },
        { type: 'js', path: './public/third/react/react.js', varBrowserify: 'react', requireBrowserify: 'window.React' },
        // or REACT-ADDONS: 'bower_components/react/react-with-addons.js',
        { type: 'js', path: './public/third/react-bootstrap/react-bootstrap.js', varBrowserify: 'ReactBootstrap', requireBrowserify: 'window.ReactBootstrap' },
        { type: 'js', path: './public/third/lodash/lodash.js', varBrowserify: 'lodash', requireBrowserify: 'window._' },
        { type: 'js', path: './public/third/moment/moment.js', varBrowserify: 'moment', requireBrowserify: 'window.moment' },
        { type: 'js', path: './public/third/numeraljs/numeral.js', varBrowserify: 'numeral', requireBrowserify: 'window.numeral' },
        { type: 'js', path: './public/third/validator-js/validator.js', varBrowserify: 'validator', requireBrowserify: 'window.validator' },
        { type: 'js', path: './public/common/common.js', varBrowserify: 'appCommon', requireBrowserify: 'window.appCommon' },
        { type: 'css', path: './public/third/bootstrap/dist/css/bootstrap.css' },
        { type: 'css', path: './public/third/bootstrap-dialog/dist/css/bootstrap-dialog.css' },
        { type: 'css', path: './public/third/font-awesome/css/font-awesome.css' }
      ];

gulp.task('vendors-js', function() {

  arrVendorsJS = [];

  for (var i = 0; i < vendors.length; i++) {
    if (vendors[i].path !== undefined && vendors[i].path !== null && vendors[i].path.length > 0) {
      if (vendors[i].type === 'js') {
        arrVendorsJS.push(vendors[i].path);
      }
    }
  }

  if (arrVendorsJS.length > 0) {

    if (!isDebug) {
      return gulp.src(arrVendorsJS)
            .pipe(concat('vendors.js'))
            .pipe(streamify(uglify()))
            .pipe(gulp.dest('./public/build/third'));
    } else {
      return gulp.src(arrVendorsJS)
            .pipe(concat('vendors.js'))
            .pipe(gulp.dest('./public/build/third'));
    }
  }
});

gulp.task('vendors-css', function() {

  arrVendorsCSS = [];
  arrVendorsJS = [];

  for (var i = 0; i < vendors.length; i++) {
    if (vendors[i].path !== undefined && vendors[i].path !== null && vendors[i].path.length > 0) {
      if (vendors[i].type === 'css') {
        arrVendorsCSS.push(vendors[i].path);
      }
    }
  }

  if (arrVendorsCSS.length > 0) {
    if (!isDebug) {
      return gulp.src(arrVendorsCSS)
            .pipe(concat('vendors.css'))
            .pipe(streamify(minifyCSS()))
            .pipe(gulp.dest('./public/build/third'));
    } else {
      return gulp.src(arrVendorsCSS)
            .pipe(concat('vendors.css'))
            .pipe(gulp.dest('./public/build/third'));
    }
  }
});

/*
  BROWSERIFYING REACT
*/

var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');

// The REACT core bundle
gulp.task('browserify-react', function() {

  if (!isDebug) {
    return browserify({
      debug: isDebug
    })
    .require('react')
    .bundle()
    .pipe(source('react.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(gpath.DEST_BUILD_THIRD));
  } else {
    return browserify({
      debug: isDebug
    })
    .require('react')
    .bundle()
    .pipe(source('react.js'))
    .pipe(gulp.dest(gpath.DEST_BUILD_THIRD));
  }
});

// The APPS using REACT
var glob = require('glob');
var literalify = require('literalify');
var async = require('async');

// the main react app builder
function buildReactApp(pathFile, cb) {

  if (pathFile.length > 0) {

    var objVendorsREACT = {};

    for (var i = 0; i < vendors.length; i++) {
      if ((vendors[i].varBrowserify !== undefined && vendors[i].varBrowserify !== null && vendors[i].varBrowserify.length > 0)
        && (vendors[i].requireBrowserify !== undefined && vendors[i].requireBrowserify !== null && vendors[i].requireBrowserify.length > 0)) {
          objVendorsREACT[vendors[i]] = vendors[i].requireBrowserify;
      }
    }

    var fileName = path.basename(pathFile);

    var appBundler = browserify({
        entries: pathFile,
        transform: [reactify, literalify.configure(objVendorsREACT)],
        debug: isDebug,
        cache: {}, packageCache: {}, fullPaths: true
      });

    console.log(util.format('building react file "%s"', fileName));

    if (!isDebug) {
      appBundler
        .bundle()
        .pipe(source(fileName))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest(gpath.DEST_BUILD_REACT));
    } else {
      appBundler
        .bundle()
        .pipe(source(fileName))
        .pipe(gulp.dest(gpath.DEST_BUILD_REACT));
    }
  }
  cb();
};

gulp.task('browserify-react-apps', function(cb) {
  // get the list of top-level react files
  var arrReactAppFiles = glob.sync(path.join(gpath.REACT, '*.js'));
  // run each task individually
  async.each(arrReactAppFiles, buildReactApp, cb);
});

/*
  WATCH
*/

gulp.task('watch', function() {
    //gulp.watch('app/dist/js/*.js', ['js']);
    //gulp.watch('app/index.html', ['html']);
    gulp.watch('public/third/**/*.js', ['vendors-js']);
    gulp.watch('public/third/**/*.css', ['vendors-css']);
    gulp.watch('public/common/**/*.js', ['vendors-js']);
    gulp.watch('public/common/**/*.css', ['vendors-css']);
    gulp.watch('node_modules/react/**/*.js', ['browserify-react']);
    gulp.watch(path.join(gpath.REACT, '/**/*.js'), ['browserify-react-apps']);
});

/*
  START SERVER
*/

var nodemon = require('gulp-nodemon');

gulp.task('start-server', function () {
  nodemon({ script: 'src/server.js', ext: 'html js', ignore: ['./public/build/**'] })
    //.on('change', ['lint'])
    .on('restart', function () {
      console.log('Starting server at ' + new Date().toLocaleString())
    })
})

/*
  RUN SEQUENCES
*/

// https://github.com/OverZealous/run-sequence
// In order to get tasks to run in the correct order synchronously, we need to "return" the final function within a gulp task sequence.
// For this reason, some of the code above is duplicated only because I didn't have a clean synchronous means to chain methods correctly.
// ...but it works.
var runSequence = require('run-sequence');

function finishedRunSequence() {
  console.log("Gulp finished with all tasks.")
};

gulp.task('default', function(callback) {
  runSequence('clean',
              'bower',
              finishedRunSequence);
});

gulp.task('dev-build', function(callback) {
  runSequence(['clean', 'debug-true'],
              ['vendors-js', 'vendors-css', 'browserify-react', 'browserify-react-apps'],
              finishedRunSequence);
});

gulp.task('prod-build', function(callback) {
  runSequence(['clean', 'debug-false'],
              ['vendors-js', 'vendors-css', 'browserify-react', 'browserify-react-apps'],
              finishedRunSequence);
});

gulp.task('dev-server', function(callback) {
  runSequence(['clean', 'debug-true'],
              ['vendors-js', 'vendors-css', 'browserify-react', 'browserify-react-apps'],
              'watch',
              'start-server',
              finishedRunSequence);
});

gulp.task('prod-server', function(callback) {
  runSequence(['clean', 'debug-false'],
              ['vendors-js', 'vendors-css', 'browserify-react', 'browserify-react-apps'],
              'watch',
              'start-server',
              finishedRunSequence);
});
