import dontPost from '../common/dontPost';

export default function updateUrl(e) {
  e.preventDefault();
  dontPost(e.target.parentNode);
}
