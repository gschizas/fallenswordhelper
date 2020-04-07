import add from '../../../support/task';
import batch from '../../../common/batch';
import entries from '../../../common/entries';
import insertElement from '../../../common/insertElement';
import insertHtmlBeforeEnd from '../../../common/insertHtmlBeforeEnd';
import once from '../../../common/once';
import partial from '../../../common/partial';
import { sendEvent } from '../../../support/fshGa';
import setText from '../../../dom/setText';
import {
  createDiv,
  createInput,
  createOption,
  createSelect,
  createTable,
  createTr,
} from '../../../common/cElement';

let mapping;
let selectRowTmp;

function getRow() {
  const rowTmp = createTr();
  rowTmp.insertCell(-1);
  rowTmp.insertCell(-1);
  return rowTmp;
}

function setOption(value) {
  const option = createOption();
  option.value = value;
  option.text = value;
  return option;
}

function insertOption(selectTmp, el) {
  insertElement(selectTmp, setOption(el[0]));
}

function getSelect(ary) {
  const selectTmp = createSelect({
    className: 'tip-static',
    dataset: { tipped: 'Set to "Ignore" to exclude from report' },
  });
  insertElement(selectTmp, setOption('Ignore'));
  ary.forEach(partial(insertOption, selectTmp));
  return selectTmp;
}

function getSelectRow(ary) {
  if (!selectRowTmp) {
    selectRowTmp = getRow();
    const select = getSelect(ary);
    insertElement(selectRowTmp.cells[1], select);
  }
  return selectRowTmp.cloneNode(true);
}

function insertRows(mapTbl, el, i, ary) {
  const selectRow = getSelectRow(ary);
  setText(el[0], selectRow.cells[0]);
  const select = selectRow.cells[1].children[0];
  [select.name, select.value] = el;
  insertElement(mapTbl.tBodies[0], selectRow);
}

function makeButton(row, id, val) {
  const btn = createInput({
    id,
    type: 'button',
    value: val,
  });
  insertElement(row.cells[1], btn);
}

function insertFinal(mapTbl) {
  const row = getRow();
  makeButton(row, 'fshIgnoreAll', 'Ignore All');
  insertHtmlBeforeEnd(row.cells[1], '&nbsp;');
  makeButton(row, 'fshReset', 'Reset');
  insertElement(mapTbl.tBodies[0], row);
  return 0;
}

export function drawMapping(potOpts) {
  sendEvent('potReport', 'drawMapping');
  const mapTbl = createTable({ innerHTML: '<tbody></tbody>' });
  mapping.replaceChild(mapTbl, mapping.children[0]);
  add(3, batch, [
    [
      5,
      3,
      entries(potOpts.myMap),
      0,
      partial(insertRows, mapTbl), partial(insertFinal, mapTbl),
    ],
  ]);
}

export function initMapping(potOpts, panels) {
  mapping = createDiv({ id: 'mapping', innerHTML: '<p></p>' });
  if (potOpts.pottab2) {
    drawMapping(potOpts);
  } else {
    once(panels.parentNode.children[2], 'change',
      partial(drawMapping, potOpts));
  }
  insertElement(panels, mapping);
}
