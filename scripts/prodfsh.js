import clear from 'rollup-plugin-clear';
import jscc from 'rollup-plugin-jscc';

const version = require('../package.json').version;
const varAry = version.split('.');
const core = varAry[0] + varAry[1];
const github = 'https://fallenswordhelper.github.io/fallenswordhelper/';

export default {
  input: 'src/fallenswordhelper.user.js',
  output: {
    file: 'dist/prod/fallenswordhelper.user.js',
    format: 'es'
  },
  plugins: [
    clear({targets: ['dist/prod']}),
    jscc({
      values: {
        _CALFCSS: github + 'resources/prod/' + core + '/calfSystem.css',
        _CALFJS: github + 'resources/prod/' + core + '/calfSystem.min.js',
        _DLURL: github + 'Releases/Current/fallenswordhelper.user.js',
        _VER: core
      }
    }),
  ]
};
