import { D as getValue } from './calfSystem-03895320.js';
import { c as csvSplit } from './csvSplit-05033d99.js';

function shouldBeArray(pref) {
  const stored = getValue(pref);
  if (stored) { return csvSplit(stored); }
  return [];
}

export { shouldBeArray as s };
//# sourceMappingURL=shouldBeArray-0f4ea7a8.js.map
