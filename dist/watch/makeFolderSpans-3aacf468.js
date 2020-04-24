import { q as entries } from './calfSystem-1499e8da.js';
import { m as makeFolderSpan } from './makeFolderSpan-c77fa67d.js';

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
//# sourceMappingURL=makeFolderSpans-3aacf468.js.map
