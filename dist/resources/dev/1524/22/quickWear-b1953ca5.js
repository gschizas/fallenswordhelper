import{m as t,t as n,h as e,A as a,O as r,b7 as s,c as o,aH as i,bE as c,i as d,bF as f,e as m,bj as u,j as l,G as h,P as p,p as b,o as j,l as k,Z as $,V as g,z as L}from"./calfSystem-4cc738f8.js"
import"./toLowerCase-e8c3179d.js"
import{c as y}from"./createInput-8a96566e.js"
import{c as w}from"./createLabel-f247c95a.js"
import{c as E}from"./createUl-a7d90b4b.js"
import"./isChecked-464466aa.js"
import{b as x}from"./simpleCheckbox-326bdee4.js"
import"./alpha-ded7f564.js"
import{c as A}from"./createTBody-e25839cf.js"
import{c as C}from"./createTable-8f45252e.js"
import"./dialogMsg-d224def3.js"
import{p as H,s as I}from"./pubsub-18a2d5b1.js"
import{c as S}from"./createLi-05521fe0.js"
import"./errorDialog-18ea8eb8.js"
import"./indexAjaxJson-39fb942e.js"
import{t as N}from"./toggleForce-521f5f12.js"
import{a as v}from"./stringSort-875f27cc.js"
import{j as P}from"./jConfirm-7b94adcf.js"
import"./daUseItem-01218301.js"
import{e as Q}from"./eventHandler5-839ad5d6.js"
import{s as W}from"./selfIdIs-40d5d5a8.js"
import{m as q}from"./makeFolderSpan-043a2eef.js"
import{d as U}from"./daLoadInventory-cdbb42ab.js"
import"./dialog-dabd10c2.js"
import{u as M,e as T}from"./useItem-77cf83e6.js"
import{h as F}from"./hasClasses-0677794c.js"
const O=(t,n)=>t+String(n)
function B(t,n,e){return y({checked:0===e,id:O(t,e),name:t,type:"radio"})}function _(t,n,a,s){const o=S({className:"ui-state-default ui-corner-top"})
return e(o,w({htmlFor:O(t,s),innerHTML:a})),0!==s&&r(o,"click",()=>{H(O(t,s),n[s])}),o}const D=()=>t({className:"ui-tabs-panel ui-corner-bottom"})
function G(r,s,o){const i=t({className:"fshTabSet ui-tabs ui-widget-content ui-corner-all"}),c=n(e,i)
s.map(n(B,o)).forEach(c)
const d=s.map(D)
H(O(o,0),d[0])
const f=function(t,a,r){const s=E({className:"ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"})
return t.map(n(_,a,r)).forEach(n(e,s)),s}(s,o,d)
return H(o+"-header",f),e(i,f),d.forEach(c),a("",r),e(r,i),0}function Z(t,n,e){const r=t.insertRow(-1)
e.dom=r
let s="fshEq ",o="fshUse "
e.t<9?s+="smallLink":s+="notLink",o+=function(t){return-1!==[10,12,15,16].indexOf(t.t)||"Zombie Coffin"===t.n?"smallLink":"notLink"}(e),a(`<td class="fshCenter"><span class="${s}" data-itemid="${e.a}">Wear</span>&nbsp;|&nbsp;<span class="${o}" data-itemid="${e.a}">Use/Ext</span></td><td><img src="${function(t){let n=i
return 13699===t.b?n+=`composing/${t.extra.design}_${t.extra.color}.png`:n+=`items/${t.b}.gif`,n}(e)}" class="tip-dynamic" data-tipped="fetchitem.php?item_id=${e.b}&amp;inv_id=${e.a}&amp;t=1&amp;p=${n}&amp;currentPlayerId=${n}" width="30" height="30" border="0"></td><td width="90%">&nbsp;${e.n}</td>`,r)}function z(t){return q(String(t.id),t.name)}function J(t){return q("0","All")+t.r.map(z).join("")}function R(t,e,a){a.items.sort(v).forEach(n(Z,t,e))}function V(t){const a=C({width:"100%",innerHTML:`<thead><tr><th class="fshCenter" colspan="3">${J(t)}</th></tr><tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th><th colspan="2">Items</th></tr></thead>`}),r=A()
return e(a,r),o.sortBy="n",o.sortAsc=!0,t.r.forEach(n(R,r,s())),a}function K(n){const a=V(n),r=t()
return e(r,a),r}function X(t,n){return`<a href="${u}${t}">${n}</a>`}function Y(t){return t[1].nicknameList.length>0}function tt(t){return`<tr><td>${t[0]}</td><td>${t[1].nicknameList.map(n(X,t[0])).join(" ")}</td><td>${t[1].count}</td><td></td><td></td></tr>`}function nt(t){return t.displayOnAH&&!t.found}function et(t){return X(t.searchname,t.nickname)}function at(t){return 0===t[1].nicknameList.length}function rt(t){return`<tr><td>${t[0]}</td><td></td><td>${t[1].count}</td><td></td><td></td></tr>`}function st(t,n){return`<table width="100%" cellspacing="2" cellpadding="2"><thead><tr><th colspan="5" class="fshCenter">Items from <a href="${f}">AH Quick Search</a> found in your inventory</th></tr><tr><th>Name</th><th>Nick Name</th><th>Inv Count</th><th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>${function(t){return m(t).filter(Y).map(tt).join("")}(t)}<tr><td colspan="5"><hr></td></tr><tr><td>Did not find:</td><td colspan="4">${function(t){return t.filter(nt).map(et).join(", ")}(n)}</td></tr><tr><td colspan="5"><hr></td></tr></tbody><thead><tr><th colspan="5" class="fshCenter">Items NOT from <a href="${f}">AH Quick Search</a> found in your inventory</td></thead><tbody>${function(t){return m(t).filter(at).map(rt).join("")}(t)}</tbody></table>`}function ot(t,n,e){n===e.searchname&&(e.found=!0,t[n].nicknameList.indexOf(e.nickname)<0&&t[n].nicknameList.push(e.nickname))}function it(t,e,a){const r=a.n
!function(t,n){t[n]?t[n].count+=1:t[n]={count:1,nicknameList:[]}}(t,r),e.forEach(n(ot,t,r))}function ct(t,e,a){a.items.forEach(n(it,t,e))}function dt(e){const a={},r=c("quickSearchList")||[]
e.r.forEach(n(ct,a,r))
const s=t()
return d(s,st(a,r)),s}let ft,mt
function ut(t,n,e){0===e.r&&a(`<span class="fastWorn">${n}</span>`,t.parentNode)}function lt(t,e,a){g("QuickWear","doAction - "+a),L("",t),t.classList.remove("smallLink"),t.classList.add("fshSpinner","fshSpin12"),e(t.dataset.itemid).then(n(ut,t,a))}function ht(t){lt(t,M,"Used")}function pt(t){ft?ht(t):P("Use/Extract Item","Are you sure you want to use/extract the item?",n(ht,t))}function bt(t){lt(t,T,"Worn")}function jt(t,n,e){const a=e.dom
if("0"===t)a.classList.remove("fshHide")
else{const e=t!==n.toString()
N(a,e)}}function kt(t,e){const a=e.id
e.items.forEach(n(jt,t,a))}function $t(t){const e=t.dataset.folder
mt.r.forEach(n(kt,e))}function gt(){ft=!ft,$("disableQuickWearPrompts",ft)}function Lt(n){e(n,t({className:"qwPref",innerHTML:x("disableQuickWearPrompts")}))}function yt(t,n,a){e(a,t(n))}function wt(t,e){I("qwtab-header",Lt),I("qwtab0",n(yt,K,e)),I("qwtab1",n(yt,dt,e)),G(t,["Quick Wear / Use / Extract<br>Manager","Inventory Manager Counter<br>filtered by AH Quick Search"],"qwtab"),j(t,Q([[n(F,["smallLink","fshEq"]),bt],[n(F,["smallLink","fshUse"]),pt],[n(k,"fshFolder"),$t],[W("disableQuickWearPrompts"),gt]]))}function Et(t,n){(function(t){return t&&t.s&&p(t.r)})(n)&&(mt=n,wt(t,n))}export default function(t){l()&&function(t){const e=t||b
e&&(d(e,"Getting item list from backpack..."),U().then(n(Et,e)),ft=h("disableQuickWearPrompts"))}(t)}
//# sourceMappingURL=quickWear-b1953ca5.js.map
