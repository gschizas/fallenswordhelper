import { l as entries } from './calfSystem-03895320.js';
import { m as makeFolderSpan } from './makeFolderSpan-25c51351.js';

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
//# sourceMappingURL=makeFolderSpans-94d00657.js.map
