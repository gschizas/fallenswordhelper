import { o as onclick, N as querySelector } from './calfSystem-940bc1b5.js';
import { d as dontPost } from './dontPost-2931988f.js';

function updateUrl(evt) {
  evt.preventDefault();
  dontPost();
}

function allowBack() {
  onclick(querySelector('input[type="submit"]'), updateUrl);
}

export default allowBack;
//# sourceMappingURL=allowBack-36a67a4e.js.map
