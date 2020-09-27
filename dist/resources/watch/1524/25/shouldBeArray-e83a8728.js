import { G as getValue } from './calfSystem-0ffc234f.js';
import { c as csvSplit } from './csvSplit-8c1a6c7f.js';

function shouldBeArray(pref) {
  const stored = getValue(pref);
  if (stored) { return csvSplit(stored); }
  return [];
}

export { shouldBeArray as s };
//# sourceMappingURL=shouldBeArray-e83a8728.js.map
