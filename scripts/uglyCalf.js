import rollupCalf from './rollupCalf';
import {terser} from 'rollup-plugin-terser';

export default function uglyCalf(outdir, css, beta, dev) {
  const options = rollupCalf(
    `dist/${outdir}/calfSystem.min.js`,
    css,
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
