import del from 'rollup-plugin-delete';
import rollupCalf from './rollupCalf';
import serve from 'rollup-plugin-serve';

const fs = require('fs');
const { port } = require('./config.json');

const outPath = 'dist/watch';

const options = rollupCalf(
  outPath,
  '[name].js',
  { _CSSPATH: `https://localhost:${port}/${outPath}` },
  [],
);
options.treeshake = false;
options.watch = { include: 'src/**' };

options.plugins.push(serve({
  contentBase: '',
  headers: { 'Access-Control-Allow-Origin': '*' },
  https: {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.crt'),
  },
  port,
}));

options.plugins.push(del({
  targets: [
    `${outPath}/*`,
    `!${outPath}/dataTables.css`,
    `!${outPath}/fallenswordhelper.user.js`,
  ],
}));

export default options;
