import{b as e,p as t,g as o,_ as s,D as r,bC as n,f as a,N as i}from"./calfSystem-70c0e373.js"
import"./isArray-4a5a2451.js"
import"./batch-5d2b5520.js"
import"./dialogMsg-2fcaccca.js"
import"./closest-9d6eeb1b.js"
import"./closestTable-aeb85a89.js"
import"./insertHtmlBeforeBegin-d1f256b2.js"
import"./addStatTotalToMouseover-f8f7577f.js"
import{c as m}from"./chunk-d29380e0.js"
import{e as c}from"./errorDialog-06521700.js"
import"./dialog-b905c96a.js"
import"./ajaxReturnCode-7fc00e1d.js"
import"./dropItem-efd591f6.js"
import d from"./injectStoreItems-036f8b60.js"
import"./createTr-e14e5cc9.js"
import"./makeFolderSpan-c9b6c6b8.js"
import"./makeFolderSpans-14f8e6d0.js"
import"./eventHandler5-c3fdeca2.js"
import"./getInventory-0fb29989.js"
import"./getInventoryById-038c6837.js"
import"./selfIdIs-50af74dc.js"
const l=e=>e.src.includes("/folder.png")
function f(e){return`<option value=${e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]}>${r(e.parentNode.parentNode)}</option>`}function p(e){return function(e){return n({subcmd:"dodropitems",removeIndex:e})}(e)}const u=e=>{p(e.map(e=>e.value)).then(c).then(t=>{t.s&&e.forEach(e=>{const t=e.closest("tr")
t.nextElementSibling.remove(),t.remove()})})},j=e=>{e.preventDefault()
const t=i('[name="removeIndex[]"]:checked')
m(30,t).forEach(u)}
export default function(){d(),function(){const r=e("form",t)[0].nextElementSibling.nextElementSibling.nextElementSibling,n=o("img",r).filter(l)
0!==n.length&&s(r,'<tr><td class="fshCenter">Move selected items to: '+`<select name="folder" id="selectFolderId" class="customselect">${n.map(f).join("")}</select>&nbsp;<input type="button" class="custombutton" `+'id="fshMove" value="Move"></td></tr>')}(),a(document.forms[0],"submit",j)}
//# sourceMappingURL=injectProfileDropItems-8672e636.js.map
