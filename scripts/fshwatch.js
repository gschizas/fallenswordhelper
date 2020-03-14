import {core} from './getVersion.js';
import rollupFsh from './rollupFsh.js';

const localhttp = require('./config.json').localhttp;

export default rollupFsh(
  'watch',
  {
    _CALFJS: `${localhttp}dist/watch/calfSystem.js`,
    _DLURL: `${localhttp}dist/watch/fallenswordhelper.user.js`,
    _VER: `${core}a`
  }
);
