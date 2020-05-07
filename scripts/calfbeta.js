import { core } from './getVersion';
import uglyCalf from './uglyCalf';

const { github } = require('./config.json');

export default uglyCalf(
  'beta',
  { _CSSPATH: `${github}resources/beta/${core}` },
  ['devLbl'],
);
