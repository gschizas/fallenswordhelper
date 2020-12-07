import{D as o,t as a,aH as t}from"./calfSystem-54df10e3.js"
import{g as f,m as n}from"./monkeyBp-b9a0a968.js"
function r(o,a){const f=`${t}ui/misc/${a}.png`
o.src!==f&&(o.src=f)}function s(o,a){a.dataset.folder===o?r(a,"folder_on"):r(a,"folder")}function c(t){o(".backpackFolderImage").forEach(a(s,String(t.folderId)))}function e(){const o=f()
o&&n(o,c)}export default e
//# sourceMappingURL=fixFolders-fcc2d475.js.map
