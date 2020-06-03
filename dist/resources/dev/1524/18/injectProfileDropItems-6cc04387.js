import{b as e,p as t,g as o,A as s,b1 as r,D as n,e as i,I as a,T as m,N as c,i as d,X as p}from"./calfSystem-5545a3e6.js"
import"./batch-21ff5577.js"
import"./insertElementBefore-babbeb6f.js"
import"./isChecked-ae232d81.js"
import{b as f}from"./simpleCheckbox-16914843.js"
import"./dialogMsg-e3924e5b.js"
import"./closest-b938ab98.js"
import"./closestTable-86204b76.js"
import"./insertHtmlBeforeBegin-e7607ccd.js"
import"./addStatTotalToMouseover-1cef3558.js"
import{c as l}from"./chunk-4374bd2f.js"
import{e as j}from"./errorDialog-506fd27f.js"
import"./dialog-30daca30.js"
import"./indexAjaxJson-06c0d970.js"
import"./ajaxReturnCode-d5cc1480.js"
import{i as u}from"./insertHtmlAfterEnd-489f5b87.js"
import"./senditems-1f25c09d.js"
import"./dropItem-a58dc65b.js"
import b from"./injectStoreItems-0e9a925f.js"
import"./createTr-687ae138.js"
import"./makeFolderSpan-85001e1e.js"
import"./makeFolderSpans-d1cf46ce.js"
import"./eventHandler5-ffda34ea.js"
import"./cmdExport-2a172ff1.js"
import"./guildStore-be1d5903.js"
import"./getInventory-e72d2901.js"
import"./getInventoryById-f2f6620e.js"
import"./toggleForce-c71db530.js"
import"./selfIdIs-f1738628.js"
import{c as g}from"./closestTr-4d73d7e9.js"
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
//# sourceMappingURL=injectProfileDropItems-6cc04387.js.map
