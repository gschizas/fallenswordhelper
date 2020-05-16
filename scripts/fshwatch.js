import { core } from './getVersion';
import rollupFsh from './rollupFsh';

const { port } = require('./config.json');

const outdir = 'watch';
const watchUrl = `https://localhost:${port}/dist/${outdir}/`;

export default rollupFsh(
  outdir,
  {
    _CALFJS: `${watchUrl}calfSystem.js`,
    _DLURL: `${watchUrl}fallenswordhelper.user.js`,
    _VER: `${core}a`,
  },
);
