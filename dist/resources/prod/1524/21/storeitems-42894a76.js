import{U as t,e,j as s,G as n,t as o,M as r,l as c}from"./calfSystem-2741d97b.js"
import{b as a}from"./batch-835abad1.js"
import"./dialogMsg-edf7150f.js"
import"./doStatTotal-70ec844a.js"
import{S as l,i,s as f,e as u,t as d,g as m,a as p,l as b,n as h,d as j,k as g,b as v,c as k,f as x,j as y,r as C,u as S,v as A,p as F}from"./injectStoreItems-6202f10d.js"
import"./closest-5ba11a5a.js"
import{c as I}from"./closestTr-a85aebac.js"
import"./daAjaxSendItemsToRecipient-bde5eed1.js"
import"./errorDialog-f01fb95d.js"
import"./indexAjaxJson-2aa42945.js"
import"./cmdExport-b57576c3.js"
import"./getInventory-a458051a.js"
import"./getInventoryById-e8d5c395.js"
import{t as w}from"./toggleForce-69a79716.js"
function E(t){let e,s,n,o
return{c(){e=u("button"),e.textContent="Check All",s=d(" "),m(e,"class","custombutton svelte-1recp8w"),m(e,"type","button")},m(r,c){p(r,e,c),p(r,s,c),n||(o=b(e,"click",t[0]),n=!0)},p:h,i:h,o:h,d(t){t&&j(e),t&&j(s),n=!1,o()}}}function M(e){const s=g()
return[function(){t("storeitems","Check All"),s("checkall")}]}class N extends l{constructor(t){super(),i(this,t,M,E,f,{})}}function T(t,e,s){const n=t.slice()
return n[6]=e[s][0],n[7]=e[s][1],n}function $(t){let e,s,n,o,r=t[7]+""
function c(...e){return t[4](t[6],...e)}return{c(){e=u("button"),s=d(r),m(e,"type","button"),m(e,"class","svelte-1gvij2s")},m(t,r){p(t,e,r),v(e,s),n||(o=b(e,"click",c),n=!0)},p(e,n){t=e,1&n&&r!==(r=t[7]+"")&&k(s,r)},d(t){t&&j(e),n=!1,o()}}}function B(t){let s,n,o,r,c,a,l,i,f=e(t[0].folders),d=[]
for(let e=0;e<f.length;e+=1)d[e]=$(T(t,f,e))
return{c(){s=u("tr"),n=u("td"),o=u("button"),o.textContent="All",r=x(),c=u("button"),c.textContent="Main",a=x()
for(let t=0;t<d.length;t+=1)d[t].c()
m(o,"type","button"),m(o,"class","svelte-1gvij2s"),m(c,"type","button"),m(c,"class","svelte-1gvij2s"),m(n,"colspan","3"),m(s,"class","fshCenter")},m(e,f){p(e,s,f),v(s,n),v(n,o),v(n,r),v(n,c),v(n,a)
for(let t=0;t<d.length;t+=1)d[t].m(n,null)
l||(i=[b(o,"click",t[2]),b(c,"click",t[3])],l=!0)},p(t,[s]){if(3&s){let o
for(f=e(t[0].folders),o=0;o<f.length;o+=1){const e=T(t,f,o)
d[o]?d[o].p(e,s):(d[o]=$(e),d[o].c(),d[o].m(n,null))}for(;o<d.length;o+=1)d[o].d(1)
d.length=f.length}},i:h,o:h,d(t){t&&j(s),y(d,t),l=!1,C(i)}}}function D(e,s,n){const o=g()
let{inv:r={folders:{}}}=s
function c(e){t("storeitems","Filter Folder"),o("filter",e)}return e.$set=t=>{"inv"in t&&n(0,r=t.inv)},[r,c,()=>c("-2"),()=>c("-1"),t=>c(t)]}class G extends l{constructor(t){super(),i(this,t,D,B,f,{inv:0})}}function H(t,e,s){s.checked=!1
const n=I(s),o=t.items[s.value].folder_id,r=-2!==e&&e!==o
w(n,r),w(n.nextElementSibling,r)}function J(t,e){a([5,3,F(),0,o(H,t,Number(e.detail))])}function R(){r(F()).filter(t=>!c("fshHide",I(t))).forEach(t=>{t.checked=!t.disabled&&!t.checked})}export default function(){s()&&n("enableFolderFilter")&&async function(){const t=await A()
if(!t||!t.folders)return
const e=document.forms[0]
new G({anchor:e,props:{inv:t},target:e.parentNode}).$on("filter",o(J,t))}(),function(){const t=r(document.forms[0].elements).filter(t=>"submit"===t.type)[0]
new N({anchor:t,target:t.parentNode}).$on("checkall",R)}(),S()}
//# sourceMappingURL=storeitems-42894a76.js.map
