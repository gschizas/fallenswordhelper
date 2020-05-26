import{b as e,p as t,g as o,A as s,bf as r,D as n,e as i,I as a,S as m,M as d,i as c,W as p}from"./calfSystem-ee582533.js"
import"./batch-59d43fba.js"
import"./insertElementBefore-7ed837be.js"
import"./isChecked-21b2756d.js"
import{b as f}from"./simpleCheckbox-eb1aed29.js"
import"./dialogMsg-b9afb04d.js"
import"./closest-d675e111.js"
import"./closestTable-ffc1b5cf.js"
import"./insertHtmlBeforeBegin-66a80e13.js"
import"./addStatTotalToMouseover-e9c19da5.js"
import{c as l}from"./chunk-7f692bd3.js"
import{e as b}from"./errorDialog-647ae9d2.js"
import"./dialog-b2af5043.js"
import"./indexAjaxJson-e486d467.js"
import"./ajaxReturnCode-c49dbedc.js"
import{i as j}from"./insertHtmlAfterEnd-4dbaaf09.js"
import"./senditems-4a0b6b24.js"
import"./dropItem-43fd04fd.js"
import u from"./injectStoreItems-ef5428c9.js"
import"./createTr-bfcbc414.js"
import"./makeFolderSpan-8b9c7bfc.js"
import"./makeFolderSpans-a24df563.js"
import"./eventHandler5-39a91f1e.js"
import"./cmdExport-23cec039.js"
import"./guildStore-7cd0d847.js"
import"./getInventory-82e3b49f.js"
import"./getInventoryById-77125772.js"
import"./toggleForce-3b831976.js"
import"./selfIdIs-2732dbd2.js"
const g=e=>e.src.includes("/folder.png")
function h(e){return`<option value=${e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]}>${s(e.parentNode.parentNode)}</option>`}function v(e){return function(e){return r({subcmd:"dodropitems",removeIndex:e})}(e)}let x
const y=e=>{const t=e.closest("tr")
t.nextElementSibling.remove(),t.remove()},I=e=>{v(e.map(e=>e.value)).then(b).then(t=>{t.s&&e.forEach(y)})},S=e=>{if(!e.returnValue||!x)return
e.preventDefault()
const t=a('[name="removeIndex[]"]:checked')
l(30,t).forEach(I),m("profileDropitems","Destroy by AJAX")}
function E(){x=!x,p("ajaxifyDestroy",x)}function D(){(()=>{const e=d('input[type="submit"]')
c(e.parentNode,"&nbsp;&nbsp;"+f("ajaxifyDestroy")),i(e.parentNode,"change",E)})(),x=n("ajaxifyDestroy"),i(document.forms[0],"submit",S)}export default function(){u(),function(){const s=e("form",t)[0].nextElementSibling.nextElementSibling.nextElementSibling,r=o("img",s).filter(g)
0!==r.length&&j(s,`<tr><td class="fshCenter">Move selected items to: <select name="folder" id="selectFolderId" class="customselect">${r.map(h).join("")}</select>&nbsp;<input type="button" class="custombutton" id="fshMove" value="Move"></td></tr>`)}(),D()}
//# sourceMappingURL=injectProfileDropItems-4eedd556.js.map
