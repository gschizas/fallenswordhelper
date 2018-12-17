const uglifyCalf = require('./uglifyCalf');

uglifyCalf(
  'dist/prod',
  'https://rawcdn.githack.com/fallenswordhelper/fallenswordhelper/' + process.env.npm_package_version + '/src'
);
