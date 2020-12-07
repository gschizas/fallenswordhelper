import { G as getValue } from './calfSystem-d357ca6f.js';
import { c as csvSplit } from './csvSplit-1d6bbc93.js';

function shouldBeArray(pref) {
  const stored = getValue(pref);
  if (stored) { return csvSplit(stored); }
  return [];
}

export { shouldBeArray as s };
//# sourceMappingURL=shouldBeArray-9565f7ee.js.map
