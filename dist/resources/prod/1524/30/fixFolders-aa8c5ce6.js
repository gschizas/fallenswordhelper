import{D as o,t as a,aD as t}from"./calfSystem-6459f18a.js"
import{g as c,m as f}from"./monkeyBp-3c1e8517.js"
function n(o,a){const c=`${t}ui/misc/${a}.png`
o.src!==c&&(o.src=c)}function r(o,a){a.dataset.folder===o?n(a,"folder_on"):n(a,"folder")}function s(t){o(".backpackFolderImage").forEach(a(r,String(t.folderId)))}function e(){const o=c()
o&&f(o,s)}export default e
//# sourceMappingURL=fixFolders-aa8c5ce6.js.map
