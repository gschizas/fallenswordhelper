import{B as e,U as t,w as o,D as s,t as n,H as a,f as r,C as c,i,Y as l,x as f,bt as d}from"./calfSystem-ebf4b17d.js"
import"./batch-3642a7ff.js"
import"./isChecked-6167b36b.js"
import{b as m}from"./simpleCheckbox-d8b32f4e.js"
import"./dialogMsg-27e2dc98.js"
import"./doStatTotal-4d2c7207.js"
import{S as u,i as p,s as h,e as b,t as j,a as g,b as v,c as x,d as y,f as _,g as C,h as k,l as E,n as D,j as I,r as S,k as N,m as w,o as A,p as M,q as T,u as $,v as B}from"./injectStoreItems-412e9ae7.js"
import{c as J}from"./chunk-c85463de.js"
import"./closest-3bdef2f3.js"
import{c as q}from"./closestTable-d46d4650.js"
import{c as F}from"./closestTr-24d1e04a.js"
import"./daAjaxSendItemsToRecipient-dde7dc10.js"
import{e as H}from"./errorDialog-f6569d61.js"
import"./indexAjaxJson-91b10960.js"
import"./cmdExport-6e99c1e8.js"
import"./getInventory-4b39d7a1.js"
import"./getInventoryById-d902b49d.js"
function R(e,t,o){const s=e.slice()
return s[7]=t[o],s}function U(e){let t,o,s,n=e[3](e[7])+""
return{c(){t=b("option"),o=j(n),t.__value=s=e[2](e[7]),t.value=t.__value},m(e,s){g(e,t,s),v(t,o)},p(e,a){1&a&&n!==(n=e[3](e[7])+"")&&x(o,n),1&a&&s!==(s=e[2](e[7]))&&(t.__value=s,t.value=t.__value)},d(e){e&&y(t)}}}function V(e){let t,o,s,n,a,r,c,i,l,f,d,m=e[0],u=[]
for(let t=0;t<m.length;t+=1)u[t]=U(R(e,m,t))
return{c(){t=b("tr"),o=b("td"),s=b("span"),s.textContent="Move selected items to:",n=_(),a=b("select")
for(let e=0;e<u.length;e+=1)u[e].c()
r=_(),c=b("span"),c.textContent=" ",i=_(),l=b("button"),l.textContent="Move",C(a,"class","customselect"),void 0===e[1]&&w(()=>e[5].call(a)),C(l,"class","custombutton"),C(l,"type","button"),C(o,"class","fshCenter")},m(m,p){g(m,t,p),v(t,o),v(o,s),v(o,n),v(o,a)
for(let e=0;e<u.length;e+=1)u[e].m(a,null)
k(a,e[1]),v(o,r),v(o,c),v(o,i),v(o,l),f||(d=[E(a,"change",e[5]),E(l,"click",e[4])],f=!0)},p(e,[t]){if(13&t){let o
for(m=e[0],o=0;o<m.length;o+=1){const s=R(e,m,o)
u[o]?u[o].p(s,t):(u[o]=U(s),u[o].c(),u[o].m(a,null))}for(;o<u.length;o+=1)u[o].d(1)
u.length=m.length}7&t&&k(a,e[1])},i:D,o:D,d(e){e&&y(t),I(u,e),f=!1,S(d)}}}function X(o,s,n){const a=N()
let r,{folders:c}=s
const i=e=>e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]
return o.$$set=e=>{"folders"in e&&n(0,c=e.folders)},[c,r,i,t=>e(t.parentNode.parentNode),function(){t("dropitems","Move to Folder"),a("move",r)},function(){r=A(this),n(1,r),n(2,i),n(0,c)}]}class Y extends u{constructor(e){super(),p(this,e,X,V,h,{folders:0})}}function z(e,t){return function(e,t){return o({cmd:"profile",subcmd:"sendtofolder",folder_id:e,folderItem:t})}(e,t)}function G(){return s('[name="removeIndex[]"]:checked')}function K(e){const t=F(e)
t.nextElementSibling.remove(),t.remove()}async function L(e,t){(await z(e,t.map(e=>e.value))).s&&t.forEach(K)}function O(e){J(30,G()).forEach(n(L,e.detail))}function P(e){M().forEach(t=>{t.checked=Boolean(e)})}let Q
const W=e=>{T(e.map(e=>e.value)).then(H).then(t=>{t.s&&e.forEach(K)})},Z=e=>{e.returnValue&&Q&&(e.preventDefault(),J(30,G()).forEach(W),t("dropitems","Destroy by AJAX"))}
function ee(){Q=!Q,l("ajaxifyDestroy",Q)}const te=[function(){const e=s('#pCC img[src$="/folder.png"]')
if(0===e.length)return
const t=F(q(e[0]))
new Y({anchor:t.nextElementSibling,props:{folders:e},target:t.parentNode}).$on("move",O)},B,function(){(()=>{const e=c('input[type="submit"]')
i(e.parentNode,"&nbsp;&nbsp;"+m("ajaxifyDestroy")),r(e.parentNode,"change",ee)})(),Q=a("ajaxifyDestroy"),r(document.forms[0],"submit",Z),window.check=P}]
function oe(){!f()&&$()&&d(te)}export default oe
//# sourceMappingURL=injectProfileDropItems-79d1d6ff.js.map
