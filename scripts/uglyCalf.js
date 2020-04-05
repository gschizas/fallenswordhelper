import { terser } from 'rollup-plugin-terser';
import rollupCalf from './rollupCalf';

export default function uglyCalf(outdir, jsccValues) {
  const options = rollupCalf(
    `dist/${outdir}/`,
    '[name].min.js',
    jsccValues,
  );

  if (['beta', 'prod'].includes(outdir)) {
    options.output.sourcemapPathTransform = (relativePath) => relativePath.replace('..\\..\\', '');
  }

  options.plugins.push(terser({
    output: {
      beautify: false,
      semicolons: false,
    },
  }));

  return options;
}
