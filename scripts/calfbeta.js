import {core} from './getVersion.js';
import uglyCalf from './uglyCalf';

const github = require('./config.json').github;

export default uglyCalf(
  'beta',
  `${github}resources/beta/${core}/calfSystem.css`,
  true,
  false
);
