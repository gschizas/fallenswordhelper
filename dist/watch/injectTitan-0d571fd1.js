import { p as pCC, k as insertHtmlBeforeEnd, a0 as scouttowerUrl } from './calfSystem-cb5d894f.js';

function injectTitan() {
  const titanTable = pCC.children[0];
  let newRow = titanTable.insertRow(2);
  insertHtmlBeforeEnd(newRow, '<br>');
  newRow = titanTable.insertRow(3);
  insertHtmlBeforeEnd(newRow,
    `<td class="fshCenter fshBold">[ <a href="}${
      scouttowerUrl}">Scout Tower</a> ]</td>`);
}

export default injectTitan;
//# sourceMappingURL=injectTitan-0d571fd1.js.map
