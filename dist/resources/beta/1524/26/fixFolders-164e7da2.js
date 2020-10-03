import{D as o,t as a,aD as t}from"./calfSystem-cf4d22a7.js"
import{g as c,m as f}from"./monkeyBp-6d07d44d.js"
function n(o,a){const c=`${t}ui/misc/${a}.png`
o.src!==c&&(o.src=c)}function r(o,a){a.dataset.folder===o?n(a,"folder_on"):n(a,"folder")}function s(t){o(".backpackFolderImage").forEach(a(r,String(t.folderId)))}function d(){const o=c()
o&&f(o,s)}export default d
//# sourceMappingURL=fixFolders-164e7da2.js.map
