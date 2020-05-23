import{b as e,p as t,g as o,$ as s,D as r,bl as n,f as a,N as i}from"./calfSystem-70b0df7f.js"
import"./batch-a98ea1eb.js"
import"./dialogMsg-0ef0d146.js"
import"./closest-e3995be7.js"
import"./closestTable-64ed8d8b.js"
import"./insertHtmlBeforeBegin-24c569d6.js"
import"./addStatTotalToMouseover-26e31ce1.js"
import{c as m}from"./chunk-0030535f.js"
import{e as d}from"./errorDialog-d60de5ef.js"
import"./dialog-e74653d6.js"
import"./ajaxReturnCode-a4018309.js"
import"./senditems-a7f53a0b.js"
import"./dropItem-f8a9d0a4.js"
import c from"./injectStoreItems-eda77def.js"
import"./createTr-cac59b2b.js"
import"./makeFolderSpan-6615c3fa.js"
import"./makeFolderSpans-786babc7.js"
import"./eventHandler5-ce0cd2f3.js"
import"./guildStore-997fb26d.js"
import"./getInventory-58a12092.js"
import"./getInventoryById-e8f5fd59.js"
import"./selfIdIs-a969a546.js"
const l=e=>e.src.includes("/folder.png")
function p(e){return`<option value=${e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]}>${r(e.parentNode.parentNode)}</option>`}function f(e){return function(e){return n({subcmd:"dodropitems",removeIndex:e})}(e)}const u=e=>{f(e.map(e=>e.value)).then(d).then(t=>{t.s&&e.forEach(e=>{const t=e.closest("tr")
t.nextElementSibling.remove(),t.remove()})})},j=e=>{e.preventDefault()
const t=i('[name="removeIndex[]"]:checked')
m(30,t).forEach(u)}
export default function(){c(),function(){const r=e("form",t)[0].nextElementSibling.nextElementSibling.nextElementSibling,n=o("img",r).filter(l)
0!==n.length&&s(r,'<tr><td class="fshCenter">Move selected items to: '+`<select name="folder" id="selectFolderId" class="customselect">${n.map(p).join("")}</select>&nbsp;<input type="button" class="custombutton" `+'id="fshMove" value="Move"></td></tr>')}(),a(document.forms[0],"submit",j)}
//# sourceMappingURL=injectProfileDropItems-775550aa.js.map
