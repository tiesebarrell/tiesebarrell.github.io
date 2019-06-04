#!/usr/bin/env bash

LESS_FILE="assets/styles/airquill.less"
CSS_FILE="assets/styles/airquill.css"
CSS_MIN_FILE="assets/styles/airquill.min.css"

JAVASCRIPT_LESS_FILE="assets/javascript/airquill.js.less"
JAVASCRIPT_FILE="assets/javascript/airquill.js"
JAVASCRIPT_MIN_FILE="assets/javascript/airquill.min.js"

FONT_AWESOME_SOURCE="./node_modules/@fortawesome/fontawesome-free/webfonts"
FONT_AWESOME_TARGET="./assets/webfonts/"

fullBuild() {
    npmSetup;
    lessCompile;
    cssMinification;
    jsCompile;
    jsMinification;
    installFonts;
    jekyllBuild;
}

npmSetup() {
    echo "Setting up NPM"
    rm -rf node_modules;
    npm install;
}

lessCompile() {
    echo "Compiling less"
    lessc $LESS_FILE $CSS_FILE
}

cssMinification() {
    echo "Minifying CSS"
    node-minify --compressor cssnano --input $CSS_FILE --output $CSS_MIN_FILE
}

jsCompile() {
    echo "Compiling Javascript"
    lessc $JAVASCRIPT_LESS_FILE $JAVASCRIPT_FILE
}

jsMinification() {
    echo "Minifying Javascript"
    node-minify --compressor uglify-js --input $JAVASCRIPT_FILE --output $JAVASCRIPT_MIN_FILE
}

installFonts() {
    echo "Installing fonts"
    for fontFile in $FONT_AWESOME_SOURCE/*; do
        cp -v "$fontFile" $FONT_AWESOME_TARGET;
    done
}

jekyllBuild() {
    echo "Building site with Jekyll"
    jekyll build;
}

displayUsage() {
    echo
    echo "Usage: $0"
    echo " -h,  --help          Display usage instructions"
    echo " -l,  --less          Compile less files"
    echo " -c,  --css           Minify CSS files"
    echo " -js, --javascript    Compile and Minify JS files"
    echo " -n,  --npm           Setup NPM"
    echo " -f,  --font          Install fonts"
    echo " -j,  --jekyll        Build Jekyll"
    echo
}

raiseError() {
    local error_message="$@"
    echo "${error_message}" 1>&2;
}

if [ -z "$1" ]
  then
    echo "No argument supplied; performing initial build.";
    fullBuild;
else
    while test -n "$1"; do
        case $1 in
            -h|--help)
                displayUsage
                exit 1
                ;;
            -l|--less)
                lessCompile
                shift
                ;;
            -c|--css)
                cssMinification
                shift
                ;;
            -n|--npm)
                npmSetup
                shift
                ;;
            -f|--fonts)
                installFonts
                shift
                ;;
            -j|--jekyll)
                jekyllBuild
                shift
                ;;
            -js|--javascript)
                jsCompile
                jsMinification
                shift
                ;;
            *)
                raiseError "Unknown argument: ${1}";
                displayUsage
                exit 1
                ;;
        esac
    done
fi
