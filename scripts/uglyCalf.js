import rollupCalf from './rollupCalf';
import {terser} from 'rollup-plugin-terser';

export default function uglyCalf(outdir, jsccValues) {
  const options = rollupCalf(
    `dist/${outdir}/`,
    '[name].min.js',
    jsccValues
  );

  options.plugins.push(terser({
    output: {
      beautify: false,
      semicolons: false
    }
  }));

  return options;
}
