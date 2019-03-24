import addCommas from '../../system/addCommas';
import advisorView from '../../app/guild/advisorView';
import insertElement from '../../common/insertElement';
import jQueryNotPresent from '../../common/jQueryNotPresent';
import {pCC} from '../../support/layout';
import partial from '../../common/partial';
import {smartTable} from 'smart-table-core';
import {table as tableComponentFactory} from 'smart-table-vanilla';
import {
  createDiv,
  createTBody,
  createTHead,
  createTable,
  createTr
} from '../../common/cElement';

const reformat = row => {
  row.player.lower = row.player.name.toLowerCase();
  return {
    player: row.player,
    stats: row.stats
  };
};

const thisTHead = () => createTHead({
  innerHTML: '<th data-st-sort="player.lower">Member</th>' +
    '<th data-st-sort="player.level">Lvl</th>' +
    '<th data-st-sort="stats.6">Gold From Deposits</th>' +
    '<th data-st-sort="stats.7">Gold From Tax</th>' +
    '<th data-st-sort="stats.0">Gold Total</th>' +
    '<th data-st-sort="stats.1">FSP</th>' +
    '<th data-st-sort="stats.2">Skill Cast</th>' +
    '<th data-st-sort="stats.3">Group Create</th>' +
    '<th data-st-sort="stats.4">Group Join</th>' +
    '<th data-st-sort="stats.8">Relic</th>' +
    '<th data-st-sort="stats.5">XP Contrib</th>'
});

const rowFactory = aRow => {
  const withCommas = aRow.stats.map(addCommas);
  return createTr({
    innerHTML: `<td>${aRow.player.name}</td>` +
      `<td>${aRow.player.level}</td>` +
      `<td>${withCommas[6]}</td>` +
      `<td>${withCommas[7]}</td>` +
      `<td>${withCommas[0]}</td>` +
      `<td>${withCommas[1]}</td>` +
      `<td>${withCommas[2]}</td>` +
      `<td>${withCommas[3]}</td>` +
      `<td>${withCommas[4]}</td>` +
      `<td>${withCommas[8]}</td>` +
      `<td>${withCommas[5]}</td>`
  });
};

function displayChange(domTBody, displayed) {
  domTBody.innerHTML = '';
  for (let r of displayed) {
    const newChild = rowFactory(r.value);
    domTBody.appendChild(newChild);
  }
}

function showMe(data) {
  // console.log('showMe', data);
  var smartCollection = smartTable({
    data: data.r.map(reformat),
    tableState: {
      sort: {},
      filter: {},
      search: {},
      slice: {page: 1, size: 50}
    }
  });
  pCC.innerHTML = '';
  const container = insertElement(pCC, createDiv());
  const domTable = insertElement(container, createTable());
  // const domTHead = insertElement(domTable, thisTHead());
  insertElement(domTable, thisTHead());
  const domTBody = insertElement(domTable, createTBody());

  const tableComponent = tableComponentFactory({
    el: container,
    table: smartCollection
  });

  tableComponent.onDisplayChange(partial(displayChange, domTBody));
}

export default function advisor() {
  if (jQueryNotPresent()) {return;}
  pCC.innerHTML = 'Loading...';
  advisorView(0).then(showMe);
}
