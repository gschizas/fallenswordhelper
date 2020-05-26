import { o as onclick, M as querySelector } from './calfSystem-b469667c.js';
import { d as dontPost } from './dontPost-b432474a.js';

function updateUrl(evt) {
  evt.preventDefault();
  dontPost();
}

function allowBack() {
  onclick(querySelector('input[type="submit"]'), updateUrl);
}

export default allowBack;
//# sourceMappingURL=allowBack-e7989591.js.map
