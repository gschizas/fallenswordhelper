import{b as e,p as t,g as o,A as s,bh as r,D as n,e as i,I as a,S as m,M as d,i as c,W as p}from"./calfSystem-02ae8657.js"
import"./isArray-7fbdd896.js"
import"./batch-149b9740.js"
import"./insertElementBefore-35d3b41e.js"
import"./isChecked-d5c20d5f.js"
import{b as f}from"./simpleCheckbox-11c3e9b3.js"
import"./dialogMsg-f195b598.js"
import"./closest-8af29cf3.js"
import"./closestTable-704cfbde.js"
import"./insertHtmlBeforeBegin-d5084f64.js"
import"./addStatTotalToMouseover-547ea750.js"
import{c as l}from"./chunk-4fd31518.js"
import{e as b}from"./errorDialog-da114958.js"
import"./dialog-daafeeb1.js"
import"./indexAjaxJson-8dbd2034.js"
import"./ajaxReturnCode-71b23dbe.js"
import{i as j}from"./insertHtmlAfterEnd-23545b48.js"
import"./dropItem-0a4a587b.js"
import u from"./injectStoreItems-844fac9c.js"
import"./createTr-cf69bf95.js"
import"./makeFolderSpan-ab795351.js"
import"./makeFolderSpans-f2c71edc.js"
import"./eventHandler5-5a3d9dd4.js"
import"./cmdExport-de6d587e.js"
import"./getInventory-d2026f8d.js"
import"./getInventoryById-8b3f94ee.js"
import"./toggleForce-f1ceaa74.js"
import"./selfIdIs-e390a6cb.js"
import{c as g}from"./closestTr-cb33d92d.js"
const h=e=>e.src.includes("/folder.png")
function v(e){return`<option value=${e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]}>${s(e.parentNode.parentNode)}</option>`}function x(e){return function(e){return r({subcmd:"dodropitems",removeIndex:e})}(e)}let y
const I=e=>{const t=g(e)
t.nextElementSibling.remove(),t.remove()},S=e=>{x(e.map(e=>e.value)).then(b).then(t=>{t.s&&e.forEach(I)})},E=e=>{if(!e.returnValue||!y)return
e.preventDefault()
const t=a('[name="removeIndex[]"]:checked')
l(30,t).forEach(S),m("profileDropitems","Destroy by AJAX")}
function D(){y=!y,p("ajaxifyDestroy",y)}function k(){(()=>{const e=d('input[type="submit"]')
c(e.parentNode,"&nbsp;&nbsp;"+f("ajaxifyDestroy")),i(e.parentNode,"change",D)})(),y=n("ajaxifyDestroy"),i(document.forms[0],"submit",E)}export default function(){u(),function(){const s=e("form",t)[0].nextElementSibling.nextElementSibling.nextElementSibling,r=o("img",s).filter(h)
0!==r.length&&j(s,`<tr><td class="fshCenter">Move selected items to: <select name="folder" id="selectFolderId" class="customselect">${r.map(v).join("")}</select>&nbsp;<input type="button" class="custombutton" id="fshMove" value="Move"></td></tr>`)}(),k()}
//# sourceMappingURL=injectProfileDropItems-1752e902.js.map
