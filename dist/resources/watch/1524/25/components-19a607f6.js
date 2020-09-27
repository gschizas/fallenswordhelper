import { b0 as profile, aH as cdn, b7 as playerId, f as insertHtmlBeforeEnd, A as setInnerHtml, i as insertElement, O as isArray, W as sendEvent, s as partial, b as createDiv, z as setText, I as getElementsByClassName, y as getElementById, l as itemRE, m as getArrayByTagName, B as getText, D as querySelector, X as jQueryDialog, cd as insertQuickExtract, Q as clickThis, o as onclick, bQ as classHandler } from './calfSystem-0ffc234f.js';
import { t as toLowerCase } from './toLowerCase-c42114e1.js';
import { i as insertTextBeforeEnd } from './insertTextBeforeEnd-1724e45e.js';
import { c as createTBody } from './createTBody-eb19c5a5.js';
import { c as createTable } from './createTable-d74db384.js';
import './dialogMsg-1f890a82.js';
import { c as createSpan } from './createSpan-f9c351d7.js';
import { h as hideElement } from './hideElement-c8e0696f.js';
import { c as chunk } from './chunk-a1c62f77.js';
import { e as errorDialog } from './errorDialog-c0c5c278.js';
import { g as getArrayByClassName } from './getArrayByClassName-de3b8bf4.js';
import './all-3791b7d5.js';
import { a as allthen } from './allthen-ad810e11.js';

function loadComponents() {
  return profile({ subcmd: 'loadcomponents' });
}

// import { $dataAccess } from './_dataAccess';

function daComponents() {
  // return $dataAccess(loadComponents, components);
  return loadComponents();
}

let componentList;

function tallyComponent(acc, el) {
  acc[el.b] = acc[el.b] || {
    a: el.a,
    b: el.b,
    count: 0,
    del: [],
    v: el.v,
  };
  acc[el.b].count += 1;
  acc[el.b].del.push(el.a);
  return acc;
}

function prepareComponentList(data) {
  componentList = data.r.reduce(tallyComponent, {});
}

function tallyTableRow(acc, comp) {
  return `${acc}<tr><td><img src="${cdn}items/${comp.b
  }.gif" class="fshTblCenter tip-dynamic" data-tipped="fetchitem.php?`
    + `item_id=${comp.b}&inv_id=${comp.a}&t=2&p=${playerId()
    }&vcode=${comp.v}"></td><td>${comp.count
    }</td><td>[<span class="sendLink compDelType" data-compid="${comp.b
    }">Del</span>]</td></tr>`;
}

function makeTallyTbody(data) {
  const tBody = createTBody();
  prepareComponentList(data);
  insertHtmlBeforeEnd(tBody,
    `<tr><td colspan="3">Component Summary</td></tr>${
      Object.values(componentList).reduce(tallyTableRow, '')}`);
  return tBody;
}

function makeTotalCell(tbl) {
  const totRow = tbl.insertRow(-1);
  insertHtmlBeforeEnd(totRow, '<td>Total:</td>');
  const totCell = totRow.insertCell(-1);
  totCell.colSpan = 2;
  return totCell;
}

function makeUsedCount(data) {
  const usedCount = data.r.length;
  const usedCountDom = createSpan();
  setInnerHtml(usedCount, usedCountDom);
  return usedCountDom;
}

function makeTotalRow(tbl, data) {
  const totCell = makeTotalCell(tbl);
  insertElement(totCell, makeUsedCount(data));
  insertTextBeforeEnd(totCell, ` / ${data.h.cm.toString()}`);
}

function makeTallyTable(data) {
  const tbl = createTable({ className: 'fshTblCenter', id: 'fshTally' });
  insertElement(tbl, makeTallyTbody(data));
  makeTotalRow(tbl, data);
  return tbl;
}

function displayComponentTally(target, data) {
  if (!isArray(data.r)) { return; }
  const sumComp = target.parentNode;
  if (sumComp) {
    setInnerHtml('', sumComp);
    insertElement(sumComp, makeTallyTable(data));
  }
}

function countComponent(target) { // jQuery.min
  sendEvent('components', 'countComponent');
  daComponents().then(partial(displayComponentTally, target));
}

function decorateButton(label) {
  const parentDiv = createDiv();
  const innerSpan = createSpan({
    className: `sendLink ${toLowerCase(label).replace(/ /g, '-')}`,
    textContent: label,
  });
  setText('[', parentDiv);
  insertElement(parentDiv, innerSpan);
  insertHtmlBeforeEnd(parentDiv, ']');
  return parentDiv;
}

function destroyComponent(componentIdAry) {
  return profile({ subcmd: 'destroycomponent', removeIndex: componentIdAry });
}

// import { $dataAccess } from './_dataAccess';
// import dropComponent from './fallbacks/dropComponent';

function daDestroyComponent(componentIdAry) {
  // return $dataAccess(destroyComponent, dropComponent, componentIdAry);
  return destroyComponent(componentIdAry);
}

let invTableCache;

function getInvTable() {
  if (!invTableCache) {
    const invTables = getElementsByClassName('inventory-table',
      getElementById('profileRightColumn'));
    if (invTables.length === 2) { [, invTableCache] = invTables; }
  }
  return invTableCache;
}

let visibleCache;

function getComponents(acc, x) {
  const matches = x.dataset.tipped.match(itemRE);
  acc[matches[2]] = x.parentNode.parentNode;
  return acc;
}

function getVisibleComponents() {
  if (!visibleCache) {
    const nodeList = getArrayByTagName('img', getInvTable());
    visibleCache = nodeList.reduce(getComponents, {});
  }
  return visibleCache;
}

function blatElement(visibleComponents, a) {
  if (visibleComponents[a]) { setInnerHtml('', visibleComponents[a]); }
}

function deleteVisible(ary) {
  ary.forEach(partial(blatElement, getVisibleComponents()));
}

function updateUsedCount(del) {
  const invTableParent = getInvTable().parentNode;
  if (!invTableParent) { return; }
  const fshTally = invTableParent.children[2].children[1].children[0];
  if (fshTally.tagName !== 'TABLE') { return; }
  const tallyRows = fshTally.rows;
  const usedCountDom = tallyRows[tallyRows.length - 1].cells[1].children[0];
  let usedCount = Number(getText(usedCountDom));
  usedCount -= del;
  setText(usedCount, usedCountDom);
}

function doSpinner(td) {
  setInnerHtml('', td);
  // eslint-disable-next-line no-param-reassign
  td.className = 'guildTagSpinner';
  // eslint-disable-next-line no-param-reassign
  td.style.backgroundImage = `url('${cdn}ui/misc/spinner.gif')`;
}

function destroyed(data) {
  if (data.s && isArray(data.r)) {
    deleteVisible(data.r);
    updateUsedCount(data.r.length);
  }
}

function removeSpinner(td) { td.parentNode.remove(); }

function destroy(el) {
  return daDestroyComponent(el).then(destroyed);
}

function delCompType(target) { // jQuery.min
  const toDelete = componentList[target.dataset.compid].del;
  const td = target.parentNode;
  doSpinner(td);
  const prm = chunk(30, toDelete).map(destroy);
  allthen(prm, partial(removeSpinner, td));
}

function updateComponentCounts(itemId) {
  const delBtn = querySelector(`#fshTally [data-compid="${itemId}"]`);
  if (!delBtn) { return; }
  const countDom = delBtn.parentNode.parentNode.children[1];
  const count = Number(getText(countDom)) - 1;
  setText(count, countDom);
}

function compDeleted(target, itemId, data) {
  if (data.s) {
    updateComponentCounts(itemId);
    updateUsedCount(1);
    if (target.parentNode) { setInnerHtml('', target.parentNode); }
  }
}

function delComponent(target) { // jQuery.min
  const { tipped } = target.parentNode.children[0].children[0].dataset;
  const matches = tipped.match(itemRE);
  const itemId = matches[1];
  const componentId = matches[2];
  daDestroyComponent([componentId])
    .then(errorDialog)
    .then(partial(compDeleted, target, itemId));
}

const buttonLabels = [
  'Enable Quick Del',
  'Count Components',
  'Quick Extract Components',
];

function addButtons(acc, el) {
  insertElement(acc, decorateButton(el));
  return acc;
}

function componentBtnContainer() {
  return buttonLabels.reduce(addButtons, createDiv({ className: 'fshCenter' }));
}

function quickExtractHandler() {
  sendEvent('components', 'insertQuickExtract');
  jQueryDialog(insertQuickExtract);
}

function addDelBtn(el) {
  insertHtmlBeforeEnd(el.parentNode.parentNode,
    '<span class="compDelBtn">Del</span>');
}

function enableDelComponent(target) {
  sendEvent('components', 'enableDelComponent');
  const quickDelDiv = target.parentNode;
  hideElement(quickDelDiv);
  const cmDiv = quickDelDiv.parentNode;
  insertElement(cmDiv, decorateButton('Delete All Visible'));
  getArrayByTagName('img', getInvTable()).forEach(addDelBtn);
}

function delAllComponent(target) {
  sendEvent('components', 'delAllComponent');
  const thisInvTable = target.parentNode.parentNode.parentNode.children[0];
  getArrayByClassName('compDelBtn', thisInvTable).forEach(clickThis);
}

const classEvts = [
  ['quick-extract-components', quickExtractHandler],
  ['enable-quick-del', enableDelComponent],
  ['delete-all-visible', delAllComponent],
  ['compDelBtn', delComponent],
  ['count-components', countComponent],
  ['compDelType', delCompType],
];

function addComposingButtons(thisInvTable) {
  const compDiv = thisInvTable.parentNode;
  insertElement(compDiv, componentBtnContainer());
  onclick(compDiv, classHandler(classEvts));
}

function components() {
  const thisInvTable = getInvTable();
  if (!thisInvTable) { return; }
  addComposingButtons(thisInvTable);
}

export default components;
//# sourceMappingURL=components-19a607f6.js.map
