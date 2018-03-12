import addStatTotalToMouseover from '../common/addStatTotalToMouseover';
import doToggleButtons from './doToggleButtons';
import {itemRE} from '../support/constants';
import {pCC} from '../support/layout';
import {
  getPrefs,
  showExtraLinks,
  showQuickDropLinks
} from './getPrefs';

export var itemsAry;
export var itemsHash;

function getItemImg() {
  var allTables = pCC.getElementsByTagName('table');
  var lastTable = allTables[allTables.length - 1];
  return lastTable.getElementsByTagName('img');
}

export function getItems() {
  addStatTotalToMouseover();
  getPrefs();
  doToggleButtons(showExtraLinks, showQuickDropLinks);
  // pCC.addEventListener('click', eventHandler(evts));
  var imgList = getItemImg();
  itemsAry = [];
  itemsHash = {};
  Array.prototype.forEach.call(imgList, function(el) {
    var tipped = el.dataset.tipped;
    if (tipped) {
      var matches = tipped.match(itemRE);
      itemsHash[matches[1]] = (itemsHash[matches[1]] || 0) + 1;
      var injectHere = el.parentNode.parentNode.nextElementSibling;
      itemsAry.push({
        el: el,
        invid: matches[2],
        injectHere: injectHere
      });
    }
  });
  // Exclude composed pots
  itemsHash[13699] = 1;
}
