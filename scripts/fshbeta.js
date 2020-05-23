import rollupFsh from './rollupFsh';

const { core } = require('./getVersion');
const { github } = require('./config.json');

export default rollupFsh(
  'Beta',
  {
    _CALFJS: `${github}resources/beta/${core}/calfSystem.min.js`,
    _DLURL: `${github}Releases/Beta/fallenswordhelper.user.js`,
    _VER: `${core}b`,
  },
);
