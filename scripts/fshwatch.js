import rollupFsh from './rollupFsh';

const { core } = require('./getVersion');
const { port } = require('./config.json');

const outdir = 'watch';
const watchUrl = `https://localhost:${port}/dist/`;

export default rollupFsh(
  outdir,
  {
    _CALFJS: `${watchUrl}resources/${outdir}/${core}/calfSystem.js`,
    _DLURL: `${watchUrl}Releases/${outdir}/fallenswordhelper.user.js`,
    _VER: `${core}a`,
  },
);
