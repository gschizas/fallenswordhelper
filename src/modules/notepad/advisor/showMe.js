import createDiv from '../../common/cElement/createDiv';
import createTBody from '../../common/cElement/createTBody';
import createTHead from '../../common/cElement/createTHead';
import createTable from '../../common/cElement/createTable';
import displayChange from './displayChange';
import insertElement from '../../common/insertElement';
import { pCC } from '../../support/layout';
import partial from '../../common/partial';
import setInnerHtml from '../../dom/setInnerHtml';
import { smartTable } from 'smart-table-core';
import smartTableConfig from './smartTableConfig';
import { table as tableComponentFactory } from 'smart-table-vanilla';
import theadHtml from './assets';

function insertDiv(parent) {
  return insertElement(parent, createDiv());
}

function prepareContainer() {
  setInnerHtml('', pCC);
  return insertDiv(pCC);
}

// function makeTopControls(container) {
//   return insertDiv(container);
// }

function makeTable(container) {
  const domTable = insertElement(container,
    createTable({ className: 'fshSmartTable fshXSmall' }));
  insertElement(domTable, createTHead({ innerHTML: theadHtml }));
  insertElement(domTable, createTBody());
  return domTable;
}

// function makeBottomControls(container) {
//   return insertDiv(container);
// }

export default function showMe([data, membrList]) {
  // console.log('showMe', data, membrList);
  const smartCollection = smartTable(smartTableConfig(data, membrList));

  const container = prepareContainer();
  // const topControls = makeTopControls(container);
  const domTable = makeTable(container);
  // const bottomControls = makeBottomControls(container);

  const tableComponent = tableComponentFactory({
    el: container,
    table: smartCollection,
  });

  tableComponent.onDisplayChange(partial(displayChange, domTable));
  tableComponent.exec();
}
