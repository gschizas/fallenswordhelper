import rollupCalf from './rollupCalf';
import {terser} from 'rollup-plugin-terser';

export default function uglyCalf(outdir, beta, dev) {
  const options = rollupCalf(
    'dist/' + outdir + '/calfSystem.min.js',
    beta,
    dev
  );

  options.output.sourcemapFile = 'src/calfSystem.min.js.map';
  options.plugins.push(terser({
    output: {
      beautify: false,
      semicolons: false
    }
  }));

  return options;
}
