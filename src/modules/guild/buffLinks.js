import batch from '../common/batch';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import on from '../common/on';
import openQuickBuffByName from '../common/openQuickBuffByName';
import {pCC} from '../support/layout';
import querySelectorAll from '../common/querySelectorAll';

function insertBuffLink(el) {
  insertHtmlBeforeEnd(el.parentNode, ' <span class="smallLink">[b]</span>');
}

function openQuickBuff(evt) {
  if (evt.target.className !== 'smallLink') {return;}
  openQuickBuffByName(evt.target.previousElementSibling.text);
}

export default function buffLinks() {
  // TODO preference
  var members = querySelectorAll(
    '#pCC a[href^="index.php?cmd=profile&player_id="]');
  batch(3, members, 0, insertBuffLink);
  on(pCC, 'click', openQuickBuff);
}
