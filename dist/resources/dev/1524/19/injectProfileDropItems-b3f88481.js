import{b as e,p as t,g as o,A as s,b1 as r,D as n,e as a,I as i,T as m,N as c,i as p,X as d}from"./calfSystem-f7574730.js"
import"./batch-0781b5ad.js"
import"./insertElementBefore-b5c9c232.js"
import"./isChecked-8b5fb1cd.js"
import{b as l}from"./simpleCheckbox-6ccf77ae.js"
import"./dialogMsg-655101fe.js"
import"./closest-807af018.js"
import"./closestTable-4db1af82.js"
import"./insertHtmlBeforeBegin-474099b5.js"
import"./addStatTotalToMouseover-170bb21e.js"
import{c as f}from"./chunk-817a9c70.js"
import{e as j}from"./errorDialog-28d9d153.js"
import"./dialog-a36114b5.js"
import"./indexAjaxJson-66a839ba.js"
import"./ajaxReturnCode-7daad738.js"
import{i as b}from"./insertHtmlAfterEnd-38a30874.js"
import"./senditems-38df50c1.js"
import"./dropItem-fb3cec09.js"
import u from"./injectStoreItems-7b66a65c.js"
import"./createTr-5b043bb5.js"
import"./makeFolderSpan-c4cb955a.js"
import"./makeFolderSpans-da4e5480.js"
import"./eventHandler5-76337fed.js"
import"./cmdExport-da1f542a.js"
import"./guildStore-8fe7d393.js"
import"./getInventory-580028ac.js"
import"./getInventoryById-c0c88cd1.js"
import"./toggleForce-253de8c7.js"
import"./selfIdIs-c6f2e263.js"
import{c as g}from"./closestTr-78ace0a3.js"
const h=e=>e.src.includes("/folder.png")
function v(e){return`<option value=${e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]}>${s(e.parentNode.parentNode)}</option>`}function x(e){return function(e){return r({subcmd:"dodropitems",removeIndex:e})}(e)}let y
const I=e=>{const t=g(e)
t.nextElementSibling.remove(),t.remove()},S=e=>{x(e.map(e=>e.value)).then(j).then(t=>{t.s&&e.forEach(I)})},E=e=>{if(!e.returnValue||!y)return
e.preventDefault()
const t=i('[name="removeIndex[]"]:checked')
f(30,t).forEach(S),m("profileDropitems","Destroy by AJAX")}
function D(){y=!y,d("ajaxifyDestroy",y)}function k(){(()=>{const e=c('input[type="submit"]')
p(e.parentNode,"&nbsp;&nbsp;"+l("ajaxifyDestroy")),a(e.parentNode,"change",D)})(),y=n("ajaxifyDestroy"),a(document.forms[0],"submit",E)}export default function(){u(),function(){const s=e("form",t)[0].nextElementSibling.nextElementSibling.nextElementSibling,r=o("img",s).filter(h)
0!==r.length&&b(s,`<tr><td class="fshCenter">Move selected items to: <select name="folder" id="selectFolderId" class="customselect">${r.map(v).join("")}</select>&nbsp;<input type="button" class="custombutton" id="fshMove" value="Move"></td></tr>`)}(),k()}
//# sourceMappingURL=injectProfileDropItems-b3f88481.js.map
