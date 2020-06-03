import{b as e,p as t,g as o,A as s,bi as r,D as n,e as i,I as a,S as m,M as c,i as p,W as d}from"./calfSystem-57340987.js"
import"./isArray-f770eec0.js"
import"./batch-e5312d78.js"
import"./insertElementBefore-69bb0e1f.js"
import"./isChecked-e2c7160f.js"
import{b as l}from"./simpleCheckbox-0095209e.js"
import"./dialogMsg-e1203629.js"
import"./closest-f4291115.js"
import"./closestTable-7d6c0bc6.js"
import"./insertHtmlBeforeBegin-ef1c12da.js"
import"./addStatTotalToMouseover-a393a29b.js"
import{c as f}from"./chunk-c7b0fdd2.js"
import{e as b}from"./errorDialog-b114c11e.js"
import"./dialog-bc1710e0.js"
import"./indexAjaxJson-f0b26dd6.js"
import"./ajaxReturnCode-76c0bbbd.js"
import{i as j}from"./insertHtmlAfterEnd-c6138b5e.js"
import"./dropItem-6e3fd0d5.js"
import u from"./injectStoreItems-a4656490.js"
import"./createTr-8778e34e.js"
import"./makeFolderSpan-f56bb33c.js"
import"./makeFolderSpans-69939025.js"
import"./eventHandler5-4b6e79d6.js"
import"./cmdExport-1b96d8bc.js"
import"./getInventory-9c5779da.js"
import"./getInventoryById-ad102b8b.js"
import"./toggleForce-1813ed31.js"
import"./selfIdIs-b8c2cc2a.js"
import{c as g}from"./closestTr-ac8ec42f.js"
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
//# sourceMappingURL=injectProfileDropItems-01aafad0.js.map
