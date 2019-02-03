import addStatTotalToMouseover from '../../common/addStatTotalToMouseover';
import doToggleButtons from './doToggleButtons';
import getArrayByTagName from '../../common/getArrayByTagName';
import getElementsByTagName from '../../common/getElementsByTagName';
import {pCC} from '../../support/layout';
import {def_table, itemRE} from '../../support/constants';
import {
  getPrefs,
  showExtraLinks,
  showQuickDropLinks
} from './getPrefs';

export var itemsAry;
export var itemsHash;

function getItemImg() {
  var allTables = getElementsByTagName(def_table, pCC);
  var lastTable = allTables[allTables.length - 1];
  return getArrayByTagName('img', lastTable);
}

function hasTip(el) {return el.dataset.tipped;}

function getIds(el) {
  var matches = el.dataset.tipped.match(itemRE);
  return [
    el,
    matches[1],
    matches[2]
  ];
}

function tally(prev, curr) {
  prev[curr[1]] = (prev[curr[1]] || 0) + 1;
  return prev;
}

function getInjector(ary) {
  return {
    el: ary[0],
    invid: ary[2],
    injectHere: ary[0].parentNode.parentNode.nextElementSibling
  };
}

export function getItems() {
  addStatTotalToMouseover();
  getPrefs();
  doToggleButtons(showExtraLinks, showQuickDropLinks);
  var imgList = getItemImg();
  var fromTips = imgList.filter(hasTip).map(getIds);
  itemsAry = fromTips.map(getInjector);
  itemsHash = fromTips.reduce(tally, {});
  // Exclude composed pots
  itemsHash[13699] = 1;
}
