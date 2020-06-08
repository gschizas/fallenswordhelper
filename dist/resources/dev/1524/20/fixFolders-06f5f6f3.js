import{D as o,t as a,aH as c}from"./calfSystem-a2862afc.js"
import{g as f,m as t}from"./monkeyBp-5ceabc0f.js"
function n(o,a){const f=`${c}ui/misc/${a}.png`
o.src!==f&&(o.src=f)}function r(o,a){a.dataset.folder===o?n(a,"folder_on"):n(a,"folder")}function s(c){o(".backpackFolderImage").forEach(a(r,String(c.folderId)))}export default function(){const o=f()
o&&t(o,s)}
//# sourceMappingURL=fixFolders-06f5f6f3.js.map
