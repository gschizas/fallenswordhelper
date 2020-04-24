import { M as querySelectorArray, N as indexPhp } from './calfSystem-69cf053a.js';

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
//# sourceMappingURL=dontPost-e04d2e64.js.map
