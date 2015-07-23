var gulp = require('gulp');
var browser_sync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');
var reload = browser_sync.reload;

gulp.task('default', ['nodemon', 'browser-sync'], function () {
});

gulp.task('browser-sync' , function() {
    var files = [
        'public/**/*.*',
        'views/**/*.*',
        'sass/**/*.*'
    ];

    browser_sync.init(files, {
        proxy: 'http://localhost:3000',
        port: 4000
    });
});

gulp.task('nodemon', function(cb) {
    var started = false;

    return nodemon({
        script: 'app.js'
    }).on('start', function() {
        if (!started) {
            cb();
            started = true;
        }
    });
});