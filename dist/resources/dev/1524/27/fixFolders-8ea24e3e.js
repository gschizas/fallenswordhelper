import{D as o,t as a,aI as t}from"./calfSystem-ec5e5725.js"
import{g as c,m as n}from"./monkeyBp-dd949a51.js"
function r(o,a){const c=`${t}ui/misc/${a}.png`
o.src!==c&&(o.src=c)}function s(o,a){a.dataset.folder===o?r(a,"folder_on"):r(a,"folder")}function e(t){o(".backpackFolderImage").forEach(a(s,String(t.folderId)))}function f(){const o=c()
o&&n(o,e)}export default f
//# sourceMappingURL=fixFolders-8ea24e3e.js.map
