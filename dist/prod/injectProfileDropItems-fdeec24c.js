import{b as e,p as t,g as o,_ as s,D as r}from"./calfSystem-d06402b1.js"
import"./isArray-ab78a040.js"
import"./batch-ae75c711.js"
import"./dialogMsg-b515da3f.js"
import"./closest-0e7d337b.js"
import"./closestTable-3bbadb79.js"
import"./insertHtmlBeforeBegin-01272058.js"
import"./addStatTotalToMouseover-3a173fe5.js"
import"./chunk-5756db1a.js"
import"./dialog-b58c95c9.js"
import"./ajaxReturnCode-ea0d33ed.js"
import"./dropItem-696f5ec1.js"
import i from"./injectStoreItems-cf303ea1.js"
import"./createTr-403bb610.js"
import"./makeFolderSpan-27090cd3.js"
import"./makeFolderSpans-a2014ef0.js"
import"./eventHandler5-363cd6c2.js"
import"./getInventory-f113d3f3.js"
import"./getInventoryById-0b74db1b.js"
import"./selfIdIs-1775abee.js"
const n=e=>e.src.includes("/folder.png")
function a(e){return`<option value=${e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]}>${r(e.parentNode.parentNode)}</option>`}export default function(){i(),function(){const r=e("form",t)[0].nextElementSibling.nextElementSibling.nextElementSibling,i=o("img",r).filter(n)
0!==i.length&&s(r,'<tr><td class="fshCenter">Move selected items to: '+`<select name="folder" id="selectFolderId" class="customselect">${i.map(a).join("")}</select>&nbsp;<input type="button" class="custombutton" `+'id="fshMove" value="Move"></td></tr>')}()}
//# sourceMappingURL=injectProfileDropItems-fdeec24c.js.map
