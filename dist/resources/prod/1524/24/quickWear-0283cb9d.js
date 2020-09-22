import{m as t,t as n,h as r,A as e,O as a,b0 as s,c as o,aD as i,bx as c,i as d,by as f,e as m,bc as u,j as l,H as h,p,o as b,l as j,Y as k,U as $,z as g}from"./calfSystem-ec854151.js"
import{i as L}from"./isArray-2519a795.js"
import"./toLowerCase-2f55d839.js"
import{c as y}from"./createInput-87218f3d.js"
import{c as w}from"./createLabel-407d8cab.js"
import{c as E}from"./createUl-d4749131.js"
import"./isChecked-2d5427f6.js"
import{b as x}from"./simpleCheckbox-df19e948.js"
import"./alpha-fc758c41.js"
import{c as A}from"./createTBody-fbed87bb.js"
import{c as C}from"./createTable-4fb4ab07.js"
import"./dialogMsg-9241492c.js"
import{p as H,s as I}from"./pubsub-3ec5d461.js"
import{c as S}from"./createLi-ed584bda.js"
import"./errorDialog-8d3200e2.js"
import"./indexAjaxJson-7630ad10.js"
import{t as N}from"./toggleForce-d6f8623d.js"
import{a as v}from"./stringSort-8cd477dc.js"
import{j as Q}from"./jConfirm-df82197b.js"
import"./daUseItem-6852d608.js"
import{e as U}from"./eventHandler5-2f87d693.js"
import{s as W}from"./selfIdIs-2f353791.js"
import{m as q}from"./makeFolderSpan-03d93920.js"
import{d as P}from"./daLoadInventory-0aa4b98f.js"
import"./dialog-ca00f6b8.js"
import{u as M,e as T}from"./useItem-47f87ce3.js"
import{h as O}from"./hasClasses-6e6eb00d.js"
const F=(t,n)=>t+String(n)
function B(t,n,r){return y({checked:0===r,id:F(t,r),name:t,type:"radio"})}function D(t,n,e,s){const o=S({className:"ui-state-default ui-corner-top"})
return r(o,w({htmlFor:F(t,s),innerHTML:e})),0!==s&&a(o,"click",()=>{H(F(t,s),n[s])}),o}const _=()=>t({className:"ui-tabs-panel ui-corner-bottom"})
function z(a,s,o){const i=t({className:"fshTabSet ui-tabs ui-widget-content ui-corner-all"}),c=n(r,i)
s.map(n(B,o)).forEach(c)
const d=s.map(_)
H(F(o,0),d[0])
const f=function(t,e,a){const s=E({className:"ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"})
return t.map(n(D,e,a)).forEach(n(r,s)),s}(s,o,d)
return H(o+"-header",f),r(i,f),d.forEach(c),e("",a),r(a,i),0}function G(t,n,r){const a=t.insertRow(-1)
r.dom=a
let s="fshEq ",o="fshUse "
r.t<9?s+="smallLink":s+="notLink",o+=function(t){return-1!==[10,12,15,16].indexOf(t.t)||"Zombie Coffin"===t.n?"smallLink":"notLink"}(r),e(`<td class="fshCenter"><span class="${s}" data-itemid="${r.a}">Wear</span>&nbsp;|&nbsp;<span class="${o}" data-itemid="${r.a}">Use/Ext</span></td><td><img src="${function(t){let n=i
return 13699===t.b?n+=`composing/${t.extra.design}_${t.extra.color}.png`:n+=`items/${t.b}.gif`,n}(r)}" class="tip-dynamic" data-tipped="fetchitem.php?item_id=${r.b}&amp;inv_id=${r.a}&amp;t=1&amp;p=${n}&amp;currentPlayerId=${n}" width="30" height="30" border="0"></td><td width="90%">&nbsp;${r.n}</td>`,a)}function J(t){return q(String(t.id),t.name)}function R(t){return q("0","All")+t.r.map(J).join("")}function Y(t,r,e){e.items.sort(v).forEach(n(G,t,r))}function Z(t){const e=C({width:"100%",innerHTML:`<thead><tr><th class="fshCenter" colspan="3">${R(t)}</th></tr><tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th><th colspan="2">Items</th></tr></thead>`}),a=A()
return r(e,a),o.sortBy="n",o.sortAsc=!0,t.r.forEach(n(Y,a,s())),e}function K(n){const e=Z(n),a=t()
return r(a,e),a}function V(t,n){return`<a href="${u}${t}">${n}</a>`}function X(t){return t[1].nicknameList.length>0}function tt(t){return`<tr><td>${t[0]}</td><td>${t[1].nicknameList.map(n(V,t[0])).join(" ")}</td><td>${t[1].count}</td><td></td><td></td></tr>`}function nt(t){return t.displayOnAH&&!t.found}function rt(t){return V(t.searchname,t.nickname)}function et(t){return 0===t[1].nicknameList.length}function at(t){return`<tr><td>${t[0]}</td><td></td><td>${t[1].count}</td><td></td><td></td></tr>`}function st(t,n){return`<table width="100%" cellspacing="2" cellpadding="2"><thead><tr><th colspan="5" class="fshCenter">Items from <a href="${f}">AH Quick Search</a> found in your inventory</th></tr><tr><th>Name</th><th>Nick Name</th><th>Inv Count</th><th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>${function(t){return m(t).filter(X).map(tt).join("")}(t)}<tr><td colspan="5"><hr></td></tr><tr><td>Did not find:</td><td colspan="4">${function(t){return t.filter(nt).map(rt).join(", ")}(n)}</td></tr><tr><td colspan="5"><hr></td></tr></tbody><thead><tr><th colspan="5" class="fshCenter">Items NOT from <a href="${f}">AH Quick Search</a> found in your inventory</td></thead><tbody>${function(t){return m(t).filter(et).map(at).join("")}(t)}</tbody></table>`}function ot(t,n,r){n===r.searchname&&(r.found=!0,t[n].nicknameList.indexOf(r.nickname)<0&&t[n].nicknameList.push(r.nickname))}function it(t,r,e){const a=e.n
!function(t,n){t[n]?t[n].count+=1:t[n]={count:1,nicknameList:[]}}(t,a),r.forEach(n(ot,t,a))}function ct(t,r,e){e.items.forEach(n(it,t,r))}function dt(r){const e={},a=c("quickSearchList")||[]
r.r.forEach(n(ct,e,a))
const s=t()
return d(s,st(e,a)),s}let ft,mt
function ut(t,n,r){0===r.r&&e(`<span class="fastWorn">${n}</span>`,t.parentNode)}function lt(t,r,e){$("QuickWear","doAction - "+e),g("",t),t.classList.remove("smallLink"),t.classList.add("fshSpinner","fshSpin12"),r(t.dataset.itemid).then(n(ut,t,e))}function ht(t){lt(t,M,"Used")}function pt(t){ft?ht(t):Q("Use/Extract Item","Are you sure you want to use/extract the item?",n(ht,t))}function bt(t){lt(t,T,"Worn")}function jt(t,n,r){const e=r.dom
if("0"===t)e.classList.remove("fshHide")
else{const r=t!==n.toString()
N(e,r)}}function kt(t,r){const e=r.id
r.items.forEach(n(jt,t,e))}function $t(t){const r=t.dataset.folder
mt.r.forEach(n(kt,r))}function gt(){ft=!ft,k("disableQuickWearPrompts",ft)}function Lt(n){r(n,t({className:"qwPref",innerHTML:x("disableQuickWearPrompts")}))}function yt(t,n,e){r(e,t(n))}function wt(t,r){I("qwtab-header",Lt),I("qwtab0",n(yt,K,r)),I("qwtab1",n(yt,dt,r)),z(t,["Quick Wear / Use / Extract<br>Manager","Inventory Manager Counter<br>filtered by AH Quick Search"],"qwtab"),b(t,U([[n(O,["smallLink","fshEq"]),bt],[n(O,["smallLink","fshUse"]),pt],[n(j,"fshFolder"),$t],[W("disableQuickWearPrompts"),gt]]))}function Et(t,n){(function(t){return t&&t.s&&L(t.r)})(n)&&(mt=n,wt(t,n))}function xt(t){l()&&function(t){const r=t||p
r&&(d(r,"Getting item list from backpack..."),P().then(n(Et,r)),ft=h("disableQuickWearPrompts"))}(t)}export default xt
//# sourceMappingURL=quickWear-0283cb9d.js.map
