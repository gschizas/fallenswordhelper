import rollupCalf from './rollupCalf';

const { port } = require('./config.json');

const outPath = 'dist/watch';

export default rollupCalf(
  outPath,
  '[name].js',
  { _CSSPATH: `https://localhost:${port}/${outPath}` },
  [],
);
