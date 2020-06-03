import { aR as retryAjax, n as extend } from './calfSystem-940bc1b5.js';
import { r as rnd } from './rnd-d97adf94.js';

function fetchdata(data) {
  return retryAjax({
    cache: false,
    url: 'fetchdata.php',
    data: extend(data, { fshrnd: rnd() }),
    dataType: 'json',
  });
}

export { fetchdata as f };
//# sourceMappingURL=fetchdata-f2e5da79.js.map
