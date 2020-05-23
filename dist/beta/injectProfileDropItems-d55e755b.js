import{b as e,p as t,g as o,_ as r,D as s,bC as n,f as a,N as i}from"./calfSystem-2fb02284.js"
import"./isArray-22938fdc.js"
import"./batch-7429ab00.js"
import"./dialogMsg-48629eea.js"
import"./closest-435e5cd2.js"
import"./closestTable-bc50301f.js"
import"./insertHtmlBeforeBegin-79e40773.js"
import"./addStatTotalToMouseover-0ab3d3ba.js"
import{c as m}from"./chunk-64652451.js"
import{e as c}from"./errorDialog-b64a55ff.js"
import"./dialog-bdcd2acc.js"
import"./ajaxReturnCode-b8478934.js"
import"./dropItem-e0a1e767.js"
import d from"./injectStoreItems-5bd78f7e.js"
import"./createTr-4bc6b13c.js"
import"./makeFolderSpan-3479db3f.js"
import"./makeFolderSpans-453b16c0.js"
import"./eventHandler5-f430902d.js"
import"./getInventory-8a12d958.js"
import"./getInventoryById-bd7cfe34.js"
import"./selfIdIs-4bc35baf.js"
const l=e=>e.src.includes("/folder.png")
function p(e){return`<option value=${e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]}>${s(e.parentNode.parentNode)}</option>`}function f(e){return function(e){return n({subcmd:"dodropitems",removeIndex:e})}(e)}const b=e=>{f(e.map(e=>e.value)).then(c).then(t=>{t.s&&e.forEach(e=>{const t=e.closest("tr")
t.nextElementSibling.remove(),t.remove()})})},u=e=>{if(!e.returnValue)return
e.preventDefault()
const t=i('[name="removeIndex[]"]:checked')
m(30,t).forEach(b)}
export default function(){d(),function(){const s=e("form",t)[0].nextElementSibling.nextElementSibling.nextElementSibling,n=o("img",s).filter(l)
0!==n.length&&r(s,`<tr><td class="fshCenter">Move selected items to: <select name="folder" id="selectFolderId" class="customselect">${n.map(p).join("")}</select>&nbsp;<input type="button" class="custombutton" id="fshMove" value="Move"></td></tr>`)}(),a(document.forms[0],"submit",u)}
//# sourceMappingURL=injectProfileDropItems-d55e755b.js.map
