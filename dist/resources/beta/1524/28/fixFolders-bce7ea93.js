import{D as o,t as f,aD as c}from"./calfSystem-964f4fc9.js"
import{g as t,m as a}from"./monkeyBp-f5cbb5d3.js"
function n(o,f){const t=`${c}ui/misc/${f}.png`
o.src!==t&&(o.src=t)}function r(o,f){f.dataset.folder===o?n(f,"folder_on"):n(f,"folder")}function s(c){o(".backpackFolderImage").forEach(f(r,String(c.folderId)))}function e(){const o=t()
o&&a(o,s)}export default e
//# sourceMappingURL=fixFolders-bce7ea93.js.map
