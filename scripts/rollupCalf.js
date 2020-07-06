import pluginsCalf from './pluginsCalf';

const { calfVer } = require('./getVersion');

const watch = process.env.ROLLUP_WATCH;

export default function rollupCalf(dir, entryFileNames, jsccValues, labels) {
  return {
    input: 'src/calfSystem.js',
    output: {
      assetFileNames: '[name][extname]',
      chunkFileNames: `${calfVer}/[name]-[hash].js`,
      dir,
      entryFileNames,
      format: 'es',
      sourcemap: true,
      sourcemapExcludeSources: true,
    },
    plugins: pluginsCalf(dir, jsccValues, labels),
    treeshake: !watch,
    watch: { include: 'src/**' },
  };
}
