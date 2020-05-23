import uglyCalf from './uglyCalf';

const { core } = require('./getVersion');
const { port } = require('./config.json');

export default uglyCalf(
  'dev',
  { _CSSPATH: `https://localhost:${port}/dist/resources/dev/${core}` },
  [],
);
