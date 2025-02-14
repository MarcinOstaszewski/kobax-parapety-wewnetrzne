// DLA KALKULATORA PARAPETY WEWNETRZNE
// bez Webpacka z Rollupem
// + DLA FORMULARZA PARAPETY WEWNETRZNE
import gulp, { src, dest, series } from 'gulp';
import dartSass from 'sass';
import sass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import replace from 'gulp-replace';
import sourcemaps from 'gulp-sourcemaps';
import injectString from 'gulp-inject-string';
import gulpRemoveHtml from 'gulp-remove-html';
import rename from 'gulp-rename';
import concat from 'gulp-concat';
import fs from 'fs';
import { exec } from 'child_process';

console.log('!! NALEŻY URUCHAMIAĆ przez: ".../parapety-wewnetrzne/npm run build"');
console.log('!! Ew. "npm run dev" -> obserwuje zmiany, buduje Kalkulator i Formularze w folderze "gh-pages"');
console.log('Pliki z "gh-pages" można otworzyć w Live Server');

const config = {
  srcHtmlCalc: './src/index.html',
  srcSassFile: './src/index.scss',
  srcFormCssFiles: ['./src/normalize.css', './src/parapety_wewnetrzne.css'],
  srcHtmlForm: './src/parapety-wewnetrzne.html',
  srcTsCalcIndexFile: './src/index.ts',
  srcFormJsFiles: './src/parapety_wewnetrzne.js',
  replace: {
    from: /assets/g,
    to: 'https://www.fronty-meblowe.pl/formularz/wp-content/uploads/2024/11'
  },
  inject: {
    css: '<!-- inject:styles -->',
    js: '<!-- inject:scripts -->',
    // asyncJs: '<!-- inject:asyncScripts -->',
    asyncScriptCall: '//// inject:async script call',
  },
  // asyncJsDir: './src/asyncJs',
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
  return src(config.srcFormCssFiles)
    .pipe(concat(config.destCssFile))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(config.destDir));
}

function compileFormScripts() {
  return src(config.srcFormJsFiles)
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

const calcParapetyPrepareCodeForGitHubPagesAndWordPress = () => {
  const cssContent = fs.readFileSync(`${config.destDir}/index.css`, 'utf8');
  const jsContent = fs.readFileSync(`${config.destDir}/bundle.js`, 'utf8');
  // const asyncJsContent = fs.readFileSync(`${config.asyncJsDir}/asyncPriceUpdate.js`, 'utf8');
  return src(config.srcHtmlCalc)
    .pipe(replace(config.replace.from, config.replace.to)) // replace paths to images uploaded to WordPress
    .pipe(injectString.replace(config.inject.css, `<style> ${cssContent} </style>`)) // injects styles to HTML file
    .pipe(injectString.replace(config.inject.js, `<script> ${jsContent} </script>`)) // injects scripts to HTML file
    // .pipe(injectString.replace(config.inject.asyncJs, `<script> ${asyncJsContent} </script>`)) // injects scripts to HTML file
    // .pipe(injectString.replace(config.inject.asyncScriptCall, 'asyncPriceUpdate();')) // injects async script call
    .pipe(rename(config.destHtmlCalculatorGHPages))
    .pipe(dest(config.destDirCalcGHPages))
    .pipe(gulpRemoveHtml())
    .pipe(rename(config.destHtmlCalc))
    .pipe(dest(config.destDir));
};

function runRollup(cb) {
  exec('rollup -c', (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}`);
      return cb(err);
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    cb();
  });
}

function watchForm() {
  gulp.watch(config.srcHtmlForm, gulp.series(formParapetyPrepareCodeForWordPress));
  gulp.watch(config.srcFormCssFiles, gulp.series(compileStyles, formParapetyPrepareCodeForWordPress));
  gulp.watch(config.srcFormJsFiles, gulp.series(compileFormScripts, formParapetyPrepareCodeForWordPress));
}

function watchCalc() {
  gulp.watch('./src/index.html', gulp.series(calcParapetyPrepareCodeForGitHubPagesAndWordPress));
  gulp.watch('./src/**/*.scss', gulp.series(compileSass, calcParapetyPrepareCodeForGitHubPagesAndWordPress));
  gulp.watch(['./src/scripts/**/*', './src/types/**/*', './src/utils/**/*'], gulp.series(runRollup, compileFormScripts, calcParapetyPrepareCodeForGitHubPagesAndWordPress));
}

gulp.task('dev', gulp.parallel(watchCalc, watchForm));

gulp.task('buildCalc', gulp.series(
  compileSass,
  calcParapetyPrepareCodeForGitHubPagesAndWordPress
));

gulp.task('buildForm', gulp.series(
  compileStyles,
  compileFormScripts,
  formParapetyPrepareCodeForWordPress
));

export default gulp.parallel(
  'buildCalc',
  'buildForm'
);
