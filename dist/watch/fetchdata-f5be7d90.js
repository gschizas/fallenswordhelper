import { a$ as retryAjax, aS as extend } from './calfSystem-69cf053a.js';
import { r as rnd } from './rnd-0abc44b8.js';

function fetchdata(data) {
  return retryAjax({
    cache: false,
    url: 'fetchdata.php',
    data: extend(data, { fshrnd: rnd() }),
    dataType: 'json',
  });
}

export { fetchdata as f };
//# sourceMappingURL=fetchdata-f5be7d90.js.map
