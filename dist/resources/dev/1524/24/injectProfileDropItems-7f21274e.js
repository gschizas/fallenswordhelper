import{B as e,V as t,w as o,D as s,t as n,H as r,f as a,C as c,i,Z as l,x as f,by as d}from"./calfSystem-38898f3e.js"
import"./batch-21cc76f7.js"
import"./isChecked-2d5427f6.js"
import{b as m}from"./simpleCheckbox-b24eb7dc.js"
import"./dialogMsg-9241492c.js"
import"./doStatTotal-19a42dfd.js"
import{S as u,i as p,s as h,e as j,t as b,a as g,b as v,c as x,d as y,f as _,g as C,h as k,l as D,n as E,j as S,r as I,k as N,m as w,o as A,p as M,q as T,u as $,v as B}from"./injectStoreItems-b018a52b.js"
import{c as J}from"./chunk-a9141930.js"
import"./closest-d8e60c46.js"
import{c as V}from"./closestTable-01c9ecbb.js"
import{c as q}from"./closestTr-4d04f2f4.js"
import"./senditems-82fd6fd1.js"
import"./daAjaxSendItemsToRecipient-e7f9f1c7.js"
import{e as F}from"./errorDialog-8d3200e2.js"
import"./indexAjaxJson-2402e0e9.js"
import"./cmdExport-2f232ad1.js"
import"./guildStore-657dd13b.js"
import"./getInventory-41df5894.js"
import"./getInventoryById-e93c5950.js"
function H(e,t,o){const s=e.slice()
return s[7]=t[o],s}function R(e){let t,o,s,n=e[3](e[7])+""
return{c(){t=j("option"),o=b(n),t.__value=s=e[2](e[7]),t.value=t.__value},m(e,s){g(e,t,s),v(t,o)},p(e,r){1&r&&n!==(n=e[3](e[7])+"")&&x(o,n),1&r&&s!==(s=e[2](e[7]))&&(t.__value=s,t.value=t.__value)},d(e){e&&y(t)}}}function X(e){let t,o,s,n,r,a,c,i,l,f,d,m=e[0],u=[]
for(let t=0;t<m.length;t+=1)u[t]=R(H(e,m,t))
return{c(){t=j("tr"),o=j("td"),s=j("span"),s.textContent="Move selected items to:",n=_(),r=j("select")
for(let e=0;e<u.length;e+=1)u[e].c()
a=_(),c=j("span"),c.textContent=" ",i=_(),l=j("button"),l.textContent="Move",C(r,"class","customselect"),void 0===e[1]&&w(()=>e[5].call(r)),C(l,"class","custombutton"),C(l,"type","button"),C(o,"class","fshCenter")},m(m,p){g(m,t,p),v(t,o),v(o,s),v(o,n),v(o,r)
for(let e=0;e<u.length;e+=1)u[e].m(r,null)
k(r,e[1]),v(o,a),v(o,c),v(o,i),v(o,l),f||(d=[D(r,"change",e[5]),D(l,"click",e[4])],f=!0)},p(e,[t]){if(13&t){let o
for(m=e[0],o=0;o<m.length;o+=1){const s=H(e,m,o)
u[o]?u[o].p(s,t):(u[o]=R(s),u[o].c(),u[o].m(r,null))}for(;o<u.length;o+=1)u[o].d(1)
u.length=m.length}7&t&&k(r,e[1])},i:E,o:E,d(e){e&&y(t),S(u,e),f=!1,I(d)}}}function Z(o,s,n){const r=N()
let a,{folders:c}=s
const i=e=>e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]
return o.$$set=e=>{"folders"in e&&n(0,c=e.folders)},[c,a,i,t=>e(t.parentNode.parentNode),function(){t("dropitems","Move to Folder"),r("move",a)},function(){a=A(this),n(1,a),n(2,i),n(0,c)}]}class z extends u{constructor(e){super(),p(this,e,Z,X,h,{folders:0})}}function G(e,t){return function(e,t){return o({cmd:"profile",subcmd:"sendtofolder",folder_id:e,folderItem:t})}(e,t)}function K(){return s('[name="removeIndex[]"]:checked')}function L(e){const t=q(e)
t.nextElementSibling.remove(),t.remove()}async function O(e,t){(await G(e,t.map(e=>e.value))).s&&t.forEach(L)}function P(e){J(30,K()).forEach(n(O,e.detail))}function Q(e){M().forEach(t=>{t.checked=Boolean(e)})}let U
const W=e=>{T(e.map(e=>e.value)).then(F).then(t=>{t.s&&e.forEach(L)})},Y=e=>{e.returnValue&&U&&(e.preventDefault(),J(30,K()).forEach(W),t("profileDropitems","Destroy by AJAX"))}
function ee(){U=!U,l("ajaxifyDestroy",U)}const te=[function(){const e=s('#pCC img[src$="/folder.png"]')
if(0===e.length)return
const t=q(V(e[0]))
new z({anchor:t.nextElementSibling,props:{folders:e},target:t.parentNode}).$on("move",P)},B,function(){(()=>{const e=c('input[type="submit"]')
i(e.parentNode,"&nbsp;&nbsp;"+m("ajaxifyDestroy")),a(e.parentNode,"change",ee)})(),U=r("ajaxifyDestroy"),a(document.forms[0],"submit",Y),window.check=Q}]
function oe(){!f()&&$()&&d(te)}export default oe
//# sourceMappingURL=injectProfileDropItems-7f21274e.js.map
