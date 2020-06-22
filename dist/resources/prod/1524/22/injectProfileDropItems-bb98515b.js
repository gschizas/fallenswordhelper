import{B as e,U as t,w as o,D as s,t as n,G as a,f as r,M as c,C as i,i as l,Y as f,x as d,br as m}from"./calfSystem-d04e4be4.js"
import"./batch-d4516178.js"
import"./isChecked-522ec787.js"
import{b as u}from"./simpleCheckbox-b64120a0.js"
import"./dialogMsg-88e95d9f.js"
import"./doStatTotal-a4b51cbd.js"
import{S as p,i as h,s as b,e as j,t as g,a as v,b as x,c as y,d as _,f as C,g as k,h as D,l as E,n as I,j as S,r as N,k as w,m as M,o as A,p as T,q as B,u as $}from"./injectStoreItems-2d3289d5.js"
import{c as J}from"./chunk-978bd788.js"
import"./closest-137378db.js"
import{c as q}from"./closestTable-f6804f7b.js"
import{c as F}from"./closestTr-81820d98.js"
import"./daAjaxSendItemsToRecipient-4f075d25.js"
import{e as G}from"./errorDialog-e5c2f840.js"
import"./indexAjaxJson-73d427c9.js"
import"./cmdExport-9eb7477e.js"
import"./getInventory-7c3cafa9.js"
import"./getInventoryById-efcf8354.js"
function R(e,t,o){const s=e.slice()
return s[7]=t[o],s}function U(e){let t,o,s,n=e[3](e[7])+""
return{c(){t=j("option"),o=g(n),t.__value=s=e[2](e[7]),t.value=t.__value},m(e,s){v(e,t,s),x(t,o)},p(e,a){1&a&&n!==(n=e[3](e[7])+"")&&y(o,n),1&a&&s!==(s=e[2](e[7]))&&(t.__value=s),t.value=t.__value},d(e){e&&_(t)}}}function V(e){let t,o,s,n,a,r,c,i,l,f,d,m=e[0],u=[]
for(let t=0;t<m.length;t+=1)u[t]=U(R(e,m,t))
return{c(){t=j("tr"),o=j("td"),s=j("span"),s.textContent="Move selected items to:",n=C(),a=j("select")
for(let e=0;e<u.length;e+=1)u[e].c()
r=C(),c=j("span"),c.textContent=" ",i=C(),l=j("button"),l.textContent="Move",k(a,"class","customselect"),void 0===e[1]&&M(()=>e[5].call(a)),k(l,"class","custombutton"),k(l,"type","button"),k(o,"class","fshCenter")},m(m,p){v(m,t,p),x(t,o),x(o,s),x(o,n),x(o,a)
for(let e=0;e<u.length;e+=1)u[e].m(a,null)
D(a,e[1]),x(o,r),x(o,c),x(o,i),x(o,l),f||(d=[E(a,"change",e[5]),E(l,"click",e[4])],f=!0)},p(e,[t]){if(13&t){let o
for(m=e[0],o=0;o<m.length;o+=1){const s=R(e,m,o)
u[o]?u[o].p(s,t):(u[o]=U(s),u[o].c(),u[o].m(a,null))}for(;o<u.length;o+=1)u[o].d(1)
u.length=m.length}7&t&&D(a,e[1])},i:I,o:I,d(e){e&&_(t),S(u,e),f=!1,N(d)}}}function X(o,s,n){const a=w()
let r,{folders:c}=s
const i=e=>e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]
return o.$set=e=>{"folders"in e&&n(0,c=e.folders)},[c,r,i,t=>e(t.parentNode.parentNode),function(){t("dropitems","Move to Folder"),a("move",r)},function(){r=A(this),n(1,r),n(2,i),n(0,c)}]}class Y extends p{constructor(e){super(),h(this,e,X,V,b,{folders:0})}}function z(e,t){return function(e,t){return o({cmd:"profile",subcmd:"sendtofolder",folder_id:e,folderItem:t})}(e,t)}function H(){return s('[name="removeIndex[]"]:checked')}function K(e){const t=F(e)
t.nextElementSibling.remove(),t.remove()}async function L(e,t){(await z(e,t.map(e=>e.value))).s&&t.forEach(K)}function O(e){J(30,H()).forEach(n(L,e.detail))}function P(e){c(T()).forEach(t=>{t.checked=Boolean(e)})}let Q
const W=e=>{B(e.map(e=>e.value)).then(G).then(t=>{t.s&&e.forEach(K)})},Z=e=>{e.returnValue&&Q&&(e.preventDefault(),J(30,H()).forEach(W),t("profileDropitems","Destroy by AJAX"))}
function ee(){Q=!Q,f("ajaxifyDestroy",Q)}const te=[function(){const e=s('#pCC img[src$="/folder.png"]')
if(0===e.length)return
const t=F(q(e[0]))
new Y({anchor:t.nextElementSibling,props:{folders:e},target:t.parentNode}).$on("move",O)},$,function(){(()=>{const e=i('input[type="submit"]')
l(e.parentNode,"&nbsp;&nbsp;"+u("ajaxifyDestroy")),r(e.parentNode,"change",ee)})(),Q=a("ajaxifyDestroy"),r(document.forms[0],"submit",Z),window.check=P}]
export default function(){!d()&&T()&&m(te)}
//# sourceMappingURL=injectProfileDropItems-bb98515b.js.map
