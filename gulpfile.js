var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require("gulp-concat");
var minify = require('gulp-minify-css');
var htmlmini = require('gulp-minify-html');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var jshint = require("gulp-jshint");

gulp.task('sass', function(){ // SASS预编译
	gulp.src('src/css/*.scss')
	    .pipe(sass())
	    .pipe(gulp.dest('dest/css'));
	    gulp.watch('src/css/index.scss', ['sass']);
});

gulp.task('compass', function () { //压缩js文件
    gulp.src(['src/js/*.js','!src/js/*.min.js'])  //获取文件，同时过滤掉.min.js文件
        .pipe(uglify())
        .pipe(gulp.dest('dest/js/'));  //输出文件
});

gulp.task('cssmini', function () { //压缩css文件
    gulp.src(['src/css/*.css','src/icon/*.css','!src/css/*.min.css'])  //要压缩的css
        .pipe(minify())
        .pipe(gulp.dest('dest/css'));
});

gulp.task('htmlmini', function () {  //压缩html文件
    gulp.src('src/*.html')
        .pipe(htmlmini())
        .pipe(gulp.dest('dest'));
})

gulp.task('concat', function () {   //文件合并
   gulp.src(['dest/css/public.css','dest/css/goodnight.css'])  //要合并的文件
    .pipe(concat('all.min.css'))  // 合并匹配到的js文件并命名为 "all.js"
    .pipe(gulp.dest('dest/css'));
});

gulp.task('concatjs', function () {   //文件合并
   gulp.src(['dest/js/jquery.min.js','dest/js/data.js','dest/js/table.js','dest/js/right.js'])  //要合并的文件
    .pipe(concat('all.min.js'))  // 合并匹配到的js文件并命名为 "all.js"
    .pipe(gulp.dest('dest/js'));
});




gulp.task('pic', function () {  //图片压缩
    return gulp.src('src/images/*')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()] //使用pngquant来压缩png图片
        }))
        .pipe(gulp.dest('dest/images'));
});

//gulp.task('jsLint', function () {  //js代码检查
//    gulp.src('src/js/*.js')
//    .pipe(jshint())
//    .pipe(jshint.reporter()); // 输出检查结果
//});

gulp.task('default', ['sass','compass','cssmini','htmlmini','pic'/*,'jsLint','concat'*/]);
	