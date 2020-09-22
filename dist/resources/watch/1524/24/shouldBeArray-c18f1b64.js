import { G as getValue } from './calfSystem-dea093d3.js';
import { c as csvSplit } from './csvSplit-dcc6dfc9.js';

function shouldBeArray(pref) {
  const stored = getValue(pref);
  if (stored) { return csvSplit(stored); }
  return [];
}

export { shouldBeArray as s };
//# sourceMappingURL=shouldBeArray-c18f1b64.js.map
