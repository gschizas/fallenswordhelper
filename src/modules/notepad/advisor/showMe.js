import displayChange from './displayChange';
import insertElement from '../../common/insertElement';
import {pCC} from '../../support/layout';
import partial from '../../common/partial';
import {smartTable} from 'smart-table-core';
import smartTableConfig from './smartTableConfig';
import {table as tableComponentFactory} from 'smart-table-vanilla';
import {theadHtml} from './assets';
import {
  createDiv,
  createTBody,
  createTHead,
  createTable
} from '../../common/cElement';

function insertDiv(parent) {
  return insertElement(parent, createDiv());
}

function prepareContainer() {
  pCC.innerHTML = '';
  return insertDiv(pCC);
}

// function makeTopControls(container) {
//   return insertDiv(container);
// }

function makeTable(container) {
  const domTable = insertElement(container,
    createTable({className: 'fshSmartTable fshXSmall'}));
  insertElement(domTable, createTHead({innerHTML: theadHtml}));
  insertElement(domTable, createTBody());
  return domTable;
}

// function makeBottomControls(container) {
//   return insertDiv(container);
// }

export default function showMe([data, membrList]) {
  // console.log('showMe', data, membrList);
  var smartCollection = smartTable(smartTableConfig(data, membrList));

  const container = prepareContainer();
  // const topControls = makeTopControls(container);
  const domTable = makeTable(container);
  // const bottomControls = makeBottomControls(container);

  const tableComponent = tableComponentFactory({
    el: container,
    table: smartCollection
  });

  tableComponent.onDisplayChange(partial(displayChange, domTable));
  tableComponent.exec();
}
