import{D as o,t as a,aD as t}from"./calfSystem-05554bae.js"
import{g as n,m as r}from"./monkeyBp-5e781371.js"
function s(o,a){const n=`${t}ui/misc/${a}.png`
o.src!==n&&(o.src=n)}function c(o,a){a.dataset.folder===o?s(a,"folder_on"):s(a,"folder")}function e(t){o(".backpackFolderImage").forEach(a(c,String(t.folderId)))}export default function(){const o=n()
o&&r(o,e)}
//# sourceMappingURL=fixFolders-64895264.js.map
