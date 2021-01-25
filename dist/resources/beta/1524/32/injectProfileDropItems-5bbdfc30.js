import{B as t,V as e,w as o,D as s,t as n,H as a,f as r,C as c,i,Z as l,x as f,bB as m}from"./calfSystem-26bcf570.js"
import{g as d,d as u,a as p,i as h}from"./injectStoreItems-60f72070.js"
import{S as j,i as b,s as g,e as v,t as x,a as y,b as _,c as C,d as k,f as E,g as D,h as I,l as S,n as N,j as w,r as $,k as A,m as B,o as M}from"./index-66734780.js"
import{c as T}from"./chunk-b2ca1969.js"
import{c as J}from"./closestTable-fd04a72b.js"
import{c as V}from"./closestTr-51226dd2.js"
import{e as F}from"./errorDialog-56c5d78c.js"
import{b as H}from"./simpleCheckbox-f2f41121.js"
import"./daAjaxSendItemsToRecipient-5cee12e1.js"
import"./getInventoryById-248d37a6.js"
import"./getInventory-2677f641.js"
import"./cmdExport-3b45fb85.js"
import"./indexAjaxJson-4dbe92a4.js"
import"./doStatTotal-e2c231bd.js"
import"./batch-ad31c053.js"
import"./closest-331833f9.js"
import"./dialogMsg-0a235932.js"
import"./isChecked-00f5c23d.js"
function R(t,e,o){const s=t.slice()
return s[7]=e[o],s}function X(t){let e,o,s,n=t[3](t[7])+""
return{c(){e=v("option"),o=x(n),e.__value=s=t[2](t[7]),e.value=e.__value},m(t,s){y(t,e,s),_(e,o)},p(t,a){1&a&&n!==(n=t[3](t[7])+"")&&C(o,n),1&a&&s!==(s=t[2](t[7]))&&(e.__value=s,e.value=e.__value)},d(t){t&&k(e)}}}function Z(t){let e,o,s,n,a,r,c,i,l,f,m,d=t[0],u=[]
for(let e=0;e<d.length;e+=1)u[e]=X(R(t,d,e))
return{c(){e=v("tr"),o=v("td"),s=v("span"),s.textContent="Move selected items to:",n=E(),a=v("select")
for(let t=0;t<u.length;t+=1)u[t].c()
r=E(),c=v("span"),c.textContent=" ",i=E(),l=v("button"),l.textContent="Move",D(a,"class","customselect"),void 0===t[1]&&B((()=>t[5].call(a))),D(l,"class","custombutton"),D(l,"type","button"),D(o,"class","fshCenter")},m(d,p){y(d,e,p),_(e,o),_(o,s),_(o,n),_(o,a)
for(let t=0;t<u.length;t+=1)u[t].m(a,null)
I(a,t[1]),_(o,r),_(o,c),_(o,i),_(o,l),f||(m=[S(a,"change",t[5]),S(l,"click",t[4])],f=!0)},p(t,[e]){if(13&e){let o
for(d=t[0],o=0;o<d.length;o+=1){const s=R(t,d,o)
u[o]?u[o].p(s,e):(u[o]=X(s),u[o].c(),u[o].m(a,null))}for(;o<u.length;o+=1)u[o].d(1)
u.length=d.length}7&e&&I(a,t[1])},i:N,o:N,d(t){t&&k(e),w(u,t),f=!1,$(m)}}}function q(o,s,n){const a=A()
let r,{folders:c}=s
const i=t=>t.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]
return o.$$set=t=>{"folders"in t&&n(0,c=t.folders)},[c,r,i,e=>t(e.parentNode.parentNode),function(){e("dropitems","Move to Folder"),a("move",r)},function(){r=M(this),n(1,r),n(2,i),n(0,c)}]}class z extends j{constructor(t){super(),b(this,t,q,Z,g,{folders:0})}}function G(t,e){return function(t,e){return o({cmd:"profile",subcmd:"sendtofolder",folder_id:t,folderItem:e})}(t,e)}function K(){return s('[name="removeIndex[]"]:checked')}function L(t){const e=V(t)
e.nextElementSibling.remove(),e.remove()}async function O(t,e){(await G(t,e.map((t=>t.value)))).s&&e.forEach(L)}function P(t){T(30,K()).forEach(n(O,t.detail))}function Q(t){d().forEach((e=>{e.checked=Boolean(t)}))}let U
const W=t=>{u(t.map((t=>t.value))).then(F).then((e=>{e.s&&t.forEach(L)}))},Y=t=>{t.returnValue&&U&&(t.preventDefault(),T(30,K()).forEach(W),e("dropitems","Destroy by AJAX"))}
function tt(){U=!U,l("ajaxifyDestroy",U)}const et=[function(){const t=s('#pCC img[src$="/folder.png"]')
if(0===t.length)return
const e=V(J(t[0]))
new z({anchor:e.nextElementSibling,props:{folders:t},target:e.parentNode}).$on("move",P)},h,function(){(()=>{const t=c('input[type="submit"]')
i(t.parentNode,`&nbsp;&nbsp;${H("ajaxifyDestroy")}`),r(t.parentNode,"change",tt)})(),U=a("ajaxifyDestroy"),r(document.forms[0],"submit",Y),window.check=Q}]
function ot(){!f()&&p()&&m(et)}export default ot
//# sourceMappingURL=injectProfileDropItems-5bbdfc30.js.map
