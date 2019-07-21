import './whosGotWhat.postcss';
import allthen from '../../common/allthen';
import {daGuildManage} from '../../_dataAccess/_dataAccess';
import displayChange from './displayChange';
import guildStore from '../../_dataAccess/export/guildStore';
import insertElement from '../../common/insertElement';
import on from '../../common/on';
import {pCC} from '../../support/layout';
import partial from '../../common/partial';
import prepareData from './prepareData';
import {table as tableComponentFactory} from 'smart-table-vanilla';
import {theadHtml} from './assets';
import {
  createButton,
  createDiv,
  createInput,
  createSelect,
  createTable
} from '../../common/cElement';
import {
  paginationDirective,
  searchDirective,
  smartTable
} from 'smart-table-core';

function makeTable(el) {
  return insertElement(el, createTable({
    className: 'whosGotWhat',
    innerHTML: theadHtml
  }));
}

function makeSizer(el, table) {
  const thisSizer = createSelect({
    innerHTML: '<option value="25" selected>25</option>' +
      '<option value="50">50</option>' +
      '<option value="0">All</option>'
  });
  const box = createDiv();
  insertElement(box, thisSizer);
  insertElement(el, box);
  const slice = paginationDirective({table});
  on(thisSizer, 'change', e => {
    slice.changePageSize(Number(e.target.value));
  });
}

function makeSearch(top, table) {
  const wrapper = createDiv({className: 'fsh-search-wrapper'});
  const input = createInput({
    dataset: {
      stSearch: 'name, rank_name',
      stSearchFlags: 'i'
    },
    placeholder: 'Enter search term',
    required: true,
    type: 'text'
  });
  const button = createButton({
    innerHTML: '&times;',
    type: 'button'
  });
  const directive = searchDirective({table});
  on(button, 'click', () => {
    input.value = '';
    input.focus();
    directive.search('');
  });
  insertElement(wrapper, input);
  insertElement(wrapper, button);
  insertElement(top, wrapper);
}

function makeSummary(bottom, table) {
  const summaryDiv = createDiv();
  insertElement(bottom, summaryDiv);
  const slice = paginationDirective({table});
  slice.onSummaryChange(({page, size, filteredCount}) => {
    let filterModifier = 0;
    if (filteredCount) {filterModifier = 1;}
    summaryDiv.innerHTML = `showing ${(page - 1) * size + filterModifier} - ${
      Math.min(filteredCount, page * size)} of ${filteredCount}`;
  });
}

function showMe(dataAry) {
  // console.log(dataAry);
  const data = prepareData(dataAry);
  // console.log('data', data);
  pCC.innerHTML = '';
  const el = insertElement(pCC, createDiv());
  const top = insertElement(el, createDiv({className: 'st-top-container'}));
  const domTable = makeTable(el);
  const bottom = insertElement(el,
    createDiv({className: 'st-bottom-container'}));
  const tableState = {
    sort: {pointer: 'slot', direction: 'asc'},
    slice: {page: 1, size: 25},
    filter: {},
    search: {}
  };
  const table = smartTable({data, tableState});
  makeSizer(top, table);
  makeSearch(top, table);
  makeSummary(bottom, table);
  const tableComponent = tableComponentFactory({el, table});
  tableComponent.onDisplayChange(partial(displayChange, domTable));
  tableComponent.exec();
  // slice.selectNextPage();
}

export default function whosGotWhat() {
  pCC.innerHTML = 'Loading...';
  allthen([guildStore(), daGuildManage()], showMe);
}
