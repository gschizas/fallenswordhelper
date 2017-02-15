import filesize from 'rollup-plugin-filesize';
import jscc from 'rollup-plugin-jscc';

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
let version = require( './package.json' ).version.replace('.', '');
let core = version.replace(/\..+/, '');
let local = 'http://' + require('ip').address() + ':9966/';
let github = 'https://fallenswordhelper.github.io/fallenswordhelper/';

// rollup options
let entry = 'src/' + filename;
let dest = 'dist/' + folder + '/' + filename;

// jscc options
let opts = {values: {}};
// opts.values = {};
let values = opts.values;

switch (true) {
  case folder === 'dev':
    values._DEV = true;
    values._BETA = true;
    values._VER = version.replace('.', 'a');
    values._DLURL = local + 'dist/dev/fallenswordhelper.user.js';
    values._CALFJS = local + 'dist/dev/calfSystem.js';
    values._CALFCSS = local + 'src/calfSystem.css';
    break;
  case folder === 'beta':
    values._DEV = false;
    values._BETA = true;
    values._VER = version.replace('.', 'b');
    values._DLURL = github + 'Releases/Beta/fallenswordhelper.user.js';
    values._CALFJS = github + 'resources/' + core + '/calfSystem.min.js';
    values._CALFCSS = github + 'resources/' + core + '/calfSystem.css';
    break;
  case folder === 'prod':
    values._DEV = false;
    values._BETA = false;
    values._VER = core;
    values._DLURL = github + 'Releases/Current/fallenswordhelper.user.js';
    values._CALFJS = github + 'resources/' + core + '/calfSystem.min.js';
    values._CALFCSS = github + 'resources/' + core + '/calfSystem.css';
}

export default {
  entry: entry,
  dest: dest,
  format: format,
  plugins: [
    jscc(opts),
    filesize()
  ]
};