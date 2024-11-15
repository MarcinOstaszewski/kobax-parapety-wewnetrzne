// DLA KALKULATORA PARAPETY WEWNETRZNE
// bez Webpacka z Rollupem
// + DLA FORMULARZA PARAPETY WEWNETRZNE
import fs from 'fs';
import gulp, { dest, src } from 'gulp';
import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';
import injectString from 'gulp-inject-string';
import gulpRemoveHtml from 'gulp-remove-html';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import dartSass from 'sass';

console.log('NALEŻTY URUCHAMIAĆ przez: "/parapety-wewnetrzne/npm run build"');

const config = {
  srcHtmlCalc: './src/index.html',
  srcSassFile: './src/index.scss',
  srcCssFiles: ['./src/normalize.css', './src/parapety_wewnetrzne.css'],
  srcHtmlForm: './src/parapety-wewnetrzne.html',
  srcJsFiles: './src/parapety_wewnetrzne.js',
  replace: {
    from: /assets/g,
    to: 'https://www.fronty-meblowe.pl/formularz/wp-content/uploads/2024/11'
  },
  inject: {
    css: '<!-- inject:styles -->',
    js: '<!-- inject:scripts -->'
  },
  destDir: './dist',
  destDirCalcGHPages: './gh-pages',
  destDirFormGHPages: './gh-pages/parapety-wewnetrzne',
  index: 'index.html',
  destHtmlCalculatorGHPages: 'kalkulator.html',
  destHtmlForm: 'formularz_parapety_wewnetrzne__kod_WordPress.html',
  destHtmlCalc: 'kalkulator_parapety_wewnetrzne__kod_WordPress.html',
  destCssFile: 'styles.css',
  destJsFile: 'scripts.js',
}

function compileStyles() {
  return src(config.srcCssFiles)
    .pipe(concat(config.destCssFile))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(config.destDir));
}

function compileScripts() {
  return src(config.srcJsFiles)
    .pipe(concat(config.destJsFile))
    .pipe(dest(config.destDir));
}


const compileSass = () => {
  const sassCompiler = sass(dartSass);
  return gulp.src(config.srcSassFile)
    .pipe(sourcemaps.init())
    .pipe(sassCompiler().on('error', sassCompiler.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest(config.destDir));
};

const formParapetyPrepareCodeForWordPress = () => {
  const cssContent = fs.readFileSync(`${config.destDir}/styles.min.css`, 'utf8');
  const jsContent = fs.readFileSync(`${config.destDir}/scripts.js`, 'utf8');
  return src(config.srcHtmlForm)
    .pipe(replace(config.replace.from, config.replace.to)) // paths to images
    .pipe(injectString.replace(config.inject.css, `<style> ${cssContent} </style>`)) // styles inlined
    .pipe(injectString.replace(config.inject.js, `<script> ${jsContent} </script>`)) // scripts inlined
    .pipe(rename(config.index))
    .pipe(dest(config.destDirFormGHPages))
    .pipe(gulpRemoveHtml())
    .pipe(rename(config.destHtmlForm))
    .pipe(dest(config.destDir))
};

const calcParapetyPrepareCodeForWordPress = () => {
  const cssContent = fs.readFileSync(`${config.destDir}/index.css`, 'utf8');
  const jsContent = fs.readFileSync(`${config.destDir}/bundle.js`, 'utf8');
  return src(config.srcHtmlCalc)
    .pipe(replace(config.replace.from, config.replace.to)) // replace paths to images uploaded to WordPress
    .pipe(injectString.replace(config.inject.css, `<style> ${cssContent} </style>`)) // injects styles to HTML file
    .pipe(injectString.replace(config.inject.js, `<script> ${jsContent} </script>`)) // injects scripts to HTML file
    .pipe(rename(config.destHtmlCalculatorGHPages))
    .pipe(dest(config.destDirCalcGHPages))
    .pipe(gulpRemoveHtml())
    .pipe(rename(config.destHtmlCalc))
    .pipe(dest(config.destDir));
};

gulp.task('buildCalc', gulp.series(
  compileSass,
  calcParapetyPrepareCodeForWordPress
));

gulp.task('buildForm', gulp.series(
  compileStyles,
  compileScripts,
  formParapetyPrepareCodeForWordPress
));

export default gulp.parallel(
  'buildCalc',
  'buildForm'
);
