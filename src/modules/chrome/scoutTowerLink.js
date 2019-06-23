import {getElementById} from '../common/getElement';
import {imageServer} from '../system/system';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import {scouttowerUrl} from '../support/constants';

export default function scoutTowerLink() {
  var spoils = getElementById('minibox-spoilsofwar');
  if (spoils) {
    var parent = spoils.children[1].children[0];
    insertHtmlBeforeEnd(parent, '&nbsp;<a href="' + scouttowerUrl +
      '" class="tip-static" data-tipped="View Scout Report">' +
      '<img id="fshScoutTower" ' +
      'src="' + imageServer + '/structures/27.gif"></a>');
  }
}
