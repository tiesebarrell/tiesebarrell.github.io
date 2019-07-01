const { watch, series } = require('gulp');

var $ = {
    // cache : require("gulp-cache"),
    // cssnano : require("gulp-cssnano"),
    // uglify : require("gulp-uglify"),
    // concat : require("gulp-concat"),
    // gulpif : require("gulp-if"),
    // util : require("gulp-util"),
    // chalk : require("chalk"),
    // ngAnnotate : require("gulp-ng-annotate"),
    // debug : require("gulp-debug"),
    // htmlreplace : require("gulp-html-replace"),
    // less : require("gulp-less"),
    // path : require("path"),
    // runSequence : require("run-sequence"),
    // del : require("del"),
    // rename : require("gulp-rename"),
    // taskListing : require("gulp-task-listing"),
    // spawn : require("child_process").spawn
};

// /**
// * Help.
// **/
// gulp.task("help", $.taskListing);
//
// /**
//  * Development tasks.
//  **/
//
// gulp.task("watch", function(){
//     $.util.log("Watching for changes: ");
//     $.util.log($.chalk.green("    " + configuration.get("styles.watch")));
//
//     gulp.watch(configuration.get("styles.watch"), ["dev-styles"]);
// });
//
// gulp.task("default", function() {
//     gulp.start("watch");
// });
//
// gulp.task("dev-styles", function () {
//     return gulp.src(configuration.get("styles.source.base"))
//         .pipe($.less({
//             paths: [ $.path.join(__dirname, "less", "includes") ]
//         }))
//         .pipe(gulp.dest(configuration.get("styles.compiled.path")));
// });
//
// gulp.task("dev-fonts", function () {
//     return gulp.src(configuration.get("fonts.source.filter"))
//         .pipe(gulp.dest(configuration.get("fonts.source.path")));
// });
//
// /**
//  * Distribution tasks.
//  **/
//
// gulp.task("dist-javascript", function() {
//
//     //Separate steps are required because files have different bases
//
//     //Compile project javascripts to temp file
//     gulp.src(configuration.get("scripts.filter"))
//         .pipe($.concat(configuration.get("scripts.dist.temp.project")))
//         .pipe(gulp.dest(configuration.get("scripts.dist.path")));
//
//     //Compile third party javascripts to temp file
//     gulp.src(configuration.get("scripts.dist.filters.thirdParty") , {base: configuration.get("paths.bower")})
//         .pipe($.concat(configuration.get("scripts.dist.temp.thirdParty")))
//         .pipe(gulp.dest(configuration.get("scripts.dist.path")));
//
//     //Compile actual dist javascript from temporary files
//     gulp.src(configuration.get("scripts.dist.filters.temporaryFiles"))
//         .pipe($.concat(configuration.get("scripts.dist.file")))
//         .pipe($.uglify())
//         .pipe(gulp.dest(configuration.get("scripts.dist.path")));
//
//     return;
//
// });
//
// gulp.task("dist-styles", function(){
//     return gulp.src(configuration.get("styles.filter"))
//         .pipe($.cssnano())
//         .pipe($.rename(configuration.get("styles.dist.file")))
//         .pipe(gulp.dest(configuration.get("styles.dist.path")));
// });
//
// gulp.task("dist-fonts", function(){
//     return gulp.src(configuration.get("fonts.dist.filter"))
//         .pipe(gulp.dest(configuration.get("fonts.dist.path")));
// });
//
// gulp.task("dist-images", function(){
//     return gulp.src(configuration.get("images.dist.filter"))
//         .pipe(gulp.dest(configuration.get("images.dist.path")));
// });
//
// gulp.task("dist-resources", function(){
//     return gulp.src(configuration.get("resources.dist.filter"))
//         .pipe(gulp.dest(configuration.get("paths.dist")));
// });
//
// gulp.task("dist-cleanup", function() {
//
//     //Delete temporary files
//     $.del(configuration.get("scripts.dist.filters.temporaryFiles")).then(function (paths) {
//         $.util.log("Deleted files/folders:\n", $.chalk.magenta(paths.join("\n")));
//     });
//
//     return;
// });
//
// gulp.task("dist-html", function(){
//     //TODO: paths (multiple)
//     return gulp.src(configuration.get("html.dist.filter"))
//         .pipe($.gulpif(configuration.get("gulp.debug"), $.debug({title: "    Processing html replacements: "})))
//         .pipe($.htmlreplace({
//             js: configuration.get("scripts.dist.html.path"),
//             css: configuration.get("styles.dist.html.path")
//         }))
//         .pipe(gulp.dest(configuration.get("paths.dist")));
// });
//
// gulp.task("dist-info", function(){
//     $.util.log("");
//     $.util.log("**************************************************");
//
//     $.util.log("To test the distribution locally, do: ");
//     $.util.log($.chalk.green("    gulp dist-run"));
//
//     $.util.log("**************************************************");
//     $.util.log("");
// });
//
// gulp.task("dist-run", function (cb) {
//
//     $.util.log("");
//     $.util.log("**************************************************");
//
//     $.util.log("Starting local webserver... ");
//     $.util.log("Browse at: ");
//     $.util.log($.chalk.green("    http://localhost:8000/ "));
//
//     $.util.log("**************************************************");
//     $.util.log("");
//
//     var child = $.spawn("python", ["-mSimpleHTTPServer"], {cwd: configuration.get("paths.dist")}),
//         stdout = "",
//         stderr = "";
//
//     child.stdout.setEncoding("utf8");
//
//     child.stdout.on("data", function (data) {
//         stdout += data;
//         $.util.log(data);
//     });
//
//     child.stderr.setEncoding("utf8");
//     child.stderr.on("data", function (data) {
//         stderr += data;
//         $.util.log($.util.colors.red(data));
//     });
//
//     child.on("close", function(code) {
//         $.util.log("Completed with exit code: ", code);
//     });
// })
//
//
// gulp.task("dist", function (callback) {
//
//     $.util.log("Starting distribution to", $.chalk.magenta(configuration.get("paths.dist")));
//
//     $.runSequence(
//         "dist-javascript",
//         "dist-styles",
//         "dist-html",
//         "dist-fonts",
//         "dist-images",
//         "dist-resources",
//         "dist-cleanup",
//         "dist-info",
//         function (error) {
//             if (error) {
//                 $.util.log($.chalk.red(error.message));
//             } else {
//                 $.util.log($.chalk.green("Distribution completed to"), $.chalk.magenta(configuration.get("paths.dist")));
//
//
//             }
//             callback(error);
//         });
// });


//

let exec = require('child_process').exec;

let paths = {
    jsFiles: ['assets/javascript/*.js', '!assets/javascript/airquill.js', '!assets/javascript/airquill.min.js'],
    lessFiles: ['assets/styles/*.less'],
    cssFiles: ['assets/styles/*.css', '!assets/styles/*.min.css']
};

function execInternal(cb, command) {
    exec(command, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
}

function js(cb) {
    execInternal(cb, './_build/install.sh --javascript');
}

function less(cb) {
    execInternal(cb, './_build/install.sh --less');
}

function css(cb) {
    execInternal(cb, './_build/install.sh --css');
}

exports.default = function() {
    watch(paths.jsFiles, js);
    watch(paths.lessFiles, less);
    watch(paths.cssFiles, css);
};
