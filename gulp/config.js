'use strict';

var path = require('path');

var rootPath = path.join('./');
var appPath = path.join(rootPath, 'src');

module.exports = {

    paths: {
        root: rootPath,
        js: path.join(appPath, 'js'),
        webroot: path.join(rootPath, 'public')
    }

};
