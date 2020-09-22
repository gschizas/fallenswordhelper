import { k as on, p as pCC } from './calfSystem-dea093d3.js';
import { f as formToUrl } from './formToUrl-a24fc80c.js';

function handleSubmit(e) {
  e.preventDefault();
  formToUrl(e.target);
}

function interceptSubmit(target) {
  on(target || pCC, 'submit', handleSubmit);
}

export { handleSubmit as h, interceptSubmit as i };
//# sourceMappingURL=interceptSubmit-609c1a86.js.map
