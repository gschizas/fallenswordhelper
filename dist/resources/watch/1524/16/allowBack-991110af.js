import { o as onclick, N as querySelector } from './calfSystem-6e4b53e3.js';
import { d as dontPost } from './dontPost-2be1889c.js';

function updateUrl(evt) {
  evt.preventDefault();
  dontPost();
}

function allowBack() {
  onclick(querySelector('input[type="submit"]'), updateUrl);
}

export default allowBack;
//# sourceMappingURL=allowBack-991110af.js.map
