import{B as e,V as t,w as o,D as s,t as n,H as r,f as a,C as c,i,Z as l,x as f,bv as m}from"./calfSystem-54df10e3.js"
import"./batch-08f429bb.js"
import"./isChecked-6167b36b.js"
import{b as d}from"./simpleCheckbox-4ba02dd9.js"
import"./dialogMsg-27e2dc98.js"
import"./doStatTotal-e15e6025.js"
import{S as u,i as p,s as h,e as b,t as j,a as g,b as v,c as x,d as y,f as _,g as C,h as k,l as E,n as S,j as D,r as I,k as N,m as w,o as A,p as M,q as T,u as $,v as B}from"./injectStoreItems-8ff849c6.js"
import{c as J}from"./chunk-c85463de.js"
import"./closest-3bdef2f3.js"
import{c as V}from"./closestTable-15612c09.js"
import{c as q}from"./closestTr-612573e8.js"
import"./senditems-285c25e0.js"
import"./daAjaxSendItemsToRecipient-bad8e541.js"
import{e as F}from"./errorDialog-f6569d61.js"
import"./indexAjaxJson-9f23f983.js"
import"./cmdExport-064541e3.js"
import"./guildStore-b99237f1.js"
import"./getInventory-e4eced6b.js"
import"./getInventoryById-4b09b9d2.js"
function H(e,t,o){const s=e.slice()
return s[7]=t[o],s}function R(e){let t,o,s,n=e[3](e[7])+""
return{c(){t=b("option"),o=j(n),t.__value=s=e[2](e[7]),t.value=t.__value},m(e,s){g(e,t,s),v(t,o)},p(e,r){1&r&&n!==(n=e[3](e[7])+"")&&x(o,n),1&r&&s!==(s=e[2](e[7]))&&(t.__value=s,t.value=t.__value)},d(e){e&&y(t)}}}function X(e){let t,o,s,n,r,a,c,i,l,f,m,d=e[0],u=[]
for(let t=0;t<d.length;t+=1)u[t]=R(H(e,d,t))
return{c(){t=b("tr"),o=b("td"),s=b("span"),s.textContent="Move selected items to:",n=_(),r=b("select")
for(let e=0;e<u.length;e+=1)u[e].c()
a=_(),c=b("span"),c.textContent=" ",i=_(),l=b("button"),l.textContent="Move",C(r,"class","customselect"),void 0===e[1]&&w(()=>e[5].call(r)),C(l,"class","custombutton"),C(l,"type","button"),C(o,"class","fshCenter")},m(d,p){g(d,t,p),v(t,o),v(o,s),v(o,n),v(o,r)
for(let e=0;e<u.length;e+=1)u[e].m(r,null)
k(r,e[1]),v(o,a),v(o,c),v(o,i),v(o,l),f||(m=[E(r,"change",e[5]),E(l,"click",e[4])],f=!0)},p(e,[t]){if(13&t){let o
for(d=e[0],o=0;o<d.length;o+=1){const s=H(e,d,o)
u[o]?u[o].p(s,t):(u[o]=R(s),u[o].c(),u[o].m(r,null))}for(;o<u.length;o+=1)u[o].d(1)
u.length=d.length}7&t&&k(r,e[1])},i:S,o:S,d(e){e&&y(t),D(u,e),f=!1,I(m)}}}function Z(o,s,n){const r=N()
let a,{folders:c}=s
const i=e=>e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]
return o.$$set=e=>{"folders"in e&&n(0,c=e.folders)},[c,a,i,t=>e(t.parentNode.parentNode),function(){t("dropitems","Move to Folder"),r("move",a)},function(){a=A(this),n(1,a),n(2,i),n(0,c)}]}class z extends u{constructor(e){super(),p(this,e,Z,X,h,{folders:0})}}function G(e,t){return function(e,t){return o({cmd:"profile",subcmd:"sendtofolder",folder_id:e,folderItem:t})}(e,t)}function K(){return s('[name="removeIndex[]"]:checked')}function L(e){const t=q(e)
t.nextElementSibling.remove(),t.remove()}async function O(e,t){(await G(e,t.map(e=>e.value))).s&&t.forEach(L)}function P(e){J(30,K()).forEach(n(O,e.detail))}function Q(e){M().forEach(t=>{t.checked=Boolean(e)})}let U
const W=e=>{T(e.map(e=>e.value)).then(F).then(t=>{t.s&&e.forEach(L)})},Y=e=>{e.returnValue&&U&&(e.preventDefault(),J(30,K()).forEach(W),t("dropitems","Destroy by AJAX"))}
function ee(){U=!U,l("ajaxifyDestroy",U)}const te=[function(){const e=s('#pCC img[src$="/folder.png"]')
if(0===e.length)return
const t=q(V(e[0]))
new z({anchor:t.nextElementSibling,props:{folders:e},target:t.parentNode}).$on("move",P)},B,function(){(()=>{const e=c('input[type="submit"]')
i(e.parentNode,"&nbsp;&nbsp;"+d("ajaxifyDestroy")),a(e.parentNode,"change",ee)})(),U=r("ajaxifyDestroy"),a(document.forms[0],"submit",Y),window.check=Q}]
function oe(){!f()&&$()&&m(te)}export default oe
//# sourceMappingURL=injectProfileDropItems-514d02de.js.map
