import { core } from './getVersion.js';
import uglyCalf from './uglyCalf';

const github = require('./config.json').github;

export default uglyCalf(
  'prod',
  {
    _BETA: false,
    _CSSPATH: `${github}resources/prod/${core}/`,
    _DEV: false,
  },
);
