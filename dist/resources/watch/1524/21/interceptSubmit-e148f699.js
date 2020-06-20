import { k as on, p as pCC } from './calfSystem-b0234231.js';
import { f as formToUrl } from './formToUrl-a03ba266.js';

function handleSubmit(e) {
  e.preventDefault();
  formToUrl(e.target);
}

function interceptSubmit(target) {
  on(target || pCC, 'submit', handleSubmit);
}

export { handleSubmit as h, interceptSubmit as i };
//# sourceMappingURL=interceptSubmit-e148f699.js.map
