import { l as entries } from './calfSystem-b469667c.js';
import { m as makeFolderSpan } from './makeFolderSpan-dbe9d16f.js';

function wornSelector(needsWorn) {
  if (needsWorn) { return makeFolderSpan('-2', 'Worn'); }
  return '';
}

function folderSpan(ary) {
  return makeFolderSpan(ary[0], ary[1]);
}

function makeFolderSpans(folders, needsWorn) {
  return makeFolderSpan('0', 'All')
    + wornSelector(needsWorn)
    + makeFolderSpan('-1', 'Main')
    + entries(folders).map(folderSpan).join('');
}

export { makeFolderSpans as m };
//# sourceMappingURL=makeFolderSpans-685ce153.js.map
