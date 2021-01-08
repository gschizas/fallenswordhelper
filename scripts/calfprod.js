import uglyCalf from './uglyCalf';

const { core } = require('./getVersion');
const { github } = require('./config.json');

export default uglyCalf(
  'prod',
  { _CSSPATH: `${github}resources/prod/${core}` },
  ['devLbl', 'betaLbl'],
);
