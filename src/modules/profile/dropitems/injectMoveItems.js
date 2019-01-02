import getElementsByTagName from '../../common/getElementsByTagName';
import insertHtmlAfterEnd from '../../common/insertHtmlAfterEnd';
import {pCC} from '../../support/layout';

export default function injectMoveItems() {
  var flrRow = getElementsByTagName('form', pCC)[0]
    .nextElementSibling.nextElementSibling.nextElementSibling;
  var folders = getElementsByTagName('img', flrRow);
  var flrEnabled;
  var oFlr;
  var options = '<tr><td class="fshCenter">Move selected items to: ' +
    '<select name="folder" id="selectFolderId" class="customselect">';
  Array.prototype.forEach.call(folders, function(e) {
    var src = e.getAttribute('src');
    if (src.indexOf('/folder_on.gif') !== -1) {flrEnabled = true;}
    if (src.indexOf('/folder.gif') !== -1) {
      oFlr = true;
      options += '<option value=' + e.parentNode.href
        .match(/&folder_id=(-*\d+)/i)[1] + '>' +
        e.parentNode.parentNode.textContent + '</option>';
    }
  });
  if (!flrEnabled || !oFlr) {return;}
  options += '</select>&nbsp;<input type="button" class="custombutton" ' +
    'id="fshMove" value="Move"></td></tr>';
  insertHtmlAfterEnd(flrRow, options);
}
