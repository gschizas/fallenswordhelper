import{D as o,t as a,aD as t}from"./calfSystem-ebf4b17d.js"
import{g as f,m as n}from"./monkeyBp-768ad142.js"
function r(o,a){const f=`${t}ui/misc/${a}.png`
o.src!==f&&(o.src=f)}function s(o,a){a.dataset.folder===o?r(a,"folder_on"):r(a,"folder")}function c(t){o(".backpackFolderImage").forEach(a(s,String(t.folderId)))}function e(){const o=f()
o&&n(o,c)}export default e
//# sourceMappingURL=fixFolders-24bbf79e.js.map
