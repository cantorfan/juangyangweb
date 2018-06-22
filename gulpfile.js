var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var gulpSequence = require('gulp-sequence');
var gls = require('gulp-live-server');
var open = require('gulp-open');
var os = require('os');
var postcss = require("gulp-postcss");
var cssnano = require("cssnano");
var pxtorem = require("gulp-pxtorem");
var autoprefixer = require("autoprefixer");

var paths = {
  sass: ['./style/*.scss']
};
gulp.task('serve', function () {
  //1. serve with default settings
  var dev_server = gls.static('.', '8100'); //equals to gls.static('public', 3000);
  dev_server.start();
  var browser = os.platform() === 'linux' ? 'google-chrome' : (
    os.platform() === 'darwin' ? 'google chrome' : (
      os.platform() === 'win32' ? 'Chrome' : '360Chrome'));
  var options = {
    uri: 'http://localhost:8100',
    app: browser
  };
  gulp.src('.')
    .pipe(open(options));
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(['./style/*.css', './js/*.js', './**/*.html'], function (file) {
    dev_server.notify.apply(dev_server, [file]);
  });
});

gulp.task('sass', function (done) {
  var plugins = [autoprefixer({ browsers: ["last 3 version"] }), cssnano()];
  gulp.src(paths.sass)
    .pipe(sass())
    .on('error', sass.logError)
    //.pipe(gulp.dest('./static/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(pxtorem({
      propList: ['*'],
      minPixelValue: 5,
      unitPrecision: 3
    }))
    .pipe(postcss(plugins))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('./style/'))
    .on('end', done);
});


