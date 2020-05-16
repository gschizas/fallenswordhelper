import { calfVer } from './getVersion';
import child from 'child_process';
import cssnano from 'cssnano';
import json from '@rollup/plugin-json';
import nesting from 'postcss-nesting';
import pluginCopy from 'rollup-plugin-copy';
import pluginDel from 'rollup-plugin-delete';
import pluginPostcss from 'rollup-plugin-postcss';
import pluginStrip from '@rollup/plugin-strip';
import { terser as pluginTerser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';

const { port } = require('./config.json');

const watch = process.env.ROLLUP_WATCH;

function copy(dir) {
  return pluginCopy({
    targets: [{
      src: 'src/styles/dataTables.css',
      dest: dir,
    }],
    copyOnce: true,
  });
}

function del(dir) {
  return pluginDel({
    targets: [
      `${dir}/*`,
      `!${dir}/dataTables.css`,
      `!${dir}/fallenswordhelper.user.js`,
    ],
  });
}

function postcss() {
  return pluginPostcss({
    extensions: ['.css', '.postcss'],
    extract: 'calfSystem.css',
    plugins: [nesting(), cssnano()],
  });
}

function serve() {
  let started = false;

  return {
    writeBundle() {
      if (!started) {
        started = true;

        child.spawn('npm', ['run', 'start', '--', `-p ${port}`], {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true,
        });
      }
    },
  };
}

function strip(labels) {
  return pluginStrip({
    functions: [],
    labels,
  });
}

function terser() {
  return pluginTerser({
    output: {
      beautify: false,
      semicolons: false,
    },
  });
}

export default function calfPlugins(dir, jsccValues, labels) {
  return [
    copy(dir),
    watch && del(dir),
    resolve(),
    replace({ values: { ...jsccValues, _CALFVER: calfVer } }),
    strip(labels),
    json({ compact: true }),
    postcss(),
    !watch && terser(),
    watch && serve(),
  ];
}
