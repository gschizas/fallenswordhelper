import{m as t,t as n,h as e,A as r,O as a,b7 as s,c as o,aH as i,bE as c,i as f,bF as d,e as m,bj as u,j as l,G as h,P as p,p as b,o as j,l as k,Z as $,V as g,z as L}from"./calfSystem-9c7241dc.js"
import"./toLowerCase-9b533dae.js"
import{c as y}from"./createInput-6e753077.js"
import{c as w}from"./createLabel-b61df810.js"
import{c as E}from"./createUl-4c283c28.js"
import"./isChecked-6dfc89f5.js"
import{b as x}from"./simpleCheckbox-6241d838.js"
import"./alpha-21b3b885.js"
import{c as A}from"./createTBody-146954cc.js"
import{c as C}from"./createTable-711dc1b7.js"
import"./dialogMsg-b559bd6b.js"
import{p as H,s as I}from"./pubsub-cca21189.js"
import{c as S}from"./createLi-064eff10.js"
import"./errorDialog-48c0f67b.js"
import"./indexAjaxJson-82fdd15d.js"
import{t as N}from"./toggleForce-5f56c364.js"
import{a as v}from"./stringSort-a22c9e0b.js"
import{j as P}from"./jConfirm-08e79955.js"
import"./daUseItem-d9050f10.js"
import{e as Q}from"./eventHandler5-6f9d400f.js"
import{s as W}from"./selfIdIs-7002309a.js"
import{m as q}from"./makeFolderSpan-4674fa28.js"
import{d as U}from"./daLoadInventory-4f13e19a.js"
import"./dialog-be45be25.js"
import{u as M,e as T}from"./useItem-6b26d1e2.js"
import{h as F}from"./hasClasses-5f830aea.js"
const O=(t,n)=>t+String(n)
function B(t,n,e){return y({checked:0===e,id:O(t,e),name:t,type:"radio"})}function _(t,n,r,s){const o=S({className:"ui-state-default ui-corner-top"})
return e(o,w({htmlFor:O(t,s),innerHTML:r})),0!==s&&a(o,"click",()=>{H(O(t,s),n[s])}),o}const D=()=>t({className:"ui-tabs-panel ui-corner-bottom"})
function G(a,s,o){const i=t({className:"fshTabSet ui-tabs ui-widget-content ui-corner-all"}),c=n(e,i)
s.map(n(B,o)).forEach(c)
const f=s.map(D)
H(O(o,0),f[0])
const d=function(t,r,a){const s=E({className:"ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"})
return t.map(n(_,r,a)).forEach(n(e,s)),s}(s,o,f)
return H(o+"-header",d),e(i,d),f.forEach(c),r("",a),e(a,i),0}function Z(t,n,e){const a=t.insertRow(-1)
e.dom=a
let s="fshEq ",o="fshUse "
e.t<9?s+="smallLink":s+="notLink",o+=function(t){return-1!==[10,12,15,16].indexOf(t.t)||"Zombie Coffin"===t.n?"smallLink":"notLink"}(e),r(`<td class="fshCenter"><span class="${s}" data-itemid="${e.a}">Wear</span>&nbsp;|&nbsp;<span class="${o}" data-itemid="${e.a}">Use/Ext</span></td><td><img src="${function(t){let n=i
return 13699===t.b?n+=`composing/${t.extra.design}_${t.extra.color}.png`:n+=`items/${t.b}.gif`,n}(e)}" class="tip-dynamic" data-tipped="fetchitem.php?item_id=${e.b}&amp;inv_id=${e.a}&amp;t=1&amp;p=${n}&amp;currentPlayerId=${n}" width="30" height="30" border="0"></td><td width="90%">&nbsp;${e.n}</td>`,a)}function z(t){return q(String(t.id),t.name)}function J(t){return q("0","All")+t.r.map(z).join("")}function R(t,e,r){r.items.sort(v).forEach(n(Z,t,e))}function V(t){const r=C({width:"100%",innerHTML:`<thead><tr><th class="fshCenter" colspan="3">${J(t)}</th></tr><tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th><th colspan="2">Items</th></tr></thead>`}),a=A()
return e(r,a),o.sortBy="n",o.sortAsc=!0,t.r.forEach(n(R,a,s())),r}function K(n){const r=V(n),a=t()
return e(a,r),a}function X(t,n){return`<a href="${u}${t}">${n}</a>`}function Y(t){return t[1].nicknameList.length>0}function tt(t){return`<tr><td>${t[0]}</td><td>${t[1].nicknameList.map(n(X,t[0])).join(" ")}</td><td>${t[1].count}</td><td></td><td></td></tr>`}function nt(t){return t.displayOnAH&&!t.found}function et(t){return X(t.searchname,t.nickname)}function rt(t){return 0===t[1].nicknameList.length}function at(t){return`<tr><td>${t[0]}</td><td></td><td>${t[1].count}</td><td></td><td></td></tr>`}function st(t,n){return`<table width="100%" cellspacing="2" cellpadding="2"><thead><tr><th colspan="5" class="fshCenter">Items from <a href="${d}">AH Quick Search</a> found in your inventory</th></tr><tr><th>Name</th><th>Nick Name</th><th>Inv Count</th><th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>${function(t){return m(t).filter(Y).map(tt).join("")}(t)}<tr><td colspan="5"><hr></td></tr><tr><td>Did not find:</td><td colspan="4">${function(t){return t.filter(nt).map(et).join(", ")}(n)}</td></tr><tr><td colspan="5"><hr></td></tr></tbody><thead><tr><th colspan="5" class="fshCenter">Items NOT from <a href="${d}">AH Quick Search</a> found in your inventory</td></thead><tbody>${function(t){return m(t).filter(rt).map(at).join("")}(t)}</tbody></table>`}function ot(t,n,e){n===e.searchname&&(e.found=!0,t[n].nicknameList.indexOf(e.nickname)<0&&t[n].nicknameList.push(e.nickname))}function it(t,e,r){const a=r.n
!function(t,n){t[n]?t[n].count+=1:t[n]={count:1,nicknameList:[]}}(t,a),e.forEach(n(ot,t,a))}function ct(t,e,r){r.items.forEach(n(it,t,e))}function ft(e){const r={},a=c("quickSearchList")||[]
e.r.forEach(n(ct,r,a))
const s=t()
return f(s,st(r,a)),s}let dt,mt
function ut(t,n,e){0===e.r&&r(`<span class="fastWorn">${n}</span>`,t.parentNode)}function lt(t,e,r){g("QuickWear","doAction - "+r),L("",t),t.classList.remove("smallLink"),t.classList.add("fshSpinner","fshSpin12"),e(t.dataset.itemid).then(n(ut,t,r))}function ht(t){lt(t,M,"Used")}function pt(t){dt?ht(t):P("Use/Extract Item","Are you sure you want to use/extract the item?",n(ht,t))}function bt(t){lt(t,T,"Worn")}function jt(t,n,e){const r=e.dom
if("0"===t)r.classList.remove("fshHide")
else{const e=t!==n.toString()
N(r,e)}}function kt(t,e){const r=e.id
e.items.forEach(n(jt,t,r))}function $t(t){const e=t.dataset.folder
mt.r.forEach(n(kt,e))}function gt(){dt=!dt,$("disableQuickWearPrompts",dt)}function Lt(n){e(n,t({className:"qwPref",innerHTML:x("disableQuickWearPrompts")}))}function yt(t,n,r){e(r,t(n))}function wt(t,e){I("qwtab-header",Lt),I("qwtab0",n(yt,K,e)),I("qwtab1",n(yt,ft,e)),G(t,["Quick Wear / Use / Extract<br>Manager","Inventory Manager Counter<br>filtered by AH Quick Search"],"qwtab"),j(t,Q([[n(F,["smallLink","fshEq"]),bt],[n(F,["smallLink","fshUse"]),pt],[n(k,"fshFolder"),$t],[W("disableQuickWearPrompts"),gt]]))}function Et(t,n){(function(t){return t&&t.s&&p(t.r)})(n)&&(mt=n,wt(t,n))}export default function(t){l()&&function(t){const e=t||b
e&&(f(e,"Getting item list from backpack..."),U().then(n(Et,e)),dt=h("disableQuickWearPrompts"))}(t)}
//# sourceMappingURL=quickWear-f63c94b7.js.map
