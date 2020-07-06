import{U as t,e,j as s,G as n,t as o,M as r}from"./calfSystem-019de1cf.js"
import{b as c}from"./batch-7b1ea568.js"
import"./dialogMsg-16e7e1c1.js"
import"./doStatTotal-928129d1.js"
import{S as a,i as l,s as i,e as f,t as u,g as d,a as m,l as p,n as b,d as j,k as g,b as h,c as v,f as k,j as x,r as y,u as C,v as S,p as w,w as A}from"./injectStoreItems-ea58ba02.js"
import"./closest-5107b89a.js"
import{c as F}from"./closestTr-ad14f34f.js"
import"./daAjaxSendItemsToRecipient-4ab64a35.js"
import"./errorDialog-7f431a39.js"
import"./indexAjaxJson-d1b1f9ac.js"
import"./cmdExport-ca1fffed.js"
import"./getInventory-37797909.js"
import"./getInventoryById-7c7b7be2.js"
import{t as I}from"./toggleForce-7d757ba6.js"
function E(t){let e,s,n,o
return{c(){e=f("button"),e.textContent="Check All",s=u(" "),d(e,"class","custombutton svelte-1recp8w"),d(e,"type","button")},m(r,c){m(r,e,c),m(r,s,c),n||(o=p(e,"click",t[0]),n=!0)},p:b,i:b,o:b,d(t){t&&j(e),t&&j(s),n=!1,o()}}}function M(e){const s=g()
return[function(){t("storeitems","Check All"),s("checkall")}]}class N extends a{constructor(t){super(),l(this,t,M,E,i,{})}}function T(t,e,s){const n=t.slice()
return n[6]=e[s][0],n[7]=e[s][1],n}function $(t){let e,s,n,o,r=t[7]+""
function c(...e){return t[4](t[6],...e)}return{c(){e=f("button"),s=u(r),d(e,"type","button"),d(e,"class","svelte-1gvij2s")},m(t,r){m(t,e,r),h(e,s),n||(o=p(e,"click",c),n=!0)},p(e,n){t=e,1&n&&r!==(r=t[7]+"")&&v(s,r)},d(t){t&&j(e),n=!1,o()}}}function B(t){let s,n,o,r,c,a,l,i,u=e(t[0].folders),g=[]
for(let e=0;e<u.length;e+=1)g[e]=$(T(t,u,e))
return{c(){s=f("tr"),n=f("td"),o=f("button"),o.textContent="All",r=k(),c=f("button"),c.textContent="Main",a=k()
for(let t=0;t<g.length;t+=1)g[t].c()
d(o,"type","button"),d(o,"class","svelte-1gvij2s"),d(c,"type","button"),d(c,"class","svelte-1gvij2s"),d(n,"colspan","3"),d(s,"class","fshCenter")},m(e,f){m(e,s,f),h(s,n),h(n,o),h(n,r),h(n,c),h(n,a)
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
//# sourceMappingURL=storeitems-311ec511.js.map
