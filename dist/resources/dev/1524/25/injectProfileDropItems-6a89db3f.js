import{B as t,V as e,w as o,D as s,t as n,H as a,f as r,C as c,i,Z as l,x as f,by as m}from"./calfSystem-69dd5601.js"
import"./batch-9d8c3bf7.js"
import"./isChecked-9f10b428.js"
import{b as d}from"./simpleCheckbox-5b36aca2.js"
import"./dialogMsg-1f890a82.js"
import"./doStatTotal-5575a7a5.js"
import{S as u,i as p,s as h,e as j,t as b,a as g,b as v,c as x,d as y,f as _,g as C,h as k,l as E,n as S,j as D,r as I,k as N,m as w,o as A,p as M,q as T,u as $,v as B}from"./injectStoreItems-e1b33d21.js"
import{c as J}from"./chunk-a1c62f77.js"
import"./closest-8d8d60b3.js"
import{c as V}from"./closestTable-332ccc9b.js"
import{c as q}from"./closestTr-29c432ed.js"
import"./senditems-ac47fd87.js"
import"./daAjaxSendItemsToRecipient-337455f4.js"
import{e as F}from"./errorDialog-c0c5c278.js"
import"./indexAjaxJson-2e5777a1.js"
import"./cmdExport-88c93b51.js"
import"./guildStore-036541ca.js"
import"./getInventory-dd9651ec.js"
import"./getInventoryById-e46f5fa9.js"
function H(t,e,o){const s=t.slice()
return s[7]=e[o],s}function R(t){let e,o,s,n=t[3](t[7])+""
return{c(){e=j("option"),o=b(n),e.__value=s=t[2](t[7]),e.value=e.__value},m(t,s){g(t,e,s),v(e,o)},p(t,a){1&a&&n!==(n=t[3](t[7])+"")&&x(o,n),1&a&&s!==(s=t[2](t[7]))&&(e.__value=s,e.value=e.__value)},d(t){t&&y(e)}}}function X(t){let e,o,s,n,a,r,c,i,l,f,m,d=t[0],u=[]
for(let e=0;e<d.length;e+=1)u[e]=R(H(t,d,e))
return{c(){e=j("tr"),o=j("td"),s=j("span"),s.textContent="Move selected items to:",n=_(),a=j("select")
for(let t=0;t<u.length;t+=1)u[t].c()
r=_(),c=j("span"),c.textContent=" ",i=_(),l=j("button"),l.textContent="Move",C(a,"class","customselect"),void 0===t[1]&&w(()=>t[5].call(a)),C(l,"class","custombutton"),C(l,"type","button"),C(o,"class","fshCenter")},m(d,p){g(d,e,p),v(e,o),v(o,s),v(o,n),v(o,a)
for(let t=0;t<u.length;t+=1)u[t].m(a,null)
k(a,t[1]),v(o,r),v(o,c),v(o,i),v(o,l),f||(m=[E(a,"change",t[5]),E(l,"click",t[4])],f=!0)},p(t,[e]){if(13&e){let o
for(d=t[0],o=0;o<d.length;o+=1){const s=H(t,d,o)
u[o]?u[o].p(s,e):(u[o]=R(s),u[o].c(),u[o].m(a,null))}for(;o<u.length;o+=1)u[o].d(1)
u.length=d.length}7&e&&k(a,t[1])},i:S,o:S,d(t){t&&y(e),D(u,t),f=!1,I(m)}}}function Z(o,s,n){const a=N()
let r,{folders:c}=s
const i=t=>t.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]
return o.$$set=t=>{"folders"in t&&n(0,c=t.folders)},[c,r,i,e=>t(e.parentNode.parentNode),function(){e("dropitems","Move to Folder"),a("move",r)},function(){r=A(this),n(1,r),n(2,i),n(0,c)}]}class z extends u{constructor(t){super(),p(this,t,Z,X,h,{folders:0})}}function G(t,e){return function(t,e){return o({cmd:"profile",subcmd:"sendtofolder",folder_id:t,folderItem:e})}(t,e)}function K(){return s('[name="removeIndex[]"]:checked')}function L(t){const e=q(t)
e.nextElementSibling.remove(),e.remove()}async function O(t,e){(await G(t,e.map(t=>t.value))).s&&e.forEach(L)}function P(t){J(30,K()).forEach(n(O,t.detail))}function Q(t){M().forEach(e=>{e.checked=Boolean(t)})}let U
const W=t=>{T(t.map(t=>t.value)).then(F).then(e=>{e.s&&t.forEach(L)})},Y=t=>{t.returnValue&&U&&(t.preventDefault(),J(30,K()).forEach(W),e("dropitems","Destroy by AJAX"))}
function tt(){U=!U,l("ajaxifyDestroy",U)}const et=[function(){const t=s('#pCC img[src$="/folder.png"]')
if(0===t.length)return
const e=q(V(t[0]))
new z({anchor:e.nextElementSibling,props:{folders:t},target:e.parentNode}).$on("move",P)},B,function(){(()=>{const t=c('input[type="submit"]')
i(t.parentNode,"&nbsp;&nbsp;"+d("ajaxifyDestroy")),r(t.parentNode,"change",tt)})(),U=a("ajaxifyDestroy"),r(document.forms[0],"submit",Y),window.check=Q}]
function ot(){!f()&&$()&&m(et)}export default ot
//# sourceMappingURL=injectProfileDropItems-6a89db3f.js.map
