var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var less        = require('gulp-less');
var gulpCopy    = require('gulp-copy');
var flatten     = require('gulp-flatten');
var plumber     = require('gulp-plumber');

var sourceFiles = [
	'docs/index.html',
	'docs/**/*.js'
];
var destination = 'build';

// Compile less into CSS & auto-inject into browsers
gulp.task('less', function() {
	return gulp.src("src/less/main.less")
	.pipe(plumber(function(error){
        console.log("Error happend!", error.message);
        this.emit('end');
    }))
	.pipe(less())
	.pipe(plumber.stop())
	.pipe(gulp.dest("build/css"))
	.pipe(browserSync.stream());
});

gulp.task('copy', function() {
	return gulp
	.src(sourceFiles)
		.pipe(gulpCopy('build'))
		.pipe(flatten())
	    .pipe(gulp.dest('build'))
		.pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', ['less'], function() {

    browserSync.init({
        server: "build",
		open: false,
		reloadOnRestart: true
    });

    gulp.watch("src/less/*.less", ['less']);
    gulp.watch(sourceFiles, ['copy']);
    // gulp.watch("docs/*.html").on('change', browserSync.reload);
});


gulp.task('default', ['copy','serve']);
