import{D as o,t as a,ah as t}from"./calfSystem-7aee5245.js"
import{g as n,m as r}from"./monkeyBp-3a829a1a.js"
function s(o,a){const n=`${t}ui/misc/${a}.png`
o.src!==n&&(o.src=n)}function c(o,a){a.dataset.folder===o?s(a,"folder_on"):s(a,"folder")}function e(t){o(".backpackFolderImage").forEach(a(c,String(t.folderId)))}function f(){const o=n()
o&&r(o,e)}export default f
//# sourceMappingURL=fixFolders-d1e0ac0e.js.map
