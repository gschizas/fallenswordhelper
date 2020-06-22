import{B as e,V as t,w as o,D as s,t as n,G as a,f as r,M as c,C as i,i as l,Z as f,x as d,by as m}from"./calfSystem-4cc738f8.js"
import"./batch-b1efab68.js"
import"./isChecked-464466aa.js"
import{b as u}from"./simpleCheckbox-326bdee4.js"
import"./dialogMsg-d224def3.js"
import"./doStatTotal-1b23cdfd.js"
import{S as p,i as h,s as j,e as b,t as g,a as v,b as x,c as y,d as _,f as C,g as k,h as D,l as E,n as S,j as I,r as N,k as w,m as M,o as A,p as T,q as B,u as $}from"./injectStoreItems-991d7f42.js"
import{c as J}from"./chunk-0596700f.js"
import"./closest-b21303d7.js"
import{c as V}from"./closestTable-6d07ec05.js"
import{c as q}from"./closestTr-13a40903.js"
import"./senditems-7aa127ff.js"
import"./daAjaxSendItemsToRecipient-33f16d9c.js"
import{e as F}from"./errorDialog-18ea8eb8.js"
import"./indexAjaxJson-39fb942e.js"
import"./cmdExport-3370ea6e.js"
import"./guildStore-36c52711.js"
import"./getInventory-8dd8007d.js"
import"./getInventoryById-068bca44.js"
function G(e,t,o){const s=e.slice()
return s[7]=t[o],s}function R(e){let t,o,s,n=e[3](e[7])+""
return{c(){t=b("option"),o=g(n),t.__value=s=e[2](e[7]),t.value=t.__value},m(e,s){v(e,t,s),x(t,o)},p(e,a){1&a&&n!==(n=e[3](e[7])+"")&&y(o,n),1&a&&s!==(s=e[2](e[7]))&&(t.__value=s),t.value=t.__value},d(e){e&&_(t)}}}function X(e){let t,o,s,n,a,r,c,i,l,f,d,m=e[0],u=[]
for(let t=0;t<m.length;t+=1)u[t]=R(G(e,m,t))
return{c(){t=b("tr"),o=b("td"),s=b("span"),s.textContent="Move selected items to:",n=C(),a=b("select")
for(let e=0;e<u.length;e+=1)u[e].c()
r=C(),c=b("span"),c.textContent=" ",i=C(),l=b("button"),l.textContent="Move",k(a,"class","customselect"),void 0===e[1]&&M(()=>e[5].call(a)),k(l,"class","custombutton"),k(l,"type","button"),k(o,"class","fshCenter")},m(m,p){v(m,t,p),x(t,o),x(o,s),x(o,n),x(o,a)
for(let e=0;e<u.length;e+=1)u[e].m(a,null)
D(a,e[1]),x(o,r),x(o,c),x(o,i),x(o,l),f||(d=[E(a,"change",e[5]),E(l,"click",e[4])],f=!0)},p(e,[t]){if(13&t){let o
for(m=e[0],o=0;o<m.length;o+=1){const s=G(e,m,o)
u[o]?u[o].p(s,t):(u[o]=R(s),u[o].c(),u[o].m(a,null))}for(;o<u.length;o+=1)u[o].d(1)
u.length=m.length}7&t&&D(a,e[1])},i:S,o:S,d(e){e&&_(t),I(u,e),f=!1,N(d)}}}function Z(o,s,n){const a=w()
let r,{folders:c}=s
const i=e=>e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]
return o.$set=e=>{"folders"in e&&n(0,c=e.folders)},[c,r,i,t=>e(t.parentNode.parentNode),function(){t("dropitems","Move to Folder"),a("move",r)},function(){r=A(this),n(1,r),n(2,i),n(0,c)}]}class z extends p{constructor(e){super(),h(this,e,Z,X,j,{folders:0})}}function H(e,t){return function(e,t){return o({cmd:"profile",subcmd:"sendtofolder",folder_id:e,folderItem:t})}(e,t)}function K(){return s('[name="removeIndex[]"]:checked')}function L(e){const t=q(e)
t.nextElementSibling.remove(),t.remove()}async function O(e,t){(await H(e,t.map(e=>e.value))).s&&t.forEach(L)}function P(e){J(30,K()).forEach(n(O,e.detail))}function Q(e){c(T()).forEach(t=>{t.checked=Boolean(e)})}let U
const W=e=>{B(e.map(e=>e.value)).then(F).then(t=>{t.s&&e.forEach(L)})},Y=e=>{e.returnValue&&U&&(e.preventDefault(),J(30,K()).forEach(W),t("profileDropitems","Destroy by AJAX"))}
function ee(){U=!U,f("ajaxifyDestroy",U)}const te=[function(){const e=s('#pCC img[src$="/folder.png"]')
if(0===e.length)return
const t=q(V(e[0]))
new z({anchor:t.nextElementSibling,props:{folders:e},target:t.parentNode}).$on("move",P)},$,function(){(()=>{const e=i('input[type="submit"]')
l(e.parentNode,"&nbsp;&nbsp;"+u("ajaxifyDestroy")),r(e.parentNode,"change",ee)})(),U=a("ajaxifyDestroy"),r(document.forms[0],"submit",Y),window.check=Q}]
export default function(){!d()&&T()&&m(te)}
//# sourceMappingURL=injectProfileDropItems-294872dd.js.map
