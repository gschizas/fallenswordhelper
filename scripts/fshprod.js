import { core } from './getVersion';
import rollupFsh from './rollupFsh';

const { github } = require('./config.json');

export default rollupFsh(
  'prod',
  {
    _CALFJS: `${github}resources/prod/${core}/calfSystem.min.js`,
    _DLURL: `${github}Releases/Current/fallenswordhelper.user.js`,
    _VER: core,
  },
);
