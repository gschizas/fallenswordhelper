import { c as calf, aI as cdn, A as setInnerHtml, s as partial, i as insertElement, b7 as playerId, b as createDiv, bh as ahSearchUrl, e as entries, bB as auctionSearchUrl, bC as getValueJSON, f as insertHtmlBeforeEnd, j as jQueryPresent, X as sendEvent, z as setText, W as setValue, h as hasClass, O as isArray, o as onclick, p as pCC, G as getValue } from './calfSystem-975d976a.js';
import './toLowerCase-33399b5a.js';
import './createInput-a26e969f.js';
import './createLabel-c08e76a9.js';
import './createUl-e768b584.js';
import './isChecked-ed98077f.js';
import { b as simpleCheckboxHtml } from './simpleCheckbox-d4935e11.js';
import './alpha-d5278d39.js';
import { c as createTBody } from './createTBody-076debd9.js';
import { c as createTable } from './createTable-40ee0864.js';
import './dialogMsg-9c8d1b20.js';
import { s as subscribeOnce } from './pubsub-8a0e7777.js';
import { f as fshTabSet } from './fshTabSet-53858716.js';
import './createLi-c2648383.js';
import './errorDialog-7f9c11b0.js';
import './indexAjaxJson-26919f52.js';
import { t as toggleForce } from './toggleForce-7e736fc3.js';
import { a as stringSort } from './stringSort-000e8daa.js';
import { j as jConfirm } from './jConfirm-2b4faf14.js';
import './daUseItem-d416b7cf.js';
import { e as eventHandler5 } from './eventHandler5-63bf01ed.js';
import { s as selfIdIs } from './selfIdIs-92b475f1.js';
import { m as makeFolderSpan } from './makeFolderSpan-b10ef92b.js';
import { d as daLoadInventory } from './daLoadInventory-7c075753.js';
import './dialog-370f639a.js';
import { u as useItem, e as equipItem } from './useItem-cf2afd79.js';
import { h as hasClasses } from './hasClasses-3abf5b6c.js';

const css = ".qwPref {\r\n  float: right;\r\n  padding: .5em 1em;\r\n  text-align: center\r\n\r\n}\n.qwPref > input {\r\n    cursor: pointer;\r\n  }\r\n";
const modules_b5024d08 = {};

const css$1 = ".fshEq, .fshUse {\r\n  display: inline-block;\r\n  position: relative;\r\n}\r\n\r\n.fshEq {\r\n  width: 25px;\r\n}\r\n\r\n.fshUse {\r\n  width: 36px;\r\n}\r\n";
const modules_6a870e7e = {};

function initSort() {
  calf.sortBy = 'n';
  calf.sortAsc = true;
}

function isUseable(item) {
  if ([10, 12, 15, 16].indexOf(item.t) !== -1
      || item.n === 'Zombie Coffin') {
    return 'smallLink';
  }
  return 'notLink';
}

function itemImage(item) {
  let ret = cdn;
  if (item.b === 13699) {
    ret += `composing/${item.extra.design}_${
      item.extra.color}.png`;
  } else {
    ret += `items/${item.b}.gif`;
  }
  return ret;
}

function tableRows(tbl, currentPlayerId, item) {
  const newRow = tbl.insertRow(-1);
  // eslint-disable-next-line no-param-reassign
  item.dom = newRow;
  let equipClass = 'fshEq ';
  let useClass = 'fshUse ';
  if (item.t < 9) { equipClass += 'smallLink'; } else { equipClass += 'notLink'; }
  useClass += isUseable(item);
  setInnerHtml(`<td class="fshCenter"><span class="${
    equipClass}" data-itemid="${item.a}">Wear</span>&nbsp;|&nbsp;<span class="${
    useClass}" data-itemid="${item.a}">Use/Ext</span></td><td><img src="${
    itemImage(item)}" class="tip-dynamic" data-tipped="fetchitem.php?item_id=${
    item.b}&amp;inv_id=${item.a}&amp;t=1&amp;p=${
    currentPlayerId}&amp;currentPlayerId=${
    currentPlayerId}" width="30" height="30" border="0"></td>`
    + `<td width="90%">&nbsp;${item.n}</td>`, newRow);
}

function folderHtml(folderObj) {
  return makeFolderSpan(String(folderObj.id), folderObj.name);
}

function makeFolderSpans(appInv) {
  return makeFolderSpan('0', 'All') + appInv.r.map(folderHtml).join('');
}

function addRows(tbody, currentPlayerId, aFolder) {
  aFolder.items.sort(stringSort)
    .forEach(partial(tableRows, tbody, currentPlayerId));
}

function makeQwTable(appInv) {
  const tbl = createTable({
    width: '100%',
    innerHTML: `<thead><tr><th class="fshCenter" colspan="3">${
      makeFolderSpans(appInv)}</th></tr>`
      + '<tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th>'
      + '<th colspan="2">Items</th></tr></thead>',
  });
  const tbody = createTBody();
  insertElement(tbl, tbody);
  initSort();
  appInv.r.forEach(partial(addRows, tbody, playerId()));
  return tbl;
}

function createQuickWear(appInv) {
  const tbl = makeQwTable(appInv);
  const qw = createDiv();
  insertElement(qw, tbl);
  return qw;
}

function foundInvItem(invCount, name) {
  if (invCount[name]) {
    // eslint-disable-next-line no-param-reassign
    invCount[name].count += 1;
  } else {
    // eslint-disable-next-line no-param-reassign
    invCount[name] = { count: 1, nicknameList: [] };
  }
}

function ahLink(searchname, nickname) {
  return `<a href="${ahSearchUrl}${searchname}">${nickname}</a>`;
}

function found(pair) { return pair[1].nicknameList.length > 0; }

function foundHtml(pair) {
  return `<tr><td>${pair[0]}</td><td>${
    pair[1].nicknameList.map(partial(ahLink, pair[0])).join(' ')}</td><td>${
    pair[1].count}</td><td></td><td></td></tr>`;
}

function displayFoundCount(invCount) {
  return entries(invCount).filter(found).map(foundHtml).join('');
}

function notFound(item) { return item.displayOnAH && !item.found; }

function notFoundHtml(item) { return ahLink(item.searchname, item.nickname); }

function displayNotFound(quickSL) {
  return quickSL.filter(notFound).map(notFoundHtml).join(', ');
}

function others(pair) { return pair[1].nicknameList.length === 0; }

function otherHtml(pair) {
  return `<tr><td>${pair[0]}</td><td></td><td>${
    pair[1].count}</td><td></td><td></td></tr>`;
}

function displayOtherCount(invCount) {
  return entries(invCount).filter(others).map(otherHtml).join('');
}

function buildHTML(invCount, quickSL) {
  // TODO this is going to need significant rebuild
  return '<table width="100%" cellspacing="2" cellpadding="2"><thead>'
    + '<tr><th colspan="5" class="fshCenter">Items from '
    + `<a href="${auctionSearchUrl}">`
    + 'AH Quick Search</a> found in your inventory</th></tr>'
    + '<tr><th>Name</th><th>Nick Name</th><th>Inv Count</th>'
    + `<th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>${
    // show inv & counter for item with nickname found
      displayFoundCount(invCount)
    // show item from quick AH search that are not in our inv
    }<tr><td colspan="5"><hr></td></tr>`
    + `<tr><td>Did not find:</td><td colspan="4">${
      displayNotFound(quickSL)
    }</td></tr><tr><td colspan="5"><hr></td></tr></tbody>`
    + '<thead><tr><th colspan="5" class="fshCenter">Items NOT from '
    + `<a href="${auctionSearchUrl}">`
    + `AH Quick Search</a> found in your inventory</td></thead><tbody>${
    // show inv & counter for item with nickname NOT found
      displayOtherCount(invCount)
    }</tbody></table>`;
}

function inQuickSearchList(invCount, name, listItem) {
  if (name === listItem.searchname) {
    // eslint-disable-next-line no-param-reassign
    listItem.found = true;
    if (invCount[name].nicknameList.indexOf(listItem.nickname) < 0) {
      invCount[name].nicknameList.push(listItem.nickname);
    }
  }
}

function testItemList(invCount, quickSL, item) {
  const name = item.n;
  foundInvItem(invCount, name);
  quickSL.forEach(partial(inQuickSearchList, invCount, name));
}

function folder(invCount, quickSL, aFolder) {
  aFolder.items.forEach(partial(testItemList, invCount, quickSL));
}

function showAHInvManager(itemList) {
  const invCount = {};
  const quickSL = getValueJSON('quickSearchList') || [];
  // fill up the Inv Counter
  itemList.r.forEach(partial(folder, invCount, quickSL));
  const im = createDiv();
  insertHtmlBeforeEnd(im, buildHTML(invCount, quickSL));
  return im;
}

const defDisableQuickWearPrompts = 'disableQuickWearPrompts';
let disableQuickWearPrompts;
let itemList;

function actionResult(target, verb, data) {
  if (data.r !== 0) { return; }
  setInnerHtml(`<span class="fastWorn">${verb}</span>`, target.parentNode);
}

function doAction(target, fn, verb) { // jQuery.min
  sendEvent('QuickWear', `doAction - ${verb}`);
  setText('', target);
  target.classList.remove('smallLink');
  target.classList.add('fshSpinner', 'fshSpin12');
  fn(target.dataset.itemid).then(partial(actionResult, target, verb));
}

function doUseItem(target) {
  doAction(target, useItem, 'Used');
}

function useProfileInventoryItem(target) {
  if (disableQuickWearPrompts) {
    doUseItem(target);
  } else {
    jConfirm('Use/Extract Item',
      'Are you sure you want to use/extract the item?',
      partial(doUseItem, target));
  }
}

function equipProfileInventoryItem(target) {
  doAction(target, equipItem, 'Worn');
}

function processItems(folderId, thisFolder, o) {
  const tr = o.dom;
  if (folderId === '0') {
    tr.classList.remove('fshHide');
  } else {
    const force = folderId !== thisFolder.toString();
    toggleForce(tr, force);
  }
}

function processFolder(folderId, aFolder) {
  const thisFolder = aFolder.id;
  aFolder.items.forEach(partial(processItems, folderId, thisFolder));
}

function hideFolders(target) {
  const folderId = target.dataset.folder;
  itemList.r.forEach(partial(processFolder, folderId));
}

function togglePref() {
  disableQuickWearPrompts = !disableQuickWearPrompts;
  setValue(defDisableQuickWearPrompts, disableQuickWearPrompts);
}

function evts5() {
  return [
    [partial(hasClasses, ['smallLink', 'fshEq']), equipProfileInventoryItem],
    [partial(hasClasses, ['smallLink', 'fshUse']), useProfileInventoryItem],
    [partial(hasClass, 'fshFolder'), hideFolders],
    [selfIdIs(defDisableQuickWearPrompts), togglePref],
  ];
}

function goodData(appInv) {
  return appInv && appInv.s && isArray(appInv.r);
}

function makePref(thisList) {
  insertElement(thisList, createDiv({
    className: 'qwPref',
    innerHTML: simpleCheckboxHtml(defDisableQuickWearPrompts),
  }));
}

function injectContent(thisFn, appInv, thisDiv) {
  insertElement(thisDiv, thisFn(appInv));
}

function buildQuickWear(content, appInv) {
  subscribeOnce('qwtab-header', makePref);
  subscribeOnce('qwtab0', partial(injectContent, createQuickWear, appInv));
  subscribeOnce('qwtab1', partial(injectContent, showAHInvManager, appInv));
  fshTabSet(content, ['Quick Wear / Use / Extract<br>Manager',
    'Inventory Manager Counter<br>filtered by AH Quick Search'], 'qwtab');
  onclick(content, eventHandler5(evts5()));
}

function showQuickWear(content, appInv) {
  if (goodData(appInv)) {
    itemList = appInv;
    buildQuickWear(content, appInv);
  }
}

function hasJquery(injector) { // jQuery.min
  const content = injector || pCC;
  if (!content) { return; }
  insertHtmlBeforeEnd(content, 'Getting item list from backpack...');
  daLoadInventory().then(partial(showQuickWear, content));
  disableQuickWearPrompts = getValue(defDisableQuickWearPrompts);
}

function insertQuickWear(injector) {
  if (jQueryPresent()) { hasJquery(injector); }
}

export default insertQuickWear;
//# sourceMappingURL=quickWear-de5637e3.js.map
