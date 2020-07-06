import { k as on, p as pCC } from './calfSystem-2b1fed3f.js';
import { f as formToUrl } from './formToUrl-b13d3faa.js';

function handleSubmit(e) {
  e.preventDefault();
  formToUrl(e.target);
}

function interceptSubmit(target) {
  on(target || pCC, 'submit', handleSubmit);
}

export { handleSubmit as h, interceptSubmit as i };
//# sourceMappingURL=interceptSubmit-b78fe85b.js.map
