
/*	Dependencies
---------------------------------------------------------------------- */
var gulp = require('gulp'),
	angularHTMLify = require('gulp-angular-htmlify'),
	autoprefixer = require('gulp-autoprefixer'),
	changed = require('gulp-changed'),
	clean = require('gulp-clean'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	minifyCSS = require('gulp-minify-css'),
	minifyHTML = require('gulp-minify-html'),
	sass = require('gulp-sass'),
	stripDebug = require('gulp-strip-debug'),
	ngmin = require('gulp-ngmin'),
	uglify = require('gulp-uglify'),
	util = require('gulp-util')
	notify = require('gulp-notify'),
	livereload = require('gulp-livereload');



/*	Default Task
---------------------------------------------------------------------- */
gulp.task('default', [
	'jshint', 
	'vendorScripts', 
	'appScripts', 
	'styles', 
	'html'
], function(){
	
	// AngularJS Scripts
	gulp.watch('app/app/**/*', function(){
		gulp.run('jshint', 'appScripts');
	});

	// Sass Files
	gulp.watch('app/styles/**/*', function(){
		gulp.run('styles');
	});

	// HTML Files
	gulp.watch([
		'app/index.html', 
		'app/templates/**/*.html'
	], function() {
		gulp.run('html');
	});
});



/*	JavaScript Tasks
---------------------------------------------------------------------- */
gulp.task('jshint', function(){
	gulp.src('app/app/**/*.js')
		.pipe(jshint())
    	.pipe(jshint.reporter('default'));
});


// Vendor scripts
gulp.task('vendorScripts', function() {
	gulp.src([
			'bower_components/jquery/dist/jquery.min.js',
			'bower_components/angular/angular.min.js',
			'bower_components/angular-animate/angular-animate.min.js',
			'bower_components/angular-cookies/angular-cookies.min.js',
			'bower_components/angular-resource/angular-resource.min.js',
			'bower_components/angular-touch/angular-touch.min.js',
			'bower_components/angular-sanitize/angular-sanitize.min.js',
			'bower_components/angular-route/angular-route.min.js',
			'bower_components/ng-file-upload/angular-file-upload.js'
		])
		.pipe(concat('vendor.js'))
		//.pipe(stripDebug())
		//.pipe(ngmin())
		//.pipe(uglify())
		.pipe(gulp.dest('dist/scripts/'));
});

	
// App scripts
gulp.task('appScripts', function() {
	gulp.src([
			'app/app/app.js',
			'app/app/controllers/**/*.js'
		])
		.pipe(concat('app.js'))
		.pipe(stripDebug())
		.pipe(ngmin())
		.pipe(uglify())
		.pipe(gulp.dest('dist/scripts/'));
});



/*	CSS Tasks
---------------------------------------------------------------------- */
gulp.task('styles', function() {
	// Process SASS
	gulp.src('app/styles/main.scss')
		.pipe(sass({
			onError: function(e) {
				return notify().write(e);
			}
		}))
		.pipe(autoprefixer('last 2 versions', 'ie 9', 'safari 5.1', 'chrome 15', 'opera 11', 'firefox 7'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('dist/styles/'))
		.pipe(livereload({auto: true}));
});



/*	HTML Tasks
---------------------------------------------------------------------- */
gulp.task('html', function() {
	// Index File
	gulp.src('app/index.html')
		.pipe(angularHTMLify())
		// .pipe(minifyHTML())
		.pipe(gulp.dest('dist'));

	// Angular Template Files
	gulp.src('app/templates/**/*.html')
		.pipe(angularHTMLify())
		// .pipe(minifyHTML())
		.pipe(gulp.dest('dist/templates'));
});

















