
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

