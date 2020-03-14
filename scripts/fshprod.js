import {core} from './getVersion.js';
import rollupFsh from './rollupFsh.js';

const github = require('./config.json').github;

export default rollupFsh(
  'prod',
  {
    _CALFJS: `${github}resources/prod/${core}/calfSystem.min.js`,
    _DLURL: `${github}Releases/Current/fallenswordhelper.user.js`,
    _VER: core
  }
);
