import{V as t,e,j as s,H as n,t as o,M as r}from"./calfSystem-b136673a.js"
import{b as c}from"./batch-277d0ee9.js"
import"./dialogMsg-8ea305bd.js"
import"./doStatTotal-82bf23eb.js"
import{S as a,i,s as l,e as f,t as d,g as u,a as m,l as p,n as b,d as j,k as g,b as h,c as v,f as k,j as x,r as y,v as S,w as C,p as w,x as A}from"./injectStoreItems-ff71347d.js"
import"./closest-9ef1a6fc.js"
import{c as F}from"./closestTr-ea8b5479.js"
import"./senditems-d7b4a65c.js"
import"./daAjaxSendItemsToRecipient-9d601526.js"
import"./errorDialog-326900ed.js"
import"./indexAjaxJson-ea0d9bb9.js"
import"./cmdExport-bd5eafa5.js"
import"./guildStore-a5ab07ad.js"
import"./getInventory-3e718e5a.js"
import"./getInventoryById-bc1a2a8f.js"
import{t as I}from"./toggleForce-10d35470.js"
function $(t){let e,s,n,o
return{c(){e=f("button"),e.textContent="Check All",s=d(" "),u(e,"class","custombutton svelte-1recp8w"),u(e,"type","button")},m(r,c){m(r,e,c),m(r,s,c),n||(o=p(e,"click",t[0]),n=!0)},p:b,i:b,o:b,d(t){t&&j(e),t&&j(s),n=!1,o()}}}function E(e){const s=g()
return[function(){t("storeitems","Check All"),s("checkall")}]}class M extends a{constructor(t){super(),i(this,t,E,$,l,{})}}function N(t,e,s){const n=t.slice()
return n[6]=e[s][0],n[7]=e[s][1],n}function T(t){let e,s,n,o,r=t[7]+""
function c(...e){return t[4](t[6],...e)}return{c(){e=f("button"),s=d(r),u(e,"type","button"),u(e,"class","svelte-1gvij2s")},m(t,r){m(t,e,r),h(e,s),n||(o=p(e,"click",c),n=!0)},p(e,n){t=e,1&n&&r!==(r=t[7]+"")&&v(s,r)},d(t){t&&j(e),n=!1,o()}}}function B(t){let s,n,o,r,c,a,i,l,d=e(t[0].folders),g=[]
for(let e=0;e<d.length;e+=1)g[e]=T(N(t,d,e))
return{c(){s=f("tr"),n=f("td"),o=f("button"),o.textContent="All",r=k(),c=f("button"),c.textContent="Main",a=k()
for(let t=0;t<g.length;t+=1)g[t].c()
u(o,"type","button"),u(o,"class","svelte-1gvij2s"),u(c,"type","button"),u(c,"class","svelte-1gvij2s"),u(n,"colspan","3"),u(s,"class","fshCenter")},m(e,f){m(e,s,f),h(s,n),h(n,o),h(n,r),h(n,c),h(n,a)
for(let t=0;t<g.length;t+=1)g[t].m(n,null)
i||(l=[p(o,"click",t[2]),p(c,"click",t[3])],i=!0)},p(t,[s]){if(3&s){let o
for(d=e(t[0].folders),o=0;o<d.length;o+=1){const e=N(t,d,o)
g[o]?g[o].p(e,s):(g[o]=T(e),g[o].c(),g[o].m(n,null))}for(;o<g.length;o+=1)g[o].d(1)
g.length=d.length}},i:b,o:b,d(t){t&&j(s),x(g,t),i=!1,y(l)}}}function D(e,s,n){const o=g()
let{inv:r={folders:{}}}=s
function c(e){t("storeitems","Filter Folder"),o("filter",e)}return e.$$set=t=>{"inv"in t&&n(0,r=t.inv)},[r,c,()=>c("-2"),()=>c("-1"),t=>c(t)]}class H extends a{constructor(t){super(),i(this,t,D,B,l,{inv:0})}}function J(t,e,s){s.checked=!1
const n=F(s),o=t.items[s.value].folder_id,r=-2!==e&&e!==o
I(n,r),I(n.nextElementSibling,r)}function R(t,e){c([5,3,w(),0,o(J,t,Number(e.detail))])}function V(){A().forEach(t=>{t.checked=!t.disabled&&!t.checked})}function _(){s()&&n("enableFolderFilter")&&async function(){const t=await C()
if(!t||!t.folders)return
const e=document.forms[0]
new H({anchor:e,props:{inv:t},target:e.parentNode}).$on("filter",o(R,t))}(),function(){const t=r(document.forms[0].elements).filter(t=>"submit"===t.type)[0]
new M({anchor:t,target:t.parentNode}).$on("checkall",V)}(),S()}export default _
//# sourceMappingURL=storeitems-3067472b.js.map
