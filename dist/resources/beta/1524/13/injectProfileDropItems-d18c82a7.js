import{b as e,p as t,g as o,_ as r,D as s,bC as n,f as a,N as i}from"./calfSystem-1e164202.js"
import"./isArray-2e06f453.js"
import"./batch-ce2b38cf.js"
import"./dialogMsg-b431c172.js"
import"./closest-42af84ad.js"
import"./closestTable-42d2debb.js"
import"./insertHtmlBeforeBegin-fd8fa522.js"
import"./addStatTotalToMouseover-4164c81b.js"
import{c as m}from"./chunk-1a454c32.js"
import{e as c}from"./errorDialog-efbe6eeb.js"
import"./dialog-938d7c32.js"
import"./ajaxReturnCode-01f0dc88.js"
import"./dropItem-b2350ece.js"
import d from"./injectStoreItems-00eeea81.js"
import"./createTr-ac156ee9.js"
import"./makeFolderSpan-309f90f9.js"
import"./makeFolderSpans-a5a39976.js"
import"./eventHandler5-d8226a6d.js"
import"./getInventory-f988c530.js"
import"./getInventoryById-5acd5e09.js"
import"./selfIdIs-48a2760b.js"
const l=e=>e.src.includes("/folder.png")
function p(e){return`<option value=${e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]}>${s(e.parentNode.parentNode)}</option>`}function f(e){return function(e){return n({subcmd:"dodropitems",removeIndex:e})}(e)}const u=e=>{f(e.map(e=>e.value)).then(c).then(t=>{t.s&&e.forEach(e=>{const t=e.closest("tr")
t.nextElementSibling.remove(),t.remove()})})},j=e=>{if(!e.returnValue)return
e.preventDefault()
const t=i('[name="removeIndex[]"]:checked')
m(30,t).forEach(u)}
export default function(){d(),function(){const s=e("form",t)[0].nextElementSibling.nextElementSibling.nextElementSibling,n=o("img",s).filter(l)
0!==n.length&&r(s,`<tr><td class="fshCenter">Move selected items to: <select name="folder" id="selectFolderId" class="customselect">${n.map(p).join("")}</select>&nbsp;<input type="button" class="custombutton" id="fshMove" value="Move"></td></tr>`)}(),a(document.forms[0],"submit",j)}
//# sourceMappingURL=injectProfileDropItems-d18c82a7.js.map
