import{b as e,p as t,g as o,_ as s,D as r}from"./calfSystem-99da704d.js"
import"./isArray-e5fc8b65.js"
import"./batch-a8b2cb72.js"
import"./dialogMsg-150fe33a.js"
import"./closest-5dc907d7.js"
import"./closestTable-f11f74cf.js"
import"./insertHtmlBeforeBegin-7b11627d.js"
import"./addStatTotalToMouseover-21da467b.js"
import"./chunk-99d90f13.js"
import"./dialog-f09c5ef7.js"
import"./ajaxReturnCode-d6ec60f8.js"
import"./dropItem-150fc453.js"
import i from"./injectStoreItems-681041ff.js"
import"./createTr-09d720fe.js"
import"./makeFolderSpan-27870207.js"
import"./makeFolderSpans-b06c12fd.js"
import"./eventHandler5-96729f8a.js"
import"./getInventory-1445ab2c.js"
import"./getInventoryById-6720d91b.js"
import"./selfIdIs-f22a44c7.js"
const n=e=>e.src.includes("/folder.png")
function a(e){return`<option value=${e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]}>${r(e.parentNode.parentNode)}</option>`}export default function(){i(),function(){const r=e("form",t)[0].nextElementSibling.nextElementSibling.nextElementSibling,i=o("img",r).filter(n)
0!==i.length&&s(r,'<tr><td class="fshCenter">Move selected items to: '+`<select name="folder" id="selectFolderId" class="customselect">${i.map(a).join("")}</select>&nbsp;<input type="button" class="custombutton" `+'id="fshMove" value="Move"></td></tr>')}()}
//# sourceMappingURL=injectProfileDropItems-947c9853.js.map
