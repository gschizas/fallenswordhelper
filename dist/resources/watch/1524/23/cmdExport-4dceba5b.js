import { q as extend } from './calfSystem-2b1fed3f.js';
import { i as indexAjaxJson } from './indexAjaxJson-bdb16b7c.js';

function cmdExport(data) {
  return indexAjaxJson(extend({ cmd: 'export' }, data));
}

export { cmdExport as c };
//# sourceMappingURL=cmdExport-4dceba5b.js.map
