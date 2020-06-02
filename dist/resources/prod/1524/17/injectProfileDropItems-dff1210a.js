import{b as e,p as t,g as o,A as s,bf as r,D as n,e as a,I as i,S as m,M as c,i as p,W as d}from"./calfSystem-dec5e071.js"
import"./isArray-5ae0f2ae.js"
import"./batch-6962fbd8.js"
import"./insertElementBefore-1d764477.js"
import"./isChecked-9b2ad5c2.js"
import{b as f}from"./simpleCheckbox-3c52b154.js"
import"./dialogMsg-1ae9be91.js"
import"./closest-d88a3ae2.js"
import"./closestTable-290574cb.js"
import"./insertHtmlBeforeBegin-4f6b924a.js"
import"./addStatTotalToMouseover-4b9f6553.js"
import{c as l}from"./chunk-c2bce3da.js"
import{e as b}from"./errorDialog-5d76ff73.js"
import"./dialog-b7388abb.js"
import"./indexAjaxJson-ecf8d1f5.js"
import"./ajaxReturnCode-361085b2.js"
import{i as j}from"./insertHtmlAfterEnd-52e450d3.js"
import"./dropItem-3c8d4c57.js"
import u from"./injectStoreItems-4639d738.js"
import"./createTr-30b5cdd2.js"
import"./makeFolderSpan-46bebe5a.js"
import"./makeFolderSpans-af604e8b.js"
import"./eventHandler5-3bf558e6.js"
import"./cmdExport-965d881b.js"
import"./getInventory-722fd75f.js"
import"./getInventoryById-a2e66e56.js"
import"./toggleForce-93af29f7.js"
import"./selfIdIs-b67caa4c.js"
import{c as g}from"./closestTr-37ea13b0.js"
const h=e=>e.src.includes("/folder.png")
function v(e){return`<option value=${e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]}>${s(e.parentNode.parentNode)}</option>`}function x(e){return function(e){return r({subcmd:"dodropitems",removeIndex:e})}(e)}let y
const I=e=>{const t=g(e)
t.nextElementSibling.remove(),t.remove()},S=e=>{x(e.map(e=>e.value)).then(b).then(t=>{t.s&&e.forEach(I)})},E=e=>{if(!e.returnValue||!y)return
e.preventDefault()
const t=i('[name="removeIndex[]"]:checked')
l(30,t).forEach(S),m("profileDropitems","Destroy by AJAX")}
function D(){y=!y,d("ajaxifyDestroy",y)}function k(){(()=>{const e=c('input[type="submit"]')
p(e.parentNode,"&nbsp;&nbsp;"+f("ajaxifyDestroy")),a(e.parentNode,"change",D)})(),y=n("ajaxifyDestroy"),a(document.forms[0],"submit",E)}export default function(){u(),function(){const s=e("form",t)[0].nextElementSibling.nextElementSibling.nextElementSibling,r=o("img",s).filter(h)
0!==r.length&&j(s,`<tr><td class="fshCenter">Move selected items to: <select name="folder" id="selectFolderId" class="customselect">${r.map(v).join("")}</select>&nbsp;<input type="button" class="custombutton" id="fshMove" value="Move"></td></tr>`)}(),k()}
//# sourceMappingURL=injectProfileDropItems-dff1210a.js.map
