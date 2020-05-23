import { a$ as retryAjax, aS as extend } from './calfSystem-5ce1fc75.js';
import { r as rnd } from './rnd-25e2ef71.js';

function fetchdata(data) {
  return retryAjax({
    cache: false,
    url: 'fetchdata.php',
    data: extend(data, { fshrnd: rnd() }),
    dataType: 'json',
  });
}

export { fetchdata as f };
//# sourceMappingURL=fetchdata-4a026c29.js.map
