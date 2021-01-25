import{D as o,t as c,ak as t}from"./calfSystem-26bcf570.js"
import{g as a,m as f}from"./monkeyBp-5868ce83.js"
function n(o,c){const a=`${t}ui/misc/${c}.png`
o.src!==a&&(o.src=a)}function r(o,c){c.dataset.folder===o?n(c,"folder_on"):n(c,"folder")}function s(t){o(".backpackFolderImage").forEach(c(r,String(t.folderId)))}function e(){const o=a()
o&&f(o,s)}export default e
//# sourceMappingURL=fixFolders-ca0fcbe1.js.map
