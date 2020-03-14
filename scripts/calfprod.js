import {core} from './getVersion.js';
import uglyCalf from './uglyCalf';

const github = require('./config.json').github;

export default uglyCalf(
  'prod',
  `${github}resources/prod/${core}/calfSystem.css`,
  false,
  false
);
