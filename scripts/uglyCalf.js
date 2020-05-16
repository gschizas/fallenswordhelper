import rollupCalf from './rollupCalf';

export default function uglyCalf(outdir, jsccValues, labels) {
  const options = rollupCalf(
    `dist/${outdir}`,
    '[name].min.js',
    jsccValues,
    labels,
  );

  if (['beta', 'prod'].includes(outdir)) {
    options.output.sourcemapPathTransform = (relativePath) => relativePath.replace('..\\..\\', '');
  }

  return options;
}
