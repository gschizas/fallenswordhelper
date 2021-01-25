import { c as csvSplit } from './csvSplit-a4e91aa0.js';
import { H as getValue } from './calfSystem-e64be67d.js';

function shouldBeArray(pref) {
  const stored = getValue(pref);
  if (stored) { return csvSplit(stored); }
  return [];
}

export { shouldBeArray as s };
//# sourceMappingURL=shouldBeArray-796d1101.js.map
