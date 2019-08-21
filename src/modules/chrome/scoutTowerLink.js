import {cdn} from '../system/system';
import {getElementById} from '../common/getElement';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import {scouttowerUrl} from '../support/constants';

export default function scoutTowerLink() {
  var spoils = getElementById('minibox-spoilsofwar');
  if (spoils) {
    var parent = spoils.children[1].children[0];
    insertHtmlBeforeEnd(parent, '&nbsp;<a href="' + scouttowerUrl +
      '" class="tip-static" data-tipped="View Scout Report">' +
      '<img id="fshScoutTower" ' +
      'src="' + cdn + '/structures/27.png"></a>');
  }
}
