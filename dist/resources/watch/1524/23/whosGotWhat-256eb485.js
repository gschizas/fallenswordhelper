import { s as partial, T as nowSecs, A as setInnerHtml, p as pCC, i as insertElement, b as createDiv, k as on, o as onclick } from './calfSystem-2b1fed3f.js';
import { t as toLowerCase } from './toLowerCase-dda30e6b.js';
import { c as createInput } from './createInput-1f3f2b8b.js';
import { a as addCommas } from './addCommas-8cd7d96d.js';
import { c as createTBody } from './createTBody-ad5b44c1.js';
import { c as createTable } from './createTable-681f7f4f.js';
import { c as createButton } from './createButton-31aa8751.js';
import './indexAjaxJson-bdb16b7c.js';
import './cmdExport-4dceba5b.js';
import { g as guildStore } from './guildStore-fafef7d4.js';
import './all-9da52a21.js';
import './guild-5dfcc29b.js';
import { l as lastActivityToDays, d as daGuildManage } from './lastActivityToDays-ff1f1678.js';
import { a as allthen } from './allthen-f8a5c187.js';
import { c as createSelect } from './createSelect-c78ca7cf.js';
import { c as createTr } from './createTr-f880e030.js';
import { p as paginationDirective, a as searchDirective, s as smartTable, t as table } from './index-1d9175fb.js';

const css = ".whosGotWhat {\r\n  border: 1px solid black;\r\n  margin: auto;\r\n  table-layout: fixed\r\n  /* width: 588px; */\r\n\r\n}\r\n\r\n.whosGotWhat tr:nth-child(odd) {background: wheat;}\r\n\r\n.whosGotWhat tr:nth-child(even) {background: burlywood;}\r\n\r\n.whosGotWhat tr:hover {background: cornsilk;}\r\n\r\n.whosGotWhat th {\r\n    background: peru;\r\n    background-position: right center;\r\n    background-repeat: no-repeat;\r\n  }\r\n\r\n.whosGotWhat th, .whosGotWhat td {\r\n    padding: 2px;\r\n    text-align: right;\r\n  }\r\n\r\n.whosGotWhat th.st-sort-asc {\r\n      background-image: url(data:image/gif;base64,R0lGODlhFQAEAIAAACMtMP///yH5BAEAAAEALAAAAAAVAAQAAAINjI8Bya2wnINUMopZAQA7);\r\n  }\r\n\r\n.whosGotWhat th.st-sort-desc {\r\n      background-image: url(data:image/gif;base64,R0lGODlhFQAEAIAAACMtMP///yH5BAEAAAEALAAAAAAVAAQAAAINjB+gC+jP2ptn0WskLQA7);\r\n  }\r\n\r\n.whosGotWhat th.st-sort-reverse.st-sort-asc {\r\n      background-image: url(data:image/gif;base64,R0lGODlhFQAEAIAAACMtMP///yH5BAEAAAEALAAAAAAVAAQAAAINjB+gC+jP2ptn0WskLQA7);\r\n  }\r\n\r\n.whosGotWhat th.st-sort-reverse.st-sort-desc {\r\n      background-image: url(data:image/gif;base64,R0lGODlhFQAEAIAAACMtMP///yH5BAEAAAEALAAAAAAVAAQAAAINjI8Bya2wnINUMopZAQA7);\r\n  }\r\n\r\n.whosGotWhat th:nth-child(2), .whosGotWhat td:nth-child(2), .whosGotWhat th:nth-child(4), .whosGotWhat td:nth-child(4) {text-align: left;}\r\n\r\n.whosGotWhat td:nth-child(1), .whosGotWhat th:nth-child(1) {width: 28px;}\r\n\r\n.whosGotWhat { /* slot */\r\n\r\n}\r\n\r\n.whosGotWhat td:nth-child(2), .whosGotWhat th:nth-child(2) {width: 80px;}\r\n\r\n.whosGotWhat { /* name */\r\n\r\n}\r\n\r\n.whosGotWhat td:nth-child(3), .whosGotWhat th:nth-child(3) {width: 34px;}\r\n\r\n.whosGotWhat { /* level */\r\n\r\n}\r\n\r\n.whosGotWhat td:nth-child(4), .whosGotWhat th:nth-child(4) {width: 216px;}\r\n\r\n.whosGotWhat { /* rank */\r\n\r\n}\r\n\r\n.whosGotWhat td:nth-child(5), .whosGotWhat th:nth-child(5) {width: 106px;}\r\n\r\n.whosGotWhat { /* gxp */\r\n\r\n}\r\n\r\n.whosGotWhat td:nth-child(6), .whosGotWhat th:nth-child(6) {width: 44px;}\r\n\r\n.whosGotWhat { /* activity */\r\n\r\n}\r\n\r\n.whosGotWhat td:nth-child(7), .whosGotWhat th:nth-child(7) {width: 32px;}\r\n\r\n.whosGotWhat { /* pack */\r\n\r\n}\r\n\r\n.whosGotWhat td:nth-child(8), .whosGotWhat th:nth-child(8) {width: 48px;}\r\n\r\n.whosGotWhat { /* Stam */\r\n\r\n}\r\n\r\n#pCC .whosGotWhat {\r\n  border-collapse: collapse;\r\n  border-spacing: 0;\r\n}\r\n\r\n.st-top-container {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  margin: 0 auto 5px;\r\n  /* padding: 0 5px; */\r\n  width: 618px;\r\n}\r\n\r\n.st-bottom-container {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  margin: 5px auto 0;\r\n  /* padding: 0 5px; */\r\n  width: 618px;\r\n}\r\n\r\n.fsh-search-wrapper {\r\n\r\n  border-style: solid;\r\n  border-width: 1px;\r\n  border-color: #a9772c #f3d99d #f3d99d #a9772c;\r\n  background-color: #f7ebd3;\r\n  padding: 1px 6px 1px 1px\r\n\r\n}\r\n\r\n.fsh-search-wrapper input {\r\n    background-color: transparent;\r\n    border: none;\r\n    outline: 0;\r\n  }\r\n\r\n.fsh-search-wrapper input:invalid {\r\n    box-shadow: none; /* Firefox */\r\n  }\r\n\r\n.fsh-search-wrapper button {\r\n    background-color: transparent;\r\n    border: none;\r\n    color: blue;\r\n    cursor: pointer;\r\n    font-weight: bold;\r\n    padding: 0;\r\n  }\r\n\r\n.fsh-search-wrapper button:focus {\r\n    outline: none; /* Chrome */\r\n  }\r\n\r\n.fsh-search-wrapper input:not(:valid) ~ button {visibility: hidden;}\r\n";
const modules_086b2f9c = {};

function rowHtml(obj) {
  return `<td>${obj.slot}</td>`
    + `<td>${obj.name}</td>`
    + `<td>${obj.level}</td>`
    + `<td>${obj.rank_name}</td>`
    + `<td>${obj.gxp}</td>`
    + `<td>${obj.activity}</td>`
    + `<td>${obj.pack}</td>`
    + `<td>${obj.stam}</td>`;
}

function rowFactory(aRow) {
  if (!aRow.dom) {
    // eslint-disable-next-line no-param-reassign
    aRow.dom = createTr(
      { innerHTML: rowHtml(aRow) },
    );
  }
  return aRow.dom;
}

function displayChange(domTable, table, displayed) {
  // console.log(table.getTableState());
  const domTBody = domTable.tBodies[0];
  const thisTBody = createTBody();
  for (const r of displayed) {
    thisTBody.appendChild(rowFactory(r.value));
  }
  domTable.replaceChild(thisTBody, domTBody);
}

function byMember(acc, curr) {
  // if (curr.item_id === 11503) { // Zombie Brew
  if (!curr.equipped) {
    acc[curr.player_id] = acc[curr.player_id] || [];
    acc[curr.player_id].push(curr);
  }
  return acc;
}

function addRank(rankName, thisMember) {
  return { ...thisMember, rank_name: rankName };
}

function extractMembers(thisRank) {
  return thisRank.members.map(partial(addRank, thisRank.name));
}

function processGuild(guild) {
  return guild.r.ranks.flatMap(extractMembers);
}

function decorateMembers(pots, obj, i) {
  return {
    ...obj,
    slot: i + 1,
    name_lower: toLowerCase(obj.name),
    lvl_reverse: 0 - obj.level,
    rank_lower: toLowerCase(obj.rank_name.trim()),
    gxp: addCommas(obj.guild_xp),
    gxp_reverse: 0 - obj.guild_xp,
    activity: lastActivityToDays(obj.last_activity),
    act: obj.last_activity - nowSecs,
    pack: (pots[obj.id] || []).length,
    pack_reverse: 0 - (pots[obj.id] || []).length,
    stam: addCommas(obj.current_stamina),
    stam_reverse: 0 - obj.current_stamina,
  };
}

function prepareData([json, guild]) {
  // console.log('json', json);
  const pots = json.items.reduce(byMember, {});
  // console.log('pots', pots);
  const members = processGuild(guild);
  // console.log('members', members);
  return members.map(partial(decorateMembers, pots));
}

const theadHtml = '<thead><tr>'
  + '<th data-st-sort="slot" class="st-sort-asc">Slot</th>'
  + '<th data-st-sort="name_lower">Name</th>'
  + '<th class="st-sort-reverse" data-st-sort="lvl_reverse">Level</th>'
  + '<th data-st-sort="rank_lower">Rank</th>'
  + '<th class="st-sort-reverse" data-st-sort="gxp_reverse">GXP</th>'
  + '<th class="st-sort-reverse" data-st-sort="act">Activity</th>'
  + '<th class="st-sort-reverse" data-st-sort="pack_reverse">Pack</th>'
  + '<th class="st-sort-reverse" data-st-sort="stam_reverse">Stam</th>'
  + '</tr></thead><tbody></tbody>';

function makeTable(el) {
  return insertElement(el, createTable({
    className: 'whosGotWhat',
    innerHTML: theadHtml,
  }));
}

function makeSizer(el, table) {
  const thisSizer = createSelect({
    innerHTML: '<option value="25" selected>25</option>'
      + '<option value="50">50</option>'
      + '<option value="0">All</option>',
  });
  const box = createDiv();
  insertElement(box, thisSizer);
  insertElement(el, box);
  const slice = paginationDirective({ table });
  on(thisSizer, 'change', (e) => {
    slice.changePageSize(Number(e.target.value));
  });
}

function makeSearch(top, table) {
  const wrapper = createDiv({ className: 'fsh-search-wrapper' });
  const input = createInput({
    dataset: {
      stSearch: 'name, rank_name',
      stSearchFlags: 'i',
    },
    placeholder: 'Enter search term',
    required: true,
    type: 'text',
  });
  const button = createButton({
    innerHTML: '&times;',
    type: 'button',
  });
  const directive = searchDirective({ table });
  onclick(button, () => {
    input.value = '';
    input.focus();
    directive.search('');
  });
  insertElement(wrapper, input);
  insertElement(wrapper, button);
  insertElement(top, wrapper);
}

function makeSummary(bottom, table, data) {
  const summaryDiv = createDiv();
  insertElement(bottom, summaryDiv);
  const slice = paginationDirective({ table });
  slice.onSummaryChange(({ page, size, filteredCount }) => {
    let filterModifier = 0;
    if (filteredCount) { filterModifier = 1; }
    setInnerHtml(`showing ${
      (page - 1) * size + filterModifier} - ${
      Math.min(filteredCount, page * size)} of ${
      filteredCount} (${data.length} total)`, summaryDiv);
  });
}

function makePager(bottom, table) {
  const pagerDiv = createDiv();
  const firstBtn = createButton({ innerHTML: '«' });
  const prevBtn = createButton({ innerHTML: '‹' });
  const pageBtn = createButton({ disabled: true, innerHTML: '1' });
  const nextBtn = createButton({ innerHTML: '›' });
  const lastBtn = createButton({ innerHTML: '»' });
  let lastPage = 1;

  const pager = paginationDirective({ table });
  pager.onSummaryChange(({ page, size, filteredCount }) => {
    firstBtn.disabled = !pager.isPreviousPageEnabled();
    prevBtn.disabled = !pager.isPreviousPageEnabled();
    nextBtn.disabled = !pager.isNextPageEnabled();
    lastBtn.disabled = !pager.isNextPageEnabled();
    setInnerHtml(page, pageBtn);
    lastPage = Math.ceil(filteredCount / size);
  });

  onclick(firstBtn, () => pager.selectPage(1));
  onclick(prevBtn, () => pager.selectPreviousPage());
  onclick(nextBtn, () => pager.selectNextPage());
  onclick(lastBtn, () => pager.selectPage(lastPage));

  insertElement(pagerDiv, firstBtn);
  insertElement(pagerDiv, prevBtn);
  insertElement(pagerDiv, pageBtn);
  insertElement(pagerDiv, nextBtn);
  insertElement(pagerDiv, lastBtn);
  insertElement(bottom, pagerDiv);
}

function showMe(dataAry) {
  // console.log(dataAry);
  const data = prepareData(dataAry);
  // console.log('data', data);
  setInnerHtml('', pCC);
  const el = insertElement(pCC, createDiv());
  const top = insertElement(el, createDiv({ className: 'st-top-container' }));
  const tableContainer = insertElement(el, createDiv());
  const domTable = makeTable(tableContainer);
  const bottom = insertElement(el,
    createDiv({ className: 'st-bottom-container' }));
  const tableState = {
    sort: { pointer: 'slot', direction: 'asc' },
    slice: { page: 1, size: 25 },
    filter: {},
    search: {},
  };
  const table$1 = smartTable({ data, tableState });
  makeSizer(top, table$1);
  makeSearch(top, table$1);
  makeSummary(bottom, table$1, data);
  makePager(bottom, table$1);
  const tableComponent = table({ el, table: table$1 });
  tableComponent.onDisplayChange(partial(displayChange, domTable, table$1));
  tableComponent.exec();
  // slice.selectNextPage();
}

function whosGotWhat() {
  setInnerHtml('Loading...', pCC);
  allthen([guildStore(), daGuildManage()], showMe);
}

export default whosGotWhat;
//# sourceMappingURL=whosGotWhat-256eb485.js.map
