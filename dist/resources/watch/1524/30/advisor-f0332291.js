import { n as cElement, a1 as playerIdUrl, s as partial, i as insertElement, b as createDiv, A as setInnerHtml, p as pCC, x as jQueryNotPresent } from './calfSystem-d357ca6f.js';
import { t as toLowerCase } from './toLowerCase-5e186769.js';
import { a as addCommas } from './addCommas-508f0c08.js';
import './currentGuildId-bcd6f2c1.js';
import './idb-255a2314.js';
import { c as createTBody } from './createTBody-2eca33c0.js';
import { c as createTable } from './createTable-337c0681.js';
import './indexAjaxJson-e70729f5.js';
import './cmdExport-a9059769.js';
import './guild-6076bd6b.js';
import { g as getMembrList } from './getMembrList-572d1f40.js';
import { d as daAdvisor } from './daAdvisor-27e3113e.js';
import { c as createTr } from './createTr-aff0ea8f.js';
import { s as smartTable, t as table } from './index-d77c8605.js';

var css = ".fshSmartTable {\r\n  border: 1px solid black;\r\n  table-layout: fixed;\r\n  width: 650px;\r\n}\r\n\r\n.fshSmartTable thead tr {\r\n  height: 22px;\r\n}\r\n\r\n.fshSmartTable thead th {\r\n  background-color: #cd9e4b;\r\n  position: relative;\r\n}\r\n\r\n.fshSmartTable thead th span {\r\n  cursor: pointer;\r\n  font-weight: bold;\r\n  text-decoration: underline;\r\n}\r\n\r\n.fshSmartTable tbody tr:hover {\r\n  background-color: whitesmoke;\r\n}\r\n\r\n.fshSmartTable td {\r\n  text-overflow: ellipsis;\r\n  overflow: hidden;\r\n  white-space: nowrap;\r\n}\r\n\r\n.fshSmartTable td:nth-child(1), .fshSmartTable th:nth-child(1) {width: 64px;} /* member */\r\n.fshSmartTable td:nth-child(2), .fshSmartTable th:nth-child(2) {width: 24px;} /* lvl */\r\n.fshSmartTable td:nth-child(3), .fshSmartTable th:nth-child(3) {width: 76px;} /* rank */\r\n.fshSmartTable td:nth-child(4), .fshSmartTable th:nth-child(4) {width: 70px;} /* depo */\r\n.fshSmartTable td:nth-child(5), .fshSmartTable th:nth-child(5) {width: 70px;} /* tax */\r\n.fshSmartTable td:nth-child(6), .fshSmartTable th:nth-child(6) {width: 70px;} /* total */\r\n.fshSmartTable td:nth-child(7), .fshSmartTable th:nth-child(7) {width: 32px;} /* fsp */\r\n.fshSmartTable td:nth-child(8), .fshSmartTable th:nth-child(8) {width: 38px;} /* skill */\r\n.fshSmartTable td:nth-child(9), .fshSmartTable th:nth-child(9) {width: 32px;} /* create */\r\n.fshSmartTable td:nth-child(10), .fshSmartTable th:nth-child(10) {width: 30px;} /* join */\r\n.fshSmartTable td:nth-child(11), .fshSmartTable th:nth-child(11) {width: 26px;} /* relic */\r\n.fshSmartTable td:nth-child(12), .fshSmartTable th:nth-child(12) {width: 90px;} /* gxp */\r\n\r\n.fshSmartTable td:nth-child(n+4), .fshSmartTable th:nth-child(n+4) {\r\n  text-align: center;\r\n}\r\n\r\n/* Smart Table */\r\n.fshSmartTable th[data-st-sort]:after {\r\n  /* color: #999; */\r\n  /* content: '\\f0dc'; */\r\n  position: absolute;\r\n  right: 8px;\r\n}\r\n\r\n/* .fshSmartTable th[data-st-sort]:hover::after {\r\n  color: #333;\r\n} */\r\n\r\n.st-sort-asc:after {\r\n  /* content: '\\25b3\\0020'; */\r\n  /* content: '\\25b3'; */\r\n}\r\n\r\n.st-sort-desc:after {\r\n  /* content: '\\25bd\\0020'; */\r\n  /* content: '\\25bd'; */\r\n}\r\n";
var modules_0c1b5e64 = {};

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
//# sourceMappingURL=advisor-f0332291.js.map
