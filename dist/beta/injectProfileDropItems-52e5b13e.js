import{b as e,p as t,g as o,_ as s,D as r}from"./calfSystem-fb94ddf0.js"
import"./isArray-dc6b23b1.js"
import"./batch-48a2259e.js"
import"./dialogMsg-9bffb5e8.js"
import"./closest-3210f804.js"
import"./closestTable-3ad17855.js"
import"./insertHtmlBeforeBegin-cc8a3eeb.js"
import"./addStatTotalToMouseover-0893eed7.js"
import"./chunk-17f7dc07.js"
import"./dialog-df4a277b.js"
import"./ajaxReturnCode-560160ca.js"
import"./dropItem-a32d2457.js"
import i from"./injectStoreItems-f9c70128.js"
import"./createTr-38f15f93.js"
import"./makeFolderSpan-e13ec5de.js"
import"./makeFolderSpans-1f5c7bd0.js"
import"./eventHandler5-7f6e44ca.js"
import"./getInventory-f8a3b8e1.js"
import"./getInventoryById-cde501f2.js"
import"./selfIdIs-bc035a49.js"
const n=e=>e.src.includes("/folder.png")
function a(e){return`<option value=${e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]}>${r(e.parentNode.parentNode)}</option>`}export default function(){i(),function(){const r=e("form",t)[0].nextElementSibling.nextElementSibling.nextElementSibling,i=o("img",r).filter(n)
0!==i.length&&s(r,'<tr><td class="fshCenter">Move selected items to: '+`<select name="folder" id="selectFolderId" class="customselect">${i.map(a).join("")}</select>&nbsp;<input type="button" class="custombutton" `+'id="fshMove" value="Move"></td></tr>')}()}
//# sourceMappingURL=injectProfileDropItems-52e5b13e.js.map
