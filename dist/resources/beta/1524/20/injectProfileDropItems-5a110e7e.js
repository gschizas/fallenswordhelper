import{b as e,p as t,g as o,B as r,bh as s,G as n,e as i,D as a,U as m,C as c,i as d,Y as p}from"./calfSystem-05554bae.js"
import"./isArray-9377ced3.js"
import"./batch-62c1054e.js"
import"./insertElementBefore-2ba0b318.js"
import"./isChecked-57b4060d.js"
import{b as f}from"./simpleCheckbox-1bbe1878.js"
import"./dialogMsg-08e9871c.js"
import"./doStatTotal-b24fc6c4.js"
import{i as l}from"./insertHtmlAfterEnd-1461aee3.js"
import"./ajaxReturnCode-b35db638.js"
import"./dropItem-6bd0ae55.js"
import b from"./injectStoreItems-7659fae4.js"
import"./createTr-343ee7fd.js"
import"./makeFolderSpan-0773eddf.js"
import"./makeFolderSpans-bdd7d7b7.js"
import"./dialog-dbf38e71.js"
import"./indexAjaxJson-c1c386d4.js"
import"./eventHandler5-c51216c0.js"
import"./cmdExport-9dcb6bc5.js"
import"./getInventory-dd72b860.js"
import"./getInventoryById-d10cf296.js"
import"./toggleForce-61cef79e.js"
import{c as j}from"./chunk-50d58dfa.js"
import"./selfIdIs-0f139bfb.js"
import"./closest-a50421eb.js"
import{c as u}from"./closestTr-de7cfbf0.js"
import{e as g}from"./errorDialog-c3ecbb54.js"
const h=e=>e.src.includes("/folder.png")
function x(e){return`<option value=${e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]}>${r(e.parentNode.parentNode)}</option>`}function y(e){return function(e){return s({subcmd:"dodropitems",removeIndex:e})}(e)}let v
const I=e=>{const t=u(e)
t.nextElementSibling.remove(),t.remove()},E=e=>{y(e.map(e=>e.value)).then(g).then(t=>{t.s&&e.forEach(I)})},S=e=>{if(!e.returnValue||!v)return
e.preventDefault()
const t=a('[name="removeIndex[]"]:checked')
j(30,t).forEach(E),m("profileDropitems","Destroy by AJAX")}
function D(){v=!v,p("ajaxifyDestroy",v)}function k(){(()=>{const e=c('input[type="submit"]')
d(e.parentNode,"&nbsp;&nbsp;"+f("ajaxifyDestroy")),i(e.parentNode,"change",D)})(),v=n("ajaxifyDestroy"),i(document.forms[0],"submit",S)}export default function(){b(),function(){const r=e("form",t)[0].nextElementSibling.nextElementSibling.nextElementSibling,s=o("img",r).filter(h)
0!==s.length&&l(r,`<tr><td class="fshCenter">Move selected items to: <select name="folder" id="selectFolderId" class="customselect">${s.map(x).join("")}</select>&nbsp;<input type="button" class="custombutton" id="fshMove" value="Move"></td></tr>`)}(),k()}
//# sourceMappingURL=injectProfileDropItems-5a110e7e.js.map
