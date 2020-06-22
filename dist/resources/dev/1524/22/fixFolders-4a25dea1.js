import{D as o,t as c,aH as t}from"./calfSystem-4cc738f8.js"
import{g as a,m as f}from"./monkeyBp-9797e785.js"
function n(o,c){const a=`${t}ui/misc/${c}.png`
o.src!==a&&(o.src=a)}function r(o,c){c.dataset.folder===o?n(c,"folder_on"):n(c,"folder")}function s(t){o(".backpackFolderImage").forEach(c(r,String(t.folderId)))}export default function(){const o=a()
o&&f(o,s)}
//# sourceMappingURL=fixFolders-4a25dea1.js.map
