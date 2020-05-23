import { o as onclick, S as querySelector } from './calfSystem-e592bbc5.js';
import { d as dontPost } from './dontPost-6ead6cf8.js';

function updateUrl(evt) {
  evt.preventDefault();
  dontPost();
}

function allowBack() {
  onclick(querySelector('input[type="submit"]'), updateUrl);
}

export default allowBack;
//# sourceMappingURL=allowBack-de3ded02.js.map
