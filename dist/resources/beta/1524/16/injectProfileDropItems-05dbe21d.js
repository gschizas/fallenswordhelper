import{b as e,p as t,g as o,A as s,bi as r,D as n,e as i,I as a,S as m,M as c,i as p,W as d}from"./calfSystem-9554b525.js"
import"./isArray-7b017653.js"
import"./batch-da10f058.js"
import"./insertElementBefore-5f238f78.js"
import"./isChecked-145d8a72.js"
import{b as f}from"./simpleCheckbox-7b8c126a.js"
import"./dialogMsg-cc663959.js"
import"./closest-687f4f6c.js"
import"./closestTable-7152d2a7.js"
import"./insertHtmlBeforeBegin-f4dec0f3.js"
import"./addStatTotalToMouseover-7d927911.js"
import{c as l}from"./chunk-cb4731b2.js"
import{e as j}from"./errorDialog-48754a90.js"
import"./dialog-7b85f47c.js"
import"./indexAjaxJson-24e555fb.js"
import"./ajaxReturnCode-2460176f.js"
import{i as b}from"./insertHtmlAfterEnd-b9b58b3d.js"
import"./dropItem-5c7b15a2.js"
import u from"./injectStoreItems-1c1d6668.js"
import"./createTr-65654c70.js"
import"./makeFolderSpan-5c2571b6.js"
import"./makeFolderSpans-57788ed6.js"
import"./eventHandler5-78623e89.js"
import"./cmdExport-d8ee0a12.js"
import"./getInventory-d47f4ff7.js"
import"./getInventoryById-8ed31e70.js"
import"./toggleForce-23da739a.js"
import"./selfIdIs-f83def79.js"
import{c as g}from"./closestTr-a2db1fa0.js"
const h=e=>e.src.includes("/folder.png")
function v(e){return`<option value=${e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]}>${s(e.parentNode.parentNode)}</option>`}function x(e){return function(e){return r({subcmd:"dodropitems",removeIndex:e})}(e)}let y
const I=e=>{const t=g(e)
t.nextElementSibling.remove(),t.remove()},S=e=>{x(e.map(e=>e.value)).then(j).then(t=>{t.s&&e.forEach(I)})},E=e=>{if(!e.returnValue||!y)return
e.preventDefault()
const t=a('[name="removeIndex[]"]:checked')
l(30,t).forEach(S),m("profileDropitems","Destroy by AJAX")}
function D(){y=!y,d("ajaxifyDestroy",y)}function k(){(()=>{const e=c('input[type="submit"]')
p(e.parentNode,"&nbsp;&nbsp;"+f("ajaxifyDestroy")),i(e.parentNode,"change",D)})(),y=n("ajaxifyDestroy"),i(document.forms[0],"submit",E)}export default function(){u(),function(){const s=e("form",t)[0].nextElementSibling.nextElementSibling.nextElementSibling,r=o("img",s).filter(h)
0!==r.length&&b(s,`<tr><td class="fshCenter">Move selected items to: <select name="folder" id="selectFolderId" class="customselect">${r.map(v).join("")}</select>&nbsp;<input type="button" class="custombutton" id="fshMove" value="Move"></td></tr>`)}(),k()}
//# sourceMappingURL=injectProfileDropItems-05dbe21d.js.map
