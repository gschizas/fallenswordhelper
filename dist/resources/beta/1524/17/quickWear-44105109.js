import{k as t,s as n,f as e,z as a,L as r,b3 as s,c as o,aB as i,bG as c,i as d,bH as f,l as m,be as u,j as l,D as p,p as h,o as b,aC as j,W as k,S as $,y as g}from"./calfSystem-02ae8657.js"
import{i as L}from"./isArray-7fbdd896.js"
import"./toLowerCase-f5058453.js"
import{c as y}from"./createInput-cbb1c2cb.js"
import{c as w}from"./createLabel-73beda06.js"
import{c as C}from"./createUl-f843d9db.js"
import"./isChecked-d5c20d5f.js"
import{b as E}from"./simpleCheckbox-11c3e9b3.js"
import"./alpha-ebb9541a.js"
import{c as x}from"./createTBody-50982eee.js"
import{c as S}from"./createTable-c905097e.js"
import"./dialogMsg-f195b598.js"
import{p as A,s as H}from"./pubsub-99b08a26.js"
import{c as I}from"./createLi-29110707.js"
import"./errorDialog-da114958.js"
import{j as N}from"./jConfirm-03a5dafe.js"
import"./dialog-daafeeb1.js"
import"./indexAjaxJson-8dbd2034.js"
import{u as v,e as W}from"./useItem-4480b921.js"
import"./ajaxReturnCode-71b23dbe.js"
import"./daUseItem-3527f567.js"
import{m as Q}from"./makeFolderSpan-ab795351.js"
import{e as q}from"./eventHandler5-5a3d9dd4.js"
import{t as P}from"./toggleForce-f1ceaa74.js"
import{s as U}from"./selfIdIs-e390a6cb.js"
import{a as M}from"./stringSort-fb0271d4.js"
import{d as T}from"./daLoadInventory-cc6001e8.js"
import{h as B}from"./hasClasses-cc756e1d.js"
const F=(t,n)=>t+String(n)
function O(t,n,e){return y({checked:0===e,id:F(t,e),name:t,type:"radio"})}function D(t,n,a,s){const o=I({className:"ui-state-default ui-corner-top"})
return e(o,w({htmlFor:F(t,s),innerHTML:a})),0!==s&&r(o,"click",()=>{A(F(t,s),n[s])}),o}const _=()=>t({className:"ui-tabs-panel ui-corner-bottom"})
function G(r,s,o){const i=t({className:"fshTabSet ui-tabs ui-widget-content ui-corner-all"}),c=n(e,i)
s.map(n(O,o)).forEach(c)
const d=s.map(_)
A(F(o,0),d[0])
const f=function(t,a,r){const s=C({className:"ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"})
return t.map(n(D,a,r)).forEach(n(e,s)),s}(s,o,d)
return A(o+"-header",f),e(i,f),d.forEach(c),a("",r),e(r,i),0}function R(t,n,e){const r=t.insertRow(-1)
e.dom=r
let s="fshEq ",o="fshUse "
e.t<9?s+="smallLink":s+="notLink",o+=function(t){return-1!==[10,12,15,16].indexOf(t.t)||"Zombie Coffin"===t.n?"smallLink":"notLink"}(e),a(`<td class="fshCenter"><span class="${s}" data-itemid="${e.a}">Wear</span>&nbsp;|&nbsp;<span class="${o}" data-itemid="${e.a}">Use/Ext</span></td><td><img src="${function(t){let n=i
return 13699===t.b?n+=`composing/${t.extra.design}_${t.extra.color}.png`:n+=`items/${t.b}.gif`,n}(e)}" class="tip-dynamic" data-tipped="fetchitem.php?item_id=${e.b}&amp;inv_id=${e.a}&amp;t=1&amp;p=${n}&amp;currentPlayerId=${n}" width="30" height="30" border="0"></td><td width="90%">&nbsp;${e.n}</td>`,r)}function z(t){return Q(String(t.id),t.name)}function J(t){return Q("0","All")+t.r.map(z).join("")}function Z(t,e,a){a.items.sort(M).forEach(n(R,t,e))}function K(t){const a=S({width:"100%",innerHTML:`<thead><tr><th class="fshCenter" colspan="3">${J(t)}</th></tr><tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th><th colspan="2">Items</th></tr></thead>`}),r=x()
return e(a,r),o.sortBy="n",o.sortAsc=!0,t.r.forEach(n(Z,r,s())),a}function V(n){const a=K(n),r=t()
return e(r,a),r}function X(t,n){return`<a href="${u}${t}">${n}</a>`}function Y(t){return t[1].nicknameList.length>0}function tt(t){return`<tr><td>${t[0]}</td><td>${t[1].nicknameList.map(n(X,t[0])).join(" ")}</td><td>${t[1].count}</td><td></td><td></td></tr>`}function nt(t){return t.displayOnAH&&!t.found}function et(t){return X(t.searchname,t.nickname)}function at(t){return 0===t[1].nicknameList.length}function rt(t){return`<tr><td>${t[0]}</td><td></td><td>${t[1].count}</td><td></td><td></td></tr>`}function st(t,n){return`<table width="100%" cellspacing="2" cellpadding="2"><thead><tr><th colspan="5" class="fshCenter">Items from <a href="${f}">AH Quick Search</a> found in your inventory</th></tr><tr><th>Name</th><th>Nick Name</th><th>Inv Count</th><th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>${function(t){return m(t).filter(Y).map(tt).join("")}(t)}<tr><td colspan="5"><hr></td></tr><tr><td>Did not find:</td><td colspan="4">${function(t){return t.filter(nt).map(et).join(", ")}(n)}</td></tr><tr><td colspan="5"><hr></td></tr></tbody><thead><tr><th colspan="5" class="fshCenter">Items NOT from <a href="${f}">AH Quick Search</a> found in your inventory</td></thead><tbody>${function(t){return m(t).filter(at).map(rt).join("")}(t)}</tbody></table>`}function ot(t,n,e){n===e.searchname&&(e.found=!0,t[n].nicknameList.indexOf(e.nickname)<0&&t[n].nicknameList.push(e.nickname))}function it(t,e,a){const r=a.n
!function(t,n){t[n]?t[n].count+=1:t[n]={count:1,nicknameList:[]}}(t,r),e.forEach(n(ot,t,r))}function ct(t,e,a){a.items.forEach(n(it,t,e))}function dt(e){const a={},r=c("quickSearchList")||[]
e.r.forEach(n(ct,a,r))
const s=t()
return d(s,st(a,r)),s}let ft,mt
function ut(t,n,e){0===e.r&&a(`<span class="fastWorn">${n}</span>`,t.parentNode)}function lt(t,e,a){$("QuickWear","doAction - "+a),g("",t),t.classList.remove("smallLink"),t.classList.add("fshSpinner","fshSpin12"),e(t.dataset.itemid).then(n(ut,t,a))}function pt(t){lt(t,v,"Used")}function ht(t){ft?pt(t):N("Use/Extract Item","Are you sure you want to use/extract the item?",n(pt,t))}function bt(t){lt(t,W,"Worn")}function jt(t,n,e){const a=e.dom
if("0"===t)a.classList.remove("fshHide")
else{const e=t!==n.toString()
P(a,e)}}function kt(t,e){const a=e.id
e.items.forEach(n(jt,t,a))}function $t(t){const e=t.dataset.folder
mt.r.forEach(n(kt,e))}function gt(){ft=!ft,k("disableQuickWearPrompts",ft)}function Lt(n){e(n,t({className:"qwPref",innerHTML:E("disableQuickWearPrompts")}))}function yt(t,n,a){e(a,t(n))}function wt(t,e){H("qwtab-header",Lt),H("qwtab0",n(yt,V,e)),H("qwtab1",n(yt,dt,e)),G(t,["Quick Wear / Use / Extract<br>Manager","Inventory Manager Counter<br>filtered by AH Quick Search"],"qwtab"),b(t,q([[n(B,["smallLink","fshEq"]),bt],[n(B,["smallLink","fshUse"]),ht],[n(j,"fshFolder"),$t],[U("disableQuickWearPrompts"),gt]]))}function Ct(t,n){(function(t){return t&&t.s&&L(t.r)})(n)&&(mt=n,wt(t,n))}export default function(t){l()&&function(t){const e=t||h
e&&(d(e,"Getting item list from backpack..."),T().then(n(Ct,e)),ft=p("disableQuickWearPrompts"))}(t)}
//# sourceMappingURL=quickWear-44105109.js.map
