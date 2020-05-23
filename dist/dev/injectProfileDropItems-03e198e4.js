import{b as e,p as t,g as o,$ as s,D as r,bl as n,f as a,N as i}from"./calfSystem-0e5d6faf.js"
import"./batch-a59f833e.js"
import"./dialogMsg-817556e1.js"
import"./closest-8e8851e4.js"
import"./closestTable-0a822526.js"
import"./insertHtmlBeforeBegin-f6338e74.js"
import"./addStatTotalToMouseover-f76b09a7.js"
import{c as m}from"./chunk-cdbbf380.js"
import{e as c}from"./errorDialog-c126b119.js"
import"./dialog-69a0353c.js"
import"./ajaxReturnCode-217b092b.js"
import"./senditems-6bc05a88.js"
import"./dropItem-3d485364.js"
import d from"./injectStoreItems-24014aec.js"
import"./createTr-7ca77502.js"
import"./makeFolderSpan-976474fd.js"
import"./makeFolderSpans-4eb6ca8d.js"
import"./eventHandler5-2760a97e.js"
import"./guildStore-d26a8300.js"
import"./getInventory-4e5ba01c.js"
import"./getInventoryById-590cf298.js"
import"./selfIdIs-85d73f3f.js"
const l=e=>e.src.includes("/folder.png")
function p(e){return`<option value=${e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]}>${r(e.parentNode.parentNode)}</option>`}function f(e){return function(e){return n({subcmd:"dodropitems",removeIndex:e})}(e)}const u=e=>{f(e.map(e=>e.value)).then(c).then(t=>{t.s&&e.forEach(e=>{const t=e.closest("tr")
t.nextElementSibling.remove(),t.remove()})})},j=e=>{e.preventDefault()
const t=i('[name="removeIndex[]"]:checked')
m(30,t).forEach(u)}
export default function(){d(),function(){const r=e("form",t)[0].nextElementSibling.nextElementSibling.nextElementSibling,n=o("img",r).filter(l)
0!==n.length&&s(r,'<tr><td class="fshCenter">Move selected items to: '+`<select name="folder" id="selectFolderId" class="customselect">${n.map(p).join("")}</select>&nbsp;<input type="button" class="custombutton" `+'id="fshMove" value="Move"></td></tr>')}(),a(document.forms[0],"submit",j)}
//# sourceMappingURL=injectProfileDropItems-03e198e4.js.map
