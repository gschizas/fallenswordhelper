import{D as o,t as a,aH as c}from"./calfSystem-9c7241dc.js"
import{g as t,m as n}from"./monkeyBp-39b822a3.js"
function r(o,a){const t=`${c}ui/misc/${a}.png`
o.src!==t&&(o.src=t)}function s(o,a){a.dataset.folder===o?r(a,"folder_on"):r(a,"folder")}function f(c){o(".backpackFolderImage").forEach(a(s,String(c.folderId)))}export default function(){const o=t()
o&&n(o,f)}
//# sourceMappingURL=fixFolders-92f69bd0.js.map
