import dontPost from '../common/dontPost';
import on from '../common/on';
import querySelector from '../common/querySelector';

function updateUrl(evt) {
  evt.preventDefault();
  dontPost();
}

export default function allowBack() {
  on(querySelector('input[type="submit"]'), 'click', updateUrl);
}
