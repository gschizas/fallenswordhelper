import{D as o,t as a,aH as t}from"./calfSystem-9901ad27.js"
import{g as f,m as n}from"./monkeyBp-19b69bf0.js"
function r(o,a){const f=`${t}ui/misc/${a}.png`
o.src!==f&&(o.src=f)}function s(o,a){a.dataset.folder===o?r(a,"folder_on"):r(a,"folder")}function c(t){o(".backpackFolderImage").forEach(a(s,String(t.folderId)))}export default function(){const o=f()
o&&n(o,c)}
//# sourceMappingURL=fixFolders-b792451f.js.map
