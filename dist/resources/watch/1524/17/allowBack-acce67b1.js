import { o as onclick, N as querySelector } from './calfSystem-f6498976.js';
import { d as dontPost } from './dontPost-9f2bc09d.js';

function updateUrl(evt) {
  evt.preventDefault();
  dontPost();
}

function allowBack() {
  onclick(querySelector('input[type="submit"]'), updateUrl);
}

export default allowBack;
//# sourceMappingURL=allowBack-acce67b1.js.map
