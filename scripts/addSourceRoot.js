const fs = require('fs');

function addSourceRoot(file, sourceRoot) {
  const data = fs.readFileSync(file);
  const json = JSON.parse(data);
  json.sourceRoot = sourceRoot;
  fs.writeFileSync(file, JSON.stringify(json));
}

const betaProdSourceRoot =
  'https://rawcdn.githack.com/fallenswordhelper/fallenswordhelper/' +
    process.env.npm_package_version + '/src';

addSourceRoot('dist/dev/calfSystem.min.js.map', 'https://localhost:9966/src');
addSourceRoot('dist/beta/calfSystem.min.js.map', betaProdSourceRoot);
addSourceRoot('dist/prod/calfSystem.min.js.map', betaProdSourceRoot);
