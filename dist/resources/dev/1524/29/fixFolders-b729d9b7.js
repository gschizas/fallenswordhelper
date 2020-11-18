import{D as o,t as c,aH as f}from"./calfSystem-02c48ff5.js"
import{g as a,m as t}from"./monkeyBp-cf5c4a07.js"
function n(o,c){const a=`${f}ui/misc/${c}.png`
o.src!==a&&(o.src=a)}function r(o,c){c.dataset.folder===o?n(c,"folder_on"):n(c,"folder")}function s(f){o(".backpackFolderImage").forEach(c(r,String(f.folderId)))}function e(){const o=a()
o&&t(o,s)}export default e
//# sourceMappingURL=fixFolders-b729d9b7.js.map
