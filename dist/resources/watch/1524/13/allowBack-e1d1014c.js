import { o as onclick, S as querySelector } from './calfSystem-5ce1fc75.js';
import { d as dontPost } from './dontPost-81b0b66f.js';

function updateUrl(evt) {
  evt.preventDefault();
  dontPost();
}

function allowBack() {
  onclick(querySelector('input[type="submit"]'), updateUrl);
}

export default allowBack;
//# sourceMappingURL=allowBack-e1d1014c.js.map
