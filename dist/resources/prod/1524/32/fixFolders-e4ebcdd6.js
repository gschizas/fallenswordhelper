import{D as o,t,ai as a}from"./calfSystem-45544049.js"
import{g as n,m as r}from"./monkeyBp-8d5664b3.js"
function s(o,t){const n=`${a}ui/misc/${t}.png`
o.src!==n&&(o.src=n)}function c(o,t){t.dataset.folder===o?s(t,"folder_on"):s(t,"folder")}function f(a){o(".backpackFolderImage").forEach(t(c,String(a.folderId)))}function e(){const o=n()
o&&r(o,f)}export default e
//# sourceMappingURL=fixFolders-e4ebcdd6.js.map
