import { q as entries } from './calfSystem-69cf053a.js';
import { m as makeFolderSpan } from './makeFolderSpan-e92e1739.js';

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
//# sourceMappingURL=makeFolderSpans-a5a078f5.js.map
