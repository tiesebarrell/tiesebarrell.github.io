#!/bin/bash
rootPath="../../../../";
fontPath="src/main/site/assets/fonts/";

echo "Copying Google fonts to distribution...";
for file in *.ttf; do 
    cp -v "$file" "${rootPath}${fontPath}";
done 
echo "Google fonts copied to distribution."

echo "Copying Bootstrap fonts to distribution...";
for file in ${rootPath}bower_components/bootstrap/fonts/*; do 
    cp -v "$file" "${rootPath}${fontPath}";
done 
echo "Bootstrap fonts copied to distribution."

echo "Copying Font Awesome fonts to distribution...";
for file in ${rootPath}bower_components/fontawesome/fonts/*; do 
    cp -v "$file" "${rootPath}${fontPath}";
done 
echo "Font Awesome fonts copied to distribution."

echo "Build complete."