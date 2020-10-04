import { as as guideUrl } from './calfSystem-975d976a.js';

const css = ".parent {\r\n  display: flex;\r\n  flex-direction: row;\r\n  justify-content: center;\r\n  align-items: flex-end;\r\n}\r\n.parent a {\r\n  height: 17.4px;\r\n  width: 17.4px;\r\n  background-size: contain;\r\n  border: solid 1px #4f3717;\r\n  border-radius: 2px;\r\n}\r\n";
const modules_dd5d330b = {};

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
//# sourceMappingURL=guideButtons-180a5656.js.map
