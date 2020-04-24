import { calfVer } from './getVersion';
import copy from 'rollup-plugin-copy';
import cssnano from 'cssnano';
import jscc from 'rollup-plugin-jscc';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import postcssNesting from 'postcss-nesting';
import resolve from '@rollup/plugin-node-resolve';

export default function rollupCalf(dir, entryFileNames, jsccValues) {
  return {
    input: 'src/calfSystem.js',
    output: {
      dir,
      entryFileNames,
      format: 'es',
      sourcemap: true,
      sourcemapExcludeSources: true,
    },
    plugins: [
      copy({
        targets: [{
          src: 'src/styles/dataTables.css',
          dest: dir,
        }],
        copyOnce: true,
      }),
      resolve(),
      jscc({ values: { ...jsccValues, _CALFVER: calfVer } }),
      json({ compact: true }),
      postcss({
        extensions: ['.css', '.postcss'],
        extract: 'calfSystem.css',
        plugins: [postcssNesting(), cssnano()],
      }),
    ],
  };
}
