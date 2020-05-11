import{b as e,p as t,g as o,_ as s,D as r}from"./calfSystem-72fdbe97.js"
import"./isArray-4303dc86.js"
import"./batch-b03d6988.js"
import"./dialogMsg-efcd2089.js"
import"./closest-495903f5.js"
import"./closestTable-78e4c82b.js"
import"./insertHtmlBeforeBegin-e44dc9ae.js"
import"./addStatTotalToMouseover-a759c9ee.js"
import"./chunk-ae5ce53e.js"
import"./dialog-9c6ee33b.js"
import"./ajaxReturnCode-e0b3c2c2.js"
import"./dropItem-3edc6f01.js"
import i from"./injectStoreItems-f745ba07.js"
import"./createTr-e6788e6a.js"
import"./makeFolderSpan-890d1d02.js"
import"./makeFolderSpans-c749e8b2.js"
import"./eventHandler5-a647dfa3.js"
import"./getInventory-9e413525.js"
import"./getInventoryById-49848b69.js"
import"./selfIdIs-7bb53ec5.js"
const n=e=>e.src.includes("/folder.png")
function a(e){return`<option value=${e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]}>${r(e.parentNode.parentNode)}</option>`}export default function(){i(),function(){const r=e("form",t)[0].nextElementSibling.nextElementSibling.nextElementSibling,i=o("img",r).filter(n)
0!==i.length&&s(r,'<tr><td class="fshCenter">Move selected items to: '+`<select name="folder" id="selectFolderId" class="customselect">${i.map(a).join("")}</select>&nbsp;<input type="button" class="custombutton" `+'id="fshMove" value="Move"></td></tr>')}()}
//# sourceMappingURL=injectProfileDropItems-d203d94a.js.map
