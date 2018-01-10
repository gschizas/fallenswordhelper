import extend from '../common/extend';
import retryAjax from '../ajax/retryAjax';

export default function callApp(data) {
  extend(data, {app: 1});
  return retryAjax({
    url: 'app.php',
    data: data,
    dataType: 'json'
  });
}
