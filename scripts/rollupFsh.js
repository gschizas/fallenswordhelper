import clear from 'rollup-plugin-clear';
import jscc from 'rollup-plugin-jscc';

export default function rollupFsh(outdir, jsccValues) {
  return {
    input: 'src/fallenswordhelper.user.js',
    output: {
      file: `dist/${outdir}/fallenswordhelper.user.js`,
      format: 'es'
    },
    plugins: [
      clear({targets: [`dist/${outdir}`]}),
      jscc({values: jsccValues}),
    ],
    external: [jsccValues._CALFJS]
  };
}
