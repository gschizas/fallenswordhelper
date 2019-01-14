import extend from '../common/extend';
import retryAjax from '../ajax/retryAjax';

export default function callApp(data) {
  return retryAjax({
    url: 'app.php',
    data: extend(data, {app: 1}),
    dataType: 'json'
  });
}
