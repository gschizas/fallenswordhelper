import { o as onclick, S as querySelector } from './calfSystem-69cf053a.js';
import { d as dontPost } from './dontPost-e04d2e64.js';

function updateUrl(evt) {
  evt.preventDefault();
  dontPost();
}

function allowBack() {
  onclick(querySelector('input[type="submit"]'), updateUrl);
}

export default allowBack;
//# sourceMappingURL=allowBack-219b6959.js.map
