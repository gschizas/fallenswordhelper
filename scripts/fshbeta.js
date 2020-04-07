import { core } from './getVersion';
import rollupFsh from './rollupFsh';

const { github } = require('./config.json');

export default rollupFsh(
  'beta',
  {
    _CALFJS: `${github}resources/beta/${core}/calfSystem.min.js`,
    _DLURL: `${github}Releases/Beta/fallenswordhelper.user.js`,
    _VER: `${core}b`,
  },
);
