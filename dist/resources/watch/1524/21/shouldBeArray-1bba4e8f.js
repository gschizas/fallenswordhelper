import { G as getValue } from './calfSystem-b0234231.js';
import { c as csvSplit } from './csvSplit-a62e9db2.js';

function shouldBeArray(pref) {
  const stored = getValue(pref);
  if (stored) { return csvSplit(stored); }
  return [];
}

export { shouldBeArray as s };
//# sourceMappingURL=shouldBeArray-1bba4e8f.js.map
