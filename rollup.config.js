import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import jscc from 'rollup-plugin-jscc';
import nodeResolve from 'rollup-plugin-node-resolve';

let source = process.env.SOURCE;
let folder = process.env.FOLDER;
let filename;
let format;
if (source === 'fsh') {
  filename = 'fallenswordhelper.user.js';
  format = 'es';
}
if (source === 'calf') {
  filename = 'calfSystem.js';
  format = 'iife';
}
let version = require('./package.json').version;
let varAry = version.split('.');
let core = varAry[0] + varAry[1];
let local = 'https://' + require('ip').address() + ':9966/';
let github = 'https://fallenswordhelper.github.io/fallenswordhelper/';

// rollup options
let entry = 'src/' + filename;
let dest = 'dist/' + folder + '/' + filename;

// jscc options
let opts = {values: {}};
let values = opts.values;
values._CALFVER = varAry[2];

switch (true) {
case folder === 'dev':
  values._DEV = true;
  values._BETA = true;
  values._VER = core + 'a' + varAry[2];
  values._DLURL = local + 'dist/dev/fallenswordhelper.user.js';
  values._CALFJS = local + 'dist/dev/calfSystem.js';
  values._CALFCSS = local + 'src/calfSystem.css';
  break;
case folder === 'beta':
  values._DEV = false;
  values._BETA = true;
  values._VER = core + 'b' + varAry[2];
  values._DLURL = github + 'Releases/Beta/fallenswordhelper.user.js';
  values._CALFJS = github + 'resources/beta/' + core + '/calfSystem.min.js';
  values._CALFCSS = github + 'resources/beta/' + core + '/calfSystem.css';
  break;
case folder === 'prod':
  values._DEV = false;
  values._BETA = false;
  values._VER = core;
  values._DLURL = github + 'Releases/Current/fallenswordhelper.user.js';
  values._CALFJS = github + 'resources/prod/' + core + '/calfSystem.min.js';
  values._CALFCSS = github + 'resources/prod/' + core + '/calfSystem.css';
  // no default
}

export default {
  entry: entry,
  dest: dest,
  format: format,
  plugins: [
    jscc(opts),
    nodeResolve(),
    commonjs(),
    filesize()
  ]
};
