import dontPost from '../common/dontPost';
import on from '../common/on';

function updateUrl(evt) {
  evt.preventDefault();
  dontPost();
}

export default function allowBack() {
  on(document.querySelector('input[type="submit"]'), 'click', updateUrl);
}
