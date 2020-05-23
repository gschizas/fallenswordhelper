import rollupCalf from './rollupCalf';

const { core } = require('./getVersion');
const { port } = require('./config.json');

const outPath = `dist/resources/watch/${core}`;

export default rollupCalf(
  outPath,
  '[name].js',
  { _CSSPATH: `https://localhost:${port}/${outPath}` },
  [],
);
