import rollupCalf from './rollupCalf';
import {uglify} from 'rollup-plugin-uglify';

export default function uglyCalf(outdir, beta, dev) {
  const options = rollupCalf(
    'dist/' + outdir + '/calfSystem.min.js',
    beta,
    dev
  );

  options.output.sourcemapFile = 'src/calfSystem.min.js.map';
  options.plugins.push(uglify({
    output: {
      beautify: false,
      semicolons: false
    }
  }));

  return options;
}
