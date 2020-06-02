import { m as cElement, $ as playerIdUrl, r as partial, i as insertElement, b as createDiv, z as setInnerHtml, p as pCC, w as jQueryNotPresent } from './calfSystem-6e4b53e3.js';
import { t as toLowerCase } from './toLowerCase-16825a0a.js';
import { a as addCommas } from './addCommas-7c72e02d.js';
import './currentGuildId-a98deec3.js';
import './idb-fc617077.js';
import { c as createTBody } from './createTBody-fa1935ad.js';
import { c as createTable } from './createTable-d48b0997.js';
import './indexAjaxJson-3f2c1d04.js';
import { c as createTr } from './createTr-3f08cffe.js';
import './cmdExport-67d5e685.js';
import './guild-cf78b700.js';
import { g as getMembrList } from './getMembrList-bec08672.js';
import { d as daAdvisor } from './daAdvisor-4b1b4a5c.js';
import { s as smartTable, t as table } from './index-18ad49df.js';

var undefined$1 = undefined;

function createTHead(props) {
  return cElement('thead', props);
}

function rowHtml(aRow, withCommas) {
  return '<td>'
    + `<a href="${playerIdUrl}${aRow.player.id}">${aRow.player.name}</a>`
    + '</td>'
    + `<td>${aRow.player.level}</td>`
    + `<td>${aRow.player.rank}</td>`
    + `<td>${withCommas[6]}</td>`
    + `<td>${withCommas[7]}</td>`
    + `<td>${withCommas[0]}</td>`
    + `<td>${withCommas[1]}</td>`
    + `<td>${withCommas[2]}</td>`
    + `<td>${withCommas[3]}</td>`
    + `<td>${withCommas[4]}</td>`
    + `<td>${withCommas[8]}</td>`
    + `<td>${withCommas[5]}</td>`;
}

function rowFactory(aRow) {
  let { dom } = aRow;
  if (!dom) {
    dom = createTr(
      { innerHTML: rowHtml(aRow, aRow.stats.map(addCommas)) },
    );
  }
  return dom;
}

function displayChange(domTable, displayed) {
  const domTBody = domTable.tBodies[0];
  const thisTBody = createTBody();
  for (const r of displayed) {
    thisTBody.appendChild(rowFactory(r.value));
  }
  domTable.replaceChild(thisTBody, domTBody);
}

const reformat = (membrList, row) => ({
  ...row,
  player: {
    ...row.player,
    lower: toLowerCase(row.player.name),
    rank: membrList[row.player.name].rank_name, // TODO
    level: membrList[row.player.name].level, // TODO
  },
});

function prepareData(data, membrList) {
  return data.r.map(partial(reformat, membrList));
}

function smartTableConfig(data, membrList) {
  return {
    data: prepareData(data, membrList),
    tableState: {
      sort: {},
      filter: {},
      search: {},
      slice: { page: 1, size: 50 },
    },
  };
}

const theadHtml = `
<th data-st-sort="player.lower"><span>Member</span></th>
<th data-st-sort="player.level"><span>Lvl</span></th>
<th data-st-sort="player.rank"><span>Rank</span></th>
<th data-st-sort="stats.6"><span>Gold From<br>Deposits</span></th>
<th data-st-sort="stats.7"><span>Gold From<br>Tax</span></th>
<th data-st-sort="stats.0"><span>Gold Total</span></th>
<th data-st-sort="stats.1"><span>FSP</span></th>
<th data-st-sort="stats.2"><span>Skill<br>Cast</span></th>
<th data-st-sort="stats.3"><span>Group<br>Create</span></th>
<th data-st-sort="stats.4"><span>Group<br>Join</span></th>
<th data-st-sort="stats.8"><span>Relic</span></th>
<th data-st-sort="stats.5"><span>XP Contrib</span></th>
`;

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

function showMe([data, membrList]) {
  // console.log('showMe', data, membrList);
  const smartCollection = smartTable(smartTableConfig(data, membrList));

  const container = prepareContainer();
  // const topControls = makeTopControls(container);
  const domTable = makeTable(container);
  // const bottomControls = makeBottomControls(container);

  const tableComponent = table({
    el: container,
    table: smartCollection,
  });

  tableComponent.onDisplayChange(partial(displayChange, domTable));
  tableComponent.exec();
}

function advisor() {
  if (jQueryNotPresent()) { return; }
  setInnerHtml('Loading...', pCC);
  Promise.all([daAdvisor(0), getMembrList(false)]).then(showMe);
}

export default advisor;
//# sourceMappingURL=advisor-956bc04e.js.map