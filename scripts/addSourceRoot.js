const { calfVer, core } = require('./getVersion');
const fs = require('fs');
const { port } = require('./config.json');

const betaProdSourceRoot = 'https://rawcdn.githack.com/fallenswordhelper/fallenswordhelper/'
    + `${process.env.npm_package_version}`;

function addSourceRoot(file, sourceRoot) {
  const data = fs.readFileSync(file);
  const json = JSON.parse(data);
  json.sourceRoot = sourceRoot;
  fs.writeFileSync(file, JSON.stringify(json));
}

function fixMaps(dir, sourceRoot) {
  const thisDir = `dist/resources/${dir}`;
  fs.readdir(thisDir, (err, items) => {
    const maps = items.filter((fn) => fn.endsWith('.map'));
    maps.forEach((map) => { addSourceRoot(`${thisDir}/${map}`, sourceRoot); });
  });
}

fixMaps(`dev/${core}`, `https://localhost:${port}`);
fixMaps(`dev/${core}/${calfVer}`, `https://localhost:${port}`);
fixMaps(`beta/${core}`, betaProdSourceRoot);
fixMaps(`beta/${core}/${calfVer}`, betaProdSourceRoot);
fixMaps(`prod/${core}`, betaProdSourceRoot);
fixMaps(`prod/${core}/${calfVer}`, betaProdSourceRoot);
