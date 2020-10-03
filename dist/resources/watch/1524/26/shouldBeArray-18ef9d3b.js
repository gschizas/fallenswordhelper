import { G as getValue } from './calfSystem-c851a12c.js';
import { c as csvSplit } from './csvSplit-653f6227.js';

function shouldBeArray(pref) {
  const stored = getValue(pref);
  if (stored) { return csvSplit(stored); }
  return [];
}

export { shouldBeArray as s };
//# sourceMappingURL=shouldBeArray-18ef9d3b.js.map
