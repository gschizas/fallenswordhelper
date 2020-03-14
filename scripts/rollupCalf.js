import {calfVer} from './getVersion';
import cssnano from 'cssnano';
import jscc from 'rollup-plugin-jscc';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import postcssNesting from 'postcss-nesting';
import resolve from 'rollup-plugin-node-resolve';

export default function rollupCalf(file, css, beta, dev) {
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
      resolve(),
      jscc({
        values: {
          _BETA: beta,
          _CALFCSS: css,
          _CALFVER: calfVer,
          _DEV: dev
        }
      }),
      json({compact: true}),
      postcss({
        extensions: ['.css', '.postcss'],
        extract: file.replace('.min', '').replace('.js', '.css'),
        plugins: [postcssNesting(), cssnano()]
      })
    ]
  };
}
