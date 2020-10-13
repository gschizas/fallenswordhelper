import { k as on, p as pCC } from './calfSystem-21d16a0e.js';
import { f as formToUrl } from './formToUrl-2fddf9de.js';

function handleSubmit(e) {
  e.preventDefault();
  formToUrl(e.target);
}

function interceptSubmit(target) {
  on(target || pCC, 'submit', handleSubmit);
}

export { handleSubmit as h, interceptSubmit as i };
//# sourceMappingURL=interceptSubmit-719ace11.js.map
