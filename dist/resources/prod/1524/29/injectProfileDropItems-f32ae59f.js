import{B as e,U as t,w as o,D as s,t as n,H as a,f as r,C as c,i,Y as l,x as f,bo as m}from"./calfSystem-57628ebe.js"
import"./batch-b6de9fa7.js"
import"./isChecked-92297855.js"
import{b as d}from"./simpleCheckbox-e8742cc5.js"
import"./dialogMsg-920f7637.js"
import"./doStatTotal-59cd65f6.js"
import{S as u,i as p,s as h,e as j,t as b,a as g,b as v,c as x,d as y,f as _,g as C,h as k,l as E,n as D,j as I,r as S,k as N,m as w,o as A,p as M,q as T,u as $,v as B}from"./injectStoreItems-c70848da.js"
import{c as J}from"./chunk-a86d7cea.js"
import"./closest-14c30e26.js"
import{c as q}from"./closestTable-15071c6a.js"
import{c as F}from"./closestTr-125f03b2.js"
import"./daAjaxSendItemsToRecipient-864cc1be.js"
import{e as H}from"./errorDialog-48ca89f9.js"
import"./indexAjaxJson-676110f0.js"
import"./cmdExport-2dc8f38e.js"
import"./getInventory-fafdab72.js"
import"./getInventoryById-63d8a2eb.js"
function R(e,t,o){const s=e.slice()
return s[7]=t[o],s}function U(e){let t,o,s,n=e[3](e[7])+""
return{c(){t=j("option"),o=b(n),t.__value=s=e[2](e[7]),t.value=t.__value},m(e,s){g(e,t,s),v(t,o)},p(e,a){1&a&&n!==(n=e[3](e[7])+"")&&x(o,n),1&a&&s!==(s=e[2](e[7]))&&(t.__value=s,t.value=t.__value)},d(e){e&&y(t)}}}function V(e){let t,o,s,n,a,r,c,i,l,f,m,d=e[0],u=[]
for(let t=0;t<d.length;t+=1)u[t]=U(R(e,d,t))
return{c(){t=j("tr"),o=j("td"),s=j("span"),s.textContent="Move selected items to:",n=_(),a=j("select")
for(let e=0;e<u.length;e+=1)u[e].c()
r=_(),c=j("span"),c.textContent=" ",i=_(),l=j("button"),l.textContent="Move",C(a,"class","customselect"),void 0===e[1]&&w(()=>e[5].call(a)),C(l,"class","custombutton"),C(l,"type","button"),C(o,"class","fshCenter")},m(d,p){g(d,t,p),v(t,o),v(o,s),v(o,n),v(o,a)
for(let e=0;e<u.length;e+=1)u[e].m(a,null)
k(a,e[1]),v(o,r),v(o,c),v(o,i),v(o,l),f||(m=[E(a,"change",e[5]),E(l,"click",e[4])],f=!0)},p(e,[t]){if(13&t){let o
for(d=e[0],o=0;o<d.length;o+=1){const s=R(e,d,o)
u[o]?u[o].p(s,t):(u[o]=U(s),u[o].c(),u[o].m(a,null))}for(;o<u.length;o+=1)u[o].d(1)
u.length=d.length}7&t&&k(a,e[1])},i:D,o:D,d(e){e&&y(t),I(u,e),f=!1,S(m)}}}function X(o,s,n){const a=N()
let r,{folders:c}=s
const i=e=>e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]
return o.$$set=e=>{"folders"in e&&n(0,c=e.folders)},[c,r,i,t=>e(t.parentNode.parentNode),function(){t("dropitems","Move to Folder"),a("move",r)},function(){r=A(this),n(1,r),n(2,i),n(0,c)}]}class Y extends u{constructor(e){super(),p(this,e,X,V,h,{folders:0})}}function z(e,t){return function(e,t){return o({cmd:"profile",subcmd:"sendtofolder",folder_id:e,folderItem:t})}(e,t)}function G(){return s('[name="removeIndex[]"]:checked')}function K(e){const t=F(e)
t.nextElementSibling.remove(),t.remove()}async function L(e,t){(await z(e,t.map(e=>e.value))).s&&t.forEach(K)}function O(e){J(30,G()).forEach(n(L,e.detail))}function P(e){M().forEach(t=>{t.checked=Boolean(e)})}let Q
const W=e=>{T(e.map(e=>e.value)).then(H).then(t=>{t.s&&e.forEach(K)})},Z=e=>{e.returnValue&&Q&&(e.preventDefault(),J(30,G()).forEach(W),t("dropitems","Destroy by AJAX"))}
function ee(){Q=!Q,l("ajaxifyDestroy",Q)}const te=[function(){const e=s('#pCC img[src$="/folder.png"]')
if(0===e.length)return
const t=F(q(e[0]))
new Y({anchor:t.nextElementSibling,props:{folders:e},target:t.parentNode}).$on("move",O)},B,function(){(()=>{const e=c('input[type="submit"]')
i(e.parentNode,"&nbsp;&nbsp;"+d("ajaxifyDestroy")),r(e.parentNode,"change",ee)})(),Q=a("ajaxifyDestroy"),r(document.forms[0],"submit",Z),window.check=P}]
function oe(){!f()&&$()&&m(te)}export default oe
//# sourceMappingURL=injectProfileDropItems-f32ae59f.js.map
