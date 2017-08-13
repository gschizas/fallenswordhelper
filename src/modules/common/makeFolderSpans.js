export default function makeFolderSpans(folders) {
  return '<span class="fshLink folder" data-folder="0">All</span>' +
    ' &ensp;<span class="fshLink folder" data-folder="-1">Main</span>' +
    Object.keys(folders).reduce(function(prev, key) {
      return prev + ' &ensp;<span class="fshLink fshNoWrap folder" ' +
        'data-folder="' + key + '">' + folders[key] + '</span>';
    }, '');
}
