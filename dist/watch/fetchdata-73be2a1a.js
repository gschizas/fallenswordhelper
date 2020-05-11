import { a$ as retryAjax, aS as extend } from './calfSystem-05ea3a63.js';
import { r as rnd } from './rnd-aca24d57.js';

function fetchdata(data) {
  return retryAjax({
    cache: false,
    url: 'fetchdata.php',
    data: extend(data, { fshrnd: rnd() }),
    dataType: 'json',
  });
}

export { fetchdata as f };
//# sourceMappingURL=fetchdata-73be2a1a.js.map
