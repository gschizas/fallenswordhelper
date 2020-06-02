import { aR as retryAjax, n as extend } from './calfSystem-f6498976.js';
import { r as rnd } from './rnd-7d0e4ea3.js';

function fetchdata(data) {
  return retryAjax({
    cache: false,
    url: 'fetchdata.php',
    data: extend(data, { fshrnd: rnd() }),
    dataType: 'json',
  });
}

export { fetchdata as f };
//# sourceMappingURL=fetchdata-56fd1d85.js.map
