import dontPost from '../common/dontPost';
import onclick from '../common/onclick';
import querySelector from '../common/querySelector';

function updateUrl(evt) {
  evt.preventDefault();
  dontPost();
}

export default function allowBack() {
  onclick(querySelector('input[type="submit"]'), updateUrl);
}
