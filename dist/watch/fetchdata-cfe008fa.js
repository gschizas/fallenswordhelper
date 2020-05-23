import { a$ as retryAjax, aS as extend } from './calfSystem-98d7118c.js';
import { r as rnd } from './rnd-0b9540b0.js';

function fetchdata(data) {
  return retryAjax({
    cache: false,
    url: 'fetchdata.php',
    data: extend(data, { fshrnd: rnd() }),
    dataType: 'json',
  });
}

export { fetchdata as f };
//# sourceMappingURL=fetchdata-cfe008fa.js.map
