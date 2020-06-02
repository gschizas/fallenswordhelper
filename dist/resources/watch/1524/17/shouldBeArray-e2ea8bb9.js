import { D as getValue } from './calfSystem-f6498976.js';
import { c as csvSplit } from './csvSplit-8807bbc7.js';

function shouldBeArray(pref) {
  const stored = getValue(pref);
  if (stored) { return csvSplit(stored); }
  return [];
}

export { shouldBeArray as s };
//# sourceMappingURL=shouldBeArray-e2ea8bb9.js.map
