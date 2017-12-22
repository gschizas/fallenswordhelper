import {createDiv} from '../common/cElement';
import {getElementById} from '../common/getElement';
import insertElement from '../common/insertElement';

export default function injectServerNode() {
  var topbannerStats = getElementById('topbanner-stats');
  var h3coll = document.querySelectorAll('#pCR h3');
  var gameStats = Array.prototype.find.call(h3coll, function(el) {
    return el.textContent === 'Game Stats';
  });
  if (topbannerStats && gameStats) {
    var miniboxList = gameStats.nextElementSibling.children[0];
    if (miniboxList.children.length === 8) {
      var nodeName = miniboxList.children[7].textContent;
      var serverDiv = createDiv({
        className: 'tip-static',
        dataset: {tipped: 'Server'},
        textContent: 'Server: ' + nodeName
      });
      insertElement(topbannerStats, serverDiv);
    }
  }
}
