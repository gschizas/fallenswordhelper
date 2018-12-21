import extend from '../common/extend';
import retryAjax from '../ajax/retryAjax';

export default function postApp(data) {
  extend(data, {app: 1});
  return retryAjax({
    type: 'POST',
    url: 'app.php',
    data: data,
    dataType: 'json'
  });
}
