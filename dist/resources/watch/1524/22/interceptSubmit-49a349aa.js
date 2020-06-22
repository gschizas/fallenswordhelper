import { k as on, p as pCC } from './calfSystem-995e3482.js';
import { f as formToUrl } from './formToUrl-c6f1dab2.js';

function handleSubmit(e) {
  e.preventDefault();
  formToUrl(e.target);
}

function interceptSubmit(target) {
  on(target || pCC, 'submit', handleSubmit);
}

export { handleSubmit as h, interceptSubmit as i };
//# sourceMappingURL=interceptSubmit-49a349aa.js.map
