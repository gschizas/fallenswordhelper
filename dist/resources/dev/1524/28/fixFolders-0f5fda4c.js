import{D as o,t as a,aH as t}from"./calfSystem-b136673a.js"
import{g as f,m as n}from"./monkeyBp-0d98be4f.js"
function r(o,a){const f=`${t}ui/misc/${a}.png`
o.src!==f&&(o.src=f)}function s(o,a){a.dataset.folder===o?r(a,"folder_on"):r(a,"folder")}function c(t){o(".backpackFolderImage").forEach(a(s,String(t.folderId)))}function e(){const o=f()
o&&n(o,c)}export default e
//# sourceMappingURL=fixFolders-0f5fda4c.js.map
