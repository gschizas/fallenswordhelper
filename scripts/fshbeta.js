import {core} from './getVersion.js';
import rollupFsh from './rollupFsh.js';

const github = require('./config.json').github;

export default rollupFsh(
  'beta',
  {
    _CALFJS: `${github}resources/beta/${core}/calfSystem.min.js`,
    _DLURL: `${github}Releases/Beta/fallenswordhelper.user.js`,
    _VER: `${core}b`
  }
);
