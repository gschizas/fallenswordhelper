import {beginFolderSpanElement} from '../support/dataObj';

export default function makeFolderSpans(folders, needsWorn) {
  var wornSelector = '';
  if (needsWorn) {
    wornSelector = ' &ensp;' + beginFolderSpanElement + '-2">Worn</span>';
  }
  return beginFolderSpanElement + '0">All</span>' + wornSelector +
    ' &ensp;' + beginFolderSpanElement + '-1">Main</span>' +
    Object.keys(folders).reduce(function(prev, key) {
      return prev + ' &ensp;' + beginFolderSpanElement + key + '">' +
        folders[key] + '</span>';
    }, '');
}
