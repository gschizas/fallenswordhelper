import{S as t,i as e,s,e as n,t as o,g as c,a as r,l,n as a,d as i,k as f,b as u,c as d,f as m,j as p,r as b,v as j,w as g,p as h,x as v}from"./injectStoreItems-fb8555b0.js"
import{U as k,e as x,j as y,H as C,t as S,M as w}from"./calfSystem-47fc08ae.js"
import{b as A}from"./batch-cd69b94b.js"
import{c as F}from"./closestTr-d8faa348.js"
import{t as I}from"./toggleForce-8e48254b.js"
import"./daAjaxSendItemsToRecipient-cbb1e0a6.js"
import"./errorDialog-9d880b0d.js"
import"./dialogMsg-844edf4e.js"
import"./getInventoryById-216cdd3b.js"
import"./getInventory-a6ab3edc.js"
import"./cmdExport-ca6a6b3e.js"
import"./indexAjaxJson-be24760c.js"
import"./doStatTotal-f1ff3773.js"
import"./closest-77701dcf.js"
function $(t){let e,s,f,u
return{c(){e=n("button"),e.textContent="Check All",s=o(" "),c(e,"class","custombutton svelte-1recp8w"),c(e,"type","button")},m(n,o){r(n,e,o),r(n,s,o),f||(u=l(e,"click",t[0]),f=!0)},p:a,i:a,o:a,d(t){t&&i(e),t&&i(s),f=!1,u()}}}function E(t){const e=f()
return[function(){k("storeitems","Check All"),e("checkall")}]}class M extends t{constructor(t){super(),e(this,t,E,$,s,{})}}function N(t,e,s){const n=t.slice()
return n[6]=e[s][0],n[7]=e[s][1],n}function T(t){let e,s,a,f,m=t[7]+""
function p(){return t[4](t[6])}return{c(){e=n("button"),s=o(m),c(e,"type","button"),c(e,"class","svelte-1gvij2s")},m(t,n){r(t,e,n),u(e,s),a||(f=l(e,"click",p),a=!0)},p(e,n){t=e,1&n&&m!==(m=t[7]+"")&&d(s,m)},d(t){t&&i(e),a=!1,f()}}}function B(t){let e,s,o,f,d,j,g,h,v=x(t[0].folders),k=[]
for(let e=0;e<v.length;e+=1)k[e]=T(N(t,v,e))
return{c(){e=n("tr"),s=n("td"),o=n("button"),o.textContent="All",f=m(),d=n("button"),d.textContent="Main",j=m()
for(let t=0;t<k.length;t+=1)k[t].c()
c(o,"type","button"),c(o,"class","svelte-1gvij2s"),c(d,"type","button"),c(d,"class","svelte-1gvij2s"),c(s,"colspan","3"),c(e,"class","fshCenter")},m(n,c){r(n,e,c),u(e,s),u(s,o),u(s,f),u(s,d),u(s,j)
for(let t=0;t<k.length;t+=1)k[t].m(s,null)
g||(h=[l(o,"click",t[2]),l(d,"click",t[3])],g=!0)},p(t,[e]){if(3&e){let n
for(v=x(t[0].folders),n=0;n<v.length;n+=1){const o=N(t,v,n)
k[n]?k[n].p(o,e):(k[n]=T(o),k[n].c(),k[n].m(s,null))}for(;n<k.length;n+=1)k[n].d(1)
k.length=v.length}},i:a,o:a,d(t){t&&i(e),p(k,t),g=!1,b(h)}}}function D(t,e,s){const n=f()
let{inv:o={folders:{}}}=e
function c(t){k("storeitems","Filter Folder"),n("filter",t)}return t.$$set=t=>{"inv"in t&&s(0,o=t.inv)},[o,c,()=>c("-2"),()=>c("-1"),t=>c(t)]}class H extends t{constructor(t){super(),e(this,t,D,B,s,{inv:0})}}function J(t,e,s){s.checked=!1
const n=F(s),o=t.items[s.value].folder_id,c=-2!==e&&e!==o
I(n,c),I(n.nextElementSibling,c)}function R(t,e){A([5,3,h(),0,S(J,t,Number(e.detail))])}function U(){v().forEach((t=>{t.checked=!t.disabled&&!t.checked}))}function _(){y()&&C("enableFolderFilter")&&async function(){const t=await g()
if(!t||!t.folders)return
const e=document.forms[0]
new H({anchor:e,props:{inv:t},target:e.parentNode}).$on("filter",S(R,t))}(),function(){const t=w(document.forms[0].elements).filter((t=>"submit"===t.type))[0]
new M({anchor:t,target:t.parentNode}).$on("checkall",U)}(),j()}export default _
//# sourceMappingURL=storeitems-7c0820b6.js.map
