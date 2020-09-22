import{D as o,t as f,aD as t}from"./calfSystem-ec854151.js"
import{g as a,m as c}from"./monkeyBp-6f45efe6.js"
function e(o,f){const a=`${t}ui/misc/${f}.png`
o.src!==a&&(o.src=a)}function n(o,f){f.dataset.folder===o?e(f,"folder_on"):e(f,"folder")}function r(t){o(".backpackFolderImage").forEach(f(n,String(t.folderId)))}function s(){const o=a()
o&&c(o,r)}export default s
//# sourceMappingURL=fixFolders-995de486.js.map
