const version = require('../package.json').version;
const varAry = version.split('.');
export const core = varAry[0] + varAry[1];
export const calfVer = varAry[2];
