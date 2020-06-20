import{U as t,e,j as s,G as n,t as o,M as c,l as r}from"./calfSystem-89b939c8.js"
import{b as l}from"./batch-e839e453.js"
import"./dialogMsg-d061ece2.js"
import"./doStatTotal-a01a19ff.js"
import{S as i,i as a,s as f,e as u,t as d,g as m,a as p,l as b,n as h,d as j,k as g,b as v,c as k,f as x,j as y,r as C,u as S,v as A,p as F}from"./injectStoreItems-d4cac765.js"
import"./closest-e1837d80.js"
import{c as I}from"./closestTr-e9bb4ace.js"
import"./daAjaxSendItemsToRecipient-b1414fc9.js"
import"./errorDialog-28ee21dd.js"
import"./indexAjaxJson-dab169e3.js"
import"./cmdExport-788e7045.js"
import"./getInventory-fbf9d7b3.js"
import"./getInventoryById-a70f1bcf.js"
import{t as w}from"./toggleForce-fba73ab8.js"
function E(t){let e,s,n,o
return{c(){e=u("button"),e.textContent="Check All",s=d(" "),m(e,"class","custombutton svelte-1recp8w"),m(e,"type","button")},m(c,r){p(c,e,r),p(c,s,r),n||(o=b(e,"click",t[0]),n=!0)},p:h,i:h,o:h,d(t){t&&j(e),t&&j(s),n=!1,o()}}}function M(e){const s=g()
return[function(){t("storeitems","Check All"),s("checkall")}]}class N extends i{constructor(t){super(),a(this,t,M,E,f,{})}}function T(t,e,s){const n=t.slice()
return n[6]=e[s][0],n[7]=e[s][1],n}function $(t){let e,s,n,o,c=t[7]+""
function r(...e){return t[4](t[6],...e)}return{c(){e=u("button"),s=d(c),m(e,"type","button"),m(e,"class","svelte-1gvij2s")},m(t,c){p(t,e,c),v(e,s),n||(o=b(e,"click",r),n=!0)},p(e,n){t=e,1&n&&c!==(c=t[7]+"")&&k(s,c)},d(t){t&&j(e),n=!1,o()}}}function B(t){let s,n,o,c,r,l,i,a,f=e(t[0].folders),d=[]
for(let e=0;e<f.length;e+=1)d[e]=$(T(t,f,e))
return{c(){s=u("tr"),n=u("td"),o=u("button"),o.textContent="All",c=x(),r=u("button"),r.textContent="Main",l=x()
for(let t=0;t<d.length;t+=1)d[t].c()
m(o,"type","button"),m(o,"class","svelte-1gvij2s"),m(r,"type","button"),m(r,"class","svelte-1gvij2s"),m(n,"colspan","3"),m(s,"class","fshCenter")},m(e,f){p(e,s,f),v(s,n),v(n,o),v(n,c),v(n,r),v(n,l)
for(let t=0;t<d.length;t+=1)d[t].m(n,null)
i||(a=[b(o,"click",t[2]),b(r,"click",t[3])],i=!0)},p(t,[s]){if(3&s){let o
for(f=e(t[0].folders),o=0;o<f.length;o+=1){const e=T(t,f,o)
d[o]?d[o].p(e,s):(d[o]=$(e),d[o].c(),d[o].m(n,null))}for(;o<d.length;o+=1)d[o].d(1)
d.length=f.length}},i:h,o:h,d(t){t&&j(s),y(d,t),i=!1,C(a)}}}function D(e,s,n){const o=g()
let{inv:c={folders:{}}}=s
function r(e){t("storeitems","Filter Folder"),o("filter",e)}return e.$set=t=>{"inv"in t&&n(0,c=t.inv)},[c,r,()=>r("-2"),()=>r("-1"),t=>r(t)]}class G extends i{constructor(t){super(),a(this,t,D,B,f,{inv:0})}}function H(t,e,s){s.checked=!1
const n=I(s),o=t.items[s.value].folder_id,c=-2!==e&&e!==o
w(n,c),w(n.nextElementSibling,c)}function J(t,e){l([5,3,F(),0,o(H,t,Number(e.detail))])}function R(){c(F()).filter(t=>!r("fshHide",I(t))).forEach(t=>{t.checked=!t.disabled&&!t.checked})}export default function(){s()&&n("enableFolderFilter")&&async function(){const t=await A()
if(!t||!t.folders)return
const e=document.forms[0]
new G({anchor:e,props:{inv:t},target:e.parentNode}).$on("filter",o(J,t))}(),function(){const t=c(document.forms[0].elements).filter(t=>"submit"===t.type)[0]
new N({anchor:t,target:t.parentNode}).$on("checkall",R)}(),S()}
//# sourceMappingURL=storeitems-f54d4268.js.map
