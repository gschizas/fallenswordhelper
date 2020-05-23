import uglyCalf from './uglyCalf';

const { core } = require('./getVersion');
const { github } = require('./config.json');

export default uglyCalf(
  'beta',
  { _CSSPATH: `${github}resources/beta/${core}` },
  ['devLbl'],
);
