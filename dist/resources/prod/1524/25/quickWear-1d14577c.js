import{m as t,t as n,h as e,A as a,O as r,b0 as s,c as o,aD as i,bx as c,i as d,by as f,e as m,bc as u,j as l,H as h,p,o as b,l as j,Y as k,U as $,z as g}from"./calfSystem-71b9378d.js"
import{i as L}from"./isArray-392e0aa1.js"
import"./toLowerCase-c42114e1.js"
import{c as y}from"./createInput-1eba672c.js"
import{c as w}from"./createLabel-0de5e3fd.js"
import{c as E}from"./createUl-9605d03d.js"
import"./isChecked-9f10b428.js"
import{b as x}from"./simpleCheckbox-1a2b6475.js"
import"./alpha-4977b995.js"
import{c as A}from"./createTBody-a4a451e2.js"
import{c as C}from"./createTable-0f37c9d5.js"
import"./dialogMsg-1f890a82.js"
import{p as H,s as I}from"./pubsub-dce6ac73.js"
import{c as S}from"./createLi-7deaae00.js"
import"./errorDialog-c0c5c278.js"
import"./indexAjaxJson-fd3c427d.js"
import{t as N}from"./toggleForce-8f3fdd9b.js"
import{a as v}from"./stringSort-b6582d9e.js"
import{j as Q}from"./jConfirm-4ff6918a.js"
import"./daUseItem-a130ec06.js"
import{e as U}from"./eventHandler5-d78652bd.js"
import{s as W}from"./selfIdIs-4cf0f495.js"
import{m as q}from"./makeFolderSpan-1e60fc0e.js"
import{d as P}from"./daLoadInventory-49142c6a.js"
import"./dialog-294b8a9c.js"
import{u as M,e as T}from"./useItem-deb0413c.js"
import{h as O}from"./hasClasses-9c333c40.js"
const F=(t,n)=>t+String(n)
function B(t,n,e){return y({checked:0===e,id:F(t,e),name:t,type:"radio"})}function D(t,n,a,s){const o=S({className:"ui-state-default ui-corner-top"})
return e(o,w({htmlFor:F(t,s),innerHTML:a})),0!==s&&r(o,"click",()=>{H(F(t,s),n[s])}),o}const _=()=>t({className:"ui-tabs-panel ui-corner-bottom"})
function z(r,s,o){const i=t({className:"fshTabSet ui-tabs ui-widget-content ui-corner-all"}),c=n(e,i)
s.map(n(B,o)).forEach(c)
const d=s.map(_)
H(F(o,0),d[0])
const f=function(t,a,r){const s=E({className:"ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"})
return t.map(n(D,a,r)).forEach(n(e,s)),s}(s,o,d)
return H(o+"-header",f),e(i,f),d.forEach(c),a("",r),e(r,i),0}function G(t,n,e){const r=t.insertRow(-1)
e.dom=r
let s="fshEq ",o="fshUse "
e.t<9?s+="smallLink":s+="notLink",o+=function(t){return-1!==[10,12,15,16].indexOf(t.t)||"Zombie Coffin"===t.n?"smallLink":"notLink"}(e),a(`<td class="fshCenter"><span class="${s}" data-itemid="${e.a}">Wear</span>&nbsp;|&nbsp;<span class="${o}" data-itemid="${e.a}">Use/Ext</span></td><td><img src="${function(t){let n=i
return 13699===t.b?n+=`composing/${t.extra.design}_${t.extra.color}.png`:n+=`items/${t.b}.gif`,n}(e)}" class="tip-dynamic" data-tipped="fetchitem.php?item_id=${e.b}&amp;inv_id=${e.a}&amp;t=1&amp;p=${n}&amp;currentPlayerId=${n}" width="30" height="30" border="0"></td><td width="90%">&nbsp;${e.n}</td>`,r)}function J(t){return q(String(t.id),t.name)}function R(t){return q("0","All")+t.r.map(J).join("")}function Y(t,e,a){a.items.sort(v).forEach(n(G,t,e))}function Z(t){const a=C({width:"100%",innerHTML:`<thead><tr><th class="fshCenter" colspan="3">${R(t)}</th></tr><tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th><th colspan="2">Items</th></tr></thead>`}),r=A()
return e(a,r),o.sortBy="n",o.sortAsc=!0,t.r.forEach(n(Y,r,s())),a}function K(n){const a=Z(n),r=t()
return e(r,a),r}function V(t,n){return`<a href="${u}${t}">${n}</a>`}function X(t){return t[1].nicknameList.length>0}function tt(t){return`<tr><td>${t[0]}</td><td>${t[1].nicknameList.map(n(V,t[0])).join(" ")}</td><td>${t[1].count}</td><td></td><td></td></tr>`}function nt(t){return t.displayOnAH&&!t.found}function et(t){return V(t.searchname,t.nickname)}function at(t){return 0===t[1].nicknameList.length}function rt(t){return`<tr><td>${t[0]}</td><td></td><td>${t[1].count}</td><td></td><td></td></tr>`}function st(t,n){return`<table width="100%" cellspacing="2" cellpadding="2"><thead><tr><th colspan="5" class="fshCenter">Items from <a href="${f}">AH Quick Search</a> found in your inventory</th></tr><tr><th>Name</th><th>Nick Name</th><th>Inv Count</th><th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>${function(t){return m(t).filter(X).map(tt).join("")}(t)}<tr><td colspan="5"><hr></td></tr><tr><td>Did not find:</td><td colspan="4">${function(t){return t.filter(nt).map(et).join(", ")}(n)}</td></tr><tr><td colspan="5"><hr></td></tr></tbody><thead><tr><th colspan="5" class="fshCenter">Items NOT from <a href="${f}">AH Quick Search</a> found in your inventory</td></thead><tbody>${function(t){return m(t).filter(at).map(rt).join("")}(t)}</tbody></table>`}function ot(t,n,e){n===e.searchname&&(e.found=!0,t[n].nicknameList.indexOf(e.nickname)<0&&t[n].nicknameList.push(e.nickname))}function it(t,e,a){const r=a.n
!function(t,n){t[n]?t[n].count+=1:t[n]={count:1,nicknameList:[]}}(t,r),e.forEach(n(ot,t,r))}function ct(t,e,a){a.items.forEach(n(it,t,e))}function dt(e){const a={},r=c("quickSearchList")||[]
e.r.forEach(n(ct,a,r))
const s=t()
return d(s,st(a,r)),s}let ft,mt
function ut(t,n,e){0===e.r&&a(`<span class="fastWorn">${n}</span>`,t.parentNode)}function lt(t,e,a){$("QuickWear","doAction - "+a),g("",t),t.classList.remove("smallLink"),t.classList.add("fshSpinner","fshSpin12"),e(t.dataset.itemid).then(n(ut,t,a))}function ht(t){lt(t,M,"Used")}function pt(t){ft?ht(t):Q("Use/Extract Item","Are you sure you want to use/extract the item?",n(ht,t))}function bt(t){lt(t,T,"Worn")}function jt(t,n,e){const a=e.dom
if("0"===t)a.classList.remove("fshHide")
else{const e=t!==n.toString()
N(a,e)}}function kt(t,e){const a=e.id
e.items.forEach(n(jt,t,a))}function $t(t){const e=t.dataset.folder
mt.r.forEach(n(kt,e))}function gt(){ft=!ft,k("disableQuickWearPrompts",ft)}function Lt(n){e(n,t({className:"qwPref",innerHTML:x("disableQuickWearPrompts")}))}function yt(t,n,a){e(a,t(n))}function wt(t,e){I("qwtab-header",Lt),I("qwtab0",n(yt,K,e)),I("qwtab1",n(yt,dt,e)),z(t,["Quick Wear / Use / Extract<br>Manager","Inventory Manager Counter<br>filtered by AH Quick Search"],"qwtab"),b(t,U([[n(O,["smallLink","fshEq"]),bt],[n(O,["smallLink","fshUse"]),pt],[n(j,"fshFolder"),$t],[W("disableQuickWearPrompts"),gt]]))}function Et(t,n){(function(t){return t&&t.s&&L(t.r)})(n)&&(mt=n,wt(t,n))}function xt(t){l()&&function(t){const e=t||p
e&&(d(e,"Getting item list from backpack..."),P().then(n(Et,e)),ft=h("disableQuickWearPrompts"))}(t)}export default xt
//# sourceMappingURL=quickWear-1d14577c.js.map
