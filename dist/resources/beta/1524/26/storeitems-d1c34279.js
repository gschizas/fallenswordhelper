import{U as t,e,j as s,H as n,t as o,M as c}from"./calfSystem-cf4d22a7.js"
import{b as r}from"./batch-952c9055.js"
import"./dialogMsg-b49f78a4.js"
import"./doStatTotal-d19b95c3.js"
import{S as a,i as l,s as i,e as f,t as u,g as d,a as m,l as p,n as j,d as b,k as g,b as h,c as v,f as k,j as x,r as y,v as C,w as S,p as w,x as A}from"./injectStoreItems-90c7a909.js"
import"./closest-c2515a48.js"
import{c as F}from"./closestTr-c0ecc50a.js"
import"./daAjaxSendItemsToRecipient-b0832c6e.js"
import"./errorDialog-4ea6fda9.js"
import"./indexAjaxJson-451a313a.js"
import"./cmdExport-b7dc8f76.js"
import"./getInventory-8dedf4fe.js"
import"./getInventoryById-c7da90ec.js"
import{t as I}from"./toggleForce-a095aa43.js"
function $(t){let e,s,n,o
return{c(){e=f("button"),e.textContent="Check All",s=u(" "),d(e,"class","custombutton svelte-1recp8w"),d(e,"type","button")},m(c,r){m(c,e,r),m(c,s,r),n||(o=p(e,"click",t[0]),n=!0)},p:j,i:j,o:j,d(t){t&&b(e),t&&b(s),n=!1,o()}}}function E(e){const s=g()
return[function(){t("storeitems","Check All"),s("checkall")}]}class M extends a{constructor(t){super(),l(this,t,E,$,i,{})}}function N(t,e,s){const n=t.slice()
return n[6]=e[s][0],n[7]=e[s][1],n}function T(t){let e,s,n,o,c=t[7]+""
function r(...e){return t[4](t[6],...e)}return{c(){e=f("button"),s=u(c),d(e,"type","button"),d(e,"class","svelte-1gvij2s")},m(t,c){m(t,e,c),h(e,s),n||(o=p(e,"click",r),n=!0)},p(e,n){t=e,1&n&&c!==(c=t[7]+"")&&v(s,c)},d(t){t&&b(e),n=!1,o()}}}function B(t){let s,n,o,c,r,a,l,i,u=e(t[0].folders),g=[]
for(let e=0;e<u.length;e+=1)g[e]=T(N(t,u,e))
return{c(){s=f("tr"),n=f("td"),o=f("button"),o.textContent="All",c=k(),r=f("button"),r.textContent="Main",a=k()
for(let t=0;t<g.length;t+=1)g[t].c()
d(o,"type","button"),d(o,"class","svelte-1gvij2s"),d(r,"type","button"),d(r,"class","svelte-1gvij2s"),d(n,"colspan","3"),d(s,"class","fshCenter")},m(e,f){m(e,s,f),h(s,n),h(n,o),h(n,c),h(n,r),h(n,a)
for(let t=0;t<g.length;t+=1)g[t].m(n,null)
l||(i=[p(o,"click",t[2]),p(r,"click",t[3])],l=!0)},p(t,[s]){if(3&s){let o
for(u=e(t[0].folders),o=0;o<u.length;o+=1){const e=N(t,u,o)
g[o]?g[o].p(e,s):(g[o]=T(e),g[o].c(),g[o].m(n,null))}for(;o<g.length;o+=1)g[o].d(1)
g.length=u.length}},i:j,o:j,d(t){t&&b(s),x(g,t),l=!1,y(i)}}}function D(e,s,n){const o=g()
let{inv:c={folders:{}}}=s
function r(e){t("storeitems","Filter Folder"),o("filter",e)}return e.$$set=t=>{"inv"in t&&n(0,c=t.inv)},[c,r,()=>r("-2"),()=>r("-1"),t=>r(t)]}class H extends a{constructor(t){super(),l(this,t,D,B,i,{inv:0})}}function J(t,e,s){s.checked=!1
const n=F(s),o=t.items[s.value].folder_id,c=-2!==e&&e!==o
I(n,c),I(n.nextElementSibling,c)}function R(t,e){r([5,3,w(),0,o(J,t,Number(e.detail))])}function U(){A().forEach(t=>{t.checked=!t.disabled&&!t.checked})}function _(){s()&&n("enableFolderFilter")&&async function(){const t=await S()
if(!t||!t.folders)return
const e=document.forms[0]
new H({anchor:e,props:{inv:t},target:e.parentNode}).$on("filter",o(R,t))}(),function(){const t=c(document.forms[0].elements).filter(t=>"submit"===t.type)[0]
new M({anchor:t,target:t.parentNode}).$on("checkall",U)}(),C()}export default _
//# sourceMappingURL=storeitems-d1c34279.js.map
