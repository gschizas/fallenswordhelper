import { o as onclick, N as querySelector } from './calfSystem-03895320.js';
import { d as dontPost } from './dontPost-8839e18d.js';

function updateUrl(evt) {
  evt.preventDefault();
  dontPost();
}

function allowBack() {
  onclick(querySelector('input[type="submit"]'), updateUrl);
}

export default allowBack;
//# sourceMappingURL=allowBack-a1a88c78.js.map
