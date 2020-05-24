import { o as onclick, S as querySelector } from './calfSystem-43606e5e.js';
import { d as dontPost } from './dontPost-4ce1ffd1.js';

function updateUrl(evt) {
  evt.preventDefault();
  dontPost();
}

function allowBack() {
  onclick(querySelector('input[type="submit"]'), updateUrl);
}

export default allowBack;
//# sourceMappingURL=allowBack-e28e91a9.js.map
