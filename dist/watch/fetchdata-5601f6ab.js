import { a$ as retryAjax, aS as extend } from './calfSystem-e592bbc5.js';
import { r as rnd } from './rnd-adb3744d.js';

function fetchdata(data) {
  return retryAjax({
    cache: false,
    url: 'fetchdata.php',
    data: extend(data, { fshrnd: rnd() }),
    dataType: 'json',
  });
}

export { fetchdata as f };
//# sourceMappingURL=fetchdata-5601f6ab.js.map
