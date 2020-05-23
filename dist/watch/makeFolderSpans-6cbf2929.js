import { q as entries } from './calfSystem-e592bbc5.js';
import { m as makeFolderSpan } from './makeFolderSpan-cdd30b04.js';

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
//# sourceMappingURL=makeFolderSpans-6cbf2929.js.map
