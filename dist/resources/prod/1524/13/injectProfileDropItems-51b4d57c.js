import{b as e,p as t,g as o,_ as s,D as r}from"./calfSystem-e6a24264.js"
import"./isArray-3522bd29.js"
import"./batch-7ebdfd88.js"
import"./dialogMsg-4d5d1433.js"
import"./closest-644c8871.js"
import"./closestTable-0ee32c7b.js"
import"./insertHtmlBeforeBegin-2815e3e5.js"
import"./addStatTotalToMouseover-77bc9242.js"
import"./chunk-65803951.js"
import"./dialog-68e3f62f.js"
import"./ajaxReturnCode-7e7c2091.js"
import"./dropItem-dd62f382.js"
import i from"./injectStoreItems-488abfce.js"
import"./createTr-95f18bfd.js"
import"./makeFolderSpan-2986874f.js"
import"./makeFolderSpans-58426b6d.js"
import"./eventHandler5-48311a14.js"
import"./getInventory-b185a280.js"
import"./getInventoryById-ccc6d3cf.js"
import"./selfIdIs-867a3670.js"
const n=e=>e.src.includes("/folder.png")
function a(e){return`<option value=${e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]}>${r(e.parentNode.parentNode)}</option>`}export default function(){i(),function(){const r=e("form",t)[0].nextElementSibling.nextElementSibling.nextElementSibling,i=o("img",r).filter(n)
0!==i.length&&s(r,`<tr><td class="fshCenter">Move selected items to: <select name="folder" id="selectFolderId" class="customselect">${i.map(a).join("")}</select>&nbsp;<input type="button" class="custombutton" id="fshMove" value="Move"></td></tr>`)}()}
//# sourceMappingURL=injectProfileDropItems-51b4d57c.js.map
