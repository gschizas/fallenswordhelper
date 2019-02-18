import rollupFsh from './rollupFsh.js';

const version = require('../package.json').version;
const varAry = version.split('.');
const core = varAry[0] + varAry[1];
const github = 'https://fallenswordhelper.github.io/fallenswordhelper/';

export default rollupFsh(
  'beta',
  {
    _CALFCSS: github + 'resources/beta/' + core + '/calfSystem.css',
    _CALFJS: github + 'resources/beta/' + core + '/calfSystem.min.js',
    _DLURL: github + 'Releases/Beta/fallenswordhelper.user.js',
    _VER: core + 'b'
  }
);
