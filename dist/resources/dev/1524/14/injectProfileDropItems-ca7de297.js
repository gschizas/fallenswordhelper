import{b as e,p as t,g as o,_ as s,C as r,bk as n,F as a,e as i,M as m,a0 as c,R as d,i as p,a4 as l}from"./calfSystem-d96a3efd.js"
import"./batch-cdb16fc8.js"
import"./isChecked-028fa109.js"
import{b as f}from"./simpleCheckbox-fb9f4a06.js"
import"./dialogMsg-da77a98e.js"
import"./closest-f6c323ce.js"
import"./closestTable-2bbeb9ce.js"
import"./insertHtmlBeforeBegin-449d0625.js"
import"./addStatTotalToMouseover-d77e3128.js"
import{c as u}from"./chunk-77a11107.js"
import{e as b}from"./errorDialog-70b04a3c.js"
import"./dialog-62f3abd8.js"
import"./ajaxReturnCode-2df80530.js"
import"./senditems-8ce986a1.js"
import"./dropItem-a01c657d.js"
import j from"./injectStoreItems-c3413cf8.js"
import"./createTr-441d9d7e.js"
import"./makeFolderSpan-6cb5741d.js"
import"./makeFolderSpans-eea50c06.js"
import"./eventHandler5-d9435eb5.js"
import"./guildStore-0302347f.js"
import"./getInventory-1d86043b.js"
import"./getInventoryById-bb2e70f9.js"
import"./selfIdIs-1c8b1e34.js"
const g=e=>e.src.includes("/folder.png")
function h(e){return`<option value=${e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]}>${r(e.parentNode.parentNode)}</option>`}function v(e){return function(e){return n({subcmd:"dodropitems",removeIndex:e})}(e)}let y
const x=e=>{const t=e.closest("tr")
t.nextElementSibling.remove(),t.remove()},I=e=>{v(e.map(e=>e.value)).then(b).then(t=>{t.s&&e.forEach(x)})},S=e=>{if(!e.returnValue||!y)return
e.preventDefault()
const t=m('[name="removeIndex[]"]:checked')
u(30,t).forEach(I),c("profileDropitems","Destroy by AJAX")}
function k(){y=!y,l("ajaxifyDestroy",y)}function D(){(()=>{const e=d('input[type="submit"]')
p(e.parentNode,"&nbsp;&nbsp;"+f("ajaxifyDestroy")),i(e.parentNode,"change",k)})(),y=a("ajaxifyDestroy"),i(document.forms[0],"submit",S)}export default function(){j(),function(){const r=e("form",t)[0].nextElementSibling.nextElementSibling.nextElementSibling,n=o("img",r).filter(g)
0!==n.length&&s(r,`<tr><td class="fshCenter">Move selected items to: <select name="folder" id="selectFolderId" class="customselect">${n.map(h).join("")}</select>&nbsp;<input type="button" class="custombutton" id="fshMove" value="Move"></td></tr>`)}(),D()}
//# sourceMappingURL=injectProfileDropItems-ca7de297.js.map
