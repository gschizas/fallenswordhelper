import {entries} from './entries';
import makeFolderSpan from './makeFolderSpan';

function wornSelector(needsWorn) {
  if (needsWorn) {return makeFolderSpan('-2', 'Worn');}
  return '';
}

function folderSpan(ary) {
  return makeFolderSpan(ary[0], ary[1]);
}

export default function makeFolderSpans(folders, needsWorn) {
  return makeFolderSpan('0', 'All') +
    wornSelector(needsWorn) +
    makeFolderSpan('-1', 'Main') +
    entries(folders).map(folderSpan).join('');
}
