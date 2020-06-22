import{B as t,U as e,w as o,D as s,t as n,G as a,f as r,M as c,C as i,i as l,Y as f,x as m,bw as u}from"./calfSystem-1b876afa.js"
import"./batch-df466c20.js"
import"./isChecked-a8ba6bb9.js"
import{b as p}from"./simpleCheckbox-3997639f.js"
import"./dialogMsg-e85a09f8.js"
import"./doStatTotal-d1242778.js"
import{S as d,i as h,s as b,e as j,t as g,a as v,b as x,c as y,d as _,f as C,g as k,h as D,l as E,n as I,j as S,r as w,k as N,m as M,o as A,p as T,q as B,u as $}from"./injectStoreItems-05a9fe45.js"
import{c as J}from"./chunk-c17f6876.js"
import"./closest-f51e0443.js"
import{c as q}from"./closestTable-e4ca5f26.js"
import{c as F}from"./closestTr-21ae2865.js"
import"./daAjaxSendItemsToRecipient-6e7a28ab.js"
import{e as G}from"./errorDialog-6c21b95b.js"
import"./indexAjaxJson-1a78cb06.js"
import"./cmdExport-f01a6b63.js"
import"./getInventory-19bbf690.js"
import"./getInventoryById-b28970a8.js"
function R(t,e,o){const s=t.slice()
return s[7]=e[o],s}function U(t){let e,o,s,n=t[3](t[7])+""
return{c(){e=j("option"),o=g(n),e.__value=s=t[2](t[7]),e.value=e.__value},m(t,s){v(t,e,s),x(e,o)},p(t,a){1&a&&n!==(n=t[3](t[7])+"")&&y(o,n),1&a&&s!==(s=t[2](t[7]))&&(e.__value=s),e.value=e.__value},d(t){t&&_(e)}}}function V(t){let e,o,s,n,a,r,c,i,l,f,m,u=t[0],p=[]
for(let e=0;e<u.length;e+=1)p[e]=U(R(t,u,e))
return{c(){e=j("tr"),o=j("td"),s=j("span"),s.textContent="Move selected items to:",n=C(),a=j("select")
for(let t=0;t<p.length;t+=1)p[t].c()
r=C(),c=j("span"),c.textContent=" ",i=C(),l=j("button"),l.textContent="Move",k(a,"class","customselect"),void 0===t[1]&&M(()=>t[5].call(a)),k(l,"class","custombutton"),k(l,"type","button"),k(o,"class","fshCenter")},m(u,d){v(u,e,d),x(e,o),x(o,s),x(o,n),x(o,a)
for(let t=0;t<p.length;t+=1)p[t].m(a,null)
D(a,t[1]),x(o,r),x(o,c),x(o,i),x(o,l),f||(m=[E(a,"change",t[5]),E(l,"click",t[4])],f=!0)},p(t,[e]){if(13&e){let o
for(u=t[0],o=0;o<u.length;o+=1){const s=R(t,u,o)
p[o]?p[o].p(s,e):(p[o]=U(s),p[o].c(),p[o].m(a,null))}for(;o<p.length;o+=1)p[o].d(1)
p.length=u.length}7&e&&D(a,t[1])},i:I,o:I,d(t){t&&_(e),S(p,t),f=!1,w(m)}}}function X(o,s,n){const a=N()
let r,{folders:c}=s
const i=t=>t.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]
return o.$set=t=>{"folders"in t&&n(0,c=t.folders)},[c,r,i,e=>t(e.parentNode.parentNode),function(){e("dropitems","Move to Folder"),a("move",r)},function(){r=A(this),n(1,r),n(2,i),n(0,c)}]}class Y extends d{constructor(t){super(),h(this,t,X,V,b,{folders:0})}}function z(t,e){return function(t,e){return o({cmd:"profile",subcmd:"sendtofolder",folder_id:t,folderItem:e})}(t,e)}function H(){return s('[name="removeIndex[]"]:checked')}function K(t){const e=F(t)
e.nextElementSibling.remove(),e.remove()}async function L(t,e){(await z(t,e.map(t=>t.value))).s&&e.forEach(K)}function O(t){J(30,H()).forEach(n(L,t.detail))}function P(t){c(T()).forEach(e=>{e.checked=Boolean(t)})}let Q
const W=t=>{B(t.map(t=>t.value)).then(G).then(e=>{e.s&&t.forEach(K)})},Z=t=>{t.returnValue&&Q&&(t.preventDefault(),J(30,H()).forEach(W),e("profileDropitems","Destroy by AJAX"))}
function tt(){Q=!Q,f("ajaxifyDestroy",Q)}const et=[function(){const t=s('#pCC img[src$="/folder.png"]')
if(0===t.length)return
const e=F(q(t[0]))
new Y({anchor:e.nextElementSibling,props:{folders:t},target:e.parentNode}).$on("move",O)},$,function(){(()=>{const t=i('input[type="submit"]')
l(t.parentNode,"&nbsp;&nbsp;"+p("ajaxifyDestroy")),r(t.parentNode,"change",tt)})(),Q=a("ajaxifyDestroy"),r(document.forms[0],"submit",Z),window.check=P}]
export default function(){!m()&&T()&&u(et)}
//# sourceMappingURL=injectProfileDropItems-4a79941c.js.map
