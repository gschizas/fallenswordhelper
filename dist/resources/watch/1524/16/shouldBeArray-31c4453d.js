import { D as getValue } from './calfSystem-6e4b53e3.js';
import { c as csvSplit } from './csvSplit-bd3b1398.js';

function shouldBeArray(pref) {
  const stored = getValue(pref);
  if (stored) { return csvSplit(stored); }
  return [];
}

export { shouldBeArray as s };
//# sourceMappingURL=shouldBeArray-31c4453d.js.map
