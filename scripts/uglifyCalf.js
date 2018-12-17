module.exports = function(loc, root) {
  const fs = require('fs');
  const uglifyJs = require('uglify-js');

  const code = fs.readFileSync(loc + '/calfSystem.js', 'utf8');
  const content = fs.readFileSync(loc + '/calfSystem.js.map', 'utf8');
  const options = {
    output: {
      beautify: false,
      semicolons: false
    },
    sourceMap: {
      content: content,
      root: root,
      url: 'calfSystem.min.js.map'
    }
  };
  const result = uglifyJs.minify(code, options);

  fs.writeFileSync(loc + '/calfSystem.min.js', result.code);
  fs.writeFileSync(loc + '/calfSystem.min.js.map', result.map);
};
