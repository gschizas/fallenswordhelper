import { aR as retryAjax, n as extend } from './calfSystem-03895320.js';
import { r as rnd } from './rnd-922e1804.js';

function fetchdata(data) {
  return retryAjax({
    cache: false,
    url: 'fetchdata.php',
    data: extend(data, { fshrnd: rnd() }),
    dataType: 'json',
  });
}

export { fetchdata as f };
//# sourceMappingURL=fetchdata-d17f3627.js.map
