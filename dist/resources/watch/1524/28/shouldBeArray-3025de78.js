import { G as getValue } from './calfSystem-21d16a0e.js';
import { c as csvSplit } from './csvSplit-ab694daa.js';

function shouldBeArray(pref) {
  const stored = getValue(pref);
  if (stored) { return csvSplit(stored); }
  return [];
}

export { shouldBeArray as s };
//# sourceMappingURL=shouldBeArray-3025de78.js.map
