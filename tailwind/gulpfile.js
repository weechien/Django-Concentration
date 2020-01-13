const { src, dest, watch, series, parallel } = require('gulp')
const postcss = require('gulp-postcss')
const { init, write } = require('gulp-sourcemaps')
const concat = require('gulp-concat')
const terser = require('gulp-terser')

const files = {
  cssPath: 'src\\css\\style.css',
  jsPath: 'src\\js\\*.js'
}

const output = {
  cssPath: '..\\the_concentration\\static\\the_concentration\\css',
  jsPath: '..\\the_concentration\\concentration\\static\\concentration\\js'
}

function cssTask() {
  return src(files.cssPath)
    .pipe(init())
    .pipe(postcss())
    .pipe(write('.'))
    .pipe(dest(output.cssPath))
}

function jsTask() {
  return src([files.jsPath])
    .pipe(concat('all.js'))
    .pipe(terser({
      ecma: 2016,
    }))
    .pipe(dest(output.jsPath))
}

function watchTask() {
  watch([files.cssPath], parallel(cssTask, jsTask))
}

exports.default = series(parallel(cssTask, jsTask), watchTask)
