import { D as getValue } from './calfSystem-940bc1b5.js';
import { c as csvSplit } from './csvSplit-b01f0262.js';

function shouldBeArray(pref) {
  const stored = getValue(pref);
  if (stored) { return csvSplit(stored); }
  return [];
}

export { shouldBeArray as s };
//# sourceMappingURL=shouldBeArray-71f90aa7.js.map
