import{k as t,s as n,f as a,z as e,L as r,b8 as s,c as o,aG as i,bI as c,i as f,bJ as d,l as m,bj as u,j as l,D as h,M as p,p as b,o as j,aH as k,X as $,T as g,y as L}from"./calfSystem-1c103624.js"
import"./toLowerCase-9f60cfa4.js"
import{c as y}from"./createInput-7f1f4562.js"
import{c as w}from"./createLabel-da6d9667.js"
import{c as E}from"./createUl-16e74031.js"
import"./isChecked-acff895a.js"
import{b as x}from"./simpleCheckbox-195e8c73.js"
import"./alpha-71a6f0bf.js"
import{c as C}from"./createTBody-063a5f27.js"
import{c as I}from"./createTable-930c2471.js"
import"./dialogMsg-d0fce5cd.js"
import{p as H,s as S}from"./pubsub-944031bd.js"
import{c as A}from"./createLi-04a1a597.js"
import"./errorDialog-3ded88bf.js"
import{j as N}from"./jConfirm-dcf37b4e.js"
import"./dialog-5bdfcc8e.js"
import"./indexAjaxJson-ed231bc3.js"
import{u as v,e as Q}from"./useItem-c7484c7e.js"
import"./ajaxReturnCode-9f3bc5f9.js"
import"./daUseItem-81f661aa.js"
import{m as W}from"./makeFolderSpan-d7ca60af.js"
import{e as q}from"./eventHandler5-130c1d57.js"
import{t as M}from"./toggleForce-43e39379.js"
import{s as P}from"./selfIdIs-f0ae0978.js"
import{a as T}from"./stringSort-2a8c9e9b.js"
import{d as U}from"./daLoadInventory-628afb91.js"
import{h as F}from"./hasClasses-d4672d50.js"
const O=(t,n)=>t+String(n)
function B(t,n,a){return y({checked:0===a,id:O(t,a),name:t,type:"radio"})}function D(t,n,e,s){const o=A({className:"ui-state-default ui-corner-top"})
return a(o,w({htmlFor:O(t,s),innerHTML:e})),0!==s&&r(o,"click",()=>{H(O(t,s),n[s])}),o}const _=()=>t({className:"ui-tabs-panel ui-corner-bottom"})
function G(r,s,o){const i=t({className:"fshTabSet ui-tabs ui-widget-content ui-corner-all"}),c=n(a,i)
s.map(n(B,o)).forEach(c)
const f=s.map(_)
H(O(o,0),f[0])
const d=function(t,e,r){const s=E({className:"ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"})
return t.map(n(D,e,r)).forEach(n(a,s)),s}(s,o,f)
return H(o+"-header",d),a(i,d),f.forEach(c),e("",r),a(r,i),0}function J(t,n,a){const r=t.insertRow(-1)
a.dom=r
let s="fshEq ",o="fshUse "
a.t<9?s+="smallLink":s+="notLink",o+=function(t){return-1!==[10,12,15,16].indexOf(t.t)||"Zombie Coffin"===t.n?"smallLink":"notLink"}(a),e(`<td class="fshCenter"><span class="${s}" data-itemid="${a.a}">Wear</span>&nbsp;|&nbsp;<span class="${o}" data-itemid="${a.a}">Use/Ext</span></td><td><img src="${function(t){let n=i
return 13699===t.b?n+=`composing/${t.extra.design}_${t.extra.color}.png`:n+=`items/${t.b}.gif`,n}(a)}" class="tip-dynamic" data-tipped="fetchitem.php?item_id=${a.b}&amp;inv_id=${a.a}&amp;t=1&amp;p=${n}&amp;currentPlayerId=${n}" width="30" height="30" border="0"></td><td width="90%">&nbsp;${a.n}</td>`,r)}function R(t){return W(String(t.id),t.name)}function z(t){return W("0","All")+t.r.map(R).join("")}function X(t,a,e){e.items.sort(T).forEach(n(J,t,a))}function Z(t){const e=I({width:"100%",innerHTML:`<thead><tr><th class="fshCenter" colspan="3">${z(t)}</th></tr><tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th><th colspan="2">Items</th></tr></thead>`}),r=C()
return a(e,r),o.sortBy="n",o.sortAsc=!0,t.r.forEach(n(X,r,s())),e}function K(n){const e=Z(n),r=t()
return a(r,e),r}function V(t,n){return`<a href="${u}${t}">${n}</a>`}function Y(t){return t[1].nicknameList.length>0}function tt(t){return`<tr><td>${t[0]}</td><td>${t[1].nicknameList.map(n(V,t[0])).join(" ")}</td><td>${t[1].count}</td><td></td><td></td></tr>`}function nt(t){return t.displayOnAH&&!t.found}function at(t){return V(t.searchname,t.nickname)}function et(t){return 0===t[1].nicknameList.length}function rt(t){return`<tr><td>${t[0]}</td><td></td><td>${t[1].count}</td><td></td><td></td></tr>`}function st(t,n){return`<table width="100%" cellspacing="2" cellpadding="2"><thead><tr><th colspan="5" class="fshCenter">Items from <a href="${d}">AH Quick Search</a> found in your inventory</th></tr><tr><th>Name</th><th>Nick Name</th><th>Inv Count</th><th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>${function(t){return m(t).filter(Y).map(tt).join("")}(t)}<tr><td colspan="5"><hr></td></tr><tr><td>Did not find:</td><td colspan="4">${function(t){return t.filter(nt).map(at).join(", ")}(n)}</td></tr><tr><td colspan="5"><hr></td></tr></tbody><thead><tr><th colspan="5" class="fshCenter">Items NOT from <a href="${d}">AH Quick Search</a> found in your inventory</td></thead><tbody>${function(t){return m(t).filter(et).map(rt).join("")}(t)}</tbody></table>`}function ot(t,n,a){n===a.searchname&&(a.found=!0,t[n].nicknameList.indexOf(a.nickname)<0&&t[n].nicknameList.push(a.nickname))}function it(t,a,e){const r=e.n
!function(t,n){t[n]?t[n].count+=1:t[n]={count:1,nicknameList:[]}}(t,r),a.forEach(n(ot,t,r))}function ct(t,a,e){e.items.forEach(n(it,t,a))}function ft(a){const e={},r=c("quickSearchList")||[]
a.r.forEach(n(ct,e,r))
const s=t()
return f(s,st(e,r)),s}let dt,mt
function ut(t,n,a){0===a.r&&e(`<span class="fastWorn">${n}</span>`,t.parentNode)}function lt(t,a,e){g("QuickWear","doAction - "+e),L("",t),t.classList.remove("smallLink"),t.classList.add("fshSpinner","fshSpin12"),a(t.dataset.itemid).then(n(ut,t,e))}function ht(t){lt(t,v,"Used")}function pt(t){dt?ht(t):N("Use/Extract Item","Are you sure you want to use/extract the item?",n(ht,t))}function bt(t){lt(t,Q,"Worn")}function jt(t,n,a){const e=a.dom
if("0"===t)e.classList.remove("fshHide")
else{const a=t!==n.toString()
M(e,a)}}function kt(t,a){const e=a.id
a.items.forEach(n(jt,t,e))}function $t(t){const a=t.dataset.folder
mt.r.forEach(n(kt,a))}function gt(){dt=!dt,$("disableQuickWearPrompts",dt)}function Lt(n){a(n,t({className:"qwPref",innerHTML:x("disableQuickWearPrompts")}))}function yt(t,n,e){a(e,t(n))}function wt(t,a){S("qwtab-header",Lt),S("qwtab0",n(yt,K,a)),S("qwtab1",n(yt,ft,a)),G(t,["Quick Wear / Use / Extract<br>Manager","Inventory Manager Counter<br>filtered by AH Quick Search"],"qwtab"),j(t,q([[n(F,["smallLink","fshEq"]),bt],[n(F,["smallLink","fshUse"]),pt],[n(k,"fshFolder"),$t],[P("disableQuickWearPrompts"),gt]]))}function Et(t,n){(function(t){return t&&t.s&&p(t.r)})(n)&&(mt=n,wt(t,n))}export default function(t){l()&&function(t){const a=t||b
a&&(f(a,"Getting item list from backpack..."),U().then(n(Et,a)),dt=h("disableQuickWearPrompts"))}(t)}
//# sourceMappingURL=quickWear-d6b0fb2c.js.map
