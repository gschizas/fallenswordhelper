import uglyCalf from './uglyCalf';

const localhttp = require('./config.json').localhttp;

export default uglyCalf(
  'dev',
  `${localhttp}dist/dev/calfSystem.css`,
  true,
  true
);
