import{b as e,p as t,g as o,$ as r,D as s,bl as n,f as i,N as m}from"./calfSystem-01eb06ed.js"
import"./batch-bf64c121.js"
import"./dialogMsg-7ec2c29d.js"
import"./closest-6fcf191a.js"
import"./closestTable-c3597d67.js"
import"./insertHtmlBeforeBegin-27203589.js"
import"./addStatTotalToMouseover-d43ff9e3.js"
import{c as a}from"./chunk-ce68ae18.js"
import{e as d}from"./errorDialog-3344f8b2.js"
import"./dialog-e8202133.js"
import"./ajaxReturnCode-13dfe8bc.js"
import"./senditems-45db17dc.js"
import"./dropItem-42478b6d.js"
import c from"./injectStoreItems-d8afa250.js"
import"./createTr-da63342e.js"
import"./makeFolderSpan-21f0eb39.js"
import"./makeFolderSpans-d0b969c3.js"
import"./eventHandler5-32a6db3c.js"
import"./guildStore-d9a8ef20.js"
import"./getInventory-05bfac97.js"
import"./getInventoryById-963f9f8c.js"
import"./selfIdIs-8b9ed274.js"
const l=e=>e.src.includes("/folder.png")
function f(e){return`<option value=${e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]}>${s(e.parentNode.parentNode)}</option>`}function p(e){return function(e){return n({subcmd:"dodropitems",removeIndex:e})}(e)}const u=e=>{p(e.map(e=>e.value)).then(d).then(t=>{t.s&&e.forEach(e=>{const t=e.closest("tr")
t.nextElementSibling.remove(),t.remove()})})},j=e=>{if(!e.returnValue)return
e.preventDefault()
const t=m('[name="removeIndex[]"]:checked')
a(30,t).forEach(u)}
export default function(){c(),function(){const s=e("form",t)[0].nextElementSibling.nextElementSibling.nextElementSibling,n=o("img",s).filter(l)
0!==n.length&&r(s,`<tr><td class="fshCenter">Move selected items to: <select name="folder" id="selectFolderId" class="customselect">${n.map(f).join("")}</select>&nbsp;<input type="button" class="custombutton" id="fshMove" value="Move"></td></tr>`)}(),i(document.forms[0],"submit",j)}
//# sourceMappingURL=injectProfileDropItems-efb34577.js.map
