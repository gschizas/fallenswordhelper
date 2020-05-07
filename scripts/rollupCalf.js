import { calfVer } from './getVersion';
import copy from 'rollup-plugin-copy';
import cssnano from 'cssnano';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import postcssNesting from 'postcss-nesting';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import strip from '@rollup/plugin-strip';

export default function rollupCalf(dir, entryFileNames, jsccValues, labels) {
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
      replace({ values: { ...jsccValues, _CALFVER: calfVer } }),
      strip({
        functions: [],
        labels,
      }),
      json({ compact: true }),
      postcss({
        extensions: ['.css', '.postcss'],
        extract: 'calfSystem.css',
        plugins: [postcssNesting(), cssnano()],
      }),
    ],
  };
}
