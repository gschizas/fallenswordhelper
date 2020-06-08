import{D as o,t,aD as a}from"./calfSystem-03970067.js"
import{g as f,m as n}from"./monkeyBp-70fd4236.js"
function r(o,t){const f=`${a}ui/misc/${t}.png`
o.src!==f&&(o.src=f)}function s(o,t){t.dataset.folder===o?r(t,"folder_on"):r(t,"folder")}function c(a){o(".backpackFolderImage").forEach(t(s,String(a.folderId)))}export default function(){const o=f()
o&&n(o,c)}
//# sourceMappingURL=fixFolders-6dc9c58c.js.map
