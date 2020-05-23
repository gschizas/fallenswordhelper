import { o as onclick, S as querySelector } from './calfSystem-98d7118c.js';
import { d as dontPost } from './dontPost-043b70f2.js';

function updateUrl(evt) {
  evt.preventDefault();
  dontPost();
}

function allowBack() {
  onclick(querySelector('input[type="submit"]'), updateUrl);
}

export default allowBack;
//# sourceMappingURL=allowBack-07bad7ed.js.map
