import { core } from './getVersion';
import rollupFsh from './rollupFsh';

const { port } = require('./config.json');

const devUrl = `https://localhost:${port}/dist/dev/`;

export default rollupFsh(
  'dev',
  {
    _CALFJS: `${devUrl}calfSystem.min.js`,
    _DLURL: `${devUrl}fallenswordhelper.user.js`,
    _VER: `${core}a`,
  },
);
