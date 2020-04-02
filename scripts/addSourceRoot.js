const fs = require('fs');
const port = require('./config.json').port;

const betaProdSourceRoot =
  'https://rawcdn.githack.com/fallenswordhelper/fallenswordhelper/' +
    `${process.env.npm_package_version}/src`;

function addSourceRoot(file, sourceRoot) {
  const data = fs.readFileSync(file);
  const json = JSON.parse(data);
  json.sourceRoot = sourceRoot;
  fs.writeFileSync(file, JSON.stringify(json));
}

function fixMaps(dir, sourceRoot) {
  fs.readdir(`dist/${dir}`, (err, items) => {
    const maps = items.filter(fn => fn.endsWith('.map'));
    maps.forEach(map => {addSourceRoot(`dist/${dir}/${map}`, sourceRoot);});
  });
}

fixMaps('dev', `https://localhost:${port}/src`);
fixMaps('beta', betaProdSourceRoot);
fixMaps('prod', betaProdSourceRoot);
