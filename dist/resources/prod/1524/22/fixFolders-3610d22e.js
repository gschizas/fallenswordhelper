import{D as o,t,aD as a}from"./calfSystem-d04e4be4.js"
import{g as e,m as f}from"./monkeyBp-ef6513b4.js"
function n(o,t){const e=`${a}ui/misc/${t}.png`
o.src!==e&&(o.src=e)}function r(o,t){t.dataset.folder===o?n(t,"folder_on"):n(t,"folder")}function s(a){o(".backpackFolderImage").forEach(t(r,String(a.folderId)))}export default function(){const o=e()
o&&f(o,s)}
//# sourceMappingURL=fixFolders-3610d22e.js.map
