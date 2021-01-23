import{B as e,U as t,w as o,D as s,t as n,H as a,f as r,C as c,i,Y as l,x as f,bx as m}from"./calfSystem-7aee5245.js"
import{S as d,i as u,s as p,e as h,t as b,a as j,b as g,c as v,d as x,f as y,g as _,h as C,l as k,n as E,j as D,r as I,k as S,m as N,o as w,p as $,q as A,u as M,v as T}from"./injectStoreItems-cf666b57.js"
import{c as B}from"./chunk-a5250b9a.js"
import{c as J}from"./closestTable-08c8eaf4.js"
import{c as q}from"./closestTr-177ae492.js"
import{e as F}from"./errorDialog-9d880b0d.js"
import{b as H}from"./simpleCheckbox-4f66a590.js"
import"./daAjaxSendItemsToRecipient-eccfe140.js"
import"./getInventoryById-6ca13561.js"
import"./getInventory-9e4bb982.js"
import"./cmdExport-ac019581.js"
import"./indexAjaxJson-d7e2ce82.js"
import"./doStatTotal-0f89c931.js"
import"./batch-bd79b969.js"
import"./closest-77701dcf.js"
import"./dialogMsg-844edf4e.js"
import"./isChecked-1c18cd61.js"
function R(e,t,o){const s=e.slice()
return s[7]=t[o],s}function U(e){let t,o,s,n=e[3](e[7])+""
return{c(){t=h("option"),o=b(n),t.__value=s=e[2](e[7]),t.value=t.__value},m(e,s){j(e,t,s),g(t,o)},p(e,a){1&a&&n!==(n=e[3](e[7])+"")&&v(o,n),1&a&&s!==(s=e[2](e[7]))&&(t.__value=s,t.value=t.__value)},d(e){e&&x(t)}}}function V(e){let t,o,s,n,a,r,c,i,l,f,m,d=e[0],u=[]
for(let t=0;t<d.length;t+=1)u[t]=U(R(e,d,t))
return{c(){t=h("tr"),o=h("td"),s=h("span"),s.textContent="Move selected items to:",n=y(),a=h("select")
for(let e=0;e<u.length;e+=1)u[e].c()
r=y(),c=h("span"),c.textContent=" ",i=y(),l=h("button"),l.textContent="Move",_(a,"class","customselect"),void 0===e[1]&&N((()=>e[5].call(a))),_(l,"class","custombutton"),_(l,"type","button"),_(o,"class","fshCenter")},m(d,p){j(d,t,p),g(t,o),g(o,s),g(o,n),g(o,a)
for(let e=0;e<u.length;e+=1)u[e].m(a,null)
C(a,e[1]),g(o,r),g(o,c),g(o,i),g(o,l),f||(m=[k(a,"change",e[5]),k(l,"click",e[4])],f=!0)},p(e,[t]){if(13&t){let o
for(d=e[0],o=0;o<d.length;o+=1){const s=R(e,d,o)
u[o]?u[o].p(s,t):(u[o]=U(s),u[o].c(),u[o].m(a,null))}for(;o<u.length;o+=1)u[o].d(1)
u.length=d.length}7&t&&C(a,e[1])},i:E,o:E,d(e){e&&x(t),D(u,e),f=!1,I(m)}}}function X(o,s,n){const a=S()
let r,{folders:c}=s
const i=e=>e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]
return o.$$set=e=>{"folders"in e&&n(0,c=e.folders)},[c,r,i,t=>e(t.parentNode.parentNode),function(){t("dropitems","Move to Folder"),a("move",r)},function(){r=w(this),n(1,r),n(2,i),n(0,c)}]}class Y extends d{constructor(e){super(),u(this,e,X,V,p,{folders:0})}}function z(e,t){return function(e,t){return o({cmd:"profile",subcmd:"sendtofolder",folder_id:e,folderItem:t})}(e,t)}function G(){return s('[name="removeIndex[]"]:checked')}function K(e){const t=q(e)
t.nextElementSibling.remove(),t.remove()}async function L(e,t){(await z(e,t.map((e=>e.value)))).s&&t.forEach(K)}function O(e){B(30,G()).forEach(n(L,e.detail))}function P(e){$().forEach((t=>{t.checked=Boolean(e)}))}let Q
const W=e=>{A(e.map((e=>e.value))).then(F).then((t=>{t.s&&e.forEach(K)}))},Z=e=>{e.returnValue&&Q&&(e.preventDefault(),B(30,G()).forEach(W),t("dropitems","Destroy by AJAX"))}
function ee(){Q=!Q,l("ajaxifyDestroy",Q)}const te=[function(){const e=s('#pCC img[src$="/folder.png"]')
if(0===e.length)return
const t=q(J(e[0]))
new Y({anchor:t.nextElementSibling,props:{folders:e},target:t.parentNode}).$on("move",O)},T,function(){(()=>{const e=c('input[type="submit"]')
i(e.parentNode,`&nbsp;&nbsp;${H("ajaxifyDestroy")}`),r(e.parentNode,"change",ee)})(),Q=a("ajaxifyDestroy"),r(document.forms[0],"submit",Z),window.check=P}]
function oe(){!f()&&M()&&m(te)}export default oe
//# sourceMappingURL=injectProfileDropItems-39220f5c.js.map
