import{D as o,t as a,aD as t}from"./calfSystem-a5da5210.js"
import{g as n,m as r}from"./monkeyBp-49789bdb.js"
function s(o,a){const n=`${t}ui/misc/${a}.png`
o.src!==n&&(o.src=n)}function c(o,a){a.dataset.folder===o?s(a,"folder_on"):s(a,"folder")}function f(t){o(".backpackFolderImage").forEach(a(c,String(t.folderId)))}function e(){const o=n()
o&&r(o,f)}export default e
//# sourceMappingURL=fixFolders-5976d57c.js.map
