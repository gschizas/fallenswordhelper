import{b as e,p as t,g as o,A as s,bg as r,D as n,e as a,I as i,S as m,M as c,i as p,W as d}from"./calfSystem-6fc0cc1b.js"
import"./isArray-5986f48a.js"
import"./batch-b39f76d0.js"
import"./insertElementBefore-6f4b88f2.js"
import"./isChecked-ce5ca840.js"
import{b as f}from"./simpleCheckbox-a0ada781.js"
import"./dialogMsg-adf09e8d.js"
import"./closest-958712aa.js"
import"./closestTable-4bde3ff0.js"
import"./insertHtmlBeforeBegin-66902ded.js"
import"./addStatTotalToMouseover-1aae5f13.js"
import{c as l}from"./chunk-e365cb08.js"
import{e as j}from"./errorDialog-a6db364d.js"
import"./dialog-2c2225f5.js"
import"./indexAjaxJson-608117f0.js"
import"./ajaxReturnCode-465058b0.js"
import{i as b}from"./insertHtmlAfterEnd-cb1e0a76.js"
import"./dropItem-ed123f03.js"
import u from"./injectStoreItems-d50a0851.js"
import"./createTr-6cb5e7cf.js"
import"./makeFolderSpan-95077aab.js"
import"./makeFolderSpans-5421d91e.js"
import"./eventHandler5-f88189ac.js"
import"./cmdExport-ce8b0402.js"
import"./getInventory-9044dbdf.js"
import"./getInventoryById-1fb78caf.js"
import"./toggleForce-e87c07c6.js"
import"./selfIdIs-77f3b204.js"
import{c as g}from"./closestTr-7bb79481.js"
const h=e=>e.src.includes("/folder.png")
function v(e){return`<option value=${e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]}>${s(e.parentNode.parentNode)}</option>`}function x(e){return function(e){return r({subcmd:"dodropitems",removeIndex:e})}(e)}let y
const I=e=>{const t=g(e)
t.nextElementSibling.remove(),t.remove()},S=e=>{x(e.map(e=>e.value)).then(j).then(t=>{t.s&&e.forEach(I)})},E=e=>{if(!e.returnValue||!y)return
e.preventDefault()
const t=i('[name="removeIndex[]"]:checked')
l(30,t).forEach(S),m("profileDropitems","Destroy by AJAX")}
function D(){y=!y,d("ajaxifyDestroy",y)}function k(){(()=>{const e=c('input[type="submit"]')
p(e.parentNode,"&nbsp;&nbsp;"+f("ajaxifyDestroy")),a(e.parentNode,"change",D)})(),y=n("ajaxifyDestroy"),a(document.forms[0],"submit",E)}export default function(){u(),function(){const s=e("form",t)[0].nextElementSibling.nextElementSibling.nextElementSibling,r=o("img",s).filter(h)
0!==r.length&&b(s,`<tr><td class="fshCenter">Move selected items to: <select name="folder" id="selectFolderId" class="customselect">${r.map(v).join("")}</select>&nbsp;<input type="button" class="custombutton" id="fshMove" value="Move"></td></tr>`)}(),k()}
//# sourceMappingURL=injectProfileDropItems-2a71598b.js.map
