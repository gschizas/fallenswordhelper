import{B as t,W as e,w as o,D as s,t as n,H as a,f as r,C as c,i,_ as l,x as f,bw as m}from"./calfSystem-ec5e5725.js"
import"./batch-da424537.js"
import"./isChecked-ed98077f.js"
import{b as d}from"./simpleCheckbox-e694b596.js"
import"./dialogMsg-9c8d1b20.js"
import"./doStatTotal-089574b8.js"
import{S as u,i as p,s as h,e as b,t as j,a as g,b as v,c as x,d as y,f as _,g as C,h as k,l as E,n as S,j as D,r as I,k as w,m as N,o as A,p as M,q as T,u as $,v as B}from"./injectStoreItems-6e6389c8.js"
import{c as J}from"./chunk-001468bc.js"
import"./closest-79b9364e.js"
import{c as q}from"./closestTable-7d996143.js"
import{c as F}from"./closestTr-039240ce.js"
import"./senditems-d4d7af6f.js"
import"./daAjaxSendItemsToRecipient-91b67ba0.js"
import{e as H}from"./errorDialog-7f9c11b0.js"
import"./indexAjaxJson-b7f888c6.js"
import"./cmdExport-2a00007a.js"
import"./guildStore-1c101a49.js"
import"./getInventory-e3d9aaa4.js"
import"./getInventoryById-a3024f06.js"
function R(t,e,o){const s=t.slice()
return s[7]=e[o],s}function V(t){let e,o,s,n=t[3](t[7])+""
return{c(){e=b("option"),o=j(n),e.__value=s=t[2](t[7]),e.value=e.__value},m(t,s){g(t,e,s),v(e,o)},p(t,a){1&a&&n!==(n=t[3](t[7])+"")&&x(o,n),1&a&&s!==(s=t[2](t[7]))&&(e.__value=s,e.value=e.__value)},d(t){t&&y(e)}}}function W(t){let e,o,s,n,a,r,c,i,l,f,m,d=t[0],u=[]
for(let e=0;e<d.length;e+=1)u[e]=V(R(t,d,e))
return{c(){e=b("tr"),o=b("td"),s=b("span"),s.textContent="Move selected items to:",n=_(),a=b("select")
for(let t=0;t<u.length;t+=1)u[t].c()
r=_(),c=b("span"),c.textContent=" ",i=_(),l=b("button"),l.textContent="Move",C(a,"class","customselect"),void 0===t[1]&&N(()=>t[5].call(a)),C(l,"class","custombutton"),C(l,"type","button"),C(o,"class","fshCenter")},m(d,p){g(d,e,p),v(e,o),v(o,s),v(o,n),v(o,a)
for(let t=0;t<u.length;t+=1)u[t].m(a,null)
k(a,t[1]),v(o,r),v(o,c),v(o,i),v(o,l),f||(m=[E(a,"change",t[5]),E(l,"click",t[4])],f=!0)},p(t,[e]){if(13&e){let o
for(d=t[0],o=0;o<d.length;o+=1){const s=R(t,d,o)
u[o]?u[o].p(s,e):(u[o]=V(s),u[o].c(),u[o].m(a,null))}for(;o<u.length;o+=1)u[o].d(1)
u.length=d.length}7&e&&k(a,t[1])},i:S,o:S,d(t){t&&y(e),D(u,t),f=!1,I(m)}}}function X(o,s,n){const a=w()
let r,{folders:c}=s
const i=t=>t.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]
return o.$$set=t=>{"folders"in t&&n(0,c=t.folders)},[c,r,i,e=>t(e.parentNode.parentNode),function(){e("dropitems","Move to Folder"),a("move",r)},function(){r=A(this),n(1,r),n(2,i),n(0,c)}]}class z extends u{constructor(t){super(),p(this,t,X,W,h,{folders:0})}}function G(t,e){return function(t,e){return o({cmd:"profile",subcmd:"sendtofolder",folder_id:t,folderItem:e})}(t,e)}function K(){return s('[name="removeIndex[]"]:checked')}function L(t){const e=F(t)
e.nextElementSibling.remove(),e.remove()}async function O(t,e){(await G(t,e.map(t=>t.value))).s&&e.forEach(L)}function P(t){J(30,K()).forEach(n(O,t.detail))}function Q(t){M().forEach(e=>{e.checked=Boolean(t)})}let U
const Y=t=>{T(t.map(t=>t.value)).then(H).then(e=>{e.s&&t.forEach(L)})},Z=t=>{t.returnValue&&U&&(t.preventDefault(),J(30,K()).forEach(Y),e("dropitems","Destroy by AJAX"))}
function tt(){U=!U,l("ajaxifyDestroy",U)}const et=[function(){const t=s('#pCC img[src$="/folder.png"]')
if(0===t.length)return
const e=F(q(t[0]))
new z({anchor:e.nextElementSibling,props:{folders:t},target:e.parentNode}).$on("move",P)},B,function(){(()=>{const t=c('input[type="submit"]')
i(t.parentNode,"&nbsp;&nbsp;"+d("ajaxifyDestroy")),r(t.parentNode,"change",tt)})(),U=a("ajaxifyDestroy"),r(document.forms[0],"submit",Z),window.check=Q}]
function ot(){!f()&&$()&&m(et)}export default ot
//# sourceMappingURL=injectProfileDropItems-a7f41d04.js.map
