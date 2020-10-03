import{B as t,U as e,w as o,D as s,t as n,H as a,f as r,C as c,i,Y as l,x as f,bp as m}from"./calfSystem-a5fc99d4.js"
import"./batch-69aa6624.js"
import"./isChecked-4820f42a.js"
import{b as d}from"./simpleCheckbox-e1941c15.js"
import"./dialogMsg-b49f78a4.js"
import"./doStatTotal-a4838f62.js"
import{S as u,i as p,s as h,e as j,t as g,a as v,b,c as x,d as y,f as _,g as C,h as k,l as E,n as D,j as I,r as S,k as N,m as w,o as A,p as M,q as T,u as $,v as B}from"./injectStoreItems-3844ac94.js"
import{c as J}from"./chunk-5f9a7027.js"
import"./closest-c2515a48.js"
import{c as q}from"./closestTable-274686d1.js"
import{c as F}from"./closestTr-a52072b1.js"
import"./daAjaxSendItemsToRecipient-137bc976.js"
import{e as H}from"./errorDialog-4ea6fda9.js"
import"./indexAjaxJson-a651394e.js"
import"./cmdExport-a361aa41.js"
import"./getInventory-d4e67921.js"
import"./getInventoryById-79ecc1dc.js"
function R(t,e,o){const s=t.slice()
return s[7]=e[o],s}function U(t){let e,o,s,n=t[3](t[7])+""
return{c(){e=j("option"),o=g(n),e.__value=s=t[2](t[7]),e.value=e.__value},m(t,s){v(t,e,s),b(e,o)},p(t,a){1&a&&n!==(n=t[3](t[7])+"")&&x(o,n),1&a&&s!==(s=t[2](t[7]))&&(e.__value=s,e.value=e.__value)},d(t){t&&y(e)}}}function V(t){let e,o,s,n,a,r,c,i,l,f,m,d=t[0],u=[]
for(let e=0;e<d.length;e+=1)u[e]=U(R(t,d,e))
return{c(){e=j("tr"),o=j("td"),s=j("span"),s.textContent="Move selected items to:",n=_(),a=j("select")
for(let t=0;t<u.length;t+=1)u[t].c()
r=_(),c=j("span"),c.textContent=" ",i=_(),l=j("button"),l.textContent="Move",C(a,"class","customselect"),void 0===t[1]&&w(()=>t[5].call(a)),C(l,"class","custombutton"),C(l,"type","button"),C(o,"class","fshCenter")},m(d,p){v(d,e,p),b(e,o),b(o,s),b(o,n),b(o,a)
for(let t=0;t<u.length;t+=1)u[t].m(a,null)
k(a,t[1]),b(o,r),b(o,c),b(o,i),b(o,l),f||(m=[E(a,"change",t[5]),E(l,"click",t[4])],f=!0)},p(t,[e]){if(13&e){let o
for(d=t[0],o=0;o<d.length;o+=1){const s=R(t,d,o)
u[o]?u[o].p(s,e):(u[o]=U(s),u[o].c(),u[o].m(a,null))}for(;o<u.length;o+=1)u[o].d(1)
u.length=d.length}7&e&&k(a,t[1])},i:D,o:D,d(t){t&&y(e),I(u,t),f=!1,S(m)}}}function X(o,s,n){const a=N()
let r,{folders:c}=s
const i=t=>t.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]
return o.$$set=t=>{"folders"in t&&n(0,c=t.folders)},[c,r,i,e=>t(e.parentNode.parentNode),function(){e("dropitems","Move to Folder"),a("move",r)},function(){r=A(this),n(1,r),n(2,i),n(0,c)}]}class Y extends u{constructor(t){super(),p(this,t,X,V,h,{folders:0})}}function z(t,e){return function(t,e){return o({cmd:"profile",subcmd:"sendtofolder",folder_id:t,folderItem:e})}(t,e)}function G(){return s('[name="removeIndex[]"]:checked')}function K(t){const e=F(t)
e.nextElementSibling.remove(),e.remove()}async function L(t,e){(await z(t,e.map(t=>t.value))).s&&e.forEach(K)}function O(t){J(30,G()).forEach(n(L,t.detail))}function P(t){M().forEach(e=>{e.checked=Boolean(t)})}let Q
const W=t=>{T(t.map(t=>t.value)).then(H).then(e=>{e.s&&t.forEach(K)})},Z=t=>{t.returnValue&&Q&&(t.preventDefault(),J(30,G()).forEach(W),e("dropitems","Destroy by AJAX"))}
function tt(){Q=!Q,l("ajaxifyDestroy",Q)}const et=[function(){const t=s('#pCC img[src$="/folder.png"]')
if(0===t.length)return
const e=F(q(t[0]))
new Y({anchor:e.nextElementSibling,props:{folders:t},target:e.parentNode}).$on("move",O)},B,function(){(()=>{const t=c('input[type="submit"]')
i(t.parentNode,"&nbsp;&nbsp;"+d("ajaxifyDestroy")),r(t.parentNode,"change",tt)})(),Q=a("ajaxifyDestroy"),r(document.forms[0],"submit",Z),window.check=P}]
function ot(){!f()&&$()&&m(et)}export default ot
//# sourceMappingURL=injectProfileDropItems-a3acc9b5.js.map
