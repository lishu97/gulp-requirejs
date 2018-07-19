var gulp = require("gulp");
var $ = require("gulp-load-plugins")();// htmlmin, sass, cssnano, imagemin, cache, uglify, tmod
var del = require("del");
var browserSync = require('browser-sync').create();

//定义目录路径
var app = {
    //源代码，文件目录
    srcPath: 'src/',
    //文件整合之后的目录
    devPath: 'build/',
    //项目，发布目录上产部署
    prdPath: 'dist/'
};

// 文件处理、导出
gulp.task('html', function (done) {
	var options = {
		removeComments: true,//清除HTML注释
		collapseWhitespace: true,//压缩HTML
		minifyJS: true,//压缩页面JS
		minifyCSS: true//压缩页面CSS
	};
	gulp.src(app.srcPath + '**/*.html')
		.pipe(gulp.dest(app.devPath))
	done();
})

gulp.task('scss', function (done) {
	gulp.src(app.srcPath + 'scss/*.scss')
		.pipe($.sass())
		.pipe(gulp.dest(app.devPath + 'css'))
	done();
})

gulp.task('js', function (done) {
	gulp.src(app.srcPath + '**/*.js')
		.pipe(gulp.dest(app.devPath))
	done();
})

gulp.task('image', function (done) {
	gulp.src(app.srcPath + '**/*.{jpg, png, gif}')//要处理的图片目录为img目录下的所有的.jpg .png .gif 格式的图片;
		.pipe($.cache($.imagemin({
			progressive: true,//是否渐进的优化
			svgoPlugins: [{removeViewBox: false}],//svgo插件是否删除幻灯片
			interlaced: true//是否各行扫描
		})))
		.pipe(gulp.dest(app.devPath))
	done();
})

gulp.task('tpl', function (done) {
    gulp.src(app.srcPath + 'tpl/*.tpl')
		.pipe($.tmod({
			templateBase: app.srcPath + 'tpl', // 基地址
			type: 'amd', // 遵循规范类型
			combo: true // 融合
		}))
		.pipe(gulp.dest(app.devPath + 'tpl'))
	done();
});

// 监听
gulp.task('js-watch', ['js'], function(done){
    browserSync.reload();
    done();
});
gulp.task('scss-watch', ['scss'], function(done){
    browserSync.reload();
    done();
});
gulp.task('html-watch', ['html'], function(done){
    browserSync.reload();
    done();
});
gulp.task('image-watch', ['image'], function(done){
    browserSync.reload();
    done();
});
gulp.task('tpl-watch', ['tpl'], function(done){
    browserSync.reload();
    done();
});

// 清空已经打包的文件
gulp.task('delete', function (done) {
	del([app.devPath]);
	done();
})

// 构建项目
gulp.task('build', ['html', 'tpl', 'scss', 'js', 'image'], function (done) {
	done();
})

// 开启服务
gulp.task('server', function (done) {
	browserSync.init({
		server: {
			baseDir: [app.devPath + 'html', app.devPath]
		},
		port: 8080
	});
	done();
})

// 调试
gulp.task('default', ['delete'], function (done) {
	setTimeout(function () {
		gulp.start(['build', 'server']);
		gulp.watch([app.srcPath + '**/*.html', app.srcPath + '**/*.tpl', app.srcPath + '**/*.scss', app.srcPath + '**/*.js', app.srcPath + '**/*.{jpg, png, gif}'], 
			[['html-watch'], ['tpl-watch'], ['scss-watch'], ['js-watch'], ['image-watch']]);
		done();
	}, 1000)
})

// 打包项目
gulp.task('package', ['build'], function (done) {
	gulp.src(app.devPath + '**/*.html')
		.pipe($.htmlmin(options))
		.pipe(gulp.dest(app.prdPath))
		
	gulp.src(app.devPath + 'tpl/*.tpl')
		.pipe($.htmlmin(options))
		.pipe(gulp.dest(app.prdPath))
		
	gulp.src(app.devPath + 'css/*.css', {})
		.pipe($.cssnano())
		.pipe(gulp.dest(app.prdPath + 'css'))
	
	gulp.src(app.devPath + '**/*.js')
		.pipe($.uglify())
		.pipe(gulp.dest(app.prdPath))
	
	gulp.src(app.devPath + '**/*.{jpg, png, gif}')
		.pipe(gulp.dest(app.prdPath))
		
	done();
})