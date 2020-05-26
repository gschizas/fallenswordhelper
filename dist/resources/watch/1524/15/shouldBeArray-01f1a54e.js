import { D as getValue } from './calfSystem-b469667c.js';
import { c as csvSplit } from './csvSplit-d90cb455.js';

function shouldBeArray(pref) {
  const stored = getValue(pref);
  if (stored) { return csvSplit(stored); }
  return [];
}

export { shouldBeArray as s };
//# sourceMappingURL=shouldBeArray-01f1a54e.js.map
