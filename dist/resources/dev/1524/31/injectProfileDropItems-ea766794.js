import{B as e,V as t,w as o,D as s,t as n,H as a,f as r,C as c,i,Z as l,x as f,bD as m}from"./calfSystem-393ab895.js"
import{S as d,i as u,s as p,e as h,t as b,a as j,b as g,c as v,d as x,f as y,g as _,h as C,l as k,n as D,j as E,r as S,k as I,m as N,o as w,p as $,q as A,u as M,v as T}from"./injectStoreItems-c28afe37.js"
import{c as B}from"./chunk-a5250b9a.js"
import{c as J}from"./closestTable-820f3aaf.js"
import{c as V}from"./closestTr-e70c5c37.js"
import{e as q}from"./errorDialog-9d880b0d.js"
import{b as F}from"./simpleCheckbox-649df0f1.js"
import"./daAjaxSendItemsToRecipient-f2c7727d.js"
import"./senditems-6bc595ab.js"
import"./getInventoryById-ed6dc7be.js"
import"./getInventory-55e989a6.js"
import"./guildStore-e2a17b6e.js"
import"./cmdExport-ef0399c5.js"
import"./indexAjaxJson-f78a3fe6.js"
import"./doStatTotal-2c67bbbb.js"
import"./batch-28b89a64.js"
import"./closest-77701dcf.js"
import"./dialogMsg-844edf4e.js"
import"./isChecked-1c18cd61.js"
function H(e,t,o){const s=e.slice()
return s[7]=t[o],s}function R(e){let t,o,s,n=e[3](e[7])+""
return{c(){t=h("option"),o=b(n),t.__value=s=e[2](e[7]),t.value=t.__value},m(e,s){j(e,t,s),g(t,o)},p(e,a){1&a&&n!==(n=e[3](e[7])+"")&&v(o,n),1&a&&s!==(s=e[2](e[7]))&&(t.__value=s,t.value=t.__value)},d(e){e&&x(t)}}}function X(e){let t,o,s,n,a,r,c,i,l,f,m,d=e[0],u=[]
for(let t=0;t<d.length;t+=1)u[t]=R(H(e,d,t))
return{c(){t=h("tr"),o=h("td"),s=h("span"),s.textContent="Move selected items to:",n=y(),a=h("select")
for(let e=0;e<u.length;e+=1)u[e].c()
r=y(),c=h("span"),c.textContent=" ",i=y(),l=h("button"),l.textContent="Move",_(a,"class","customselect"),void 0===e[1]&&N((()=>e[5].call(a))),_(l,"class","custombutton"),_(l,"type","button"),_(o,"class","fshCenter")},m(d,p){j(d,t,p),g(t,o),g(o,s),g(o,n),g(o,a)
for(let e=0;e<u.length;e+=1)u[e].m(a,null)
C(a,e[1]),g(o,r),g(o,c),g(o,i),g(o,l),f||(m=[k(a,"change",e[5]),k(l,"click",e[4])],f=!0)},p(e,[t]){if(13&t){let o
for(d=e[0],o=0;o<d.length;o+=1){const s=H(e,d,o)
u[o]?u[o].p(s,t):(u[o]=R(s),u[o].c(),u[o].m(a,null))}for(;o<u.length;o+=1)u[o].d(1)
u.length=d.length}7&t&&C(a,e[1])},i:D,o:D,d(e){e&&x(t),E(u,e),f=!1,S(m)}}}function Z(o,s,n){const a=I()
let r,{folders:c}=s
const i=e=>e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]
return o.$$set=e=>{"folders"in e&&n(0,c=e.folders)},[c,r,i,t=>e(t.parentNode.parentNode),function(){t("dropitems","Move to Folder"),a("move",r)},function(){r=w(this),n(1,r),n(2,i),n(0,c)}]}class z extends d{constructor(e){super(),u(this,e,Z,X,p,{folders:0})}}function G(e,t){return function(e,t){return o({cmd:"profile",subcmd:"sendtofolder",folder_id:e,folderItem:t})}(e,t)}function K(){return s('[name="removeIndex[]"]:checked')}function L(e){const t=V(e)
t.nextElementSibling.remove(),t.remove()}async function O(e,t){(await G(e,t.map((e=>e.value)))).s&&t.forEach(L)}function P(e){B(30,K()).forEach(n(O,e.detail))}function Q(e){$().forEach((t=>{t.checked=Boolean(e)}))}let U
const W=e=>{A(e.map((e=>e.value))).then(q).then((t=>{t.s&&e.forEach(L)}))},Y=e=>{e.returnValue&&U&&(e.preventDefault(),B(30,K()).forEach(W),t("dropitems","Destroy by AJAX"))}
function ee(){U=!U,l("ajaxifyDestroy",U)}const te=[function(){const e=s('#pCC img[src$="/folder.png"]')
if(0===e.length)return
const t=V(J(e[0]))
new z({anchor:t.nextElementSibling,props:{folders:e},target:t.parentNode}).$on("move",P)},T,function(){(()=>{const e=c('input[type="submit"]')
i(e.parentNode,`&nbsp;&nbsp;${F("ajaxifyDestroy")}`),r(e.parentNode,"change",ee)})(),U=a("ajaxifyDestroy"),r(document.forms[0],"submit",Y),window.check=Q}]
function oe(){!f()&&M()&&m(te)}export default oe
//# sourceMappingURL=injectProfileDropItems-ea766794.js.map
