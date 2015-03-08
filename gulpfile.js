var gulp = require('gulp');
var bower = require('gulp-bower');

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('public/third/'))
});

gulp.task('default', ['bower']);

var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');

/*
var path = {
  HTML: 'src/index.html',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  DEST: 'dist',
  DEST_BUILD: 'dist/build',
  DEST_SRC: 'dist/src',
  ENTRY_POINT: './src/js/App.js'
};
*/

var path = require('path');

var gpath = {
	REACT: 'src/react/',
	DEST_BUILD: 'dist/build',
	DEST_SRC: 'dist/src'
}

gulp.task('watch', function() {

	var glob = require('glob');
	var arrFiles = glob.sync(path.join(gpath.REACT, '*.js'));

	for (var i = 0; i < arrFiles.length; i++) {

		var fileName = path.basename(arrFiles[i]);
		fileName = fileName.substr(0, fileName.lastIndexOf('.'));

		var watcher  = watchify(browserify({
    		entries: [arrFiles[i]],
    		transform: [reactify],
    		debug: true,
    		cache: {}, packageCache: {}, fullPaths: true
  		}));

		return watcher.on('update', function () {
			watcher.bundle()
				.pipe(source(arrFiles[i]))
				.pipe(gulp.dest(gpath.DEST_SRC))
				console.log('Updated');
			})
		.bundle()
		.pipe(source(arrFiles[i]))
		.pipe(gulp.dest(gpath.DEST_SRC));
	}

});

gulp.task('develop', ['watch']);

/*
gulp.task('watch', function() {
  //gulp.watch(path.HTML, ['copy']);

  var watcher  = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function () {
    watcher.bundle()
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_SRC))
      console.log('Updated');
  })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));
});*/