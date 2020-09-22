import{U as t,e,j as s,H as n,t as o,M as c}from"./calfSystem-ec854151.js"
import{b as r}from"./batch-2b06347e.js"
import"./dialogMsg-9241492c.js"
import"./doStatTotal-5c96ff36.js"
import{S as l,i,s as a,e as f,t as u,g as d,a as m,l as p,n as j,d as b,k as g,b as h,c as v,f as k,j as x,r as y,v as C,w as S,p as w,x as A}from"./injectStoreItems-cbf602ed.js"
import"./closest-d8e60c46.js"
import{c as F}from"./closestTr-25a90971.js"
import"./daAjaxSendItemsToRecipient-18537663.js"
import"./errorDialog-8d3200e2.js"
import"./indexAjaxJson-7630ad10.js"
import"./cmdExport-8168eb49.js"
import"./getInventory-fca9108b.js"
import"./getInventoryById-cd437dff.js"
import{t as I}from"./toggleForce-d6f8623d.js"
function $(t){let e,s,n,o
return{c(){e=f("button"),e.textContent="Check All",s=u(" "),d(e,"class","custombutton svelte-1recp8w"),d(e,"type","button")},m(c,r){m(c,e,r),m(c,s,r),n||(o=p(e,"click",t[0]),n=!0)},p:j,i:j,o:j,d(t){t&&b(e),t&&b(s),n=!1,o()}}}function E(e){const s=g()
return[function(){t("storeitems","Check All"),s("checkall")}]}class M extends l{constructor(t){super(),i(this,t,E,$,a,{})}}function N(t,e,s){const n=t.slice()
return n[6]=e[s][0],n[7]=e[s][1],n}function T(t){let e,s,n,o,c=t[7]+""
function r(...e){return t[4](t[6],...e)}return{c(){e=f("button"),s=u(c),d(e,"type","button"),d(e,"class","svelte-1gvij2s")},m(t,c){m(t,e,c),h(e,s),n||(o=p(e,"click",r),n=!0)},p(e,n){t=e,1&n&&c!==(c=t[7]+"")&&v(s,c)},d(t){t&&b(e),n=!1,o()}}}function B(t){let s,n,o,c,r,l,i,a,u=e(t[0].folders),g=[]
for(let e=0;e<u.length;e+=1)g[e]=T(N(t,u,e))
return{c(){s=f("tr"),n=f("td"),o=f("button"),o.textContent="All",c=k(),r=f("button"),r.textContent="Main",l=k()
for(let t=0;t<g.length;t+=1)g[t].c()
d(o,"type","button"),d(o,"class","svelte-1gvij2s"),d(r,"type","button"),d(r,"class","svelte-1gvij2s"),d(n,"colspan","3"),d(s,"class","fshCenter")},m(e,f){m(e,s,f),h(s,n),h(n,o),h(n,c),h(n,r),h(n,l)
for(let t=0;t<g.length;t+=1)g[t].m(n,null)
i||(a=[p(o,"click",t[2]),p(r,"click",t[3])],i=!0)},p(t,[s]){if(3&s){let o
for(u=e(t[0].folders),o=0;o<u.length;o+=1){const e=N(t,u,o)
g[o]?g[o].p(e,s):(g[o]=T(e),g[o].c(),g[o].m(n,null))}for(;o<g.length;o+=1)g[o].d(1)
g.length=u.length}},i:j,o:j,d(t){t&&b(s),x(g,t),i=!1,y(a)}}}function D(e,s,n){const o=g()
let{inv:c={folders:{}}}=s
function r(e){t("storeitems","Filter Folder"),o("filter",e)}return e.$$set=t=>{"inv"in t&&n(0,c=t.inv)},[c,r,()=>r("-2"),()=>r("-1"),t=>r(t)]}class H extends l{constructor(t){super(),i(this,t,D,B,a,{inv:0})}}function J(t,e,s){s.checked=!1
const n=F(s),o=t.items[s.value].folder_id,c=-2!==e&&e!==o
I(n,c),I(n.nextElementSibling,c)}function R(t,e){r([5,3,w(),0,o(J,t,Number(e.detail))])}function U(){A().forEach(t=>{t.checked=!t.disabled&&!t.checked})}function _(){s()&&n("enableFolderFilter")&&async function(){const t=await S()
if(!t||!t.folders)return
const e=document.forms[0]
new H({anchor:e,props:{inv:t},target:e.parentNode}).$on("filter",o(R,t))}(),function(){const t=c(document.forms[0].elements).filter(t=>"submit"===t.type)[0]
new M({anchor:t,target:t.parentNode}).$on("checkall",U)}(),C()}export default _
//# sourceMappingURL=storeitems-d6ad6069.js.map
