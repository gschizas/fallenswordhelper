import { k as on, p as pCC } from './calfSystem-975d976a.js';
import { f as formToUrl } from './formToUrl-5a234537.js';

function handleSubmit(e) {
  e.preventDefault();
  formToUrl(e.target);
}

function interceptSubmit(target) {
  on(target || pCC, 'submit', handleSubmit);
}

export { handleSubmit as h, interceptSubmit as i };
//# sourceMappingURL=interceptSubmit-653ee929.js.map
