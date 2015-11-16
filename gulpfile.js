var gulp = require('gulp');
var sass = require('gulp-sass');
var browser_sync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');
var reload = browser_sync.reload;
var path = require('path')

gulp.task('default', ['nodemon'], function () {
});

gulp.task('nodemon', function(cb) {
    var started = false;

    return nodemon({
        script: 'app.js',
        ext: 'sass js css',
        tasks: function(changed_files) {
            var tasks = [];
            changed_files.forEach(function(file) {
                if (path.extname(file) === '.sass' && !~tasks.indexOf('sass'))
                    tasks.push('sass');
                // if (path.extname(file) === '.js' && !~tasks.indexOf('lint')) tasks.push('lint');
                // if (path.extname(file) === '.css' && !~tasks.indexOf('cssmin')) tasks.push('cssmin');
            });
            return tasks;
        }
    }).on('start', function() {
        if (!started) {
            console.log('Application started...');
            cb();
            started = true;
        }
        else
            console.log('Already running...');
    }).on('restart', function() {
        console.log('Restarted...');
    });
});

gulp.task('sass', function() {
    console.log('Compiling SASS...');
    gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css/'));
});