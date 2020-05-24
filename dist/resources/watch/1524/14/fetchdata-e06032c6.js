import { a$ as retryAjax, aS as extend } from './calfSystem-43606e5e.js';
import { r as rnd } from './rnd-83ef0984.js';

function fetchdata(data) {
  return retryAjax({
    cache: false,
    url: 'fetchdata.php',
    data: extend(data, { fshrnd: rnd() }),
    dataType: 'json',
  });
}

export { fetchdata as f };
//# sourceMappingURL=fetchdata-e06032c6.js.map
