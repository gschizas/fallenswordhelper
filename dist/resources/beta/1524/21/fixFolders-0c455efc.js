import{D as o,t,aD as a}from"./calfSystem-89b939c8.js"
import{g as c,m as f}from"./monkeyBp-f6d7b83b.js"
function n(o,t){const c=`${a}ui/misc/${t}.png`
o.src!==c&&(o.src=c)}function r(o,t){t.dataset.folder===o?n(t,"folder_on"):n(t,"folder")}function s(a){o(".backpackFolderImage").forEach(t(r,String(a.folderId)))}export default function(){const o=c()
o&&f(o,s)}
//# sourceMappingURL=fixFolders-0c455efc.js.map
