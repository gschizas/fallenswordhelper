import getElementsByTagName from '../common/getElementsByTagName';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import jQueryNotPresent from '../common/jQueryNotPresent';
import myStats from '../ajax/myStats';
import {pCC} from '../support/layout';
import partial from '../common/partial';
import reduceBuffArray from '../common/reduceBuffArray';

var packRE = />\s*([ a-zA-Z]+) Level (\d+)/g;

function checkForBuffs(myBuffs, el) {
  var tipped = el.dataset.tipped;
  var packBuffs;
  while ((packBuffs = packRE.exec(tipped)) !== null) {
    if (myBuffs[packBuffs[1]] === Number(packBuffs[2])) {
      insertHtmlBeforeEnd(el.parentNode,
        '<br><span class="fshRed fshNoWrap">' + packBuffs[1] + ' ' +
        packBuffs[2] + ' active</span>');
    }
  }
}

function postWarnings(myBuffs) {
  var packsRow = pCC.children[0].rows[9];
  if (!packsRow) {return;}
  var nodeList = getElementsByTagName('a', packsRow.cells[0].children[0]);
  Array.prototype.forEach.call(nodeList, partial(checkForBuffs, myBuffs));
}

function parseProfile(data) {
  if (data._skills.length !== 0) {
    var myBuffs = reduceBuffArray(data._skills);
    postWarnings(myBuffs);
  }
}

export default function injectRPUpgrades() { // jQuery.min
  if (jQueryNotPresent()) {return;}
  myStats().done(parseProfile);
}
