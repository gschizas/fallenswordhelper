import { M as querySelectorArray, N as indexPhp } from './calfSystem-43606e5e.js';

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
//# sourceMappingURL=dontPost-4ce1ffd1.js.map
