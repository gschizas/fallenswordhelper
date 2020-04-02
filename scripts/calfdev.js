import uglyCalf from './uglyCalf';

const port = require('./config.json').port;

export default uglyCalf(
  'dev',
  {
    _BETA: true,
    _CSSPATH: `https://localhost:${port}/dist/dev/`,
    _DEV: true
  }
);
