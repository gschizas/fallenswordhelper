import { f as formToUrl } from './formToUrl-b273f7df.js';
import { k as on, p as pCC } from './calfSystem-91adbec8.js';

function handleSubmit(e) {
  e.preventDefault();
  formToUrl(e.target);
}

function interceptSubmit(target) {
  on(target || pCC, 'submit', handleSubmit);
}

export { handleSubmit as h, interceptSubmit as i };
//# sourceMappingURL=interceptSubmit-06382d8c.js.map
