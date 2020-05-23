import{b as e,p as t,g as o,_ as s,D as r}from"./calfSystem-4b4fbec4.js"
import"./isArray-b95703a0.js"
import"./batch-e2f1c9c8.js"
import"./dialogMsg-c72266dd.js"
import"./closest-c674dae6.js"
import"./closestTable-6a2d8591.js"
import"./insertHtmlBeforeBegin-bb56c349.js"
import"./addStatTotalToMouseover-20e71147.js"
import"./chunk-8ede4dd4.js"
import"./dialog-00707b06.js"
import"./ajaxReturnCode-ca9b4e78.js"
import"./dropItem-b8679633.js"
import i from"./injectStoreItems-99d12bcb.js"
import"./createTr-0008140f.js"
import"./makeFolderSpan-fff895ff.js"
import"./makeFolderSpans-d451c96d.js"
import"./eventHandler5-683c0f23.js"
import"./getInventory-e1636e9c.js"
import"./getInventoryById-b76e4148.js"
import"./selfIdIs-dfbc8747.js"
const n=e=>e.src.includes("/folder.png")
function d(e){return`<option value=${e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]}>${r(e.parentNode.parentNode)}</option>`}export default function(){i(),function(){const r=e("form",t)[0].nextElementSibling.nextElementSibling.nextElementSibling,i=o("img",r).filter(n)
0!==i.length&&s(r,`<tr><td class="fshCenter">Move selected items to: <select name="folder" id="selectFolderId" class="customselect">${i.map(d).join("")}</select>&nbsp;<input type="button" class="custombutton" id="fshMove" value="Move"></td></tr>`)}()}
//# sourceMappingURL=injectProfileDropItems-751f6e16.js.map
