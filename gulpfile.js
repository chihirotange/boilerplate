const {watch, series} = require('gulp');
const gulp = require('gulp');
const server = require('browser-sync').create();
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
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
			.pipe(postcss([cssnano()]))
			.pipe(gulp.dest('./dist/css'))
			.pipe(server.stream());
	});
};


// EXPORTS
exports.default = series(serve, watchTask);