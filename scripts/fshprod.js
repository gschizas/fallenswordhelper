import rollupFsh from './rollupFsh';

const { core } = require('./getVersion');
const { github } = require('./config.json');

export default rollupFsh(
  'Current',
  {
    _CALFJS: `${github}resources/prod/${core}/calfSystem.min.js`,
    _DLURL: `${github}Releases/Current/fallenswordhelper.user.js`,
    _VER: core,
  },
);
