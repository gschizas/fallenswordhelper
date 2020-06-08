import{b as e,p as t,g as o,B as r,bf as s,G as n,e as i,D as a,U as m,C as f,i as c,Y as p}from"./calfSystem-03970067.js"
import"./isArray-aff0783a.js"
import"./batch-dfc92608.js"
import"./insertElementBefore-c9a36777.js"
import"./isChecked-02800593.js"
import{b as d}from"./simpleCheckbox-6af8c076.js"
import"./dialogMsg-9c4f0c44.js"
import"./doStatTotal-85eb4928.js"
import{i as l}from"./insertHtmlAfterEnd-d9794923.js"
import"./ajaxReturnCode-f8cf1a95.js"
import"./dropItem-882ff152.js"
import j from"./injectStoreItems-8fbfbce8.js"
import"./createTr-e152fcaa.js"
import"./makeFolderSpan-d3b21d1c.js"
import"./makeFolderSpans-e70fbc42.js"
import"./dialog-d5dff1df.js"
import"./indexAjaxJson-d04ad897.js"
import"./eventHandler5-4178a6d1.js"
import"./cmdExport-4773c3fd.js"
import"./getInventory-f35b83ee.js"
import"./getInventoryById-4e448ba1.js"
import"./toggleForce-1be6b2e6.js"
import{c as u}from"./chunk-91fd5f70.js"
import"./selfIdIs-02ed6fe5.js"
import"./closest-2eae4a84.js"
import{c as b}from"./closestTr-3d8fe8c0.js"
import{e as g}from"./errorDialog-2397605e.js"
const h=e=>e.src.includes("/folder.png")
function x(e){return`<option value=${e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]}>${r(e.parentNode.parentNode)}</option>`}function y(e){return function(e){return s({subcmd:"dodropitems",removeIndex:e})}(e)}let v
const I=e=>{const t=b(e)
t.nextElementSibling.remove(),t.remove()},E=e=>{y(e.map(e=>e.value)).then(g).then(t=>{t.s&&e.forEach(I)})},S=e=>{if(!e.returnValue||!v)return
e.preventDefault()
const t=a('[name="removeIndex[]"]:checked')
u(30,t).forEach(E),m("profileDropitems","Destroy by AJAX")}
function D(){v=!v,p("ajaxifyDestroy",v)}function k(){(()=>{const e=f('input[type="submit"]')
c(e.parentNode,"&nbsp;&nbsp;"+d("ajaxifyDestroy")),i(e.parentNode,"change",D)})(),v=n("ajaxifyDestroy"),i(document.forms[0],"submit",S)}export default function(){j(),function(){const r=e("form",t)[0].nextElementSibling.nextElementSibling.nextElementSibling,s=o("img",r).filter(h)
0!==s.length&&l(r,`<tr><td class="fshCenter">Move selected items to: <select name="folder" id="selectFolderId" class="customselect">${s.map(x).join("")}</select>&nbsp;<input type="button" class="custombutton" id="fshMove" value="Move"></td></tr>`)}(),k()}
//# sourceMappingURL=injectProfileDropItems-04cd12cc.js.map
