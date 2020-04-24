import { core } from './getVersion';
import rollupFsh from './rollupFsh';

const outdir = 'watch';
const { port } = require('./config.json');

const watchUrl = `https://localhost:${port}/dist/${outdir}/`;
const options = rollupFsh(
  outdir,
  {
    _CALFJS: `${watchUrl}calfSystem.js`,
    _DLURL: `${watchUrl}fallenswordhelper.user.js`,
    _VER: `${core}a`,
  },
);
options.treeshake = false;
options.watch = { include: 'src/**' };

export default options;
