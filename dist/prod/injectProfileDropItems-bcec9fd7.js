import{b as e,p as t,g as o,_ as s,D as r}from"./calfSystem-3956a623.js"
import"./isArray-03eca71a.js"
import"./batch-b53a2e4f.js"
import"./dialogMsg-6c4a948a.js"
import"./closest-2eae17cf.js"
import"./closestTable-65ce02cc.js"
import"./insertHtmlBeforeBegin-200f0598.js"
import"./addStatTotalToMouseover-51cdc617.js"
import"./chunk-1a8d2dee.js"
import"./dialog-a6efa002.js"
import"./ajaxReturnCode-69077631.js"
import"./dropItem-5fe7f911.js"
import a from"./injectStoreItems-c6064c6a.js"
import"./createTr-b5bd7f1d.js"
import"./makeFolderSpan-583f0e94.js"
import"./makeFolderSpans-7064af26.js"
import"./eventHandler5-d9e6cbc2.js"
import"./getInventory-fd0518e3.js"
import"./getInventoryById-efcfeae8.js"
import"./selfIdIs-473d6b56.js"
const i=e=>e.src.includes("/folder.png")
function n(e){return`<option value=${e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]}>${r(e.parentNode.parentNode)}</option>`}export default function(){a(),function(){const r=e("form",t)[0].nextElementSibling.nextElementSibling.nextElementSibling,a=o("img",r).filter(i)
0!==a.length&&s(r,'<tr><td class="fshCenter">Move selected items to: '+`<select name="folder" id="selectFolderId" class="customselect">${a.map(n).join("")}</select>&nbsp;<input type="button" class="custombutton" `+'id="fshMove" value="Move"></td></tr>')}()}
//# sourceMappingURL=injectProfileDropItems-bcec9fd7.js.map
