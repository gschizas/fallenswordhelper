import{D as o,t as e,aD as t}from"./calfSystem-57628ebe.js"
import{g as a,m as n}from"./monkeyBp-b9e9014e.js"
function r(o,e){const a=`${t}ui/misc/${e}.png`
o.src!==a&&(o.src=a)}function s(o,e){e.dataset.folder===o?r(e,"folder_on"):r(e,"folder")}function c(t){o(".backpackFolderImage").forEach(e(s,String(t.folderId)))}function f(){const o=a()
o&&n(o,c)}export default f
//# sourceMappingURL=fixFolders-4e91e679.js.map
