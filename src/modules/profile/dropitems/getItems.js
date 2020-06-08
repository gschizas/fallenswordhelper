import doStatTotal from './doStatTotal';
import doToggleButtons from './doToggleButtons';
import getArrayByTagName from '../../common/getArrayByTagName';
import getElementsByTagName from '../../common/getElementsByTagName';
import { pCC } from '../../support/layout';
import { defTable, itemRE } from '../../support/constants';
import {
  getPrefs,
  showExtraLinks,
  showQuickDropLinks,
} from './getPrefs';

export let itemsAry;
export let itemsHash;

function getItemImg() {
  const allTables = getElementsByTagName(defTable, pCC);
  const lastTable = allTables[allTables.length - 1];
  return getArrayByTagName('img', lastTable);
}

function hasTip(el) { return el.dataset.tipped; }

function getIds(el) {
  const matches = el.dataset.tipped.match(itemRE);
  return [
    el,
    matches[1],
    matches[2],
  ];
}

function tally(acc, curr) {
  acc[curr[1]] = (acc[curr[1]] || 0) + 1;
  return acc;
}

function getInjector(ary) {
  return {
    el: ary[0],
    invid: ary[2],
    injectHere: ary[0].parentNode.parentNode.nextElementSibling,
  };
}

export function getItems() {
  doStatTotal();
  getPrefs();
  doToggleButtons(showExtraLinks, showQuickDropLinks);
  const imgList = getItemImg();
  const fromTips = imgList.filter(hasTip).map(getIds);
  itemsAry = fromTips.map(getInjector);
  itemsHash = fromTips.reduce(tally, {});
  // Exclude composed pots
  itemsHash[13699] = 1;
}
