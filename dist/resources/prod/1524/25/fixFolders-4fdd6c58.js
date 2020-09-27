import{D as o,t as a,aD as f}from"./calfSystem-71b9378d.js"
import{g as t,m as n}from"./monkeyBp-f98eabf4.js"
function r(o,a){const t=`${f}ui/misc/${a}.png`
o.src!==t&&(o.src=t)}function s(o,a){a.dataset.folder===o?r(a,"folder_on"):r(a,"folder")}function c(f){o(".backpackFolderImage").forEach(a(s,String(f.folderId)))}function e(){const o=t()
o&&n(o,c)}export default e
//# sourceMappingURL=fixFolders-4fdd6c58.js.map
