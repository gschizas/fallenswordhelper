import { n as extend } from './calfSystem-f6498976.js';
import { i as indexAjaxJson } from './indexAjaxJson-d6e4bb8c.js';

function cmdExport(data) {
  return indexAjaxJson(extend({ cmd: 'export' }, data));
}

export { cmdExport as c };
//# sourceMappingURL=cmdExport-04d8cb57.js.map
