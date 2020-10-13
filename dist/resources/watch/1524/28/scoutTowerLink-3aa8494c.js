import { y as getElementById, f as insertHtmlBeforeEnd, U as scouttowerUrl, aH as cdn } from './calfSystem-21d16a0e.js';

function scoutTowerLink() {
  const spoils = getElementById('minibox-spoilsofwar');
  if (spoils) {
    const parent = spoils.children[1].children[0];
    insertHtmlBeforeEnd(parent, `&nbsp;<a href="${scouttowerUrl
    }" class="tip-static" data-tipped="View Scout Report">`
      + '<img id="fshScoutTower" '
      + `src="${cdn}/structures/27.png"></a>`);
  }
}

export default scoutTowerLink;
//# sourceMappingURL=scoutTowerLink-3aa8494c.js.map
