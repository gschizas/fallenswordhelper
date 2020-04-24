import{b as e,p as t,g as o,_ as s,D as r}from"./calfSystem-c91e004c.js"
import"./isArray-e79fe430.js"
import"./batch-1e9ecac6.js"
import"./dialogMsg-b1aec560.js"
import"./closest-fde5373b.js"
import"./closestTable-593e5532.js"
import"./insertHtmlBeforeBegin-31134dae.js"
import"./addStatTotalToMouseover-f2e384c3.js"
import"./chunk-b7aec519.js"
import"./dialog-caf4fb39.js"
import"./ajaxReturnCode-775725b8.js"
import"./dropItem-20a43f32.js"
import i from"./injectStoreItems-04ded266.js"
import"./createTr-5d08b813.js"
import"./makeFolderSpan-413e7039.js"
import"./makeFolderSpans-4d1db27e.js"
import"./eventHandler5-dd4a30e9.js"
import"./getInventory-3d2af7a6.js"
import"./getInventoryById-492e9f2a.js"
import"./selfIdIs-3b64a445.js"
const n=e=>e.src.includes("/folder.png")
function a(e){return`<option value=${e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]}>${r(e.parentNode.parentNode)}</option>`}export default function(){i(),function(){const r=e("form",t)[0].nextElementSibling.nextElementSibling.nextElementSibling,i=o("img",r).filter(n)
0!==i.length&&s(r,'<tr><td class="fshCenter">Move selected items to: '+`<select name="folder" id="selectFolderId" class="customselect">${i.map(a).join("")}</select>&nbsp;<input type="button" class="custombutton" `+'id="fshMove" value="Move"></td></tr>')}()}
//# sourceMappingURL=injectProfileDropItems-76c8d04a.js.map
