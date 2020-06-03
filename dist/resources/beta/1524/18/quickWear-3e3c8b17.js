import{k as t,s as n,f as r,z as a,L as e,b3 as s,c as o,aB as i,bH as c,i as f,bI as d,l as m,bf as u,j as l,D as p,p as h,o as b,aC as j,W as k,S as $,y as g}from"./calfSystem-4197cc22.js"
import{i as L}from"./isArray-32682e84.js"
import"./toLowerCase-1fa49c12.js"
import{c as y}from"./createInput-c03bcf66.js"
import{c as w}from"./createLabel-0cfa24d3.js"
import{c as C}from"./createUl-57f7af43.js"
import"./isChecked-3260d105.js"
import{b as E}from"./simpleCheckbox-8187e065.js"
import"./alpha-875d8a68.js"
import{c as x}from"./createTBody-c586129b.js"
import{c as I}from"./createTable-5f6ce6ed.js"
import"./dialogMsg-bddf61a2.js"
import{p as S,s as A}from"./pubsub-71d92e12.js"
import{c as H}from"./createLi-35e5de37.js"
import"./errorDialog-575dfa0d.js"
import{j as N}from"./jConfirm-456f691e.js"
import"./dialog-25ddd658.js"
import"./indexAjaxJson-914501b6.js"
import{u as v,e as W}from"./useItem-76cb3934.js"
import"./ajaxReturnCode-c4f90575.js"
import"./daUseItem-313a8379.js"
import{m as Q}from"./makeFolderSpan-96cb02cb.js"
import{e as q}from"./eventHandler5-0f5bd8d5.js"
import{t as P}from"./toggleForce-de86eac9.js"
import{s as U}from"./selfIdIs-6f09b38b.js"
import{a as M}from"./stringSort-cf19df2c.js"
import{d as T}from"./daLoadInventory-9eba6ae2.js"
import{h as B}from"./hasClasses-9a0b980c.js"
const F=(t,n)=>t+String(n)
function O(t,n,r){return y({checked:0===r,id:F(t,r),name:t,type:"radio"})}function D(t,n,a,s){const o=H({className:"ui-state-default ui-corner-top"})
return r(o,w({htmlFor:F(t,s),innerHTML:a})),0!==s&&e(o,"click",()=>{S(F(t,s),n[s])}),o}const _=()=>t({className:"ui-tabs-panel ui-corner-bottom"})
function R(e,s,o){const i=t({className:"fshTabSet ui-tabs ui-widget-content ui-corner-all"}),c=n(r,i)
s.map(n(O,o)).forEach(c)
const f=s.map(_)
S(F(o,0),f[0])
const d=function(t,a,e){const s=C({className:"ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"})
return t.map(n(D,a,e)).forEach(n(r,s)),s}(s,o,f)
return S(o+"-header",d),r(i,d),f.forEach(c),a("",e),r(e,i),0}function z(t,n,r){const e=t.insertRow(-1)
r.dom=e
let s="fshEq ",o="fshUse "
r.t<9?s+="smallLink":s+="notLink",o+=function(t){return-1!==[10,12,15,16].indexOf(t.t)||"Zombie Coffin"===t.n?"smallLink":"notLink"}(r),a(`<td class="fshCenter"><span class="${s}" data-itemid="${r.a}">Wear</span>&nbsp;|&nbsp;<span class="${o}" data-itemid="${r.a}">Use/Ext</span></td><td><img src="${function(t){let n=i
return 13699===t.b?n+=`composing/${t.extra.design}_${t.extra.color}.png`:n+=`items/${t.b}.gif`,n}(r)}" class="tip-dynamic" data-tipped="fetchitem.php?item_id=${r.b}&amp;inv_id=${r.a}&amp;t=1&amp;p=${n}&amp;currentPlayerId=${n}" width="30" height="30" border="0"></td><td width="90%">&nbsp;${r.n}</td>`,e)}function G(t){return Q(String(t.id),t.name)}function J(t){return Q("0","All")+t.r.map(G).join("")}function Z(t,r,a){a.items.sort(M).forEach(n(z,t,r))}function K(t){const a=I({width:"100%",innerHTML:`<thead><tr><th class="fshCenter" colspan="3">${J(t)}</th></tr><tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th><th colspan="2">Items</th></tr></thead>`}),e=x()
return r(a,e),o.sortBy="n",o.sortAsc=!0,t.r.forEach(n(Z,e,s())),a}function V(n){const a=K(n),e=t()
return r(e,a),e}function X(t,n){return`<a href="${u}${t}">${n}</a>`}function Y(t){return t[1].nicknameList.length>0}function tt(t){return`<tr><td>${t[0]}</td><td>${t[1].nicknameList.map(n(X,t[0])).join(" ")}</td><td>${t[1].count}</td><td></td><td></td></tr>`}function nt(t){return t.displayOnAH&&!t.found}function rt(t){return X(t.searchname,t.nickname)}function at(t){return 0===t[1].nicknameList.length}function et(t){return`<tr><td>${t[0]}</td><td></td><td>${t[1].count}</td><td></td><td></td></tr>`}function st(t,n){return`<table width="100%" cellspacing="2" cellpadding="2"><thead><tr><th colspan="5" class="fshCenter">Items from <a href="${d}">AH Quick Search</a> found in your inventory</th></tr><tr><th>Name</th><th>Nick Name</th><th>Inv Count</th><th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>${function(t){return m(t).filter(Y).map(tt).join("")}(t)}<tr><td colspan="5"><hr></td></tr><tr><td>Did not find:</td><td colspan="4">${function(t){return t.filter(nt).map(rt).join(", ")}(n)}</td></tr><tr><td colspan="5"><hr></td></tr></tbody><thead><tr><th colspan="5" class="fshCenter">Items NOT from <a href="${d}">AH Quick Search</a> found in your inventory</td></thead><tbody>${function(t){return m(t).filter(at).map(et).join("")}(t)}</tbody></table>`}function ot(t,n,r){n===r.searchname&&(r.found=!0,t[n].nicknameList.indexOf(r.nickname)<0&&t[n].nicknameList.push(r.nickname))}function it(t,r,a){const e=a.n
!function(t,n){t[n]?t[n].count+=1:t[n]={count:1,nicknameList:[]}}(t,e),r.forEach(n(ot,t,e))}function ct(t,r,a){a.items.forEach(n(it,t,r))}function ft(r){const a={},e=c("quickSearchList")||[]
r.r.forEach(n(ct,a,e))
const s=t()
return f(s,st(a,e)),s}let dt,mt
function ut(t,n,r){0===r.r&&a(`<span class="fastWorn">${n}</span>`,t.parentNode)}function lt(t,r,a){$("QuickWear","doAction - "+a),g("",t),t.classList.remove("smallLink"),t.classList.add("fshSpinner","fshSpin12"),r(t.dataset.itemid).then(n(ut,t,a))}function pt(t){lt(t,v,"Used")}function ht(t){dt?pt(t):N("Use/Extract Item","Are you sure you want to use/extract the item?",n(pt,t))}function bt(t){lt(t,W,"Worn")}function jt(t,n,r){const a=r.dom
if("0"===t)a.classList.remove("fshHide")
else{const r=t!==n.toString()
P(a,r)}}function kt(t,r){const a=r.id
r.items.forEach(n(jt,t,a))}function $t(t){const r=t.dataset.folder
mt.r.forEach(n(kt,r))}function gt(){dt=!dt,k("disableQuickWearPrompts",dt)}function Lt(n){r(n,t({className:"qwPref",innerHTML:E("disableQuickWearPrompts")}))}function yt(t,n,a){r(a,t(n))}function wt(t,r){A("qwtab-header",Lt),A("qwtab0",n(yt,V,r)),A("qwtab1",n(yt,ft,r)),R(t,["Quick Wear / Use / Extract<br>Manager","Inventory Manager Counter<br>filtered by AH Quick Search"],"qwtab"),b(t,q([[n(B,["smallLink","fshEq"]),bt],[n(B,["smallLink","fshUse"]),ht],[n(j,"fshFolder"),$t],[U("disableQuickWearPrompts"),gt]]))}function Ct(t,n){(function(t){return t&&t.s&&L(t.r)})(n)&&(mt=n,wt(t,n))}export default function(t){l()&&function(t){const r=t||h
r&&(f(r,"Getting item list from backpack..."),T().then(n(Ct,r)),dt=p("disableQuickWearPrompts"))}(t)}
//# sourceMappingURL=quickWear-3e3c8b17.js.map
