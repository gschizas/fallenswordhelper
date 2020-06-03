import { n as extend } from './calfSystem-940bc1b5.js';
import { i as indexAjaxJson } from './indexAjaxJson-c1eaa5d5.js';

function cmdExport(data) {
  return indexAjaxJson(extend({ cmd: 'export' }, data));
}

export { cmdExport as c };
//# sourceMappingURL=cmdExport-76b2dc80.js.map
