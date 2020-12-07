import { k as on, p as pCC } from './calfSystem-d357ca6f.js';
import { f as formToUrl } from './formToUrl-b0bbd7c6.js';

function handleSubmit(e) {
  e.preventDefault();
  formToUrl(e.target);
}

function interceptSubmit(target) {
  on(target || pCC, 'submit', handleSubmit);
}

export { handleSubmit as h, interceptSubmit as i };
//# sourceMappingURL=interceptSubmit-8526eadf.js.map
