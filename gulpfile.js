const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const clean = require('gulp-clean');
const del = require('del');
const runSequence = require('run-sequence');
// 编译并压缩js
gulp.task('convertJS', function(){
  return gulp.src('public/scripts/**/*.js')
    ///打包前必须先编译为es5标准，然后才能够压缩打包等操作
    .pipe(babel({
      presets: ['es2015']
    }))
    //.pipe(concat('main.js', {newLine: ';'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/bundle'))
});

// 合并并压缩css
gulp.task('convertCSS', function(){
  return gulp.src('public/styles/*.css')
    .pipe(concat('app.css'))
    .pipe(cssnano())
    .pipe(rename(function(path){
      path.basename += '.min';
    }))
    .pipe(gulp.dest('dist/css'));
});



gulp.task('clean:dist', function (cb) {
  del([
    'dist/*'
    // 这里我们使用一个通配模式来匹配 `mobile` 文件夹中的所有东西
    //'dist/mobile/**/*',
    // 我们不希望删掉这个文件，所以我们取反这个匹配模式
    //'!dist/mobile/deploy.json'
  ], cb);
});

gulp.task('default', function(cb){
  runSequence('clean:dist', 'convertJS', 'convertCSS', cb);
});

runSequence( ['clean:dist','convertJS', 'convertCSS']);

