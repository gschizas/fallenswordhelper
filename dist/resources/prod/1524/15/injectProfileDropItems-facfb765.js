import{b as e,p as t,g as o,A as s,bo as r,D as n,e as i,I as a,R as m,L as c,i as p,V as d}from"./calfSystem-740ec4d2.js"
import"./isArray-3eb52569.js"
import"./batch-b6a89158.js"
import"./insertElementBefore-d3961941.js"
import"./isChecked-3cb537d5.js"
import{b as l}from"./simpleCheckbox-f50ed15c.js"
import"./dialogMsg-a44aafc4.js"
import"./closest-a3325de8.js"
import"./closestTable-770ab949.js"
import"./insertHtmlBeforeBegin-3188dd8f.js"
import"./addStatTotalToMouseover-e795b2fd.js"
import{c as f}from"./chunk-022e7847.js"
import{e as j}from"./errorDialog-d5947e19.js"
import"./dialog-004172c3.js"
import"./indexAjaxJson-1e1af708.js"
import"./ajaxReturnCode-e6ac4096.js"
import{i as u}from"./insertHtmlAfterEnd-85b35954.js"
import"./dropItem-4669d5c3.js"
import b from"./injectStoreItems-0615a3a9.js"
import"./createTr-23c406d8.js"
import"./makeFolderSpan-5ec2fcee.js"
import"./makeFolderSpans-2543603e.js"
import"./eventHandler5-0c9435d1.js"
import"./cmdExport-7c541a4f.js"
import"./getInventory-9c412ba4.js"
import"./getInventoryById-627b014e.js"
import"./toggleForce-d0f18056.js"
import"./selfIdIs-154fe41e.js"
const g=e=>e.src.includes("/folder.png")
function h(e){return`<option value=${e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]}>${s(e.parentNode.parentNode)}</option>`}function v(e){return function(e){return r({subcmd:"dodropitems",removeIndex:e})}(e)}let x
const y=e=>{const t=e.closest("tr")
t.nextElementSibling.remove(),t.remove()},I=e=>{v(e.map(e=>e.value)).then(j).then(t=>{t.s&&e.forEach(y)})},E=e=>{if(!e.returnValue||!x)return
e.preventDefault()
const t=a('[name="removeIndex[]"]:checked')
f(30,t).forEach(I),m("profileDropitems","Destroy by AJAX")}
function S(){x=!x,d("ajaxifyDestroy",x)}function D(){(()=>{const e=c('input[type="submit"]')
p(e.parentNode,"&nbsp;&nbsp;"+l("ajaxifyDestroy")),i(e.parentNode,"change",S)})(),x=n("ajaxifyDestroy"),i(document.forms[0],"submit",E)}export default function(){b(),function(){const s=e("form",t)[0].nextElementSibling.nextElementSibling.nextElementSibling,r=o("img",s).filter(g)
0!==r.length&&u(s,`<tr><td class="fshCenter">Move selected items to: <select name="folder" id="selectFolderId" class="customselect">${r.map(h).join("")}</select>&nbsp;<input type="button" class="custombutton" id="fshMove" value="Move"></td></tr>`)}(),D()}
//# sourceMappingURL=injectProfileDropItems-facfb765.js.map
