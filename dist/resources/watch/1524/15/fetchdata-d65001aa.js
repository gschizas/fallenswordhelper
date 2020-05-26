import { aK as retryAjax, n as extend } from './calfSystem-b469667c.js';
import { r as rnd } from './rnd-bc978e86.js';

function fetchdata(data) {
  return retryAjax({
    cache: false,
    url: 'fetchdata.php',
    data: extend(data, { fshrnd: rnd() }),
    dataType: 'json',
  });
}

export { fetchdata as f };
//# sourceMappingURL=fetchdata-d65001aa.js.map
