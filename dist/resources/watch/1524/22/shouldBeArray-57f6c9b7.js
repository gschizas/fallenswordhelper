import { G as getValue } from './calfSystem-995e3482.js';
import { c as csvSplit } from './csvSplit-40bd9bbc.js';

function shouldBeArray(pref) {
  const stored = getValue(pref);
  if (stored) { return csvSplit(stored); }
  return [];
}

export { shouldBeArray as s };
//# sourceMappingURL=shouldBeArray-57f6c9b7.js.map
