var fs = require('fs');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var replace = require('gulp-replace');
var gulpif = require('gulp-if');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var cssmin = require('gulp-clean-css');
var changed = require('gulp-changed');
var rev = require('gulp-rev');
var filter = require('gulp-filter');
var revCollector = require('gulp-rev-collector');
var gutil = require('gulp-util');
var gless = require('gulp-less');
var gclean = require('gulp-clean');
var autoprefixer = require('gulp-autoprefixer');
var gwatch = require('gulp-watch');
var webpack = require("webpack");
var pk = require('./package.json');
var sftp = require('gulp-sftp');

var condition = true; //true 生产，false开发

//生产环境
var pro_css = './dist/css',
	pro_js = './dist/js',
	pro_img = './dist/img',
	pro_lib = './dist/lib',
	pro_css_filename = 'app.css',
	pro_html = './dist',
	pro_index = './dist';

//开发环境
var dev_css = './style/global/css/**/*.css',
	dev_css_dir = './style/global/css',
	dev_less = './style/global/less/**/*.less',
	dev_less_all = './style/**/*.less',
	dev_img = './img/**/*',
	dev_js = './.pack/**/*.js',
	dev_js_dirs = './js/**/*',
	dev_lib = './lib/**/*',
	dev_html = './*.html',
	dev_index = './*.html';

//manifest path
var img_manifest = './.rev/img',
	img_rev_manifest = './.rev/img/**/*.json',
	js_manifest = './.rev/js',
	css_manifest = './.rev/css',
	css_rev_manifest = './.rev/css/**/*.json',
	rev_manifest = './.rev/**/*.json';

var htmlminOptions = {
	removeComments: true,//清除HTML注释
	collapseWhitespace: true,//压缩HTML
	collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==>     <input />
	removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input     />
}

//遍历目录获取目录下所有文件的相对路径
var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file.replace('./src/',''));
          next();
        }
      });
    })();
  });
};

gulp.task("webpack", function(callback) {
	var webpackConfig = require("./webpack.config.js");
	var config = webpackConfig(condition);
	// run webpack
	webpack(config,function(err, stats) {
		callback && callback();
	});
});

gulp.task("img",function(){
	return gulp.src(dev_img)
		.pipe(gulpif(condition,rev()))
		.pipe(gulp.dest(pro_img))
		.pipe(gulpif(condition,rev.manifest()))
		.pipe(gulpif(condition,gulp.dest(img_manifest)));
});

gulp.task("js",function(){
	var srcs = [];
	srcs.push(dev_js);
	if(condition){
		srcs.push(rev_manifest);	
	}
	return gulp.src(srcs)
		.pipe(gulpif(condition,revCollector()))
		.pipe(gulpif(
			condition,uglify().on('error',gutil.log)	
		))
		.pipe(gulpif(condition,rev()))
		.pipe(gulp.dest(pro_js))
		.pipe(gulpif(condition,rev.manifest()))
		.pipe(gulpif(condition,gulp.dest(js_manifest)));
});

gulp.task('css',function(){
	var srcs = [];
	srcs.push(dev_css);
	if(condition){
		srcs.push(img_rev_manifest);	
	}
	return gulp.src(srcs)
		.pipe(gulpif(condition,revCollector()))
		.pipe(concat(pro_css_filename))
		.pipe(gulpif(
			condition,cssmin()	
		))
		.pipe(gulpif(condition,rev()))
		.pipe(gulp.dest(pro_css))
		.pipe(gulpif(condition,rev.manifest()))
		.pipe(gulpif(condition,gulp.dest(css_manifest)));
});


gulp.task('less',function(){
	return gulp.src(dev_less)
		.pipe(gless())
		.pipe(autoprefixer({ browsers: ['last 2 versions'] }))	
		.pipe(gulpif(condition,cssmin()))
		.pipe(gulp.dest(dev_css_dir));	
});

gulp.task('lib',function(){
	return gulp.src(dev_lib)
		.pipe(gulp.dest(pro_lib));
});

gulp.task('html',function(){
	if(condition){
		gulp.src([dev_html,rev_manifest])
			.pipe(revCollector())
			.pipe(replace('./.pack','./js'))
			.pipe(replace('./style/global/css','./css'))
			.pipe(htmlmin(htmlminOptions))
			.pipe(gulp.dest(pro_html));	
	}		
});

gulp.task('data2dist',function(){
	gulp.src('./data/**/*')
		.pipe(gulp.dest('./dist/data'));
});

//watch
gulp.task('watch',function(){
	gwatch(dev_js_dirs,function(){
		runSequence(['webpack']);	
	});
});

//开发环境
gulp.task('dev',function(done){
	condition = false;
	runSequence (
		['webpack'],
		['less'],
		['watch'],
	done);
});

//生产环境
gulp.task('pro',function(done){
	runSequence (
		['webpack'],
		['img'],
		['less'],
		['css'],
		['css'],
		['js'],
		['lib'],
		['html'],
		['data2dist'],
	done);
});

