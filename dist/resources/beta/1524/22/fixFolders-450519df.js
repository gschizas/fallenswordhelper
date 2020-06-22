import{D as o,t as a,aD as f}from"./calfSystem-1b876afa.js"
import{g as t,m as n}from"./monkeyBp-33a4301f.js"
function r(o,a){const t=`${f}ui/misc/${a}.png`
o.src!==t&&(o.src=t)}function s(o,a){a.dataset.folder===o?r(a,"folder_on"):r(a,"folder")}function c(f){o(".backpackFolderImage").forEach(a(s,String(f.folderId)))}export default function(){const o=t()
o&&n(o,c)}
//# sourceMappingURL=fixFolders-450519df.js.map
