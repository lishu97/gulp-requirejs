var gulp = require("gulp");
var htmlmin = require('gulp-htmlmin');
var scss = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var uglify = require('gulp-uglify');

gulp.task('default', ['htmlmin', 'scss', 'image', 'js'], function () {
	gulp.start('watch');
	console.log('gulp启动成功');
})

gulp.task('htmlmin', function () {
	gulp.src('*.html')
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true
		}))
		.pipe(gulp.dest('dist'))
})
gulp.task('scss', function () {
	gulp.src('*.scss')
		.pipe(scss())
		.pipe(gulp.dest('css'))
		.pipe(cssnano())
		.pipe(gulp.dest('dist/css'))
})
gulp.task('image', function () {
	gulp.src('img/*.{jpg, png, gif}')//要处理的图片目录为img目录下的所有的.jpg .png .gif 格式的图片;
		.pipe(cache(imagemin({
			progressive: true,//是否渐进的优化
			svgoPlugins: [{removeViewBox: false}],//svgo插件是否删除幻灯片
			interlaced: true//是否各行扫描
		})))
		.pipe(gulp.dest('dist/img'))
})
gulp.task('js', function () {
	gulp.src('js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
})
gulp.task('watch', function () {
	gulp.watch('*.html', ['html']);
	gulp.watch('*.scss', ['scss']);
	gulp.watch('js/*.js', ['js']);
	gulp.watch('img/*.{jpg, png, gif}');
})