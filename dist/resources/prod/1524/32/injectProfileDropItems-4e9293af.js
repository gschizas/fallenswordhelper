import{B as e,V as t,w as o,D as s,t as n,H as a,f as r,C as c,i,Z as f,x as l,by as d}from"./calfSystem-45544049.js"
import{g as m,d as u,a as p,i as h}from"./injectStoreItems-1e1fa86e.js"
import{S as j,i as g,s as b,e as v,t as x,a as y,b as _,c as C,d as k,f as E,g as D,h as I,l as S,n as N,j as w,r as $,k as A,m as M,o as T}from"./index-66734780.js"
import{c as B}from"./chunk-b2ca1969.js"
import{c as J}from"./closestTable-fdf2cb5f.js"
import{c as V}from"./closestTr-709cb52e.js"
import{e as F}from"./errorDialog-56c5d78c.js"
import{b as H}from"./simpleCheckbox-30d3f70c.js"
import"./daAjaxSendItemsToRecipient-de531197.js"
import"./getInventoryById-610482ff.js"
import"./getInventory-3b08d027.js"
import"./cmdExport-4fdfd8a3.js"
import"./indexAjaxJson-e79ad7ee.js"
import"./doStatTotal-c1750c57.js"
import"./batch-62de3d3c.js"
import"./closest-331833f9.js"
import"./dialogMsg-0a235932.js"
import"./isChecked-00f5c23d.js"
function R(e,t,o){const s=e.slice()
return s[7]=t[o],s}function X(e){let t,o,s,n=e[3](e[7])+""
return{c(){t=v("option"),o=x(n),t.__value=s=e[2](e[7]),t.value=t.__value},m(e,s){y(e,t,s),_(t,o)},p(e,a){1&a&&n!==(n=e[3](e[7])+"")&&C(o,n),1&a&&s!==(s=e[2](e[7]))&&(t.__value=s,t.value=t.__value)},d(e){e&&k(t)}}}function Z(e){let t,o,s,n,a,r,c,i,f,l,d,m=e[0],u=[]
for(let t=0;t<m.length;t+=1)u[t]=X(R(e,m,t))
return{c(){t=v("tr"),o=v("td"),s=v("span"),s.textContent="Move selected items to:",n=E(),a=v("select")
for(let e=0;e<u.length;e+=1)u[e].c()
r=E(),c=v("span"),c.textContent=" ",i=E(),f=v("button"),f.textContent="Move",D(a,"class","customselect"),void 0===e[1]&&M((()=>e[5].call(a))),D(f,"class","custombutton"),D(f,"type","button"),D(o,"class","fshCenter")},m(m,p){y(m,t,p),_(t,o),_(o,s),_(o,n),_(o,a)
for(let e=0;e<u.length;e+=1)u[e].m(a,null)
I(a,e[1]),_(o,r),_(o,c),_(o,i),_(o,f),l||(d=[S(a,"change",e[5]),S(f,"click",e[4])],l=!0)},p(e,[t]){if(13&t){let o
for(m=e[0],o=0;o<m.length;o+=1){const s=R(e,m,o)
u[o]?u[o].p(s,t):(u[o]=X(s),u[o].c(),u[o].m(a,null))}for(;o<u.length;o+=1)u[o].d(1)
u.length=m.length}7&t&&I(a,e[1])},i:N,o:N,d(e){e&&k(t),w(u,e),l=!1,$(d)}}}function q(o,s,n){const a=A()
let r,{folders:c}=s
const i=e=>e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]
return o.$$set=e=>{"folders"in e&&n(0,c=e.folders)},[c,r,i,t=>e(t.parentNode.parentNode),function(){t("dropitems","Move to Folder"),a("move",r)},function(){r=T(this),n(1,r),n(2,i),n(0,c)}]}class z extends j{constructor(e){super(),g(this,e,q,Z,b,{folders:0})}}function G(e,t){return function(e,t){return o({cmd:"profile",subcmd:"sendtofolder",folder_id:e,folderItem:t})}(e,t)}function K(){return s('[name="removeIndex[]"]:checked')}function L(e){const t=V(e)
t.nextElementSibling.remove(),t.remove()}async function O(e,t){(await G(e,t.map((e=>e.value)))).s&&t.forEach(L)}function P(e){B(30,K()).forEach(n(O,e.detail))}function Q(e){m().forEach((t=>{t.checked=Boolean(e)}))}let U
const W=e=>{u(e.map((e=>e.value))).then(F).then((t=>{t.s&&e.forEach(L)}))},Y=e=>{e.returnValue&&U&&(e.preventDefault(),B(30,K()).forEach(W),t("dropitems","Destroy by AJAX"))}
function ee(){U=!U,f("ajaxifyDestroy",U)}const te=[function(){const e=s('#pCC img[src$="/folder.png"]')
if(0===e.length)return
const t=V(J(e[0]))
new z({anchor:t.nextElementSibling,props:{folders:e},target:t.parentNode}).$on("move",P)},h,function(){(()=>{const e=c('input[type="submit"]')
i(e.parentNode,`&nbsp;&nbsp;${H("ajaxifyDestroy")}`),r(e.parentNode,"change",ee)})(),U=a("ajaxifyDestroy"),r(document.forms[0],"submit",Y),window.check=Q}]
function oe(){!l()&&p()&&d(te)}export default oe
//# sourceMappingURL=injectProfileDropItems-4e9293af.js.map
