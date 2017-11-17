var gulp = require('gulp');

var del = require('del');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync');
var smoosher = require('gulp-smoosher');
var htmlmin = require('gulp-htmlmin');
var cssnano = require('gulp-cssnano');
var runSequence = require('run-sequence');
var reload = browserSync.reload;

var bases = {
 app: 'app/',
 dist: 'dist/',
};

var paths = {
 scripts: ['js/*.js'],
 viewsscripts : ['views/js/*.js'],
 styles: ['css/*.css'],
 viewsstyles: ['views/css/*.css'],
 html: ['index.html', 'project-2048.html', 'project-mobile.html', 'project-webperf.html' ],
 viewshtml: ['views/pizza.html' ],
 images: ['img/*.png', 'img/*.jpg'],
 viewsimages: ['views/images/*.png', 'views/images/*.jpg'],
};

// Delete the dist directory
gulp.task('clean', del.bind(null, ['.tmp', 'dist/*', '!dist/.git'], {dot: true}));

// Process scripts and concatenate them into one output file
gulp.task('scripts', function() {
 gulp.src(paths.scripts, {cwd: bases.app})
 .pipe(uglify())
 .pipe(gulp.dest(bases.dist + 'js/'));
 gulp.src(paths.viewsscripts, {cwd: bases.app})
 .pipe(uglify())
 .pipe(gulp.dest(bases.dist + 'views/js/'));
});

// Minify CSS
gulp.task('minifycss', function() {
    gulp.src(paths.styles, {cwd: bases.app})
    .pipe(cssnano())
    .pipe(gulp.dest(bases.dist + 'css/'));
    gulp.src(paths.viewsstyles, {cwd: bases.app})
    .pipe(cssnano())
    .pipe(gulp.dest(bases.dist + 'views/css/'));
});

// Imagemin images and ouput them in dist
gulp.task('imagemin', function() {
 gulp.src(paths.images, {cwd: bases.app})
 .pipe(imagemin())
 .pipe(gulp.dest(bases.dist + 'img/'));
 gulp.src(paths.viewsimages, {cwd: bases.app})
 .pipe(imagemin())
 .pipe(gulp.dest(bases.dist + 'views/images/'));
});

gulp.task('smoosher', function () {
    gulp.src(paths.html, {cwd: bases.app})
    .pipe(smoosher())
    .pipe(htmlmin({collapseWhitespace: true }))
    .pipe(gulp.dest(bases.dist));
    gulp.src(paths.viewshtml, {cwd: bases.app})
    .pipe(smoosher())
    .pipe(htmlmin({collapseWhitespace: true }))
    .pipe(gulp.dest(bases.dist + 'views/'));
});

// Copy all other files to dist directly
gulp.task('copy', function() {
 // Copy html
 gulp.src(paths.html, {cwd: bases.app})
 .pipe(gulp.dest(bases.dist));

 // Copy styles
 gulp.src(paths.styles, {cwd: bases.app})
 .pipe(gulp.dest(bases.dist + 'styles/'));

});

// A development task to run anytime a file changes
gulp.task('watch', function() {
 gulp.watch('app/**/*', ['scripts', 'copy']);
});

// Define the default task as a sequence of the above tasks
gulp.task('default', function(cb) {
 runSequence('clean', ['scripts', 'imagemin', 'minifycss', 'smoosher'], cb);
  });
//gulp.task('default', ['clean', 'scripts', 'imagemin', 'minifycss', 'smoosher']);

// Watch Files For Changes & Reload
gulp.task('serve', function() {
  browserSync({
    notify: false,
    // Customize the BrowserSync console logging prefix
    logPrefix: 'WSK',
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: ['.tmp', 'app']
  });

  gulp.watch(['app/*.html','app/**/*.html'], reload);
  gulp.watch(['app/css/*.{scss,css}','app/**/css/*.{scss,css}']);
  gulp.watch(['app/**/js/*.js','app/js/*.js'], reload );
  gulp.watch(['app/img/**/*','app/**/images/*'], reload);
});

// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], function() {
  browserSync({
    notify: false,
    logPrefix: 'WSK',
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: 'dist',
    baseDir: "dist"
  });
});