import './whosGotWhat.postcss';
import displayChange from './displayChange';
import guildView from '../../app/guild/view';
import insertElement from '../../common/insertElement';
import {pCC} from '../../support/layout';
import partial from '../../common/partial';
import prepareData from './prepareData';
import report from '../../app/guild/inventory/report';
import {smartTable} from 'smart-table-core';
import {table as tableComponentFactory} from 'smart-table-vanilla';
import {theadHtml} from './assets';
import {
  createDiv,
  createTable
} from '../../common/cElement';

function makeTable(el) {
  return insertElement(el, createTable({
    className: 'whosGotWhat',
    innerHTML: theadHtml
  }));
}

function showMe(dataAry) {
  const data = prepareData(dataAry);
  // console.log(data);
  pCC.innerHTML = '';
  const el = insertElement(pCC, createDiv());
  const domTable = makeTable(el);
  const table = smartTable({data});
  const tableComponent = tableComponentFactory({el, table});
  tableComponent.onDisplayChange(partial(displayChange, domTable));
}

export default function whosGotWhat() {
  pCC.innerHTML = 'Loading...';
  Promise.all([report(), guildView()]).then(showMe);
}
