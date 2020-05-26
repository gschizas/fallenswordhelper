import{b as e,p as t,g as o,A as s,bq as r,D as n,e as i,I as a,R as m,L as d,i as c,V as f}from"./calfSystem-1262535f.js"
import"./isArray-d09fe8d1.js"
import"./batch-f97a2ba5.js"
import"./insertElementBefore-dcdbe7ae.js"
import"./isChecked-d8a3d688.js"
import{b as p}from"./simpleCheckbox-69fdc6eb.js"
import"./dialogMsg-06808fe1.js"
import"./closest-20389d90.js"
import"./closestTable-fb9486a9.js"
import"./insertHtmlBeforeBegin-5ac12245.js"
import"./addStatTotalToMouseover-9c2f1591.js"
import{c as l}from"./chunk-ac937c14.js"
import{e as j}from"./errorDialog-dc5450a9.js"
import"./dialog-c7021814.js"
import"./indexAjaxJson-f27fbe77.js"
import"./ajaxReturnCode-cf3ddf46.js"
import{i as u}from"./insertHtmlAfterEnd-2dcd57ed.js"
import"./dropItem-27df3440.js"
import b from"./injectStoreItems-8a179b2f.js"
import"./createTr-0093f7ce.js"
import"./makeFolderSpan-f7758d3a.js"
import"./makeFolderSpans-2d989731.js"
import"./eventHandler5-d9f72206.js"
import"./cmdExport-721bbaf9.js"
import"./getInventory-7d61d5d2.js"
import"./getInventoryById-3ff089d4.js"
import"./toggleForce-04e33300.js"
import"./selfIdIs-6bd2f09f.js"
const g=e=>e.src.includes("/folder.png")
function h(e){return`<option value=${e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]}>${s(e.parentNode.parentNode)}</option>`}function v(e){return function(e){return r({subcmd:"dodropitems",removeIndex:e})}(e)}let x
const y=e=>{const t=e.closest("tr")
t.nextElementSibling.remove(),t.remove()},I=e=>{v(e.map(e=>e.value)).then(j).then(t=>{t.s&&e.forEach(y)})},E=e=>{if(!e.returnValue||!x)return
e.preventDefault()
const t=a('[name="removeIndex[]"]:checked')
l(30,t).forEach(I),m("profileDropitems","Destroy by AJAX")}
function S(){x=!x,f("ajaxifyDestroy",x)}function D(){(()=>{const e=d('input[type="submit"]')
c(e.parentNode,"&nbsp;&nbsp;"+p("ajaxifyDestroy")),i(e.parentNode,"change",S)})(),x=n("ajaxifyDestroy"),i(document.forms[0],"submit",E)}export default function(){b(),function(){const s=e("form",t)[0].nextElementSibling.nextElementSibling.nextElementSibling,r=o("img",s).filter(g)
0!==r.length&&u(s,`<tr><td class="fshCenter">Move selected items to: <select name="folder" id="selectFolderId" class="customselect">${r.map(h).join("")}</select>&nbsp;<input type="button" class="custombutton" id="fshMove" value="Move"></td></tr>`)}(),D()}
//# sourceMappingURL=injectProfileDropItems-95ed856f.js.map
