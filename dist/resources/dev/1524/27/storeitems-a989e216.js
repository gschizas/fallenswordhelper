import{W as t,e,j as s,H as n,t as o,M as r}from"./calfSystem-ec5e5725.js"
import{b as c}from"./batch-da424537.js"
import"./dialogMsg-9c8d1b20.js"
import"./doStatTotal-089574b8.js"
import{S as i,i as a,s as l,e as f,t as u,g as m,a as d,l as p,n as b,d as j,k as g,b as h,c as v,f as k,j as x,r as y,v as S,w as C,p as w,x as A}from"./injectStoreItems-6e6389c8.js"
import"./closest-79b9364e.js"
import{c as F}from"./closestTr-039240ce.js"
import"./senditems-d4d7af6f.js"
import"./daAjaxSendItemsToRecipient-91b67ba0.js"
import"./errorDialog-7f9c11b0.js"
import"./indexAjaxJson-b7f888c6.js"
import"./cmdExport-2a00007a.js"
import"./guildStore-1c101a49.js"
import"./getInventory-e3d9aaa4.js"
import"./getInventoryById-a3024f06.js"
import{t as I}from"./toggleForce-7e736fc3.js"
function $(t){let e,s,n,o
return{c(){e=f("button"),e.textContent="Check All",s=u(" "),m(e,"class","custombutton svelte-1recp8w"),m(e,"type","button")},m(r,c){d(r,e,c),d(r,s,c),n||(o=p(e,"click",t[0]),n=!0)},p:b,i:b,o:b,d(t){t&&j(e),t&&j(s),n=!1,o()}}}function E(e){const s=g()
return[function(){t("storeitems","Check All"),s("checkall")}]}class M extends i{constructor(t){super(),a(this,t,E,$,l,{})}}function N(t,e,s){const n=t.slice()
return n[6]=e[s][0],n[7]=e[s][1],n}function T(t){let e,s,n,o,r=t[7]+""
function c(...e){return t[4](t[6],...e)}return{c(){e=f("button"),s=u(r),m(e,"type","button"),m(e,"class","svelte-1gvij2s")},m(t,r){d(t,e,r),h(e,s),n||(o=p(e,"click",c),n=!0)},p(e,n){t=e,1&n&&r!==(r=t[7]+"")&&v(s,r)},d(t){t&&j(e),n=!1,o()}}}function B(t){let s,n,o,r,c,i,a,l,u=e(t[0].folders),g=[]
for(let e=0;e<u.length;e+=1)g[e]=T(N(t,u,e))
return{c(){s=f("tr"),n=f("td"),o=f("button"),o.textContent="All",r=k(),c=f("button"),c.textContent="Main",i=k()
for(let t=0;t<g.length;t+=1)g[t].c()
m(o,"type","button"),m(o,"class","svelte-1gvij2s"),m(c,"type","button"),m(c,"class","svelte-1gvij2s"),m(n,"colspan","3"),m(s,"class","fshCenter")},m(e,f){d(e,s,f),h(s,n),h(n,o),h(n,r),h(n,c),h(n,i)
for(let t=0;t<g.length;t+=1)g[t].m(n,null)
a||(l=[p(o,"click",t[2]),p(c,"click",t[3])],a=!0)},p(t,[s]){if(3&s){let o
for(u=e(t[0].folders),o=0;o<u.length;o+=1){const e=N(t,u,o)
g[o]?g[o].p(e,s):(g[o]=T(e),g[o].c(),g[o].m(n,null))}for(;o<g.length;o+=1)g[o].d(1)
g.length=u.length}},i:b,o:b,d(t){t&&j(s),x(g,t),a=!1,y(l)}}}function D(e,s,n){const o=g()
let{inv:r={folders:{}}}=s
function c(e){t("storeitems","Filter Folder"),o("filter",e)}return e.$$set=t=>{"inv"in t&&n(0,r=t.inv)},[r,c,()=>c("-2"),()=>c("-1"),t=>c(t)]}class H extends i{constructor(t){super(),a(this,t,D,B,l,{inv:0})}}function J(t,e,s){s.checked=!1
const n=F(s),o=t.items[s.value].folder_id,r=-2!==e&&e!==o
I(n,r),I(n.nextElementSibling,r)}function R(t,e){c([5,3,w(),0,o(J,t,Number(e.detail))])}function W(){A().forEach(t=>{t.checked=!t.disabled&&!t.checked})}function _(){s()&&n("enableFolderFilter")&&async function(){const t=await C()
if(!t||!t.folders)return
const e=document.forms[0]
new H({anchor:e,props:{inv:t},target:e.parentNode}).$on("filter",o(R,t))}(),function(){const t=r(document.forms[0].elements).filter(t=>"submit"===t.type)[0]
new M({anchor:t,target:t.parentNode}).$on("checkall",W)}(),S()}export default _
//# sourceMappingURL=storeitems-a989e216.js.map
