import{b as e,p as t,g as o,Z as s,C as r}from"./calfSystem-d587d232.js"
import"./isArray-5dbf2807.js"
import"./batch-a68928f8.js"
import"./dialogMsg-8c5a22d3.js"
import"./closest-2b33b59d.js"
import"./closestTable-6cc0678e.js"
import"./insertHtmlBeforeBegin-d42e4723.js"
import"./addStatTotalToMouseover-08e841f9.js"
import"./chunk-7bfa3ec6.js"
import"./dialog-f9fad105.js"
import"./ajaxReturnCode-b9bc06f8.js"
import"./dropItem-719e855e.js"
import i from"./injectStoreItems-83ea1b57.js"
import"./createTr-ebe71d20.js"
import"./makeFolderSpan-a22e75b6.js"
import"./makeFolderSpans-8bc20ae8.js"
import"./eventHandler5-35b55bc4.js"
import"./getInventory-0d251a2b.js"
import"./getInventoryById-a2479f17.js"
import"./selfIdIs-b085da1e.js"
const n=e=>e.src.includes("/folder.png")
function a(e){return`<option value=${e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]}>${r(e.parentNode.parentNode)}</option>`}export default function(){i(),function(){const r=e("form",t)[0].nextElementSibling.nextElementSibling.nextElementSibling,i=o("img",r).filter(n)
0!==i.length&&s(r,`<tr><td class="fshCenter">Move selected items to: <select name="folder" id="selectFolderId" class="customselect">${i.map(a).join("")}</select>&nbsp;<input type="button" class="custombutton" id="fshMove" value="Move"></td></tr>`)}()}
//# sourceMappingURL=injectProfileDropItems-7a5e4d2c.js.map
