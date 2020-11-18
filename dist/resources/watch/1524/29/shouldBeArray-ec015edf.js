import { G as getValue } from './calfSystem-b31646eb.js';
import { c as csvSplit } from './csvSplit-b214d56b.js';

function shouldBeArray(pref) {
  const stored = getValue(pref);
  if (stored) { return csvSplit(stored); }
  return [];
}

export { shouldBeArray as s };
//# sourceMappingURL=shouldBeArray-ec015edf.js.map
