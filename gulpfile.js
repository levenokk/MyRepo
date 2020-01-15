let gulp = require('gulp'), //Сам gulp D
    sass = require('gulp-sass'), // Подключаем препроцессор, если нужно изменить формат на saas, просто закоментируй таск scss и убери коментарии из таска ниже  
    browserSync = require('browser-sync'), // Подключаем библиотеку для трансляции сайта и перезагрузки страницы после изменения любого из её файлов 
    uglify = require('gulp-uglify'), // Подключаем библиотеку для сжатия js файлов
    concat = require('gulp-concat'), // Подключаем библиотеку для объединения файлов
    rename = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    del = require('del'), // Подключаем библиотеку для удаления файлов
    imagemin = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant = require('imagemin-pngquant'),// Подключаем библиотеку для работы с png
    cache = require('gulp-cache'); // Подключаем библиотеку кеширования



gulp.task('clean', async function(){
  del.sync('dist')
})

gulp.task('scss', function(){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

//     Вот с этого таска(Убери всё //, и сотри это предложения потом))
// gulp.task('scss', function(){
//   return gulp.src('app/scss/**/*.saas')
//     .pipe(sass({outputStyle: 'compressed'}))
//     .pipe(rename({suffix: '.min'}))
//     .pipe(gulp.dest('app/css'))
//     .pipe(browserSync.reload({stream: true}))
// });


gulp.task('css', function(){
  return gulp.src([
    'node_modules/normalize.css/normalize.css',
    'node_modules/slick-carousel/slick/slick.css',
    'node_modules/bootstrap/dist/css/bootstrap.css'
  ])
    .pipe(concat('_libs.scss'))
    .pipe(gulp.dest('app/scss'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function(){
  return gulp.src('app/*.html')
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('script', function(){
  return gulp.src('app/js/*.js')
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function(){
  return gulp.src([
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/bootstrap/dist/js/bootstrap.bundle.js'
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({stream: true}))
});

// gulp.task('fonts', function(){
//   return gulp.src('app/fonts/**/*.css')
//     .pipe(concat('_fonts.scss'))
//     .pipe(gulp.dest('app/scss'))
// })

gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "app/"
      }
  });
});

gulp.task('img', function() {
  return gulp.src('app/img/**/*') // Берем все изображения из app
      .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
          interlaced: true,
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngquant()]
      })))
      .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

gulp.task('export', async function(){
  let buildHtml = gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'));

  let BuildCss = gulp.src('app/css/**/*.css')
    .pipe(gulp.dest('dist/css'));

  let BuildJs = gulp.src('app/js/**/*.js')
    .pipe(gulp.dest('dist/js'));
    
  let BuildFonts = gulp.src('app/fonts/**/*.*')
    .pipe(gulp.dest('dist/fonts'));

  // let BuildImg = gulp.src('app/img/**/*.*')
  //   .pipe(gulp.dest('dist/img'));   
});

gulp.task('clear', function (callback) {
	return cache.clearAll();
})

gulp.task('watch', function(){
  gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch('app/*.html', gulp.parallel('html'))
  gulp.watch('app/js/*.js', gulp.parallel('script'))
});

gulp.task('build', gulp.series('clean', 'export', 'clear', 'img'));

gulp.task('bootstrap', gulp.parallel('scss', 'browser-sync', 'watch'));

gulp.task('default', gulp.parallel('css', 'scss', 'js', 'browser-sync', 'watch'));