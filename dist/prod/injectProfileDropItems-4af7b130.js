import{b as e,p as t,g as o,_ as s,D as r,bA as n,f as a,N as i}from"./calfSystem-4f7c0235.js"
import"./isArray-3ee7803f.js"
import"./batch-970fe719.js"
import"./dialogMsg-2a7f845f.js"
import"./closest-c4802fbd.js"
import"./closestTable-3222a25a.js"
import"./insertHtmlBeforeBegin-2122cda1.js"
import"./addStatTotalToMouseover-4d8497a4.js"
import{c as m}from"./chunk-9c98fe57.js"
import{e as c}from"./errorDialog-96f65b89.js"
import"./dialog-202b3453.js"
import"./ajaxReturnCode-0283a2cf.js"
import"./dropItem-d0179ce5.js"
import d from"./injectStoreItems-922273f5.js"
import"./createTr-e0fac9d4.js"
import"./makeFolderSpan-75ee18ad.js"
import"./makeFolderSpans-616f4331.js"
import"./eventHandler5-bdad5c86.js"
import"./getInventory-aab68781.js"
import"./getInventoryById-6230b5eb.js"
import"./selfIdIs-3de1d346.js"
const l=e=>e.src.includes("/folder.png")
function p(e){return`<option value=${e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]}>${r(e.parentNode.parentNode)}</option>`}function f(e){return function(e){return n({subcmd:"dodropitems",removeIndex:e})}(e)}const u=e=>{f(e.map(e=>e.value)).then(c).then(t=>{t.s&&e.forEach(e=>{const t=e.closest("tr")
t.nextElementSibling.remove(),t.remove()})})},j=e=>{e.preventDefault()
const t=i('[name="removeIndex[]"]:checked')
m(30,t).forEach(u)}
export default function(){d(),function(){const r=e("form",t)[0].nextElementSibling.nextElementSibling.nextElementSibling,n=o("img",r).filter(l)
0!==n.length&&s(r,'<tr><td class="fshCenter">Move selected items to: '+`<select name="folder" id="selectFolderId" class="customselect">${n.map(p).join("")}</select>&nbsp;<input type="button" class="custombutton" `+'id="fshMove" value="Move"></td></tr>')}(),a(document.forms[0],"submit",j)}
//# sourceMappingURL=injectProfileDropItems-4af7b130.js.map
