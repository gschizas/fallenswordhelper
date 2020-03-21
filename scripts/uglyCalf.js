import rollupCalf from './rollupCalf';
import {terser} from 'rollup-plugin-terser';

export default function uglyCalf(outdir, jsccValues) {
  const options = rollupCalf(
    `dist/${outdir}/calfSystem.min.js`,
    jsccValues
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
