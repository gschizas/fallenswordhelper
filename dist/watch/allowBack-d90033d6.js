import { o as onclick, S as querySelector } from './calfSystem-05ea3a63.js';
import { d as dontPost } from './dontPost-0ff218c1.js';

function updateUrl(evt) {
  evt.preventDefault();
  dontPost();
}

function allowBack() {
  onclick(querySelector('input[type="submit"]'), updateUrl);
}

export default allowBack;
//# sourceMappingURL=allowBack-d90033d6.js.map
