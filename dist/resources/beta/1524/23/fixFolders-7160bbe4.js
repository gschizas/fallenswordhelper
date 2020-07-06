import{D as o,t as c,aD as t}from"./calfSystem-34fcd691.js"
import{g as a,m as f}from"./monkeyBp-66dd09dc.js"
function n(o,c){const a=`${t}ui/misc/${c}.png`
o.src!==a&&(o.src=a)}function r(o,c){c.dataset.folder===o?n(c,"folder_on"):n(c,"folder")}function s(t){o(".backpackFolderImage").forEach(c(r,String(t.folderId)))}export default function(){const o=a()
o&&f(o,s)}
//# sourceMappingURL=fixFolders-7160bbe4.js.map
