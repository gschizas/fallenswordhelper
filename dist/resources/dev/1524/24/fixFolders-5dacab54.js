import{D as o,t as f,aH as t}from"./calfSystem-38898f3e.js"
import{g as a,m as e}from"./monkeyBp-6f199e9e.js"
function n(o,f){const a=`${t}ui/misc/${f}.png`
o.src!==a&&(o.src=a)}function r(o,f){f.dataset.folder===o?n(f,"folder_on"):n(f,"folder")}function s(t){o(".backpackFolderImage").forEach(f(r,String(t.folderId)))}function c(){const o=a()
o&&e(o,s)}export default c
//# sourceMappingURL=fixFolders-5dacab54.js.map
