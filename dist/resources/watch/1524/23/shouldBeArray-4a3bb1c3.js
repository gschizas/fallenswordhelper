import { G as getValue } from './calfSystem-2b1fed3f.js';
import { c as csvSplit } from './csvSplit-4ba7a6af.js';

function shouldBeArray(pref) {
  const stored = getValue(pref);
  if (stored) { return csvSplit(stored); }
  return [];
}

export { shouldBeArray as s };
//# sourceMappingURL=shouldBeArray-4a3bb1c3.js.map
