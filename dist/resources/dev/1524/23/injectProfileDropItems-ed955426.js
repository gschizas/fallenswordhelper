import{B as e,V as t,w as o,D as s,t as n,G as a,f as r,M as c,C as i,i as l,Z as f,x as m,by as d}from"./calfSystem-9901ad27.js"
import"./batch-e74a5e93.js"
import"./isChecked-8ee9db43.js"
import{b as u}from"./simpleCheckbox-3328fcb7.js"
import"./dialogMsg-16e7e1c1.js"
import"./doStatTotal-226a98f1.js"
import{S as p,i as h,s as b,e as j,t as g,a as v,b as x,c as y,d as _,f as C,g as k,h as D,l as E,n as S,j as I,r as N,k as w,m as M,o as A,p as T,q as B,u as $}from"./injectStoreItems-8c9384a8.js"
import{c as J}from"./chunk-3dd35605.js"
import"./closest-5107b89a.js"
import{c as V}from"./closestTable-32797628.js"
import{c as q}from"./closestTr-5c087056.js"
import"./senditems-8ad04dff.js"
import"./daAjaxSendItemsToRecipient-345eb63c.js"
import{e as F}from"./errorDialog-7f431a39.js"
import"./indexAjaxJson-93ae4cbc.js"
import"./cmdExport-f7c4fb03.js"
import"./guildStore-7900a822.js"
import"./getInventory-47b20b7b.js"
import"./getInventoryById-8ce6ec79.js"
function G(e,t,o){const s=e.slice()
return s[7]=t[o],s}function R(e){let t,o,s,n=e[3](e[7])+""
return{c(){t=j("option"),o=g(n),t.__value=s=e[2](e[7]),t.value=t.__value},m(e,s){v(e,t,s),x(t,o)},p(e,a){1&a&&n!==(n=e[3](e[7])+"")&&y(o,n),1&a&&s!==(s=e[2](e[7]))&&(t.__value=s),t.value=t.__value},d(e){e&&_(t)}}}function X(e){let t,o,s,n,a,r,c,i,l,f,m,d=e[0],u=[]
for(let t=0;t<d.length;t+=1)u[t]=R(G(e,d,t))
return{c(){t=j("tr"),o=j("td"),s=j("span"),s.textContent="Move selected items to:",n=C(),a=j("select")
for(let e=0;e<u.length;e+=1)u[e].c()
r=C(),c=j("span"),c.textContent=" ",i=C(),l=j("button"),l.textContent="Move",k(a,"class","customselect"),void 0===e[1]&&M(()=>e[5].call(a)),k(l,"class","custombutton"),k(l,"type","button"),k(o,"class","fshCenter")},m(d,p){v(d,t,p),x(t,o),x(o,s),x(o,n),x(o,a)
for(let e=0;e<u.length;e+=1)u[e].m(a,null)
D(a,e[1]),x(o,r),x(o,c),x(o,i),x(o,l),f||(m=[E(a,"change",e[5]),E(l,"click",e[4])],f=!0)},p(e,[t]){if(13&t){let o
for(d=e[0],o=0;o<d.length;o+=1){const s=G(e,d,o)
u[o]?u[o].p(s,t):(u[o]=R(s),u[o].c(),u[o].m(a,null))}for(;o<u.length;o+=1)u[o].d(1)
u.length=d.length}7&t&&D(a,e[1])},i:S,o:S,d(e){e&&_(t),I(u,e),f=!1,N(m)}}}function Z(o,s,n){const a=w()
let r,{folders:c}=s
const i=e=>e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]
return o.$set=e=>{"folders"in e&&n(0,c=e.folders)},[c,r,i,t=>e(t.parentNode.parentNode),function(){t("dropitems","Move to Folder"),a("move",r)},function(){r=A(this),n(1,r),n(2,i),n(0,c)}]}class z extends p{constructor(e){super(),h(this,e,Z,X,b,{folders:0})}}function H(e,t){return function(e,t){return o({cmd:"profile",subcmd:"sendtofolder",folder_id:e,folderItem:t})}(e,t)}function K(){return s('[name="removeIndex[]"]:checked')}function L(e){const t=q(e)
t.nextElementSibling.remove(),t.remove()}async function O(e,t){(await H(e,t.map(e=>e.value))).s&&t.forEach(L)}function P(e){J(30,K()).forEach(n(O,e.detail))}function Q(e){c(T()).forEach(t=>{t.checked=Boolean(e)})}let U
const W=e=>{B(e.map(e=>e.value)).then(F).then(t=>{t.s&&e.forEach(L)})},Y=e=>{e.returnValue&&U&&(e.preventDefault(),J(30,K()).forEach(W),t("profileDropitems","Destroy by AJAX"))}
function ee(){U=!U,f("ajaxifyDestroy",U)}const te=[function(){const e=s('#pCC img[src$="/folder.png"]')
if(0===e.length)return
const t=q(V(e[0]))
new z({anchor:t.nextElementSibling,props:{folders:e},target:t.parentNode}).$on("move",P)},$,function(){(()=>{const e=i('input[type="submit"]')
l(e.parentNode,"&nbsp;&nbsp;"+u("ajaxifyDestroy")),r(e.parentNode,"change",ee)})(),U=a("ajaxifyDestroy"),r(document.forms[0],"submit",Y),window.check=Q}]
export default function(){!m()&&T()&&d(te)}
//# sourceMappingURL=injectProfileDropItems-ed955426.js.map
