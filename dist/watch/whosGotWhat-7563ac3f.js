import { u as partial, ac as addCommas, bM as lastActivityToDays, ay as nowSecs, C as setInnerHtml, p as pCC, bN as daGuildManage, i as insertElement, e as createDiv, l as on, o as onclick } from './calfSystem-69cf053a.js';
import { t as toLowerCase } from './toLowerCase-2962b55d.js';
import { c as createInput } from './createInput-ae7dd0f9.js';
import { c as createTBody } from './createTBody-4ff535d8.js';
import { c as createTable } from './createTable-b43c02b0.js';
import { c as createButton } from './createButton-99f8b0e1.js';
import './all-0cd3fb64.js';
import { a as allthen } from './allthen-1d09caaf.js';
import { c as createTr } from './createTr-9258cf01.js';
import { g as guildStore } from './guildStore-fce0fc07.js';
import { c as createSelect } from './createSelect-0e136eb6.js';
import { p as paginationDirective, a as searchDirective, s as smartTable, t as table } from './index-7fa23885.js';

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
  if (curr.item_id === 11503) { // Zombie Brew
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
  return [].concat(...guild.r.ranks.map(extractMembers));
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
//# sourceMappingURL=whosGotWhat-7563ac3f.js.map
