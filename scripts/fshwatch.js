import rollupFsh from './rollupFsh.js';

const version = require('../package.json').version;
const varAry = version.split('.');
const core = varAry[0] + varAry[1];
const localhttp = 'https://localhost:9966/';

export default rollupFsh(
  'watch',
  {
    _CALFCSS: localhttp + 'src/calfSystem.css',
    _CALFJS: localhttp + 'dist/watch/calfSystem.js',
    _DLURL: localhttp + 'dist/watch/fallenswordhelper.user.js',
    _VER: core + 'a'
  }
);
