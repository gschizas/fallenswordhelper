import{D as o,t as a,aD as c}from"./calfSystem-019a589c.js"
import{g as t,m as f}from"./monkeyBp-c1735fb4.js"
function n(o,a){const t=`${c}ui/misc/${a}.png`
o.src!==t&&(o.src=t)}function r(o,a){a.dataset.folder===o?n(a,"folder_on"):n(a,"folder")}function s(c){o(".backpackFolderImage").forEach(a(r,String(c.folderId)))}function e(){const o=t()
o&&f(o,s)}export default e
//# sourceMappingURL=fixFolders-7effdc88.js.map
