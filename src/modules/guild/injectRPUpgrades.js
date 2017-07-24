import * as ajax from '../support/ajax';
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

function parseProfile(data) { // Native
  if (data._skills.length !== 0) {
    var myBuffs = data._skills.reduce(function(prev, curr) {
      prev[curr.name] = curr.level;
      return prev;
    }, {});
    postWarnings(myBuffs);
  }
}

export default function injectRPUpgrades() { // jQuery.min
  ajax.myStats().done(parseProfile);
}
