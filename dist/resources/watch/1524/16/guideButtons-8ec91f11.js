import { ar as guideUrl } from './calfSystem-6e4b53e3.js';

var undefined$1 = undefined;

function guideButtons(questID, questName) {
  return '<div class="parent">'
    + `<a href="${guideUrl}quests&`
    + `subcmd=view&quest_id=${questID}" class="tip-static fshTempleOne" `
    + 'data-tipped="Search for this quest on the Ultimate Fallen Sword Guide" '
    + 'target="_blank"></a>&nbsp;'
    + `<a href="https://wiki.fallensword.com/index.php?title=${
      questName.replace(/ /g, '_')}" class="tip-static fshWiki" `
    + 'data-tipped="Search for this quest on the Wiki" '
    + 'target="_blank"></a></div>';
}

export { guideButtons as g };
//# sourceMappingURL=guideButtons-8ec91f11.js.map
