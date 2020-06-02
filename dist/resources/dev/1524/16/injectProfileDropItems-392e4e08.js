import{b as e,p as t,g as o,A as s,b1 as r,D as n,e as i,I as a,T as m,N as c,i as p,X as d}from"./calfSystem-d49dbbd3.js"
import"./batch-3c533826.js"
import"./insertElementBefore-5eb6d41d.js"
import"./isChecked-e319351c.js"
import{b as f}from"./simpleCheckbox-1fc6621f.js"
import"./dialogMsg-c696a07c.js"
import"./closest-c1f1e24c.js"
import"./closestTable-dc4f2fff.js"
import"./insertHtmlBeforeBegin-7716e1e2.js"
import"./addStatTotalToMouseover-9d50bbc5.js"
import{c as l}from"./chunk-d7803644.js"
import{e as j}from"./errorDialog-b5d971ab.js"
import"./dialog-9b65c22f.js"
import"./indexAjaxJson-6ef1f9f4.js"
import"./ajaxReturnCode-c5920216.js"
import{i as b}from"./insertHtmlAfterEnd-43b283e0.js"
import"./senditems-c2411f46.js"
import"./dropItem-a758f686.js"
import u from"./injectStoreItems-ac3af3a0.js"
import"./createTr-1481671b.js"
import"./makeFolderSpan-e24b6f9c.js"
import"./makeFolderSpans-0116b1df.js"
import"./eventHandler5-53fd70b2.js"
import"./cmdExport-1b537f9c.js"
import"./guildStore-783e895e.js"
import"./getInventory-ac7eb5ee.js"
import"./getInventoryById-aa05fc4e.js"
import"./toggleForce-c06db9a6.js"
import"./selfIdIs-5871022d.js"
import{c as g}from"./closestTr-92de2689.js"
const h=e=>e.src.includes("/folder.png")
function v(e){return`<option value=${e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]}>${s(e.parentNode.parentNode)}</option>`}function x(e){return function(e){return r({subcmd:"dodropitems",removeIndex:e})}(e)}let y
const I=e=>{const t=g(e)
t.nextElementSibling.remove(),t.remove()},S=e=>{x(e.map(e=>e.value)).then(j).then(t=>{t.s&&e.forEach(I)})},E=e=>{if(!e.returnValue||!y)return
e.preventDefault()
const t=a('[name="removeIndex[]"]:checked')
l(30,t).forEach(S),m("profileDropitems","Destroy by AJAX")}
function D(){y=!y,d("ajaxifyDestroy",y)}function k(){(()=>{const e=c('input[type="submit"]')
p(e.parentNode,"&nbsp;&nbsp;"+f("ajaxifyDestroy")),i(e.parentNode,"change",D)})(),y=n("ajaxifyDestroy"),i(document.forms[0],"submit",E)}export default function(){u(),function(){const s=e("form",t)[0].nextElementSibling.nextElementSibling.nextElementSibling,r=o("img",s).filter(h)
0!==r.length&&b(s,`<tr><td class="fshCenter">Move selected items to: <select name="folder" id="selectFolderId" class="customselect">${r.map(v).join("")}</select>&nbsp;<input type="button" class="custombutton" id="fshMove" value="Move"></td></tr>`)}(),k()}
//# sourceMappingURL=injectProfileDropItems-392e4e08.js.map
