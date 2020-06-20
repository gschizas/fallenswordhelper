import{D as o,t as f,aD as t}from"./calfSystem-2741d97b.js"
import{g as a,m as n}from"./monkeyBp-04f3ee9f.js"
function r(o,f){const a=`${t}ui/misc/${f}.png`
o.src!==a&&(o.src=a)}function s(o,f){f.dataset.folder===o?r(f,"folder_on"):r(f,"folder")}function c(t){o(".backpackFolderImage").forEach(f(s,String(t.folderId)))}export default function(){const o=a()
o&&n(o,c)}
//# sourceMappingURL=fixFolders-bcc31e51.js.map
