import myStats from '../ajax/myStats';
import {reduceBuffArray} from '../common/common';
import * as layout from '../support/layout';

var packRE = />([ a-zA-Z]+) Level (\d+)/g;

function postWarnings(myBuffs) {
  var nodeList = layout.pCC.firstElementChild.rows[9]
    .cells[0].firstElementChild.getElementsByTagName('A');
  Array.prototype.forEach.call(nodeList, function(el) {
    var tipped = el.dataset.tipped;
    var packBuffs;
    while ((packBuffs = packRE.exec(tipped)) !== null) {
      if (myBuffs[packBuffs[1]] === packBuffs[2]) {
        el.parentNode.insertAdjacentHTML('beforeend',
          '<br><span class="fshRed fshNoWrap">' + packBuffs[1] + ' ' +
          packBuffs[2] + ' active</span>');
      }
    }
  });
}

function parseProfile(data) {
  if (data._skills.length !== 0) {
    var myBuffs = reduceBuffArray(data._skills);
    postWarnings(myBuffs);
  }
}

export default function injectRPUpgrades() { // jQuery.min
  myStats().done(parseProfile);
}
