import { c as csvSplit } from './csvSplit-aa512e64.js';
import { H as getValue } from './calfSystem-91adbec8.js';

function shouldBeArray(pref) {
  const stored = getValue(pref);
  if (stored) { return csvSplit(stored); }
  return [];
}

export { shouldBeArray as s };
//# sourceMappingURL=shouldBeArray-623d21b2.js.map
