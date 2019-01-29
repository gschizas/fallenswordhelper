import dontPost from '../common/dontPost';
import querySelector from '../common/querySelector';

export default function updateGoUrl(e) {
  e.preventDefault();
  dontPost(querySelector('#pCC input[value="completed"]').parentNode);
}
