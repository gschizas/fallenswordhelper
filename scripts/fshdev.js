import {core} from './getVersion.js';
import rollupFsh from './rollupFsh.js';

const localhttp = require('./config.json').localhttp;

export default rollupFsh(
  'dev',
  {
    _CALFJS: `${localhttp}dist/dev/calfSystem.min.js`,
    _DLURL: `${localhttp}dist/dev/fallenswordhelper.user.js`,
    _VER: `${core}a`
  }
);
