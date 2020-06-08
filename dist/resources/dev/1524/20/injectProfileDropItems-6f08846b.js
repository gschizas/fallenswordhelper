import{b as e,p as t,g as o,B as s,b0 as r,G as n,e as i,D as a,V as m,C as c,i as d,Z as p}from"./calfSystem-a2862afc.js"
import"./batch-1aa805d3.js"
import"./insertElementBefore-372e5ad6.js"
import"./isChecked-e0d689b2.js"
import{b as f}from"./simpleCheckbox-c8f3914c.js"
import"./dialogMsg-98e801f7.js"
import"./doStatTotal-c038ec00.js"
import{i as l}from"./insertHtmlAfterEnd-dd2b68c5.js"
import"./ajaxReturnCode-f0b1c41c.js"
import"./senditems-b689a7b0.js"
import"./dropItem-0cc9313b.js"
import j from"./injectStoreItems-a49da75a.js"
import"./createTr-885e990c.js"
import"./makeFolderSpan-1e92cbcf.js"
import"./makeFolderSpans-60e6fe6d.js"
import"./dialog-65e58e09.js"
import"./indexAjaxJson-afc1ac85.js"
import"./eventHandler5-0d938057.js"
import"./cmdExport-356fd6f3.js"
import"./guildStore-559bcd67.js"
import"./getInventory-77b8ed5e.js"
import"./getInventoryById-7e10dff9.js"
import"./toggleForce-4bee24df.js"
import{c as u}from"./chunk-250b0675.js"
import"./selfIdIs-7f51e683.js"
import"./closest-75b5e3c5.js"
import{c as b}from"./closestTr-8090afea.js"
import{e as g}from"./errorDialog-a4de6042.js"
const h=e=>e.src.includes("/folder.png")
function x(e){return`<option value=${e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]}>${s(e.parentNode.parentNode)}</option>`}function v(e){return function(e){return r({subcmd:"dodropitems",removeIndex:e})}(e)}let y
const I=e=>{const t=b(e)
t.nextElementSibling.remove(),t.remove()},S=e=>{v(e.map(e=>e.value)).then(g).then(t=>{t.s&&e.forEach(I)})},E=e=>{if(!e.returnValue||!y)return
e.preventDefault()
const t=a('[name="removeIndex[]"]:checked')
u(30,t).forEach(S),m("profileDropitems","Destroy by AJAX")}
function D(){y=!y,p("ajaxifyDestroy",y)}function k(){(()=>{const e=c('input[type="submit"]')
d(e.parentNode,"&nbsp;&nbsp;"+f("ajaxifyDestroy")),i(e.parentNode,"change",D)})(),y=n("ajaxifyDestroy"),i(document.forms[0],"submit",E)}export default function(){j(),function(){const s=e("form",t)[0].nextElementSibling.nextElementSibling.nextElementSibling,r=o("img",s).filter(h)
0!==r.length&&l(s,`<tr><td class="fshCenter">Move selected items to: <select name="folder" id="selectFolderId" class="customselect">${r.map(x).join("")}</select>&nbsp;<input type="button" class="custombutton" id="fshMove" value="Move"></td></tr>`)}(),k()}
//# sourceMappingURL=injectProfileDropItems-6f08846b.js.map
