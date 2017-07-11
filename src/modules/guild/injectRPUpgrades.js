import * as ajax from '../support/ajax';
import * as layout from '../support/layout';

function parseProfileAndPostWarnings(data) { // Native
  var myBuffs = data._skills.reduce(function(prev, curr) {
    // What happens if I'm not buffed? TODO
    prev[curr.name] = curr.level;
    return prev;
  }, {});

  var nodeList = layout.pCC.firstElementChild.rows[9]
    .cells[0].firstElementChild.getElementsByTagName('A');
  Array.prototype.forEach.call(nodeList, function(el) {
    var tipped = el.getAttribute('data-tipped');
    var packRE = />([ a-zA-Z]+) Level (\d+)/g;
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

export default function injectRPUpgrades() { // jQuery
  ajax.myStats().done(parseProfileAndPostWarnings);
}
