import rollupFsh from './rollupFsh.js';

const version = require('../package.json').version;
const varAry = version.split('.');
const core = varAry[0] + varAry[1];
const github = 'https://fallenswordhelper.github.io/fallenswordhelper/';

export default rollupFsh(
  'prod',
  {
    _CALFCSS: github + 'resources/prod/' + core + '/calfSystem.css',
    _CALFJS: github + 'resources/prod/' + core + '/calfSystem.min.js',
    _DLURL: github + 'Releases/Current/fallenswordhelper.user.js',
    _VER: core
  }
);
