import calf from '../support/calf';
import * as layout from '../support/layout';

export default function doFolderButtons(folders) {
  if (calf.subcmd2 === 'storeitems') {
    var formNode = layout.pCC.getElementsByTagName('form')[0];
    var tr = document.createElement('tr');
    tr.className = 'fshCenter';
    var insertHere = document.createElement('td');
    insertHere.colSpan = 3;
    tr.appendChild(insertHere);
    formNode.parentNode.insertBefore(tr, formNode);
    var inject = '<span class="fshLink folder" data-folder="0">All</span>' +
      ' &ensp;<span class="fshLink folder" data-folder="-1">Main</span>';
    Object.keys(folders).forEach(function(key) {
      inject += ' &ensp;<span class="fshLink fshNoWrap folder" data-folder="' +
        key + '">' + folders[key] + '</span>';
    });
    insertHere.innerHTML = inject;
  }
}
