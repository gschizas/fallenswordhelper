import{D as o,t as f,aE as t}from"./calfSystem-3bdf319e.js"
import{g as a,m as n}from"./monkeyBp-bfb5d20e.js"
function r(o,f){const a=`${t}ui/misc/${f}.png`
o.src!==a&&(o.src=a)}function s(o,f){f.dataset.folder===o?r(f,"folder_on"):r(f,"folder")}function c(t){o(".backpackFolderImage").forEach(f(s,String(t.folderId)))}function e(){const o=a()
o&&n(o,c)}export default e
//# sourceMappingURL=fixFolders-73f8add6.js.map
