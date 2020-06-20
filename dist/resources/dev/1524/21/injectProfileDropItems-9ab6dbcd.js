import{B as t,V as e,w as o,D as s,t as n,G as r,f as a,M as c,C as i,i as l,Z as f,x as d,by as m}from"./calfSystem-9c7241dc.js"
import"./batch-2ee31e9e.js"
import"./isChecked-6dfc89f5.js"
import{b as u}from"./simpleCheckbox-6241d838.js"
import"./dialogMsg-b559bd6b.js"
import"./doStatTotal-db2c1a58.js"
import{S as p,i as h,s as b,e as j,t as g,a as v,b as x,c as y,d as _,f as C,g as k,h as D,l as E,n as S,j as I,r as N,k as w,m as M,o as A,p as T,q as B,u as $}from"./injectStoreItems-03c28d7a.js"
import{c as J}from"./chunk-c68a2c03.js"
import"./closest-eb66b280.js"
import{c as V}from"./closestTable-98acc63e.js"
import{c as q}from"./closestTr-5c882599.js"
import"./senditems-c0387195.js"
import"./daAjaxSendItemsToRecipient-1bf1cf0d.js"
import{e as F}from"./errorDialog-48c0f67b.js"
import"./indexAjaxJson-82fdd15d.js"
import"./cmdExport-cec76f08.js"
import"./guildStore-77f2b14b.js"
import"./getInventory-796b5632.js"
import"./getInventoryById-addb0357.js"
function G(t,e,o){const s=t.slice()
return s[7]=e[o],s}function R(t){let e,o,s,n=t[3](t[7])+""
return{c(){e=j("option"),o=g(n),e.__value=s=t[2](t[7]),e.value=e.__value},m(t,s){v(t,e,s),x(e,o)},p(t,r){1&r&&n!==(n=t[3](t[7])+"")&&y(o,n),1&r&&s!==(s=t[2](t[7]))&&(e.__value=s),e.value=e.__value},d(t){t&&_(e)}}}function X(t){let e,o,s,n,r,a,c,i,l,f,d,m=t[0],u=[]
for(let e=0;e<m.length;e+=1)u[e]=R(G(t,m,e))
return{c(){e=j("tr"),o=j("td"),s=j("span"),s.textContent="Move selected items to:",n=C(),r=j("select")
for(let t=0;t<u.length;t+=1)u[t].c()
a=C(),c=j("span"),c.textContent=" ",i=C(),l=j("button"),l.textContent="Move",k(r,"class","customselect"),void 0===t[1]&&M(()=>t[5].call(r)),k(l,"class","custombutton"),k(l,"type","button"),k(o,"class","fshCenter")},m(m,p){v(m,e,p),x(e,o),x(o,s),x(o,n),x(o,r)
for(let t=0;t<u.length;t+=1)u[t].m(r,null)
D(r,t[1]),x(o,a),x(o,c),x(o,i),x(o,l),f||(d=[E(r,"change",t[5]),E(l,"click",t[4])],f=!0)},p(t,[e]){if(13&e){let o
for(m=t[0],o=0;o<m.length;o+=1){const s=G(t,m,o)
u[o]?u[o].p(s,e):(u[o]=R(s),u[o].c(),u[o].m(r,null))}for(;o<u.length;o+=1)u[o].d(1)
u.length=m.length}7&e&&D(r,t[1])},i:S,o:S,d(t){t&&_(e),I(u,t),f=!1,N(d)}}}function Z(o,s,n){const r=w()
let a,{folders:c}=s
const i=t=>t.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]
return o.$set=t=>{"folders"in t&&n(0,c=t.folders)},[c,a,i,e=>t(e.parentNode.parentNode),function(){e("dropitems","Move to Folder"),r("move",a)},function(){a=A(this),n(1,a),n(2,i),n(0,c)}]}class z extends p{constructor(t){super(),h(this,t,Z,X,b,{folders:0})}}function H(t,e){return function(t,e){return o({cmd:"profile",subcmd:"sendtofolder",folder_id:t,folderItem:e})}(t,e)}function K(){return s('[name="removeIndex[]"]:checked')}function L(t){const e=q(t)
e.nextElementSibling.remove(),e.remove()}async function O(t,e){(await H(t,e.map(t=>t.value))).s&&e.forEach(L)}function P(t){J(30,K()).forEach(n(O,t.detail))}function Q(t){c(T()).forEach(e=>{e.checked=Boolean(t)})}let U
const W=t=>{B(t.map(t=>t.value)).then(F).then(e=>{e.s&&t.forEach(L)})},Y=t=>{t.returnValue&&U&&(t.preventDefault(),J(30,K()).forEach(W),e("profileDropitems","Destroy by AJAX"))}
function tt(){U=!U,f("ajaxifyDestroy",U)}const et=[function(){const t=s('#pCC img[src$="/folder.png"]')
if(0===t.length)return
const e=q(V(t[0]))
new z({anchor:e.nextElementSibling,props:{folders:t},target:e.parentNode}).$on("move",P)},$,function(){(()=>{const t=i('input[type="submit"]')
l(t.parentNode,"&nbsp;&nbsp;"+u("ajaxifyDestroy")),a(t.parentNode,"change",tt)})(),U=r("ajaxifyDestroy"),a(document.forms[0],"submit",Y),window.check=Q}]
export default function(){!d()&&T()&&m(et)}
//# sourceMappingURL=injectProfileDropItems-9ab6dbcd.js.map
