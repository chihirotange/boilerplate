const {watch, series} = require('gulp');
const gulp = require('gulp');
const server = require('browser-sync').create();
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');

//BROWSER
// ====================================
function serve(done) {
	server.init({
		server: {
			baseDir: "./"
		},
		notify: false
	});
	done();
};

function reload(done) {
	server.reload();
	done();
};

// WATCH
// =====================================
function watchTask() {
	watch("*.html", reload);

	// sass
	watch("./src/sass/**/*.scss", function() {
		return gulp.src("./src/sass/**/*.scss")
			.pipe(sass().on('error', sass.logError))
			.pipe(autoprefixer({
				browsers: ['last 10 versions'],
				cascade: false
			}))
			.pipe(postcss([cssnano()]))
			.pipe(gulp.dest('./dist/css'))
			.pipe(server.stream());
	})
};

// IMAGEMIN
// =====================================
function imageMin() {
	return gulp.src('./src/img/*')
		.pipe(imagemin([
			imagemin.optipng({
				optimizationLevel: 5
			})
		]))
		.pipe(gulp.dest('./dist/img'));
}


// EXPORTS
exports.default = series(serve, watchTask);
exports.imagemin = series(imageMin);