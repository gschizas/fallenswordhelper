import{D as o,t as a,al as e}from"./calfSystem-19a5d332.js"
import{g as t,m as n}from"./monkeyBp-e5ee4b0e.js"
function r(o,a){const t=`${e}ui/misc/${a}.png`
o.src!==t&&(o.src=t)}function s(o,a){a.dataset.folder===o?r(a,"folder_on"):r(a,"folder")}function c(e){o(".backpackFolderImage").forEach(a(s,String(e.folderId)))}function f(){const o=t()
o&&n(o,c)}export default f
//# sourceMappingURL=fixFolders-5c75c129.js.map
