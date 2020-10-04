import { G as getValue } from './calfSystem-975d976a.js';
import { c as csvSplit } from './csvSplit-c9226810.js';

function shouldBeArray(pref) {
  const stored = getValue(pref);
  if (stored) { return csvSplit(stored); }
  return [];
}

export { shouldBeArray as s };
//# sourceMappingURL=shouldBeArray-86ddac10.js.map
