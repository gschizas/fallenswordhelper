import{V as t,e,j as s,G as n,t as o,M as c}from"./calfSystem-9901ad27.js"
import{b as r}from"./batch-e74a5e93.js"
import"./dialogMsg-16e7e1c1.js"
import"./doStatTotal-226a98f1.js"
import{S as i,i as a,s as l,e as f,t as u,g as m,a as d,l as p,n as b,d as j,k as g,b as h,c as v,f as k,j as x,r as y,u as S,v as C,p as w,w as A}from"./injectStoreItems-8c9384a8.js"
import"./closest-5107b89a.js"
import{c as F}from"./closestTr-5c087056.js"
import"./senditems-8ad04dff.js"
import"./daAjaxSendItemsToRecipient-345eb63c.js"
import"./errorDialog-7f431a39.js"
import"./indexAjaxJson-93ae4cbc.js"
import"./cmdExport-f7c4fb03.js"
import"./guildStore-7900a822.js"
import"./getInventory-47b20b7b.js"
import"./getInventoryById-8ce6ec79.js"
import{t as I}from"./toggleForce-7d757ba6.js"
function E(t){let e,s,n,o
return{c(){e=f("button"),e.textContent="Check All",s=u(" "),m(e,"class","custombutton svelte-1recp8w"),m(e,"type","button")},m(c,r){d(c,e,r),d(c,s,r),n||(o=p(e,"click",t[0]),n=!0)},p:b,i:b,o:b,d(t){t&&j(e),t&&j(s),n=!1,o()}}}function M(e){const s=g()
return[function(){t("storeitems","Check All"),s("checkall")}]}class N extends i{constructor(t){super(),a(this,t,M,E,l,{})}}function T(t,e,s){const n=t.slice()
return n[6]=e[s][0],n[7]=e[s][1],n}function $(t){let e,s,n,o,c=t[7]+""
function r(...e){return t[4](t[6],...e)}return{c(){e=f("button"),s=u(c),m(e,"type","button"),m(e,"class","svelte-1gvij2s")},m(t,c){d(t,e,c),h(e,s),n||(o=p(e,"click",r),n=!0)},p(e,n){t=e,1&n&&c!==(c=t[7]+"")&&v(s,c)},d(t){t&&j(e),n=!1,o()}}}function B(t){let s,n,o,c,r,i,a,l,u=e(t[0].folders),g=[]
for(let e=0;e<u.length;e+=1)g[e]=$(T(t,u,e))
return{c(){s=f("tr"),n=f("td"),o=f("button"),o.textContent="All",c=k(),r=f("button"),r.textContent="Main",i=k()
for(let t=0;t<g.length;t+=1)g[t].c()
m(o,"type","button"),m(o,"class","svelte-1gvij2s"),m(r,"type","button"),m(r,"class","svelte-1gvij2s"),m(n,"colspan","3"),m(s,"class","fshCenter")},m(e,f){d(e,s,f),h(s,n),h(n,o),h(n,c),h(n,r),h(n,i)
for(let t=0;t<g.length;t+=1)g[t].m(n,null)
a||(l=[p(o,"click",t[2]),p(r,"click",t[3])],a=!0)},p(t,[s]){if(3&s){let o
for(u=e(t[0].folders),o=0;o<u.length;o+=1){const e=T(t,u,o)
g[o]?g[o].p(e,s):(g[o]=$(e),g[o].c(),g[o].m(n,null))}for(;o<g.length;o+=1)g[o].d(1)
g.length=u.length}},i:b,o:b,d(t){t&&j(s),x(g,t),a=!1,y(l)}}}function D(e,s,n){const o=g()
let{inv:c={folders:{}}}=s
function r(e){t("storeitems","Filter Folder"),o("filter",e)}return e.$set=t=>{"inv"in t&&n(0,c=t.inv)},[c,r,()=>r("-2"),()=>r("-1"),t=>r(t)]}class G extends i{constructor(t){super(),a(this,t,D,B,l,{inv:0})}}function J(t,e,s){s.checked=!1
const n=F(s),o=t.items[s.value].folder_id,c=-2!==e&&e!==o
I(n,c),I(n.nextElementSibling,c)}function R(t,e){r([5,3,w(),0,o(J,t,Number(e.detail))])}function V(){A().forEach(t=>{t.checked=!t.disabled&&!t.checked})}export default function(){s()&&n("enableFolderFilter")&&async function(){const t=await C()
if(!t||!t.folders)return
const e=document.forms[0]
new G({anchor:e,props:{inv:t},target:e.parentNode}).$on("filter",o(R,t))}(),function(){const t=c(document.forms[0].elements).filter(t=>"submit"===t.type)[0]
new N({anchor:t,target:t.parentNode}).$on("checkall",V)}(),S()}
//# sourceMappingURL=storeitems-f37674fd.js.map
