import{D as o,t as a,aH as f}from"./calfSystem-4991bf5b.js"
import{g as t,m as n}from"./monkeyBp-f56848ea.js"
function r(o,a){const t=`${f}ui/misc/${a}.png`
o.src!==t&&(o.src=t)}function s(o,a){a.dataset.folder===o?r(a,"folder_on"):r(a,"folder")}function c(f){o(".backpackFolderImage").forEach(a(s,String(f.folderId)))}function e(){const o=t()
o&&n(o,c)}export default e
//# sourceMappingURL=fixFolders-44ec9d44.js.map
