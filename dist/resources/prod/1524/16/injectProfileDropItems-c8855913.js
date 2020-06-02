import{b as e,p as t,g as o,A as s,bg as r,D as n,e as i,I as a,S as m,M as c,i as d,W as p}from"./calfSystem-be09bdff.js"
import"./isArray-283d553a.js"
import"./batch-6fef336a.js"
import"./insertElementBefore-1fd7bda7.js"
import"./isChecked-8d8d5233.js"
import{b as f}from"./simpleCheckbox-b4136c55.js"
import"./dialogMsg-8889cf76.js"
import"./closest-81c3e392.js"
import"./closestTable-dde6bdc8.js"
import"./insertHtmlBeforeBegin-212e98dd.js"
import"./addStatTotalToMouseover-a8ed3a71.js"
import{c as l}from"./chunk-b5ca0f4f.js"
import{e as j}from"./errorDialog-49a49675.js"
import"./dialog-2ae45961.js"
import"./indexAjaxJson-f8cc1f1e.js"
import"./ajaxReturnCode-5434dbe8.js"
import{i as u}from"./insertHtmlAfterEnd-a624273f.js"
import"./dropItem-cf8f01fe.js"
import b from"./injectStoreItems-48f153c1.js"
import"./createTr-12f917d5.js"
import"./makeFolderSpan-e2924db8.js"
import"./makeFolderSpans-e4b84f51.js"
import"./eventHandler5-59c96079.js"
import"./cmdExport-8189e42d.js"
import"./getInventory-85d24f25.js"
import"./getInventoryById-ae95478a.js"
import"./toggleForce-2711e067.js"
import"./selfIdIs-c523c399.js"
import{c as g}from"./closestTr-973c6982.js"
const h=e=>e.src.includes("/folder.png")
function v(e){return`<option value=${e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]}>${s(e.parentNode.parentNode)}</option>`}function x(e){return function(e){return r({subcmd:"dodropitems",removeIndex:e})}(e)}let y
const I=e=>{const t=g(e)
t.nextElementSibling.remove(),t.remove()},S=e=>{x(e.map(e=>e.value)).then(j).then(t=>{t.s&&e.forEach(I)})},E=e=>{if(!e.returnValue||!y)return
e.preventDefault()
const t=a('[name="removeIndex[]"]:checked')
l(30,t).forEach(S),m("profileDropitems","Destroy by AJAX")}
function D(){y=!y,p("ajaxifyDestroy",y)}function k(){(()=>{const e=c('input[type="submit"]')
d(e.parentNode,"&nbsp;&nbsp;"+f("ajaxifyDestroy")),i(e.parentNode,"change",D)})(),y=n("ajaxifyDestroy"),i(document.forms[0],"submit",E)}export default function(){b(),function(){const s=e("form",t)[0].nextElementSibling.nextElementSibling.nextElementSibling,r=o("img",s).filter(h)
0!==r.length&&u(s,`<tr><td class="fshCenter">Move selected items to: <select name="folder" id="selectFolderId" class="customselect">${r.map(v).join("")}</select>&nbsp;<input type="button" class="custombutton" id="fshMove" value="Move"></td></tr>`)}(),k()}
//# sourceMappingURL=injectProfileDropItems-c8855913.js.map
