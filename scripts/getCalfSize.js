/* eslint-disable no-console */

const { calfVer, core } = require('./getVersion');
const fs = require('fs');
const gzipSize = require('gzip-size');

const calfFiles = (fn) => fn.startsWith('calfSystem-') && fn.endsWith('.js');

function getFileSize(file) {
  const stats = fs.statSync(file);
  const fileSizeInKilobytes = Math.round(stats.size / 10.24) / 100;
  console.log(`${file}: ${fileSizeInKilobytes}KB (no compression)`);

  const gsize = gzipSize.fileSync(file, { level: 5 });
  const gSizeInKilobytes = Math.round(gsize / 10.24) / 100;
  console.log(`${file}: ${gSizeInKilobytes}KB (gzip)\n`);
}

function getCalfSize(dir) {
  const thisDir = `dist/resources/${dir}/${core}/${calfVer}`;
  fs.readdir(thisDir, (err, items) => {
    const files = items.filter(calfFiles);
    files.forEach((fn) => { getFileSize(`${thisDir}/${fn}`); });
  });
}

getCalfSize('dev');
getCalfSize('beta');
getCalfSize('prod');
