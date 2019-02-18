import jscc from 'rollup-plugin-jscc';
import json from 'rollup-plugin-json';

let version = require('../package.json').version;
let varAry = version.split('.');

export default function rollupCalf(file, beta, dev) {
  return {
    input: 'src/calfSystem.js',
    output: {
      file: file,
      format: 'iife',
      sourcemap: true,
      sourcemapExcludeSources: true,
      sourcemapFile: 'src/calfSystem.js.map'
    },
    plugins: [
      jscc({
        values: {
          _BETA: beta,
          _CALFVER: varAry[2],
          _DEV: dev
        }
      }),
      json({compact: true})
    ]
  };
}
