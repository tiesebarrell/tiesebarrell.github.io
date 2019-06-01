#!/usr/bin/env bash

LESS_FILE="assets/styles/airquill.less"
CSS_FILE="assets/styles/airquill.css"
CSS_MIN_FILE="assets/styles/airquill.min.css"

fullBuild() {
    npmSetup;
    lessCompile;
    cssMinification;
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

jekyllBuild() {
    echo "Building site with Jekyll"
    jekyll build;
}

displayUsage() {
    echo
    echo "Usage: $0"
    echo " -h, --help   Display usage instructions"
    echo " -l, --less   Compile less files"
    echo " -c, --css    Minify CSS files"
    echo " -n, --npm    Setup NPM"
    echo " -j, --jekyll Build Jekyll"
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
            -j|--jekyll)
                jekyllBuild
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
