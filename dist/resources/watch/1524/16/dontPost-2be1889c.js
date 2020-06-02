import { H as querySelectorArray, I as indexPhp } from './calfSystem-6e4b53e3.js';

function urlParam(e) {
  return `${e.name}=${e.value}`;
}

function dontPost(scope) {
  const validInputs = querySelectorArray(
    'input:not([type="submit"]):not([type="button"]):not([type="checkbox"]), '
    + 'select, input[type="checkbox"]:checked', scope,
  );
  window.location = `${indexPhp}?${validInputs.map(urlParam).join('&')}`;
}

export { dontPost as d };
//# sourceMappingURL=dontPost-2be1889c.js.map
