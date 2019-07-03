import './whosGotWhat.postcss';
import allthen from '../../common/allthen';
import displayChange from './displayChange';
import guildManage from '../../_dataAccess/guildManage';
import guildStore from '../../_dataAccess/export/guildStore';
import insertElement from '../../common/insertElement';
import {pCC} from '../../support/layout';
import partial from '../../common/partial';
import prepareData from './prepareData';
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
  // console.log(dataAry);
  const data = prepareData(dataAry);
  // console.log('data', data);
  pCC.innerHTML = '';
  const el = insertElement(pCC, createDiv());
  const domTable = makeTable(el);
  const table = smartTable({data});
  const tableComponent = tableComponentFactory({el, table});
  tableComponent.onDisplayChange(partial(displayChange, domTable));
  tableComponent.exec();
}

export default function whosGotWhat() {
  pCC.innerHTML = 'Loading...';
  // Promise.all([report(), guildView()]).then(showMe);
  allthen([guildStore(), guildManage()], showMe);
}
