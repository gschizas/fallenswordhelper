import dontPost from '../common/dontPost';
import onclick from '../common/onclick';
import { pCC } from '../support/layout';
import querySelector from '../common/querySelector';

function updateUrl(e) {
  e.preventDefault();
  dontPost(pCC);
}

export default function allowBack() {
  const submitButton = querySelector('input[type="submit"]', pCC);
  if (submitButton) {
    onclick(submitButton, updateUrl);
  }
}
