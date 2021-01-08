import rollupFsh from './rollupFsh';

const { core } = require('./getVersion');
const { port } = require('./config.json');

const outdir = 'dev';
const devUrl = `https://localhost:${port}/dist/`;

export default rollupFsh(
  outdir,
  {
    _CALFJS: `${devUrl}resources/${outdir}/${core}/calfSystem.min.js`,
    _DLURL: `${devUrl}Releases/${outdir}/fallenswordhelper.user.js`,
    _VER: `${core}a`,
  },
);
