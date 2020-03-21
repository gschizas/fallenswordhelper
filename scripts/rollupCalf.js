import {calfVer} from './getVersion';
import copy from 'rollup-plugin-copy';
import cssnano from 'cssnano';
import jscc from 'rollup-plugin-jscc';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import postcssNesting from 'postcss-nesting';
import resolve from '@rollup/plugin-node-resolve';

export default function rollupCalf(file, jsccValues) {
  return {
    input: 'src/calfSystem.js',
    output: {
      file: file,
      format: 'es',
      sourcemap: true,
      sourcemapExcludeSources: true,
      sourcemapFile: 'src/calfSystem.js.map'
    },
    plugins: [
      copy({
        targets: [{
          src: 'src/styles/dataTables.css',
          dest: file.replace('.min', '').replace('/calfSystem.js', '')
        }],
        copyOnce: true
      }),
      resolve(),
      jscc({values: {...jsccValues, _CALFVER: calfVer}}),
      json({compact: true}),
      postcss({
        extensions: ['.css', '.postcss'],
        extract: file.replace('.min', '').replace('.js', '.css'),
        plugins: [postcssNesting(), cssnano()]
      })
    ]
  };
}
