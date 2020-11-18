import{V as t,e,j as s,H as n,t as o,M as r}from"./calfSystem-02c48ff5.js"
import{b as c}from"./batch-a00528f6.js"
import"./dialogMsg-920f7637.js"
import"./doStatTotal-0f1280ea.js"
import{S as a,i,s as l,e as f,t as u,g as m,a as d,l as p,n as j,d as g,k as b,b as h,c as v,f as k,j as x,r as y,v as S,w as C,p as w,x as A}from"./injectStoreItems-753cf0c4.js"
import"./closest-14c30e26.js"
import{c as F}from"./closestTr-9052729a.js"
import"./senditems-ad62e4de.js"
import"./daAjaxSendItemsToRecipient-1b140da6.js"
import"./errorDialog-48ca89f9.js"
import"./indexAjaxJson-afad01c3.js"
import"./cmdExport-3fceba30.js"
import"./guildStore-440c18f5.js"
import"./getInventory-4eb69e3b.js"
import"./getInventoryById-d43a2fe1.js"
import{t as I}from"./toggleForce-68981a01.js"
function $(t){let e,s,n,o
return{c(){e=f("button"),e.textContent="Check All",s=u(" "),m(e,"class","custombutton svelte-1recp8w"),m(e,"type","button")},m(r,c){d(r,e,c),d(r,s,c),n||(o=p(e,"click",t[0]),n=!0)},p:j,i:j,o:j,d(t){t&&g(e),t&&g(s),n=!1,o()}}}function E(e){const s=b()
return[function(){t("storeitems","Check All"),s("checkall")}]}class M extends a{constructor(t){super(),i(this,t,E,$,l,{})}}function N(t,e,s){const n=t.slice()
return n[6]=e[s][0],n[7]=e[s][1],n}function T(t){let e,s,n,o,r=t[7]+""
function c(){return t[4](t[6])}return{c(){e=f("button"),s=u(r),m(e,"type","button"),m(e,"class","svelte-1gvij2s")},m(t,r){d(t,e,r),h(e,s),n||(o=p(e,"click",c),n=!0)},p(e,n){t=e,1&n&&r!==(r=t[7]+"")&&v(s,r)},d(t){t&&g(e),n=!1,o()}}}function B(t){let s,n,o,r,c,a,i,l,u=e(t[0].folders),b=[]
for(let e=0;e<u.length;e+=1)b[e]=T(N(t,u,e))
return{c(){s=f("tr"),n=f("td"),o=f("button"),o.textContent="All",r=k(),c=f("button"),c.textContent="Main",a=k()
for(let t=0;t<b.length;t+=1)b[t].c()
m(o,"type","button"),m(o,"class","svelte-1gvij2s"),m(c,"type","button"),m(c,"class","svelte-1gvij2s"),m(n,"colspan","3"),m(s,"class","fshCenter")},m(e,f){d(e,s,f),h(s,n),h(n,o),h(n,r),h(n,c),h(n,a)
for(let t=0;t<b.length;t+=1)b[t].m(n,null)
i||(l=[p(o,"click",t[2]),p(c,"click",t[3])],i=!0)},p(t,[s]){if(3&s){let o
for(u=e(t[0].folders),o=0;o<u.length;o+=1){const e=N(t,u,o)
b[o]?b[o].p(e,s):(b[o]=T(e),b[o].c(),b[o].m(n,null))}for(;o<b.length;o+=1)b[o].d(1)
b.length=u.length}},i:j,o:j,d(t){t&&g(s),x(b,t),i=!1,y(l)}}}function D(e,s,n){const o=b()
let{inv:r={folders:{}}}=s
function c(e){t("storeitems","Filter Folder"),o("filter",e)}return e.$$set=t=>{"inv"in t&&n(0,r=t.inv)},[r,c,()=>c("-2"),()=>c("-1"),t=>c(t)]}class H extends a{constructor(t){super(),i(this,t,D,B,l,{inv:0})}}function J(t,e,s){s.checked=!1
const n=F(s),o=t.items[s.value].folder_id,r=-2!==e&&e!==o
I(n,r),I(n.nextElementSibling,r)}function R(t,e){c([5,3,w(),0,o(J,t,Number(e.detail))])}function V(){A().forEach(t=>{t.checked=!t.disabled&&!t.checked})}function _(){s()&&n("enableFolderFilter")&&async function(){const t=await C()
if(!t||!t.folders)return
const e=document.forms[0]
new H({anchor:e,props:{inv:t},target:e.parentNode}).$on("filter",o(R,t))}(),function(){const t=r(document.forms[0].elements).filter(t=>"submit"===t.type)[0]
new M({anchor:t,target:t.parentNode}).$on("checkall",V)}(),S()}export default _
//# sourceMappingURL=storeitems-95ca3e13.js.map
