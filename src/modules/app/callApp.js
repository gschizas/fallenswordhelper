import {mixin} from '../common/cElement';
import retryAjax from '../ajax/retryAjax';

export default function callApp(data) {
  mixin(data, {app: 1});
  return retryAjax({
    url: 'app.php',
    data: data,
    dataType: 'json'
  });
}
