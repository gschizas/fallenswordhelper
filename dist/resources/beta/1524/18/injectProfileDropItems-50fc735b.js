import{b as e,p as t,g as o,A as s,bi as r,D as n,e as i,I as a,S as m,M as c,i as d,W as p}from"./calfSystem-4197cc22.js"
import"./isArray-32682e84.js"
import"./batch-ffce0116.js"
import"./insertElementBefore-fe70cd72.js"
import"./isChecked-3260d105.js"
import{b as l}from"./simpleCheckbox-8187e065.js"
import"./dialogMsg-bddf61a2.js"
import"./closest-5218baf6.js"
import"./closestTable-31439620.js"
import"./insertHtmlBeforeBegin-ee36aa93.js"
import"./addStatTotalToMouseover-ba5e05e4.js"
import{c as f}from"./chunk-a00d77cd.js"
import{e as j}from"./errorDialog-575dfa0d.js"
import"./dialog-25ddd658.js"
import"./indexAjaxJson-914501b6.js"
import"./ajaxReturnCode-c4f90575.js"
import{i as u}from"./insertHtmlAfterEnd-33a3ae32.js"
import"./dropItem-cac1d796.js"
import b from"./injectStoreItems-17901a7b.js"
import"./createTr-29cae60c.js"
import"./makeFolderSpan-96cb02cb.js"
import"./makeFolderSpans-d2fe932c.js"
import"./eventHandler5-0f5bd8d5.js"
import"./cmdExport-ccb93370.js"
import"./getInventory-e4a93432.js"
import"./getInventoryById-8142e4af.js"
import"./toggleForce-de86eac9.js"
import"./selfIdIs-6f09b38b.js"
import{c as g}from"./closestTr-3be0023c.js"
const h=e=>e.src.includes("/folder.png")
function v(e){return`<option value=${e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]}>${s(e.parentNode.parentNode)}</option>`}function x(e){return function(e){return r({subcmd:"dodropitems",removeIndex:e})}(e)}let y
const I=e=>{const t=g(e)
t.nextElementSibling.remove(),t.remove()},S=e=>{x(e.map(e=>e.value)).then(j).then(t=>{t.s&&e.forEach(I)})},E=e=>{if(!e.returnValue||!y)return
e.preventDefault()
const t=a('[name="removeIndex[]"]:checked')
f(30,t).forEach(S),m("profileDropitems","Destroy by AJAX")}
function D(){y=!y,p("ajaxifyDestroy",y)}function k(){(()=>{const e=c('input[type="submit"]')
d(e.parentNode,"&nbsp;&nbsp;"+l("ajaxifyDestroy")),i(e.parentNode,"change",D)})(),y=n("ajaxifyDestroy"),i(document.forms[0],"submit",E)}export default function(){b(),function(){const s=e("form",t)[0].nextElementSibling.nextElementSibling.nextElementSibling,r=o("img",s).filter(h)
0!==r.length&&u(s,`<tr><td class="fshCenter">Move selected items to: <select name="folder" id="selectFolderId" class="customselect">${r.map(v).join("")}</select>&nbsp;<input type="button" class="custombutton" id="fshMove" value="Move"></td></tr>`)}(),k()}
//# sourceMappingURL=injectProfileDropItems-50fc735b.js.map
