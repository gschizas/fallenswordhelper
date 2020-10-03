import{U as t,e,j as s,H as n,t as o,M as c}from"./calfSystem-a5fc99d4.js"
import{b as r}from"./batch-69aa6624.js"
import"./dialogMsg-b49f78a4.js"
import"./doStatTotal-a4838f62.js"
import{S as a,i as l,s as i,e as f,t as u,g as m,a as d,l as p,n as j,d as g,k as h,b,c as v,f as k,j as x,r as y,v as C,w as S,p as w,x as A}from"./injectStoreItems-3844ac94.js"
import"./closest-c2515a48.js"
import{c as F}from"./closestTr-a52072b1.js"
import"./daAjaxSendItemsToRecipient-137bc976.js"
import"./errorDialog-4ea6fda9.js"
import"./indexAjaxJson-a651394e.js"
import"./cmdExport-a361aa41.js"
import"./getInventory-d4e67921.js"
import"./getInventoryById-79ecc1dc.js"
import{t as I}from"./toggleForce-a095aa43.js"
function $(t){let e,s,n,o
return{c(){e=f("button"),e.textContent="Check All",s=u(" "),m(e,"class","custombutton svelte-1recp8w"),m(e,"type","button")},m(c,r){d(c,e,r),d(c,s,r),n||(o=p(e,"click",t[0]),n=!0)},p:j,i:j,o:j,d(t){t&&g(e),t&&g(s),n=!1,o()}}}function E(e){const s=h()
return[function(){t("storeitems","Check All"),s("checkall")}]}class M extends a{constructor(t){super(),l(this,t,E,$,i,{})}}function N(t,e,s){const n=t.slice()
return n[6]=e[s][0],n[7]=e[s][1],n}function T(t){let e,s,n,o,c=t[7]+""
function r(...e){return t[4](t[6],...e)}return{c(){e=f("button"),s=u(c),m(e,"type","button"),m(e,"class","svelte-1gvij2s")},m(t,c){d(t,e,c),b(e,s),n||(o=p(e,"click",r),n=!0)},p(e,n){t=e,1&n&&c!==(c=t[7]+"")&&v(s,c)},d(t){t&&g(e),n=!1,o()}}}function B(t){let s,n,o,c,r,a,l,i,u=e(t[0].folders),h=[]
for(let e=0;e<u.length;e+=1)h[e]=T(N(t,u,e))
return{c(){s=f("tr"),n=f("td"),o=f("button"),o.textContent="All",c=k(),r=f("button"),r.textContent="Main",a=k()
for(let t=0;t<h.length;t+=1)h[t].c()
m(o,"type","button"),m(o,"class","svelte-1gvij2s"),m(r,"type","button"),m(r,"class","svelte-1gvij2s"),m(n,"colspan","3"),m(s,"class","fshCenter")},m(e,f){d(e,s,f),b(s,n),b(n,o),b(n,c),b(n,r),b(n,a)
for(let t=0;t<h.length;t+=1)h[t].m(n,null)
l||(i=[p(o,"click",t[2]),p(r,"click",t[3])],l=!0)},p(t,[s]){if(3&s){let o
for(u=e(t[0].folders),o=0;o<u.length;o+=1){const e=N(t,u,o)
h[o]?h[o].p(e,s):(h[o]=T(e),h[o].c(),h[o].m(n,null))}for(;o<h.length;o+=1)h[o].d(1)
h.length=u.length}},i:j,o:j,d(t){t&&g(s),x(h,t),l=!1,y(i)}}}function D(e,s,n){const o=h()
let{inv:c={folders:{}}}=s
function r(e){t("storeitems","Filter Folder"),o("filter",e)}return e.$$set=t=>{"inv"in t&&n(0,c=t.inv)},[c,r,()=>r("-2"),()=>r("-1"),t=>r(t)]}class H extends a{constructor(t){super(),l(this,t,D,B,i,{inv:0})}}function J(t,e,s){s.checked=!1
const n=F(s),o=t.items[s.value].folder_id,c=-2!==e&&e!==o
I(n,c),I(n.nextElementSibling,c)}function R(t,e){r([5,3,w(),0,o(J,t,Number(e.detail))])}function U(){A().forEach(t=>{t.checked=!t.disabled&&!t.checked})}function _(){s()&&n("enableFolderFilter")&&async function(){const t=await S()
if(!t||!t.folders)return
const e=document.forms[0]
new H({anchor:e,props:{inv:t},target:e.parentNode}).$on("filter",o(R,t))}(),function(){const t=c(document.forms[0].elements).filter(t=>"submit"===t.type)[0]
new M({anchor:t,target:t.parentNode}).$on("checkall",U)}(),C()}export default _
//# sourceMappingURL=storeitems-d48fbc6a.js.map
