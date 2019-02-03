import dontPost from '../common/dontPost';
import on from '../common/on';
import {pCC} from '../support/layout';
import querySelector from '../common/querySelector';

function updateUrl(e) {
  e.preventDefault();
  dontPost(pCC);
}

export default function allowBack() {
  var submitButton = querySelector('input[type="submit"]', pCC);
  if (submitButton) {
    on(submitButton, 'click', updateUrl);
  }
}
