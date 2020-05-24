import { p as pCC, k as insertHtmlBeforeEnd, a0 as scouttowerUrl } from './calfSystem-43606e5e.js';

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
//# sourceMappingURL=injectTitan-4419d0b0.js.map
