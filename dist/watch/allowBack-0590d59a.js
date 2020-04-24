import { o as onclick, S as querySelector } from './calfSystem-1499e8da.js';
import { d as dontPost } from './dontPost-f6e0d9ec.js';

function updateUrl(evt) {
  evt.preventDefault();
  dontPost();
}

function allowBack() {
  onclick(querySelector('input[type="submit"]'), updateUrl);
}

export default allowBack;
//# sourceMappingURL=allowBack-0590d59a.js.map
