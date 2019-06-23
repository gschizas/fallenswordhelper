import addCommas from '../system/addCommas';
import contains from '../common/contains';
import getArrayByTagName from '../common/getArrayByTagName';
import getTextTrim from '../common/getTextTrim';
import insertHtmlAfterBegin from '../common/insertHtmlAfterBegin';
import intValue from '../system/intValue';
import {pCC} from '../support/layout';
import playerName from '../common/playerName';

function isMyRow(thisRow) {
  return thisRow.cells.length > 1 &&
    getTextTrim(thisRow.cells[1]) === playerName();
}

function prepareRow(thisRow) {
  const pvpRating = intValue(getTextTrim(thisRow.cells[3]));
  insertHtmlAfterBegin(thisRow.cells[3],
    '<span class="fshBlue fshXSmall">(' +
    addCommas(pvpRating - 250) + ')</span>&nbsp;');
}

export default function margin() {
  const vlHeader = getArrayByTagName('td', pCC).filter(contains('VL'));
  if (vlHeader.length === 1) {
    const thisRows = vlHeader[0].parentNode.parentNode.rows;
    Array.from(thisRows).filter(isMyRow).forEach(prepareRow);
  }
}
