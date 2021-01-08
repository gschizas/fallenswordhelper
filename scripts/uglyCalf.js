import rollupCalf from './rollupCalf';

const { core } = require('./getVersion');

export default function uglyCalf(outdir, jsccValues, labels) {
  const options = rollupCalf(
    `dist/resources/${outdir}/${core}`,
    '[name].min.js',
    jsccValues,
    labels,
  );

  if (['beta', 'prod'].includes(outdir)) {
    options.output.sourcemapPathTransform = (relativePath) => relativePath
      .replace('..\\..\\..\\..\\..\\', '');
  }

  return options;
}
