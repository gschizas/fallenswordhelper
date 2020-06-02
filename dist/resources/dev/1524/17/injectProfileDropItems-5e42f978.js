import{b as e,p as t,g as o,A as s,b1 as r,D as n,e as i,I as a,T as m,N as c,i as d,X as f}from"./calfSystem-1c103624.js"
import"./batch-5d6f84ee.js"
import"./insertElementBefore-0e09c5df.js"
import"./isChecked-acff895a.js"
import{b as p}from"./simpleCheckbox-195e8c73.js"
import"./dialogMsg-d0fce5cd.js"
import"./closest-a4273a71.js"
import"./closestTable-67ab97b7.js"
import"./insertHtmlBeforeBegin-ff6f06a1.js"
import"./addStatTotalToMouseover-9ae5f9e8.js"
import{c as l}from"./chunk-ccdd17c4.js"
import{e as j}from"./errorDialog-3ded88bf.js"
import"./dialog-5bdfcc8e.js"
import"./indexAjaxJson-ed231bc3.js"
import"./ajaxReturnCode-9f3bc5f9.js"
import{i as u}from"./insertHtmlAfterEnd-cca1ed99.js"
import"./senditems-e326bb3a.js"
import"./dropItem-061878ef.js"
import b from"./injectStoreItems-7ecc8170.js"
import"./createTr-c78e849f.js"
import"./makeFolderSpan-d7ca60af.js"
import"./makeFolderSpans-4d6fd0b1.js"
import"./eventHandler5-130c1d57.js"
import"./cmdExport-15d3dc9a.js"
import"./guildStore-17582a77.js"
import"./getInventory-baeadfc2.js"
import"./getInventoryById-f4443c8c.js"
import"./toggleForce-43e39379.js"
import"./selfIdIs-f0ae0978.js"
import{c as g}from"./closestTr-335afa5f.js"
const h=e=>e.src.includes("/folder.png")
function v(e){return`<option value=${e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]}>${s(e.parentNode.parentNode)}</option>`}function x(e){return function(e){return r({subcmd:"dodropitems",removeIndex:e})}(e)}let y
const I=e=>{const t=g(e)
t.nextElementSibling.remove(),t.remove()},S=e=>{x(e.map(e=>e.value)).then(j).then(t=>{t.s&&e.forEach(I)})},E=e=>{if(!e.returnValue||!y)return
e.preventDefault()
const t=a('[name="removeIndex[]"]:checked')
l(30,t).forEach(S),m("profileDropitems","Destroy by AJAX")}
function D(){y=!y,f("ajaxifyDestroy",y)}function k(){(()=>{const e=c('input[type="submit"]')
d(e.parentNode,"&nbsp;&nbsp;"+p("ajaxifyDestroy")),i(e.parentNode,"change",D)})(),y=n("ajaxifyDestroy"),i(document.forms[0],"submit",E)}export default function(){b(),function(){const s=e("form",t)[0].nextElementSibling.nextElementSibling.nextElementSibling,r=o("img",s).filter(h)
0!==r.length&&u(s,`<tr><td class="fshCenter">Move selected items to: <select name="folder" id="selectFolderId" class="customselect">${r.map(v).join("")}</select>&nbsp;<input type="button" class="custombutton" id="fshMove" value="Move"></td></tr>`)}(),k()}
//# sourceMappingURL=injectProfileDropItems-5e42f978.js.map
