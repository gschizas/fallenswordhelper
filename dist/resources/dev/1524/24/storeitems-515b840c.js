import{V as t,e,j as s,H as n,t as o,M as r}from"./calfSystem-38898f3e.js"
import{b as c}from"./batch-21cc76f7.js"
import"./dialogMsg-9241492c.js"
import"./doStatTotal-19a42dfd.js"
import{S as i,i as l,s as a,e as f,t as d,g as u,a as m,l as p,n as j,d as g,k as h,b,c as v,f as k,j as x,r as y,v as S,w as C,p as w,x as A}from"./injectStoreItems-b018a52b.js"
import"./closest-d8e60c46.js"
import{c as F}from"./closestTr-4d04f2f4.js"
import"./senditems-82fd6fd1.js"
import"./daAjaxSendItemsToRecipient-e7f9f1c7.js"
import"./errorDialog-8d3200e2.js"
import"./indexAjaxJson-2402e0e9.js"
import"./cmdExport-2f232ad1.js"
import"./guildStore-657dd13b.js"
import"./getInventory-41df5894.js"
import"./getInventoryById-e93c5950.js"
import{t as I}from"./toggleForce-d6f8623d.js"
function $(t){let e,s,n,o
return{c(){e=f("button"),e.textContent="Check All",s=d(" "),u(e,"class","custombutton svelte-1recp8w"),u(e,"type","button")},m(r,c){m(r,e,c),m(r,s,c),n||(o=p(e,"click",t[0]),n=!0)},p:j,i:j,o:j,d(t){t&&g(e),t&&g(s),n=!1,o()}}}function E(e){const s=h()
return[function(){t("storeitems","Check All"),s("checkall")}]}class M extends i{constructor(t){super(),l(this,t,E,$,a,{})}}function N(t,e,s){const n=t.slice()
return n[6]=e[s][0],n[7]=e[s][1],n}function T(t){let e,s,n,o,r=t[7]+""
function c(...e){return t[4](t[6],...e)}return{c(){e=f("button"),s=d(r),u(e,"type","button"),u(e,"class","svelte-1gvij2s")},m(t,r){m(t,e,r),b(e,s),n||(o=p(e,"click",c),n=!0)},p(e,n){t=e,1&n&&r!==(r=t[7]+"")&&v(s,r)},d(t){t&&g(e),n=!1,o()}}}function B(t){let s,n,o,r,c,i,l,a,d=e(t[0].folders),h=[]
for(let e=0;e<d.length;e+=1)h[e]=T(N(t,d,e))
return{c(){s=f("tr"),n=f("td"),o=f("button"),o.textContent="All",r=k(),c=f("button"),c.textContent="Main",i=k()
for(let t=0;t<h.length;t+=1)h[t].c()
u(o,"type","button"),u(o,"class","svelte-1gvij2s"),u(c,"type","button"),u(c,"class","svelte-1gvij2s"),u(n,"colspan","3"),u(s,"class","fshCenter")},m(e,f){m(e,s,f),b(s,n),b(n,o),b(n,r),b(n,c),b(n,i)
for(let t=0;t<h.length;t+=1)h[t].m(n,null)
l||(a=[p(o,"click",t[2]),p(c,"click",t[3])],l=!0)},p(t,[s]){if(3&s){let o
for(d=e(t[0].folders),o=0;o<d.length;o+=1){const e=N(t,d,o)
h[o]?h[o].p(e,s):(h[o]=T(e),h[o].c(),h[o].m(n,null))}for(;o<h.length;o+=1)h[o].d(1)
h.length=d.length}},i:j,o:j,d(t){t&&g(s),x(h,t),l=!1,y(a)}}}function D(e,s,n){const o=h()
let{inv:r={folders:{}}}=s
function c(e){t("storeitems","Filter Folder"),o("filter",e)}return e.$$set=t=>{"inv"in t&&n(0,r=t.inv)},[r,c,()=>c("-2"),()=>c("-1"),t=>c(t)]}class H extends i{constructor(t){super(),l(this,t,D,B,a,{inv:0})}}function J(t,e,s){s.checked=!1
const n=F(s),o=t.items[s.value].folder_id,r=-2!==e&&e!==o
I(n,r),I(n.nextElementSibling,r)}function R(t,e){c([5,3,w(),0,o(J,t,Number(e.detail))])}function V(){A().forEach(t=>{t.checked=!t.disabled&&!t.checked})}function _(){s()&&n("enableFolderFilter")&&async function(){const t=await C()
if(!t||!t.folders)return
const e=document.forms[0]
new H({anchor:e,props:{inv:t},target:e.parentNode}).$on("filter",o(R,t))}(),function(){const t=r(document.forms[0].elements).filter(t=>"submit"===t.type)[0]
new M({anchor:t,target:t.parentNode}).$on("checkall",V)}(),S()}export default _
//# sourceMappingURL=storeitems-515b840c.js.map
