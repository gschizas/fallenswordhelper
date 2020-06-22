import{U as t,e,j as s,G as n,t as o,M as r}from"./calfSystem-1b876afa.js"
import{b as c}from"./batch-df466c20.js"
import"./dialogMsg-e85a09f8.js"
import"./doStatTotal-d1242778.js"
import{S as a,i as l,s as i,e as f,t as u,g as m,a as d,l as p,n as b,d as j,k as g,b as h,c as v,f as k,j as x,r as y,u as C,v as S,p as w,w as A}from"./injectStoreItems-05a9fe45.js"
import"./closest-f51e0443.js"
import{c as F}from"./closestTr-21ae2865.js"
import"./daAjaxSendItemsToRecipient-6e7a28ab.js"
import"./errorDialog-6c21b95b.js"
import"./indexAjaxJson-1a78cb06.js"
import"./cmdExport-f01a6b63.js"
import"./getInventory-19bbf690.js"
import"./getInventoryById-b28970a8.js"
import{t as I}from"./toggleForce-0be28b41.js"
function E(t){let e,s,n,o
return{c(){e=f("button"),e.textContent="Check All",s=u(" "),m(e,"class","custombutton svelte-1recp8w"),m(e,"type","button")},m(r,c){d(r,e,c),d(r,s,c),n||(o=p(e,"click",t[0]),n=!0)},p:b,i:b,o:b,d(t){t&&j(e),t&&j(s),n=!1,o()}}}function M(e){const s=g()
return[function(){t("storeitems","Check All"),s("checkall")}]}class N extends a{constructor(t){super(),l(this,t,M,E,i,{})}}function T(t,e,s){const n=t.slice()
return n[6]=e[s][0],n[7]=e[s][1],n}function $(t){let e,s,n,o,r=t[7]+""
function c(...e){return t[4](t[6],...e)}return{c(){e=f("button"),s=u(r),m(e,"type","button"),m(e,"class","svelte-1gvij2s")},m(t,r){d(t,e,r),h(e,s),n||(o=p(e,"click",c),n=!0)},p(e,n){t=e,1&n&&r!==(r=t[7]+"")&&v(s,r)},d(t){t&&j(e),n=!1,o()}}}function B(t){let s,n,o,r,c,a,l,i,u=e(t[0].folders),g=[]
for(let e=0;e<u.length;e+=1)g[e]=$(T(t,u,e))
return{c(){s=f("tr"),n=f("td"),o=f("button"),o.textContent="All",r=k(),c=f("button"),c.textContent="Main",a=k()
for(let t=0;t<g.length;t+=1)g[t].c()
m(o,"type","button"),m(o,"class","svelte-1gvij2s"),m(c,"type","button"),m(c,"class","svelte-1gvij2s"),m(n,"colspan","3"),m(s,"class","fshCenter")},m(e,f){d(e,s,f),h(s,n),h(n,o),h(n,r),h(n,c),h(n,a)
for(let t=0;t<g.length;t+=1)g[t].m(n,null)
l||(i=[p(o,"click",t[2]),p(c,"click",t[3])],l=!0)},p(t,[s]){if(3&s){let o
for(u=e(t[0].folders),o=0;o<u.length;o+=1){const e=T(t,u,o)
g[o]?g[o].p(e,s):(g[o]=$(e),g[o].c(),g[o].m(n,null))}for(;o<g.length;o+=1)g[o].d(1)
g.length=u.length}},i:b,o:b,d(t){t&&j(s),x(g,t),l=!1,y(i)}}}function D(e,s,n){const o=g()
let{inv:r={folders:{}}}=s
function c(e){t("storeitems","Filter Folder"),o("filter",e)}return e.$set=t=>{"inv"in t&&n(0,r=t.inv)},[r,c,()=>c("-2"),()=>c("-1"),t=>c(t)]}class G extends a{constructor(t){super(),l(this,t,D,B,i,{inv:0})}}function J(t,e,s){s.checked=!1
const n=F(s),o=t.items[s.value].folder_id,r=-2!==e&&e!==o
I(n,r),I(n.nextElementSibling,r)}function R(t,e){c([5,3,w(),0,o(J,t,Number(e.detail))])}function U(){A().forEach(t=>{t.checked=!t.disabled&&!t.checked})}export default function(){s()&&n("enableFolderFilter")&&async function(){const t=await S()
if(!t||!t.folders)return
const e=document.forms[0]
new G({anchor:e,props:{inv:t},target:e.parentNode}).$on("filter",o(R,t))}(),function(){const t=r(document.forms[0].elements).filter(t=>"submit"===t.type)[0]
new N({anchor:t,target:t.parentNode}).$on("checkall",U)}(),C()}
//# sourceMappingURL=storeitems-ec064eed.js.map
