import { o as onclick, S as querySelector } from './calfSystem-cb5d894f.js';
import { d as dontPost } from './dontPost-f7f61941.js';

function updateUrl(evt) {
  evt.preventDefault();
  dontPost();
}

function allowBack() {
  onclick(querySelector('input[type="submit"]'), updateUrl);
}

export default allowBack;
//# sourceMappingURL=allowBack-b0c9db1e.js.map
