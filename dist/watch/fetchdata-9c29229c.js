import { a$ as retryAjax, aS as extend } from './calfSystem-1499e8da.js';
import { r as rnd } from './rnd-32f50b63.js';

function fetchdata(data) {
  return retryAjax({
    cache: false,
    url: 'fetchdata.php',
    data: extend(data, { fshrnd: rnd() }),
    dataType: 'json',
  });
}

export { fetchdata as f };
//# sourceMappingURL=fetchdata-9c29229c.js.map
