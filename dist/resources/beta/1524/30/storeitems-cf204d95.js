import{U as t,e,j as s,H as n,t as o,M as c}from"./calfSystem-ebf4b17d.js"
import{b as r}from"./batch-3642a7ff.js"
import"./dialogMsg-27e2dc98.js"
import"./doStatTotal-4d2c7207.js"
import{S as l,i,s as a,e as f,t as d,g as u,a as m,l as p,n as b,d as j,k as g,b as h,c as v,f as k,j as x,r as y,v as C,w as S,p as w,x as A}from"./injectStoreItems-412e9ae7.js"
import"./closest-3bdef2f3.js"
import{c as F}from"./closestTr-24d1e04a.js"
import"./daAjaxSendItemsToRecipient-dde7dc10.js"
import"./errorDialog-f6569d61.js"
import"./indexAjaxJson-91b10960.js"
import"./cmdExport-6e99c1e8.js"
import"./getInventory-4b39d7a1.js"
import"./getInventoryById-d902b49d.js"
import{t as I}from"./toggleForce-c034bc71.js"
function $(t){let e,s,n,o
return{c(){e=f("button"),e.textContent="Check All",s=d(" "),u(e,"class","custombutton svelte-1recp8w"),u(e,"type","button")},m(c,r){m(c,e,r),m(c,s,r),n||(o=p(e,"click",t[0]),n=!0)},p:b,i:b,o:b,d(t){t&&j(e),t&&j(s),n=!1,o()}}}function E(e){const s=g()
return[function(){t("storeitems","Check All"),s("checkall")}]}class M extends l{constructor(t){super(),i(this,t,E,$,a,{})}}function N(t,e,s){const n=t.slice()
return n[6]=e[s][0],n[7]=e[s][1],n}function T(t){let e,s,n,o,c=t[7]+""
function r(){return t[4](t[6])}return{c(){e=f("button"),s=d(c),u(e,"type","button"),u(e,"class","svelte-1gvij2s")},m(t,c){m(t,e,c),h(e,s),n||(o=p(e,"click",r),n=!0)},p(e,n){t=e,1&n&&c!==(c=t[7]+"")&&v(s,c)},d(t){t&&j(e),n=!1,o()}}}function B(t){let s,n,o,c,r,l,i,a,d=e(t[0].folders),g=[]
for(let e=0;e<d.length;e+=1)g[e]=T(N(t,d,e))
return{c(){s=f("tr"),n=f("td"),o=f("button"),o.textContent="All",c=k(),r=f("button"),r.textContent="Main",l=k()
for(let t=0;t<g.length;t+=1)g[t].c()
u(o,"type","button"),u(o,"class","svelte-1gvij2s"),u(r,"type","button"),u(r,"class","svelte-1gvij2s"),u(n,"colspan","3"),u(s,"class","fshCenter")},m(e,f){m(e,s,f),h(s,n),h(n,o),h(n,c),h(n,r),h(n,l)
for(let t=0;t<g.length;t+=1)g[t].m(n,null)
i||(a=[p(o,"click",t[2]),p(r,"click",t[3])],i=!0)},p(t,[s]){if(3&s){let o
for(d=e(t[0].folders),o=0;o<d.length;o+=1){const e=N(t,d,o)
g[o]?g[o].p(e,s):(g[o]=T(e),g[o].c(),g[o].m(n,null))}for(;o<g.length;o+=1)g[o].d(1)
g.length=d.length}},i:b,o:b,d(t){t&&j(s),x(g,t),i=!1,y(a)}}}function D(e,s,n){const o=g()
let{inv:c={folders:{}}}=s
function r(e){t("storeitems","Filter Folder"),o("filter",e)}return e.$$set=t=>{"inv"in t&&n(0,c=t.inv)},[c,r,()=>r("-2"),()=>r("-1"),t=>r(t)]}class H extends l{constructor(t){super(),i(this,t,D,B,a,{inv:0})}}function J(t,e,s){s.checked=!1
const n=F(s),o=t.items[s.value].folder_id,c=-2!==e&&e!==o
I(n,c),I(n.nextElementSibling,c)}function R(t,e){r([5,3,w(),0,o(J,t,Number(e.detail))])}function U(){A().forEach(t=>{t.checked=!t.disabled&&!t.checked})}function _(){s()&&n("enableFolderFilter")&&async function(){const t=await S()
if(!t||!t.folders)return
const e=document.forms[0]
new H({anchor:e,props:{inv:t},target:e.parentNode}).$on("filter",o(R,t))}(),function(){const t=c(document.forms[0].elements).filter(t=>"submit"===t.type)[0]
new M({anchor:t,target:t.parentNode}).$on("checkall",U)}(),C()}export default _
//# sourceMappingURL=storeitems-cf204d95.js.map
