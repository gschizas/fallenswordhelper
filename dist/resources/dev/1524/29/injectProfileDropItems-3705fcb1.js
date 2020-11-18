import{B as e,V as t,w as o,D as s,t as n,H as a,f as r,C as c,i,Z as l,x as f,bv as m}from"./calfSystem-02c48ff5.js"
import"./batch-a00528f6.js"
import"./isChecked-92297855.js"
import{b as d}from"./simpleCheckbox-5230523e.js"
import"./dialogMsg-920f7637.js"
import"./doStatTotal-0f1280ea.js"
import{S as u,i as p,s as h,e as j,t as b,a as g,b as v,c as x,d as y,f as _,g as C,h as k,l as E,n as S,j as D,r as I,k as N,m as w,o as A,p as M,q as T,u as $,v as B}from"./injectStoreItems-753cf0c4.js"
import{c as J}from"./chunk-a86d7cea.js"
import"./closest-14c30e26.js"
import{c as V}from"./closestTable-d14a96b7.js"
import{c as q}from"./closestTr-9052729a.js"
import"./senditems-ad62e4de.js"
import"./daAjaxSendItemsToRecipient-1b140da6.js"
import{e as F}from"./errorDialog-48ca89f9.js"
import"./indexAjaxJson-afad01c3.js"
import"./cmdExport-3fceba30.js"
import"./guildStore-440c18f5.js"
import"./getInventory-4eb69e3b.js"
import"./getInventoryById-d43a2fe1.js"
function H(e,t,o){const s=e.slice()
return s[7]=t[o],s}function R(e){let t,o,s,n=e[3](e[7])+""
return{c(){t=j("option"),o=b(n),t.__value=s=e[2](e[7]),t.value=t.__value},m(e,s){g(e,t,s),v(t,o)},p(e,a){1&a&&n!==(n=e[3](e[7])+"")&&x(o,n),1&a&&s!==(s=e[2](e[7]))&&(t.__value=s,t.value=t.__value)},d(e){e&&y(t)}}}function X(e){let t,o,s,n,a,r,c,i,l,f,m,d=e[0],u=[]
for(let t=0;t<d.length;t+=1)u[t]=R(H(e,d,t))
return{c(){t=j("tr"),o=j("td"),s=j("span"),s.textContent="Move selected items to:",n=_(),a=j("select")
for(let e=0;e<u.length;e+=1)u[e].c()
r=_(),c=j("span"),c.textContent=" ",i=_(),l=j("button"),l.textContent="Move",C(a,"class","customselect"),void 0===e[1]&&w(()=>e[5].call(a)),C(l,"class","custombutton"),C(l,"type","button"),C(o,"class","fshCenter")},m(d,p){g(d,t,p),v(t,o),v(o,s),v(o,n),v(o,a)
for(let e=0;e<u.length;e+=1)u[e].m(a,null)
k(a,e[1]),v(o,r),v(o,c),v(o,i),v(o,l),f||(m=[E(a,"change",e[5]),E(l,"click",e[4])],f=!0)},p(e,[t]){if(13&t){let o
for(d=e[0],o=0;o<d.length;o+=1){const s=H(e,d,o)
u[o]?u[o].p(s,t):(u[o]=R(s),u[o].c(),u[o].m(a,null))}for(;o<u.length;o+=1)u[o].d(1)
u.length=d.length}7&t&&k(a,e[1])},i:S,o:S,d(e){e&&y(t),D(u,e),f=!1,I(m)}}}function Z(o,s,n){const a=N()
let r,{folders:c}=s
const i=e=>e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]
return o.$$set=e=>{"folders"in e&&n(0,c=e.folders)},[c,r,i,t=>e(t.parentNode.parentNode),function(){t("dropitems","Move to Folder"),a("move",r)},function(){r=A(this),n(1,r),n(2,i),n(0,c)}]}class z extends u{constructor(e){super(),p(this,e,Z,X,h,{folders:0})}}function G(e,t){return function(e,t){return o({cmd:"profile",subcmd:"sendtofolder",folder_id:e,folderItem:t})}(e,t)}function K(){return s('[name="removeIndex[]"]:checked')}function L(e){const t=q(e)
t.nextElementSibling.remove(),t.remove()}async function O(e,t){(await G(e,t.map(e=>e.value))).s&&t.forEach(L)}function P(e){J(30,K()).forEach(n(O,e.detail))}function Q(e){M().forEach(t=>{t.checked=Boolean(e)})}let U
const W=e=>{T(e.map(e=>e.value)).then(F).then(t=>{t.s&&e.forEach(L)})},Y=e=>{e.returnValue&&U&&(e.preventDefault(),J(30,K()).forEach(W),t("dropitems","Destroy by AJAX"))}
function ee(){U=!U,l("ajaxifyDestroy",U)}const te=[function(){const e=s('#pCC img[src$="/folder.png"]')
if(0===e.length)return
const t=q(V(e[0]))
new z({anchor:t.nextElementSibling,props:{folders:e},target:t.parentNode}).$on("move",P)},B,function(){(()=>{const e=c('input[type="submit"]')
i(e.parentNode,"&nbsp;&nbsp;"+d("ajaxifyDestroy")),r(e.parentNode,"change",ee)})(),U=a("ajaxifyDestroy"),r(document.forms[0],"submit",Y),window.check=Q}]
function oe(){!f()&&$()&&m(te)}export default oe
//# sourceMappingURL=injectProfileDropItems-3705fcb1.js.map
