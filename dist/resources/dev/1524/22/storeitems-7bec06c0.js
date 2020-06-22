import{V as t,e,j as s,G as n,t as o,M as r}from"./calfSystem-4cc738f8.js"
import{b as c}from"./batch-b1efab68.js"
import"./dialogMsg-d224def3.js"
import"./doStatTotal-1b23cdfd.js"
import{S as i,i as l,s as a,e as f,t as u,g as d,a as m,l as p,n as b,d as j,k as g,b as h,c as v,f as k,j as x,r as y,u as S,v as C,p as w,w as A}from"./injectStoreItems-991d7f42.js"
import"./closest-b21303d7.js"
import{c as F}from"./closestTr-13a40903.js"
import"./senditems-7aa127ff.js"
import"./daAjaxSendItemsToRecipient-33f16d9c.js"
import"./errorDialog-18ea8eb8.js"
import"./indexAjaxJson-39fb942e.js"
import"./cmdExport-3370ea6e.js"
import"./guildStore-36c52711.js"
import"./getInventory-8dd8007d.js"
import"./getInventoryById-068bca44.js"
import{t as I}from"./toggleForce-521f5f12.js"
function E(t){let e,s,n,o
return{c(){e=f("button"),e.textContent="Check All",s=u(" "),d(e,"class","custombutton svelte-1recp8w"),d(e,"type","button")},m(r,c){m(r,e,c),m(r,s,c),n||(o=p(e,"click",t[0]),n=!0)},p:b,i:b,o:b,d(t){t&&j(e),t&&j(s),n=!1,o()}}}function M(e){const s=g()
return[function(){t("storeitems","Check All"),s("checkall")}]}class N extends i{constructor(t){super(),l(this,t,M,E,a,{})}}function T(t,e,s){const n=t.slice()
return n[6]=e[s][0],n[7]=e[s][1],n}function $(t){let e,s,n,o,r=t[7]+""
function c(...e){return t[4](t[6],...e)}return{c(){e=f("button"),s=u(r),d(e,"type","button"),d(e,"class","svelte-1gvij2s")},m(t,r){m(t,e,r),h(e,s),n||(o=p(e,"click",c),n=!0)},p(e,n){t=e,1&n&&r!==(r=t[7]+"")&&v(s,r)},d(t){t&&j(e),n=!1,o()}}}function B(t){let s,n,o,r,c,i,l,a,u=e(t[0].folders),g=[]
for(let e=0;e<u.length;e+=1)g[e]=$(T(t,u,e))
return{c(){s=f("tr"),n=f("td"),o=f("button"),o.textContent="All",r=k(),c=f("button"),c.textContent="Main",i=k()
for(let t=0;t<g.length;t+=1)g[t].c()
d(o,"type","button"),d(o,"class","svelte-1gvij2s"),d(c,"type","button"),d(c,"class","svelte-1gvij2s"),d(n,"colspan","3"),d(s,"class","fshCenter")},m(e,f){m(e,s,f),h(s,n),h(n,o),h(n,r),h(n,c),h(n,i)
for(let t=0;t<g.length;t+=1)g[t].m(n,null)
l||(a=[p(o,"click",t[2]),p(c,"click",t[3])],l=!0)},p(t,[s]){if(3&s){let o
for(u=e(t[0].folders),o=0;o<u.length;o+=1){const e=T(t,u,o)
g[o]?g[o].p(e,s):(g[o]=$(e),g[o].c(),g[o].m(n,null))}for(;o<g.length;o+=1)g[o].d(1)
g.length=u.length}},i:b,o:b,d(t){t&&j(s),x(g,t),l=!1,y(a)}}}function D(e,s,n){const o=g()
let{inv:r={folders:{}}}=s
function c(e){t("storeitems","Filter Folder"),o("filter",e)}return e.$set=t=>{"inv"in t&&n(0,r=t.inv)},[r,c,()=>c("-2"),()=>c("-1"),t=>c(t)]}class G extends i{constructor(t){super(),l(this,t,D,B,a,{inv:0})}}function J(t,e,s){s.checked=!1
const n=F(s),o=t.items[s.value].folder_id,r=-2!==e&&e!==o
I(n,r),I(n.nextElementSibling,r)}function R(t,e){c([5,3,w(),0,o(J,t,Number(e.detail))])}function V(){A().forEach(t=>{t.checked=!t.disabled&&!t.checked})}export default function(){s()&&n("enableFolderFilter")&&async function(){const t=await C()
if(!t||!t.folders)return
const e=document.forms[0]
new G({anchor:e,props:{inv:t},target:e.parentNode}).$on("filter",o(R,t))}(),function(){const t=r(document.forms[0].elements).filter(t=>"submit"===t.type)[0]
new N({anchor:t,target:t.parentNode}).$on("checkall",V)}(),S()}
//# sourceMappingURL=storeitems-7bec06c0.js.map
