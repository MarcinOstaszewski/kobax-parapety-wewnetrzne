// DLA KALKULATORA PARAPETY WEWNETRZNE
// bez Webpacka z Rollupem

import gulp, { src, dest } from 'gulp';
import dartSass from 'sass';
import sass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import replace from 'gulp-replace';
import sourcemaps from 'gulp-sourcemaps';
import injectString from 'gulp-inject-string';
import gulpRemoveHtml from 'gulp-remove-html';
import rename from 'gulp-rename';
import fs from 'fs';

console.log('gulp DLA KALKULATORA PARAPETY WEWNETRZNE');
console.log('najpierw uruchom "npm run build" - aby stworzyć aktualny plik bundle.js');

const config = {
  rollupSrcFile: './src/index.ts',
  destDir: './dist_kalkulator',
  srcHtml: './src/index.html',
  destHtml: 'kalkulator_parapety_wewnetrzne__kod_WordPress.html',
  tsFiles: 'src/**/*.ts',
  replace: {
    from: /assets/g,
    to: 'https://www.fronty-meblowe.pl/formularz/wp-content/uploads/2024/11'
  },
  inject: {
    css: '<!-- inject:styles -->',
    js: '<!-- inject:scripts -->'
  }
};

const compileSass = () => {
  const sassCompiler = sass(dartSass);

  return gulp.src('./src/index.scss')
    .pipe(sourcemaps.init())
    .pipe(sassCompiler().on('error', sassCompiler.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest(config.destDir));
};

const prepareCodeForWordPress = () => {
  const cssContent = fs.readFileSync(`${config.destDir}/index.css`, 'utf8');
  const jsContent = fs.readFileSync(`${config.destDir}/bundle.js`, 'utf8');
  
  return src(config.srcHtml)
    .pipe(replace(config.replace.from, config.replace.to)) // paths to images
    .pipe(injectString.replace(config.inject.css, `<style>${cssContent}</style>`)) // styles inlined
    .pipe(injectString.replace(config.inject.js, `<script>${jsContent}</script>`)) // scripts inlined
    .pipe(gulpRemoveHtml())
    .pipe(rename(config.destHtml))
    .pipe(dest(config.destDir));
};

gulp.task('code', prepareCodeForWordPress);

export default gulp.series(
  compileSass,
  prepareCodeForWordPress,
);