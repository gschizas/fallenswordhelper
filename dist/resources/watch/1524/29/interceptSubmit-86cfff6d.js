import { k as on, p as pCC } from './calfSystem-b31646eb.js';
import { f as formToUrl } from './formToUrl-16cc4fc0.js';

function handleSubmit(e) {
  e.preventDefault();
  formToUrl(e.target);
}

function interceptSubmit(target) {
  on(target || pCC, 'submit', handleSubmit);
}

export { handleSubmit as h, interceptSubmit as i };
//# sourceMappingURL=interceptSubmit-86cfff6d.js.map
