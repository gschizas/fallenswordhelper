import{V as t,e,j as s,G as n,t as o,M as c,l as r}from"./calfSystem-9c7241dc.js"
import{b as i}from"./batch-2ee31e9e.js"
import"./dialogMsg-b559bd6b.js"
import"./doStatTotal-db2c1a58.js"
import{S as l,i as a,s as f,e as d,t as u,g as m,a as p,l as b,n as j,d as g,k as h,b as v,c as k,f as x,j as y,r as S,u as C,v as A,p as F}from"./injectStoreItems-03c28d7a.js"
import"./closest-eb66b280.js"
import{c as I}from"./closestTr-5c882599.js"
import"./senditems-c0387195.js"
import"./daAjaxSendItemsToRecipient-1bf1cf0d.js"
import"./errorDialog-48c0f67b.js"
import"./indexAjaxJson-82fdd15d.js"
import"./cmdExport-cec76f08.js"
import"./guildStore-77f2b14b.js"
import"./getInventory-796b5632.js"
import"./getInventoryById-addb0357.js"
import{t as w}from"./toggleForce-5f56c364.js"
function E(t){let e,s,n,o
return{c(){e=d("button"),e.textContent="Check All",s=u(" "),m(e,"class","custombutton svelte-1recp8w"),m(e,"type","button")},m(c,r){p(c,e,r),p(c,s,r),n||(o=b(e,"click",t[0]),n=!0)},p:j,i:j,o:j,d(t){t&&g(e),t&&g(s),n=!1,o()}}}function M(e){const s=h()
return[function(){t("storeitems","Check All"),s("checkall")}]}class N extends l{constructor(t){super(),a(this,t,M,E,f,{})}}function T(t,e,s){const n=t.slice()
return n[6]=e[s][0],n[7]=e[s][1],n}function $(t){let e,s,n,o,c=t[7]+""
function r(...e){return t[4](t[6],...e)}return{c(){e=d("button"),s=u(c),m(e,"type","button"),m(e,"class","svelte-1gvij2s")},m(t,c){p(t,e,c),v(e,s),n||(o=b(e,"click",r),n=!0)},p(e,n){t=e,1&n&&c!==(c=t[7]+"")&&k(s,c)},d(t){t&&g(e),n=!1,o()}}}function B(t){let s,n,o,c,r,i,l,a,f=e(t[0].folders),u=[]
for(let e=0;e<f.length;e+=1)u[e]=$(T(t,f,e))
return{c(){s=d("tr"),n=d("td"),o=d("button"),o.textContent="All",c=x(),r=d("button"),r.textContent="Main",i=x()
for(let t=0;t<u.length;t+=1)u[t].c()
m(o,"type","button"),m(o,"class","svelte-1gvij2s"),m(r,"type","button"),m(r,"class","svelte-1gvij2s"),m(n,"colspan","3"),m(s,"class","fshCenter")},m(e,f){p(e,s,f),v(s,n),v(n,o),v(n,c),v(n,r),v(n,i)
for(let t=0;t<u.length;t+=1)u[t].m(n,null)
l||(a=[b(o,"click",t[2]),b(r,"click",t[3])],l=!0)},p(t,[s]){if(3&s){let o
for(f=e(t[0].folders),o=0;o<f.length;o+=1){const e=T(t,f,o)
u[o]?u[o].p(e,s):(u[o]=$(e),u[o].c(),u[o].m(n,null))}for(;o<u.length;o+=1)u[o].d(1)
u.length=f.length}},i:j,o:j,d(t){t&&g(s),y(u,t),l=!1,S(a)}}}function D(e,s,n){const o=h()
let{inv:c={folders:{}}}=s
function r(e){t("storeitems","Filter Folder"),o("filter",e)}return e.$set=t=>{"inv"in t&&n(0,c=t.inv)},[c,r,()=>r("-2"),()=>r("-1"),t=>r(t)]}class G extends l{constructor(t){super(),a(this,t,D,B,f,{inv:0})}}function H(t,e,s){s.checked=!1
const n=I(s),o=t.items[s.value].folder_id,c=-2!==e&&e!==o
w(n,c),w(n.nextElementSibling,c)}function J(t,e){i([5,3,F(),0,o(H,t,Number(e.detail))])}function R(){c(F()).filter(t=>!r("fshHide",I(t))).forEach(t=>{t.checked=!t.disabled&&!t.checked})}export default function(){s()&&n("enableFolderFilter")&&async function(){const t=await A()
if(!t||!t.folders)return
const e=document.forms[0]
new G({anchor:e,props:{inv:t},target:e.parentNode}).$on("filter",o(J,t))}(),function(){const t=c(document.forms[0].elements).filter(t=>"submit"===t.type)[0]
new N({anchor:t,target:t.parentNode}).$on("checkall",R)}(),C()}
//# sourceMappingURL=storeitems-379f3b1e.js.map
