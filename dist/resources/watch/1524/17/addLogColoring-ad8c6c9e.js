import { D as getValue, N as querySelector, e as insertHtmlBeforeEnd, a4 as getTextTrim, r as partial, l as entries, i as insertElement, o as onclick, T as setValue } from './calfSystem-f6498976.js';
import { o as openQuickBuffByName } from './openQuickBuffByName-f15b9edc.js';
import { d as dataRows } from './dataRows-74b73b57.js';
import { c as createStyle } from './createStyle-ce42a3a3.js';
import { p as parseDateAsTimestamp } from './parseDateAsTimestamp-150901d3.js';

let nowUtc;
let lastCheckUtc;

function findChatTable(logScreen) {
  if (logScreen === 'Chat') {
    return querySelector('#pCC table table table table');
  }
  return querySelector('#pCC > table:last-of-type');
}

function isOldRow(postAgeMins, postDateUtc) {
  return postAgeMins > 20 && postDateUtc <= lastCheckUtc;
}

function doBuffLink(aRow) {
  insertHtmlBeforeEnd(aRow.cells[1],
    ' <button class="fshBl fshBls">[b]</button>');
}

function getLastCheck(lastCheckScreen) {
  return getValue(lastCheckScreen) || nowUtc;
}

const isBuffLink = (target) => target.classList.contains('fshBl') && target.previousElementSibling;

function handleClick(e) {
  if (isBuffLink(e.target)) {
    openQuickBuffByName(getTextTrim(e.target.previousElementSibling));
  }
}

function typeMap(dateColumn, aRow) {
  let rowType = 'old';
  const postDateUtc = parseDateAsTimestamp(getTextTrim(aRow.cells[dateColumn]));
  const postAgeMins = (nowUtc - postDateUtc) / (1000 * 60);
  if (!isOldRow(postAgeMins, postDateUtc)) {
    if (postDateUtc > lastCheckUtc) {
      rowType = 'new';
    } else {
      rowType = 'seen';
    }
  }
  return [aRow, rowType];
}

function doBuffLinks(logScreen, rowTags) {
  if (logScreen === 'Chat') {
    rowTags.filter(([, rowType]) => rowType !== 'old')
      .map(([aRow]) => aRow)
      .forEach(doBuffLink);
  }
}

function byType(acc, [aRow, rowType]) {
  const rowNumber = aRow.rowIndex + 1;
  if (acc[rowType]) {
    acc[rowType] = {
      min: Math.min(acc[rowType].min, rowNumber),
      max: Math.max(acc[rowType].min, rowNumber),
    };
  } else {
    acc[rowType] = { min: rowNumber, max: rowNumber };
  }
  return acc;
}

function toStyle(spacing, [rowType, { min, max }]) {
  return `.fshLogColoring tr:nth-of-type(${spacing}n+${min}):nth-of-type(-${
    spacing}n+${max}) {background-color: ${
    rowType === 'old' ? '#CD9E4B' : '#F5F298'};}`;
}

function processRows(logScreen, dateColumn, chatTable) {
  const rows = dataRows(chatTable.rows, 3, 0);
  const rowTags = rows.map(partial(typeMap, dateColumn));
  doBuffLinks(logScreen, rowTags);
  const rowsToColor = rowTags.filter(([, rowType]) => rowType !== 'seen');
  const rowGroups = rowsToColor.reduce(byType, {});
  const spacing = logScreen === 'Chat' ? 4 : 2;
  const rowStyle = entries(rowGroups).map(partial(toStyle, spacing));
  if (rowStyle.length) {
    insertElement(document.body, createStyle(rowStyle.join('\n')));
  }
}

function doLogColoring(logScreen, dateColumn, chatTable) {
  chatTable.classList.add('fshLogColoring');
  nowUtc = new Date().setUTCSeconds(0, 0) - 1;
  const lastCheckScreen = `last${logScreen}Check`;
  lastCheckUtc = getLastCheck(lastCheckScreen);
  processRows(logScreen, dateColumn, chatTable);
  onclick(chatTable, handleClick);
  setValue(lastCheckScreen, nowUtc);
}

function addLogColoring(logScreen, dateColumn) {
  if (!getValue('enableLogColoring')) { return; }
  const chatTable = findChatTable(logScreen);
  if (chatTable) { doLogColoring(logScreen, dateColumn, chatTable); }
}

export { addLogColoring as a };
//# sourceMappingURL=addLogColoring-ad8c6c9e.js.map
