import{S as t,i as e,s,e as n,t as o,g as c,a as r,l as i,n as l,d as a,k as f,b as u,c as d,f as m,j as p,r as b}from"./index-66734780.js"
import{W as j,e as g,j as h,H as v,t as k,M as x}from"./calfSystem-19a5d332.js"
import{b as y}from"./batch-2bc71ae7.js"
import{c as S}from"./closestTr-1e3a3aee.js"
import{i as C,b as A,g as F,c as I}from"./injectStoreItems-e20ded81.js"
import{t as w}from"./toggleForce-d3228ccb.js"
import"./closest-331833f9.js"
import"./daAjaxSendItemsToRecipient-6fcaa7b5.js"
import"./senditems-c845df11.js"
import"./errorDialog-56c5d78c.js"
import"./dialogMsg-0a235932.js"
import"./getInventoryById-3a7785c2.js"
import"./getInventory-b9584cb0.js"
import"./guildStore-1e1a9259.js"
import"./cmdExport-bf03c29e.js"
import"./indexAjaxJson-bdfce70d.js"
import"./doStatTotal-6503c402.js"
function $(t){let e,s,f,u
return{c(){e=n("button"),e.textContent="Check All",s=o(" "),c(e,"class","custombutton svelte-1recp8w"),c(e,"type","button")},m(n,o){r(n,e,o),r(n,s,o),f||(u=i(e,"click",t[0]),f=!0)},p:l,i:l,o:l,d(t){t&&a(e),t&&a(s),f=!1,u()}}}function E(t){const e=f()
return[function(){j("storeitems","Check All"),e("checkall")}]}class M extends t{constructor(t){super(),e(this,t,E,$,s,{})}}function N(t,e,s){const n=t.slice()
return n[6]=e[s][0],n[7]=e[s][1],n}function T(t){let e,s,l,f,m=t[7]+""
function p(){return t[4](t[6])}return{c(){e=n("button"),s=o(m),c(e,"type","button"),c(e,"class","svelte-1gvij2s")},m(t,n){r(t,e,n),u(e,s),l||(f=i(e,"click",p),l=!0)},p(e,n){t=e,1&n&&m!==(m=t[7]+"")&&d(s,m)},d(t){t&&a(e),l=!1,f()}}}function B(t){let e,s,o,f,d,j,h,v,k=g(t[0].folders),x=[]
for(let e=0;e<k.length;e+=1)x[e]=T(N(t,k,e))
return{c(){e=n("tr"),s=n("td"),o=n("button"),o.textContent="All",f=m(),d=n("button"),d.textContent="Main",j=m()
for(let t=0;t<x.length;t+=1)x[t].c()
c(o,"type","button"),c(o,"class","svelte-1gvij2s"),c(d,"type","button"),c(d,"class","svelte-1gvij2s"),c(s,"colspan","3"),c(e,"class","fshCenter")},m(n,c){r(n,e,c),u(e,s),u(s,o),u(s,f),u(s,d),u(s,j)
for(let t=0;t<x.length;t+=1)x[t].m(s,null)
h||(v=[i(o,"click",t[2]),i(d,"click",t[3])],h=!0)},p(t,[e]){if(3&e){let n
for(k=g(t[0].folders),n=0;n<k.length;n+=1){const o=N(t,k,n)
x[n]?x[n].p(o,e):(x[n]=T(o),x[n].c(),x[n].m(s,null))}for(;n<x.length;n+=1)x[n].d(1)
x.length=k.length}},i:l,o:l,d(t){t&&a(e),p(x,t),h=!1,b(v)}}}function D(t,e,s){const n=f()
let{inv:o={folders:{}}}=e
function c(t){j("storeitems","Filter Folder"),n("filter",t)}return t.$$set=t=>{"inv"in t&&s(0,o=t.inv)},[o,c,()=>c("-2"),()=>c("-1"),t=>c(t)]}class H extends t{constructor(t){super(),e(this,t,D,B,s,{inv:0})}}function J(t,e,s){s.checked=!1
const n=S(s),o=t.items[s.value].folder_id,c=-2!==e&&e!==o
w(n,c),w(n.nextElementSibling,c)}function R(t,e){y([5,3,F(),0,k(J,t,Number(e.detail))])}function W(){I().forEach((t=>{t.checked=!t.disabled&&!t.checked}))}function _(){h()&&v("enableFolderFilter")&&async function(){const t=await A()
if(!t||!t.folders)return
const e=document.forms[0]
new H({anchor:e,props:{inv:t},target:e.parentNode}).$on("filter",k(R,t))}(),function(){const t=x(document.forms[0].elements).filter((t=>"submit"===t.type))[0]
new M({anchor:t,target:t.parentNode}).$on("checkall",W)}(),C()}export default _
//# sourceMappingURL=storeitems-297da5f2.js.map
