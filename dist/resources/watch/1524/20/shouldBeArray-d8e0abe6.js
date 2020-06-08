import { G as getValue } from './calfSystem-c0288c6c.js';
import { c as csvSplit } from './csvSplit-dec7ba89.js';

function shouldBeArray(pref) {
  const stored = getValue(pref);
  if (stored) { return csvSplit(stored); }
  return [];
}

export { shouldBeArray as s };
//# sourceMappingURL=shouldBeArray-d8e0abe6.js.map
