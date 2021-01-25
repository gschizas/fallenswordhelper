import { f as formToUrl } from './formToUrl-b80842cb.js';
import { k as on, p as pCC } from './calfSystem-e64be67d.js';

function handleSubmit(e) {
  e.preventDefault();
  formToUrl(e.target);
}

function interceptSubmit(target) {
  on(target || pCC, 'submit', handleSubmit);
}

export { handleSubmit as h, interceptSubmit as i };
//# sourceMappingURL=interceptSubmit-448d7237.js.map
