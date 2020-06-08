import { f as on, p as pCC } from './calfSystem-c0288c6c.js';
import { f as formToUrl } from './formToUrl-112a5041.js';

function handleSubmit(e) {
  e.preventDefault();
  formToUrl(e.target);
}

function interceptSubmit(target) {
  on(target || pCC, 'submit', handleSubmit);
}

export { handleSubmit as h, interceptSubmit as i };
//# sourceMappingURL=interceptSubmit-cad751a8.js.map
