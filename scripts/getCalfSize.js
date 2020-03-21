/* eslint-disable no-console */

const fs = require('fs');
const gzipSize = require('gzip-size');

function getCalfSize(outdir) {
  const file = `dist/${outdir}/calfSystem.min.js`;

  const stats = fs.statSync(file);
  const fileSizeInKilobytes = Math.round(stats.size / 10.24) / 100;
  console.log(`${file}: ${fileSizeInKilobytes}KB (no compression)`);

  const gsize = gzipSize.fileSync(file, {level: 5});
  const gSizeInKilobytes = Math.round(gsize / 10.24) / 100;
  console.log(`${file}: ${gSizeInKilobytes}KB (gzip)\n`);
}

getCalfSize('dev');
getCalfSize('beta');
getCalfSize('prod');
