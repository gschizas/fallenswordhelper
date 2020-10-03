import { G as getValue, D as querySelector, K as getTextTrim, F as playerLinkSelector, s as partial, e as entries, i as insertElement, o as onclick, V as setValue } from './calfSystem-c851a12c.js';
import { c as createStyle } from './createStyle-55476e5b.js';
import { d as dataRows } from './dataRows-9921e68d.js';
import { p as parseDateAsTimestamp } from './parseDateAsTimestamp-7d5c44ea.js';
import { d as doBuffLink, a as doBuffLinkClick } from './doBuffLinkClick-2a80865b.js';

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

function getLastCheck(lastCheckScreen) {
  return getValue(lastCheckScreen) || nowUtc;
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
      .map(([aRow]) => querySelector(playerLinkSelector, aRow))
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
  onclick(chatTable, doBuffLinkClick);
  setValue(lastCheckScreen, nowUtc);
}

function addLogColoring(logScreen, dateColumn) {
  if (!getValue('enableLogColoring')) { return; }
  const chatTable = findChatTable(logScreen);
  if (chatTable) { doLogColoring(logScreen, dateColumn, chatTable); }
}

export { addLogColoring as a };
//# sourceMappingURL=addLogColoring-da80732a.js.map
