import clear from 'rollup-plugin-clear';
import jscc from 'rollup-plugin-jscc';

const version = require('../package.json').version;
const varAry = version.split('.');
const core = varAry[0] + varAry[1];

export default {
  input: 'src/fallenswordhelper.user.js',
  output: {
    file: 'dist/dev/fallenswordhelper.user.js',
    format: 'es'
  },
  plugins: [
    clear({targets: ['dist/dev']}),
    jscc({
      values: {
        _CALFCSS: 'https://localhost:9966/src/calfSystem.css',
        _CALFJS: 'https://localhost:9966/dist/dev/calfSystem.js',
        _DLURL: 'https://localhost:9966/dist/dev/fallenswordhelper.user.js',
        _VER: core + 'a'
      }
    }),
  ]
};
