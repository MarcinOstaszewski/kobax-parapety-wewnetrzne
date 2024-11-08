'use strict'

// DLA FORMULARZA PARAPETY WEWNETRZNE
import gulp, {src, dest, series } from 'gulp';
import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';
import replace from 'gulp-replace';
import injectString from 'gulp-inject-string';
import rename from 'gulp-rename';
import gulpRemoveHtml from 'gulp-remove-html';
import fs from 'fs';

const config = {
  destDir: '../dist',
  cssFiles: ['./normalize.css', './parapety_wewnetrzne_styles.css'],
  jsFiles: './parapety_wewnetrzne.js',
  destCSS: '../dist/out-formularz',
  destJS: '../dist/out-formularz',
  replace: {
    from: /assets/g,
    to: 'https://www.fronty-meblowe.pl/formularz/wp-content/uploads/2024/11'
  },
  inject: {
    css: '<!-- inject:styles -->',
    js: '<!-- inject:scripts -->'
  }
}

gulp.task('styles', () => {
  return src(config.cssFiles)
    .pipe(concat('styles.css'))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(config.destCSS));
});

gulp.task('scripts', () => {
  return src(config.jsFiles)
    .pipe(concat('scripts.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(config.destJS));
});

gulp.task('inject-inline-css-js-remove-body-tags', () => {
  const cssContent = fs.readFileSync(`${config.destCSS}/styles.min.css`, 'utf8');
  const jsContent = fs.readFileSync(`${config.destJS}/scripts.min.js`, 'utf8');
  return src('./parapety_wewnetrzne.html')
    .pipe(replace(config.replace.from, config.replace.to)) // paths to images
    .pipe(injectString.replace(config.inject.css, `<style>${cssContent}</style>`)) // styles inlined
    .pipe(injectString.replace(config.inject.js, `<script>${jsContent}</script>`)) // scripts inlined
    .pipe(gulpRemoveHtml())
    .pipe(rename('parapety_wewnetrzne__kod_WordPress.html'))
    .pipe(dest(config.destDir));
});

gulp.task('default', series(
  'styles',
  'scripts',
  'inject-inline-css-js-remove-body-tags',
));