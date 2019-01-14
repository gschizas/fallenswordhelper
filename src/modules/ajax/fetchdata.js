import extend from '../common/extend';
import retryAjax from './retryAjax';
import rnd from '../system/rnd';

export default function fetchdata(data) {
  return retryAjax({
    cache: false,
    url: 'fetchdata.php',
    data: extend(data, {_rnd: rnd()}),
    dataType: 'json'
  });
}
