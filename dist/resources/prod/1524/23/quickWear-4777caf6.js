import{m as t,t as n,h as e,A as a,O as r,b0 as s,c as o,aD as i,bx as c,i as f,by as d,e as m,bc as u,j as l,G as h,p,o as b,l as j,Y as k,U as $,z as g}from"./calfSystem-019de1cf.js"
import{i as L}from"./isArray-de90de98.js"
import"./toLowerCase-dda30e6b.js"
import{c as y}from"./createInput-939428fe.js"
import{c as w}from"./createLabel-eacd9ffb.js"
import{c as E}from"./createUl-80b6130b.js"
import"./isChecked-8ee9db43.js"
import{b as x}from"./simpleCheckbox-4d2b1b22.js"
import"./alpha-ec0cb412.js"
import{c as A}from"./createTBody-6692ad3f.js"
import{c as C}from"./createTable-dfd6f8aa.js"
import"./dialogMsg-16e7e1c1.js"
import{p as I,s as S}from"./pubsub-4fffa4ae.js"
import{c as H}from"./createLi-ff517651.js"
import"./errorDialog-7f431a39.js"
import"./indexAjaxJson-d1b1f9ac.js"
import{t as N}from"./toggleForce-7d757ba6.js"
import{a as v}from"./stringSort-79797248.js"
import{j as Q}from"./jConfirm-5965c911.js"
import"./daUseItem-50349bce.js"
import{e as U}from"./eventHandler5-ba5b543f.js"
import{s as W}from"./selfIdIs-4d8c0d2b.js"
import{m as q}from"./makeFolderSpan-b87628a5.js"
import{d as P}from"./daLoadInventory-70ffba51.js"
import"./dialog-2e17f157.js"
import{u as M,e as T}from"./useItem-b39e6dcf.js"
import{h as O}from"./hasClasses-9f24cb18.js"
const F=(t,n)=>t+String(n)
function B(t,n,e){return y({checked:0===e,id:F(t,e),name:t,type:"radio"})}function D(t,n,a,s){const o=H({className:"ui-state-default ui-corner-top"})
return e(o,w({htmlFor:F(t,s),innerHTML:a})),0!==s&&r(o,"click",()=>{I(F(t,s),n[s])}),o}const _=()=>t({className:"ui-tabs-panel ui-corner-bottom"})
function G(r,s,o){const i=t({className:"fshTabSet ui-tabs ui-widget-content ui-corner-all"}),c=n(e,i)
s.map(n(B,o)).forEach(c)
const f=s.map(_)
I(F(o,0),f[0])
const d=function(t,a,r){const s=E({className:"ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"})
return t.map(n(D,a,r)).forEach(n(e,s)),s}(s,o,f)
return I(o+"-header",d),e(i,d),f.forEach(c),a("",r),e(r,i),0}function z(t,n,e){const r=t.insertRow(-1)
e.dom=r
let s="fshEq ",o="fshUse "
e.t<9?s+="smallLink":s+="notLink",o+=function(t){return-1!==[10,12,15,16].indexOf(t.t)||"Zombie Coffin"===t.n?"smallLink":"notLink"}(e),a(`<td class="fshCenter"><span class="${s}" data-itemid="${e.a}">Wear</span>&nbsp;|&nbsp;<span class="${o}" data-itemid="${e.a}">Use/Ext</span></td><td><img src="${function(t){let n=i
return 13699===t.b?n+=`composing/${t.extra.design}_${t.extra.color}.png`:n+=`items/${t.b}.gif`,n}(e)}" class="tip-dynamic" data-tipped="fetchitem.php?item_id=${e.b}&amp;inv_id=${e.a}&amp;t=1&amp;p=${n}&amp;currentPlayerId=${n}" width="30" height="30" border="0"></td><td width="90%">&nbsp;${e.n}</td>`,r)}function J(t){return q(String(t.id),t.name)}function R(t){return q("0","All")+t.r.map(J).join("")}function Y(t,e,a){a.items.sort(v).forEach(n(z,t,e))}function Z(t){const a=C({width:"100%",innerHTML:`<thead><tr><th class="fshCenter" colspan="3">${R(t)}</th></tr><tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th><th colspan="2">Items</th></tr></thead>`}),r=A()
return e(a,r),o.sortBy="n",o.sortAsc=!0,t.r.forEach(n(Y,r,s())),a}function K(n){const a=Z(n),r=t()
return e(r,a),r}function V(t,n){return`<a href="${u}${t}">${n}</a>`}function X(t){return t[1].nicknameList.length>0}function tt(t){return`<tr><td>${t[0]}</td><td>${t[1].nicknameList.map(n(V,t[0])).join(" ")}</td><td>${t[1].count}</td><td></td><td></td></tr>`}function nt(t){return t.displayOnAH&&!t.found}function et(t){return V(t.searchname,t.nickname)}function at(t){return 0===t[1].nicknameList.length}function rt(t){return`<tr><td>${t[0]}</td><td></td><td>${t[1].count}</td><td></td><td></td></tr>`}function st(t,n){return`<table width="100%" cellspacing="2" cellpadding="2"><thead><tr><th colspan="5" class="fshCenter">Items from <a href="${d}">AH Quick Search</a> found in your inventory</th></tr><tr><th>Name</th><th>Nick Name</th><th>Inv Count</th><th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>${function(t){return m(t).filter(X).map(tt).join("")}(t)}<tr><td colspan="5"><hr></td></tr><tr><td>Did not find:</td><td colspan="4">${function(t){return t.filter(nt).map(et).join(", ")}(n)}</td></tr><tr><td colspan="5"><hr></td></tr></tbody><thead><tr><th colspan="5" class="fshCenter">Items NOT from <a href="${d}">AH Quick Search</a> found in your inventory</td></thead><tbody>${function(t){return m(t).filter(at).map(rt).join("")}(t)}</tbody></table>`}function ot(t,n,e){n===e.searchname&&(e.found=!0,t[n].nicknameList.indexOf(e.nickname)<0&&t[n].nicknameList.push(e.nickname))}function it(t,e,a){const r=a.n
!function(t,n){t[n]?t[n].count+=1:t[n]={count:1,nicknameList:[]}}(t,r),e.forEach(n(ot,t,r))}function ct(t,e,a){a.items.forEach(n(it,t,e))}function ft(e){const a={},r=c("quickSearchList")||[]
e.r.forEach(n(ct,a,r))
const s=t()
return f(s,st(a,r)),s}let dt,mt
function ut(t,n,e){0===e.r&&a(`<span class="fastWorn">${n}</span>`,t.parentNode)}function lt(t,e,a){$("QuickWear","doAction - "+a),g("",t),t.classList.remove("smallLink"),t.classList.add("fshSpinner","fshSpin12"),e(t.dataset.itemid).then(n(ut,t,a))}function ht(t){lt(t,M,"Used")}function pt(t){dt?ht(t):Q("Use/Extract Item","Are you sure you want to use/extract the item?",n(ht,t))}function bt(t){lt(t,T,"Worn")}function jt(t,n,e){const a=e.dom
if("0"===t)a.classList.remove("fshHide")
else{const e=t!==n.toString()
N(a,e)}}function kt(t,e){const a=e.id
e.items.forEach(n(jt,t,a))}function $t(t){const e=t.dataset.folder
mt.r.forEach(n(kt,e))}function gt(){dt=!dt,k("disableQuickWearPrompts",dt)}function Lt(n){e(n,t({className:"qwPref",innerHTML:x("disableQuickWearPrompts")}))}function yt(t,n,a){e(a,t(n))}function wt(t,e){S("qwtab-header",Lt),S("qwtab0",n(yt,K,e)),S("qwtab1",n(yt,ft,e)),G(t,["Quick Wear / Use / Extract<br>Manager","Inventory Manager Counter<br>filtered by AH Quick Search"],"qwtab"),b(t,U([[n(O,["smallLink","fshEq"]),bt],[n(O,["smallLink","fshUse"]),pt],[n(j,"fshFolder"),$t],[W("disableQuickWearPrompts"),gt]]))}function Et(t,n){(function(t){return t&&t.s&&L(t.r)})(n)&&(mt=n,wt(t,n))}export default function(t){l()&&function(t){const e=t||p
e&&(f(e,"Getting item list from backpack..."),P().then(n(Et,e)),dt=h("disableQuickWearPrompts"))}(t)}
//# sourceMappingURL=quickWear-4777caf6.js.map
