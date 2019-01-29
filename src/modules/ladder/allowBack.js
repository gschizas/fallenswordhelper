import dontPost from '../common/dontPost';
import on from '../common/on';
import {pCC} from '../support/layout';

function updateUrl(e) {
  e.preventDefault();
  dontPost(pCC);
}

export default function allowBack() {
  var submitButton = pCC.querySelector('input[type="submit"]');
  if (submitButton) {
    on(submitButton, 'click', updateUrl);
  }
}
