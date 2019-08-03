const {watch, series} = require('gulp');
const gulp = require('gulp');
const server = require('browser-sync').create();
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const imageminmozjpeg = require('imagemin-mozjpeg');
const imageminpngquant = require('imagemin-pngquant');
const webpack = require('webpack');


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
	watch("./src/js/**/*.js", series(scripts, reload));

	// sass
	watch("./src/sass/**/*.scss", function() {
		return gulp.src("./src/sass/**/*.scss")
			.pipe(sass().on('error', sass.logError))
			.pipe(autoprefixer({
				overrideBrowserslist: ['last 5 versions'],
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
			imageminpngquant({
				quality: [0.4, 0.7]
			}),
			imageminmozjpeg({
				quality:50
			})
		]))
		.pipe(gulp.dest('./dist/img'));
}

// WEBPACK
function scripts(done) {
	webpack(require('./webpack.config.js'), function(err, stats) {
		if (err) {
			console.log(err.toString());
		}
		console.log(stats.toString());
	});
	done();
}


// EXPORTS
exports.default = series(serve, watchTask);
exports.imagemin = series(imageMin);