import{b as e,p as t,g as o,Z as s,C as r,bB as n,F as a,e as i,M as m,$ as d,Q as c,i as p,a3 as f}from"./calfSystem-371c414c.js"
import"./isArray-f2e9e1ad.js"
import"./batch-96f40a5d.js"
import"./isChecked-b460a43d.js"
import{b as l}from"./simpleCheckbox-5ce6e544.js"
import"./dialogMsg-33712041.js"
import"./closest-d5dda5d9.js"
import"./closestTable-b335e246.js"
import"./insertHtmlBeforeBegin-410252ec.js"
import"./addStatTotalToMouseover-f726fede.js"
import{c as u}from"./chunk-5be7da04.js"
import{e as j}from"./errorDialog-c2f7094e.js"
import"./dialog-3e1a0a78.js"
import"./ajaxReturnCode-946f7e47.js"
import"./dropItem-f3e2470b.js"
import b from"./injectStoreItems-ac42affa.js"
import"./createTr-cd20de35.js"
import"./makeFolderSpan-bdfb16a2.js"
import"./makeFolderSpans-46e3aef2.js"
import"./eventHandler5-dd4a434f.js"
import"./getInventory-998297f9.js"
import"./getInventoryById-9da95555.js"
import"./selfIdIs-04b7ffe8.js"
const g=e=>e.src.includes("/folder.png")
function h(e){return`<option value=${e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]}>${r(e.parentNode.parentNode)}</option>`}function v(e){return function(e){return n({subcmd:"dodropitems",removeIndex:e})}(e)}let y
const x=e=>{const t=e.closest("tr")
t.nextElementSibling.remove(),t.remove()},I=e=>{v(e.map(e=>e.value)).then(j).then(t=>{t.s&&e.forEach(x)})},S=e=>{if(!e.returnValue||!y)return
e.preventDefault()
const t=m('[name="removeIndex[]"]:checked')
u(30,t).forEach(I),d("profileDropitems","Destroy by AJAX")}
function D(){y=!y,f("ajaxifyDestroy",y)}function k(){(()=>{const e=c('input[type="submit"]')
p(e.parentNode,"&nbsp;&nbsp;"+l("ajaxifyDestroy")),i(e.parentNode,"change",D)})(),y=a("ajaxifyDestroy"),i(document.forms[0],"submit",S)}export default function(){b(),function(){const r=e("form",t)[0].nextElementSibling.nextElementSibling.nextElementSibling,n=o("img",r).filter(g)
0!==n.length&&s(r,`<tr><td class="fshCenter">Move selected items to: <select name="folder" id="selectFolderId" class="customselect">${n.map(h).join("")}</select>&nbsp;<input type="button" class="custombutton" id="fshMove" value="Move"></td></tr>`)}(),k()}
//# sourceMappingURL=injectProfileDropItems-122eed35.js.map
