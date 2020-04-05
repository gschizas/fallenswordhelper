import { core } from './getVersion.js';
import rollupFsh from './rollupFsh.js';

const port = require('./config.json').port;

const devUrl = `https://localhost:${port}/dist/dev/`;

export default rollupFsh(
  'dev',
  {
    _CALFJS: `${devUrl}calfSystem.min.js`,
    _DLURL: `${devUrl}fallenswordhelper.user.js`,
    _VER: `${core}a`,
  },
);
