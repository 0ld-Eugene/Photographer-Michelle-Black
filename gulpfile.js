// import gulp from 'gulp';
// import gulpSass from 'gulp-sass';
// import * as dartSass from 'sass';
// import postcss from 'gulp-postcss';
// import autoprefixer from 'autoprefixer';
// import cleanCSS from 'gulp-clean-css';

// import imagemin from 'gulp-imagemin';
// import mozjpeg from 'imagemin-mozjpeg';
// import pngquant from 'imagemin-pngquant';
// import webp from 'imagemin-webp';
// import avif from 'imagemin-avif';

// const { src, dest, watch, series } = gulp;
// const sass = gulpSass(dartSass);

// // -------------------------
// // 1) SCSS → CSS (DEV)
// // -------------------------
// export function compileScss() {
//    return src('styles/main.scss')
//       .pipe(sass().on('error', sass.logError))
//       .pipe(dest('css')); // css/main.css
// }

// // -------------------------
// // 2) Watch SCSS
// // -------------------------
// export function watchScss() {
//    watch('styles/**/*.scss', compileScss);
// }

// // -------------------------
// // 3) SCSS → CSS (BUILD, autoprefixer + минификация)
// // -------------------------
// export function compileBuild() {
//    return src('styles/main.scss')
//       .pipe(sass().on('error', sass.logError))
//       .pipe(postcss([autoprefixer()]))
//       .pipe(cleanCSS())
//       .pipe(dest('done/css')); // done/css/main.css
// }

// // -------------------------
// // 4) Минификация изображений
// // -------------------------
// export function compressImages() {
//    return src('sources/**/*.{jpg,jpeg,png,JPG,PNG,JPEG}')
//       .pipe(imagemin([
//          mozjpeg({ quality: 80 }),
//          pngquant({ quality: [0.6, 0.8] })
//       ]))
//       .pipe(dest('images'));
// }

// // -------------------------
// // 5) Конвертация в WebP
// // -------------------------
// export function convertWebP() {
//    return src('sources/**/*.{jpg,jpeg,png,JPG,PNG,JPEG}')
//       .pipe(imagemin([webp({ quality: 80 })]))
//       .pipe(dest('images'));
// }

// // -------------------------
// // 6) Конвертация в AVIF
// // -------------------------
// export function convertAvif() {
//    return src('sources/**/*.{jpg,jpeg,png,JPG,PNG,JPEG}')
//       .pipe(imagemin([avif({ quality: 50 })]))
//       .pipe(dest('images'));
// }

// // -------------------------
// // 7) Объединённая задача изображений
// // -------------------------
// export const minifyImages = series(
//    compressImages,
//    convertWebP,
//    convertAvif
// );

// // -------------------------
// // Экспорт задач
// // -------------------------
// export const dev = compileScss;
// export const build = compileBuild;
// export const images = minifyImages;
// export const watchTask = series(compileScss, watchScss);
// export const defaultTask = series(compileScss, compileBuild, minifyImages);


import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';

import sharpResponsive from 'gulp-sharp-responsive';

// const { src, dest } = gulp;
const { src, dest, watch } = gulp;
const sass = gulpSass(dartSass);

/* =========================
   WATCH: SCSS → CSS
========================= */
export function scssWatch() {
   return src('styles/main.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(dest('css'));
}

export function watchTask() {
   watch('styles/**/*.scss', scssWatch);
}

/* =========================
   BUILD: CSS → done/
========================= */
export function build() {
   return src('css/main.css')
      // 1. префиксы
      .pipe(postcss([autoprefixer()]))

      // 2. done/main.css
      .pipe(dest('done'))

      // 3. минификация
      .pipe(cleanCSS())

      // 4. done/main.min.css
      .pipe(rename({ suffix: '.min' }))
      .pipe(dest('done'));
}

// -------------------------
// Обработка изображений через Sharp
// -------------------------
export const images = () => {
   return src('sources/**/*.{jpg,jpeg,png}', { encoding: false })
      .pipe(
         sharpResponsive({
            formats: [
               { format: 'webp', quality: 80 },
               { format: 'avif', quality: 50 }
            ],
            includeOriginalFile: true, // сохраняем оригиналы
            // можно добавить опции resize, если будут responsive версии
         })
      )
      .pipe(dest('images'));
};

