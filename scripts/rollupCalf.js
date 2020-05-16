import pluginsCalf from './pluginsCalf';

const watch = process.env.ROLLUP_WATCH;

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
    plugins: pluginsCalf(dir, jsccValues, labels),
    treeshake: !watch,
    watch: { include: 'src/**' },
  };
}
