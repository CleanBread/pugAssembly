const gulp = require('gulp'),
      sass = require('gulp-sass'),
      concat = require('gulp-concat'),
      autoprefixer = require('gulp-autoprefixer'),
      cleancss = require('gulp-clean-css'),
      browserSync = require('browser-sync'),
      pug = require('gulp-pug'),
      flatten = require('gulp-flatten'),
      rimraf = require('rimraf'),
	  rollup = require('rollup'),
	  resolve = require('rollup-plugin-node-resolve'),
	  babel = require('rollup-plugin-babel'),
      syntax = 'sass';

gulp.task('build:pug', () => {
    return gulp.src('src/pages/**/*.pug')
        .pipe(flatten())
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('clean', function (cb) {
    rimraf('./build', cb)
    gulp.start('build');
});

gulp.task('build:sass', () => {
    return gulp.src('src/' + syntax + '/*.' + syntax)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.css'))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('build/css'))
	.pipe(browserSync.stream())
});
``
gulp.task('build:js', () => {
    return rollup.rollup({
      input: 'src/js/common.js',
      plugins: [
        resolve(),
        babel({
          exclude: 'node_modules/**'
        }),
      ],
    }).then(bundle => {
      return bundle.write({
        file: 'build/js/min.js',
        format: 'iife'
      });
    });
  });

gulp.task('server', () => {
	browserSync({
		server: {
			baseDir: 'build'
		},
		notify: false,
		open: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});

gulp.task('build:resources', () => {
    return gulp.src('src/resources/**/*', {
      dot: true,
      allowEmpty: true
    })
      .pipe(gulp.dest('build'))
  });

gulp.task('build', gulp.parallel(
    'build:pug',
    'build:sass',
    'build:js',
    'build:resources',
  ));
  
gulp.task('watch', () => {
    gulp.watch('src/**/*.pug', gulp.series('build:pug'));
    gulp.watch('src/**/*.sass', gulp.series('build:sass'));
    gulp.watch('src/js/**/*.js', gulp.series('build:js'));
    gulp.watch(['src/resources/**/*', 'src/resources/**/.*'], gulp.series('build:resources'));
    gulp.watch('build/**/*').on('change', browserSync.reload);
});

gulp.task('default', gulp.series(
    'build',
    gulp.parallel(
      'server',
      'watch'
    )
  ));