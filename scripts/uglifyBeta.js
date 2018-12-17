const uglifyCalf = require('./uglifyCalf');

uglifyCalf(
  'dist/beta',
  'https://rawcdn.githack.com/fallenswordhelper/fallenswordhelper/' + process.env.npm_package_version + '/src'
);
