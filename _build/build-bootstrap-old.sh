#!/bin/bash

bootstrapVersion="3.2.0";
baseDir="bootstrap-${bootstrapVersion}";
themeDir="bootstrap-${bootstrapVersion}-themes";
lessDir="less";
distDir="dist";
themeName="simplex";
themeVariablesFile="variables.${themeName}.customized.less";
targetDir="../../../assets/bootstrap/";
targetVariablesFile="variables.less";

echo "Applying variables to bootstrap distribution";
cp -v ${themeDir}/${themeVariablesFile} ${baseDir}/${lessDir}/${targetVariablesFile};

echo "Performing grunt build";
cd $baseDir;

grunt dist;
echo "Completed grunt build";

echo "Copying distribution from ${distDir} to ${targetDir}";
cp -r ${distDir}/* $targetDir;