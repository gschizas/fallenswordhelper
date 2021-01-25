import { y as getElementById, f as insertHtmlBeforeEnd, V as scouttowerUrl, al as cdn } from './calfSystem-e64be67d.js';

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
//# sourceMappingURL=scoutTowerLink-e5640145.js.map
