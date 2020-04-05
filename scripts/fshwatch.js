import { core } from './getVersion.js';
import rollupFsh from './rollupFsh.js';

const outdir = 'watch';
const port = require('./config.json').port;

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
