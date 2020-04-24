import { core } from './getVersion';
import uglyCalf from './uglyCalf';

const { github } = require('./config.json');

export default uglyCalf(
  'prod',
  {
    _BETA: false,
    _CSSPATH: `${github}resources/prod/${core}/`,
    _DEV: false,
  },
);
