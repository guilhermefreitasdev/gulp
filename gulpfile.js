const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

// Compilar SASS
function compilaSass() {
    return gulp.src('sass/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
}

// Otimizar imagens
function otimizaImagens() {
    return gulp.src('images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
}

// Minificar JS
function minificaJS() {
return gulp.src('js/**/*.js')
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
}

// Watch para automatizar
function watch() {
    gulp.watch('sass/**/*.scss', compilaSass);
    gulp.watch('js/**/*.js', minificaJS);
    gulp.watch('images/**/*', otimizaImagens);
}

// Tarefas padrão
exports.default = gulp.series(
    gulp.parallel(compilaSass, otimizaImagens, minificaJS)
);

exports.watch = watch;
