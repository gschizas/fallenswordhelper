import { aR as retryAjax, n as extend } from './calfSystem-6e4b53e3.js';
import { r as rnd } from './rnd-4e9f8b11.js';

function fetchdata(data) {
  return retryAjax({
    cache: false,
    url: 'fetchdata.php',
    data: extend(data, { fshrnd: rnd() }),
    dataType: 'json',
  });
}

export { fetchdata as f };
//# sourceMappingURL=fetchdata-8d8b8f59.js.map
