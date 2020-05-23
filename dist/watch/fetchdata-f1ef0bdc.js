import { a$ as retryAjax, aS as extend } from './calfSystem-cb5d894f.js';
import { r as rnd } from './rnd-e77dd780.js';

function fetchdata(data) {
  return retryAjax({
    cache: false,
    url: 'fetchdata.php',
    data: extend(data, { fshrnd: rnd() }),
    dataType: 'json',
  });
}

export { fetchdata as f };
//# sourceMappingURL=fetchdata-f1ef0bdc.js.map
