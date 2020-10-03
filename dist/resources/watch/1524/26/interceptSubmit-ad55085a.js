import { k as on, p as pCC } from './calfSystem-c851a12c.js';
import { f as formToUrl } from './formToUrl-19af2e75.js';

function handleSubmit(e) {
  e.preventDefault();
  formToUrl(e.target);
}

function interceptSubmit(target) {
  on(target || pCC, 'submit', handleSubmit);
}

export { handleSubmit as h, interceptSubmit as i };
//# sourceMappingURL=interceptSubmit-ad55085a.js.map
