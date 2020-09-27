import { k as on, p as pCC } from './calfSystem-0ffc234f.js';
import { f as formToUrl } from './formToUrl-a527c245.js';

function handleSubmit(e) {
  e.preventDefault();
  formToUrl(e.target);
}

function interceptSubmit(target) {
  on(target || pCC, 'submit', handleSubmit);
}

export { handleSubmit as h, interceptSubmit as i };
//# sourceMappingURL=interceptSubmit-b0fa4c9c.js.map
