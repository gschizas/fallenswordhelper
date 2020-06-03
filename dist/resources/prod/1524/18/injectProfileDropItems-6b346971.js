import{b as e,p as t,g as o,A as s,bg as r,D as n,e as i,I as a,S as m,M as c,i as p,W as d}from"./calfSystem-8b6534a5.js"
import"./isArray-3a70d0a8.js"
import"./batch-57529412.js"
import"./insertElementBefore-91801123.js"
import"./isChecked-cb800ed0.js"
import{b as l}from"./simpleCheckbox-c60a3930.js"
import"./dialogMsg-311d8a0e.js"
import"./closest-92f48152.js"
import"./closestTable-af41867c.js"
import"./insertHtmlBeforeBegin-ab576692.js"
import"./addStatTotalToMouseover-93500404.js"
import{c as f}from"./chunk-a0e8f39e.js"
import{e as b}from"./errorDialog-2dea8d77.js"
import"./dialog-3c03bbb1.js"
import"./indexAjaxJson-b43ddbcc.js"
import"./ajaxReturnCode-8531f24d.js"
import{i as j}from"./insertHtmlAfterEnd-4546785f.js"
import"./dropItem-830cd2da.js"
import u from"./injectStoreItems-3561a36b.js"
import"./createTr-fc2adc02.js"
import"./makeFolderSpan-e34daae5.js"
import"./makeFolderSpans-71bf736e.js"
import"./eventHandler5-e5345edb.js"
import"./cmdExport-a4cd29b8.js"
import"./getInventory-1e8cb5f4.js"
import"./getInventoryById-182cb218.js"
import"./toggleForce-c312b2b1.js"
import"./selfIdIs-0094e7b3.js"
import{c as g}from"./closestTr-6d4448c3.js"
const h=e=>e.src.includes("/folder.png")
function v(e){return`<option value=${e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]}>${s(e.parentNode.parentNode)}</option>`}function x(e){return function(e){return r({subcmd:"dodropitems",removeIndex:e})}(e)}let y
const I=e=>{const t=g(e)
t.nextElementSibling.remove(),t.remove()},S=e=>{x(e.map(e=>e.value)).then(b).then(t=>{t.s&&e.forEach(I)})},E=e=>{if(!e.returnValue||!y)return
e.preventDefault()
const t=a('[name="removeIndex[]"]:checked')
f(30,t).forEach(S),m("profileDropitems","Destroy by AJAX")}
function D(){y=!y,d("ajaxifyDestroy",y)}function k(){(()=>{const e=c('input[type="submit"]')
p(e.parentNode,"&nbsp;&nbsp;"+l("ajaxifyDestroy")),i(e.parentNode,"change",D)})(),y=n("ajaxifyDestroy"),i(document.forms[0],"submit",E)}export default function(){u(),function(){const s=e("form",t)[0].nextElementSibling.nextElementSibling.nextElementSibling,r=o("img",s).filter(h)
0!==r.length&&j(s,`<tr><td class="fshCenter">Move selected items to: <select name="folder" id="selectFolderId" class="customselect">${r.map(v).join("")}</select>&nbsp;<input type="button" class="custombutton" id="fshMove" value="Move"></td></tr>`)}(),k()}
//# sourceMappingURL=injectProfileDropItems-6b346971.js.map
