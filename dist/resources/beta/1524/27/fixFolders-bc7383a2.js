import{D as o,t as a,aE as c}from"./calfSystem-70c7a660.js"
import{g as t,m as n}from"./monkeyBp-651e8ace.js"
function r(o,a){const t=`${c}ui/misc/${a}.png`
o.src!==t&&(o.src=t)}function s(o,a){a.dataset.folder===o?r(a,"folder_on"):r(a,"folder")}function e(c){o(".backpackFolderImage").forEach(a(s,String(c.folderId)))}function f(){const o=t()
o&&n(o,e)}export default f
//# sourceMappingURL=fixFolders-bc7383a2.js.map
