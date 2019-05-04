import addCommas from '../../system/addCommas';
import {createTr} from '../../common/cElement';
import {playerIdUrl} from '../../support/constants';

function rowHtml(aRow, withCommas) {
  return '<td>' +
    `<a href="${playerIdUrl}${aRow.player.id}">${aRow.player.name}</a>` +
    '</td>' +
    `<td>${aRow.player.level}</td>` +
    `<td>${aRow.player.rank}</td>` +
    `<td>${withCommas[6]}</td>` +
    `<td>${withCommas[7]}</td>` +
    `<td>${withCommas[0]}</td>` +
    `<td>${withCommas[1]}</td>` +
    `<td>${withCommas[2]}</td>` +
    `<td>${withCommas[3]}</td>` +
    `<td>${withCommas[4]}</td>` +
    `<td>${withCommas[8]}</td>` +
    `<td>${withCommas[5]}</td>`;
}

export default function rowFactory(aRow) {
  let dom = aRow.dom;
  if (!dom) {
    dom = createTr(
      {innerHTML: rowHtml(aRow, aRow.stats.map(addCommas))}
    );
  }
  return dom;
}
