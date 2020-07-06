import{D as o,t as c,aD as t}from"./calfSystem-019de1cf.js"
import{g as a,m as f}from"./monkeyBp-60586c90.js"
function n(o,c){const a=`${t}ui/misc/${c}.png`
o.src!==a&&(o.src=a)}function r(o,c){c.dataset.folder===o?n(c,"folder_on"):n(c,"folder")}function s(t){o(".backpackFolderImage").forEach(c(r,String(t.folderId)))}export default function(){const o=a()
o&&f(o,s)}
//# sourceMappingURL=fixFolders-cdfe82b2.js.map
