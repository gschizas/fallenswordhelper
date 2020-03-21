import rollupCalf from './rollupCalf';
import serve from 'rollup-plugin-serve';

const fs = require('fs');
const port = require('./config.json').port;
const outPath = 'dist/watch/';

const options = rollupCalf(
  `${outPath}calfSystem.js`,
  {
    _BETA: true,
    _CSSPATH: `https://localhost:${port}/${outPath}`,
    _DEV: true
  });
options.treeshake = false;
options.watch = {include: 'src/**'};

options.plugins.push(serve({
  contentBase: '',
  headers: {'Access-Control-Allow-Origin': '*'},
  https: {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.crt')
  },
  port
}));

export default options;
