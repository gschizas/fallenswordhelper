import rollupCalf from './rollupCalf';
import serve from 'rollup-plugin-serve';

const fs = require('fs');

const options = rollupCalf('dist/watch/calfSystem.js', true, true);
options.treeshake = false;
options.watch = {include: 'src/**'};

options.plugins.push(serve({
  contentBase: '',
  headers: {'Access-Control-Allow-Origin': '*'},
  https: {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.crt')
  },
  port: 9966
}));

export default options;
