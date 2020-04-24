import { core } from './getVersion';
import uglyCalf from './uglyCalf';

const { github } = require('./config.json');

export default uglyCalf(
  'beta',
  {
    _BETA: true,
    _CSSPATH: `${github}resources/beta/${core}/`,
    _DEV: false,
  },
);
