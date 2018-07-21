const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const del = require("del");
const usemin = require("gulp-usemin");
const rev = require("gulp-rev");
const cssnano = require("gulp-cssnano");
const uglify = require("gulp-uglify");
const gzip = require("gulp-gzip");
const browserSync = require("browser-sync").create();

// doesnt work
gulp.task("previewDist", ["nodemon"], () => {
  browserSync.init({
    notify: false,
    proxy: "http://localhost:3000",
    port: 3001
  });
}); /* end of preview dist task */

gulp.task("deleteDistFolder", ["icons"], () => {
  return del("./dist");
}); /* end of delete dist folder */

gulp.task("copyGeneralFiles", ["deleteDistFolder"], () => {
  const pathsToCopy = [
    "./content/**/*",
    "!./content/public/images/**",
    "!./content/public/css",
    "!./content/public/css/**",
    "!./content/public/scripts",
    "!./content/public/scripts/**",
    "!./content/temp",
    "!./content/temp/**"
  ];
  return gulp.src(pathsToCopy).pipe(gulp.dest("./dist/content"));
}); /* end of copy general files */

gulp.task("optimizeImages", ["deleteDistFolder"], () => {
  return gulp
    .src([
      "./content/public/images/**/*",
      "!./content/public/images/icons",
      "!./content/public/images/icons/**/*"
    ])
    .pipe(
      imagemin({
        progressive: true,
        interlaced: true,
        multipass: true
      })
    )
    .pipe(gulp.dest("./dist/content/public/images"));
}); /* end of optimize Images task */

gulp.task("useminTrigger", ["deleteDistFolder"], function() {
  gulp.start("usemin");
}); /* end of useminTrigger task */

gulp.task("usemin", ["styles"], () => {
  return gulp
    .src("./content/theme/**/*.ejs")
    .pipe(
      usemin({
        css: [
          function() {
            return rev();
          },
          function() {
            return cssnano();
          }
        ],
        js: [
          function() {
            return rev();
          },
          function() {
            return uglify();
          }
        ]
      })
    )
    .pipe(gulp.dest("./dist/content/theme"));
}); /* end of usemin task */

gulp.task("adminCompress", ["deleteDistFolder"], ()=>{
  gulp.src('./important/**/*.js')
    .pipe(gulp.dest('./dist/important'));
})

gulp.task("build", [
  "deleteDistFolder",
  "copyGeneralFiles",
  "adminCompress",
  "optimizeImages",
  "useminTrigger"
]);
