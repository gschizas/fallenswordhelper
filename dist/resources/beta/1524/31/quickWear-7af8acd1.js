import{m as t,h as n,t as e,au as a,c as r,A as s,aj as o,O as i,bE as c,i as f,bF as d,e as m,b9 as u,j as l,H as h,p,o as b,l as j,Y as k,U as $,z as g}from"./calfSystem-47fc08ae.js"
import{c as L}from"./createTBody-f6ac95b4.js"
import{c as y}from"./createTable-c916e6a3.js"
import{m as w}from"./makeFolderSpan-ee78140a.js"
import{a as E}from"./stringSort-23c959df.js"
import{d as A}from"./daLoadInventory-8b608a7d.js"
import{u as x,e as C}from"./useItem-cee16f1c.js"
import{e as H}from"./eventHandler5-32312767.js"
import{c as I}from"./createInput-e0371f2c.js"
import{c as S}from"./createLabel-2edf29c6.js"
import{c as N}from"./createLi-582e821e.js"
import{c as v}from"./createUl-9aef984f.js"
import{p as Q,a as U}from"./pubsub-49043363.js"
import{h as W}from"./hasClasses-07b515e1.js"
import{i as q}from"./isArray-551d6583.js"
import{j as P}from"./jConfirm-50b22e17.js"
import{s as M}from"./selfIdIs-16c65443.js"
import{b as T}from"./simpleCheckbox-c51e0696.js"
import{t as F}from"./toggleForce-8e48254b.js"
import"./alpha-80a926ba.js"
import"./toLowerCase-51740687.js"
import"./dialog-d161529e.js"
import"./dialogMsg-844edf4e.js"
import"./indexAjaxJson-be24760c.js"
import"./daUseItem-f2fce1a1.js"
import"./errorDialog-9d880b0d.js"
import"./isChecked-1c18cd61.js"
function O(t,n,e){const a=t.insertRow(-1)
e.dom=a
let r="fshEq ",i="fshUse "
e.t<9?r+="smallLink":r+="notLink",i+=function(t){return-1!==[10,12,15,16].indexOf(t.t)||"Zombie Coffin"===t.n?"smallLink":"notLink"}(e),s(`<td class="fshCenter"><span class="${r}" data-itemid="${e.a}">Wear</span>&nbsp;|&nbsp;<span class="${i}" data-itemid="${e.a}">Use/Ext</span></td><td><img src="${function(t){let n=o
return 13699===t.b?n+=`composing/${t.extra.design}_${t.extra.color}.png`:n+=`items/${t.b}.gif`,n}(e)}" class="tip-dynamic" data-tipped="fetchitem.php?item_id=${e.b}&amp;inv_id=${e.a}&amp;t=1&amp;p=${n}&amp;currentPlayerId=${n}" width="30" height="30" border="0"></td><td width="90%">&nbsp;${e.n}</td>`,a)}function B(t){return w(String(t.id),t.name)}function _(t){return w("0","All")+t.r.map(B).join("")}function D(t,n,a){a.items.sort(E).forEach(e(O,t,n))}function z(t){const s=y({width:"100%",innerHTML:`<thead><tr><th class="fshCenter" colspan="3">${_(t)}</th></tr><tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th><th colspan="2">Items</th></tr></thead>`}),o=L()
return n(s,o),r.sortBy="n",r.sortAsc=!0,t.r.forEach(e(D,o,a())),s}function G(e){const a=z(e),r=t()
return n(r,a),r}const J=(t,n)=>t+String(n)
function R(t,n,e){return I({checked:0===e,id:J(t,e),name:t,type:"radio"})}function Y(t,e,a,r){const s=N({className:"ui-state-default ui-corner-top"})
return n(s,S({htmlFor:J(t,r),innerHTML:a})),0!==r&&i(s,"click",(()=>{Q(J(t,r),e[r])})),s}const Z=()=>t({className:"ui-tabs-panel ui-corner-bottom"})
function K(a,r,o){const i=t({className:"fshTabSet ui-tabs ui-widget-content ui-corner-all"}),c=e(n,i)
r.map(e(R,o)).forEach(c)
const f=r.map(Z)
Q(J(o,0),f[0])
const d=function(t,a,r){const s=v({className:"ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"})
return t.map(e(Y,a,r)).forEach(e(n,s)),s}(r,o,f)
Q(`${o}-header`,d),n(i,d),f.forEach(c),s("",a),n(a,i)}function V(t,n){return`<a href="${u}${t}">${n}</a>`}function X(t){return t[1].nicknameList.length>0}function tt(t){return`<tr><td>${t[0]}</td><td>${t[1].nicknameList.map(e(V,t[0])).join(" ")}</td><td>${t[1].count}</td><td></td><td></td></tr>`}function nt(t){return t.displayOnAH&&!t.found}function et(t){return V(t.searchname,t.nickname)}function at(t){return 0===t[1].nicknameList.length}function rt(t){return`<tr><td>${t[0]}</td><td></td><td>${t[1].count}</td><td></td><td></td></tr>`}function st(t,n){return`<table width="100%" cellspacing="2" cellpadding="2"><thead><tr><th colspan="5" class="fshCenter">Items from <a href="${d}">AH Quick Search</a> found in your inventory</th></tr><tr><th>Name</th><th>Nick Name</th><th>Inv Count</th><th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>${function(t){return m(t).filter(X).map(tt).join("")}(t)}<tr><td colspan="5"><hr></td></tr><tr><td>Did not find:</td><td colspan="4">${function(t){return t.filter(nt).map(et).join(", ")}(n)}</td></tr><tr><td colspan="5"><hr></td></tr></tbody><thead><tr><th colspan="5" class="fshCenter">Items NOT from <a href="${d}">AH Quick Search</a> found in your inventory</td></thead><tbody>${function(t){return m(t).filter(at).map(rt).join("")}(t)}</tbody></table>`}function ot(t,n,e){n===e.searchname&&(e.found=!0,t[n].nicknameList.indexOf(e.nickname)<0&&t[n].nicknameList.push(e.nickname))}function it(t,n,a){const r=a.n
!function(t,n){t[n]?t[n].count+=1:t[n]={count:1,nicknameList:[]}}(t,r),n.forEach(e(ot,t,r))}function ct(t,n,a){a.items.forEach(e(it,t,n))}function ft(n){const a={},r=c("quickSearchList")||[]
n.r.forEach(e(ct,a,r))
const s=t()
return f(s,st(a,r)),s}let dt,mt
function ut(t,n,e){0===e.r&&s(`<span class="fastWorn">${n}</span>`,t.parentNode)}function lt(t,n,a){$("QuickWear",`doAction - ${a}`),g("",t),t.classList.remove("smallLink"),t.classList.add("fshSpinner","fshSpin12"),n(t.dataset.itemid).then(e(ut,t,a))}function ht(t){lt(t,x,"Used")}function pt(t){dt?ht(t):P("Use/Extract Item","Are you sure you want to use/extract the item?",e(ht,t))}function bt(t){lt(t,C,"Worn")}function jt(t,n,e){const a=e.dom
if("0"===t)a.classList.remove("fshHide")
else{const e=t!==n.toString()
F(a,e)}}function kt(t,n){const a=n.id
n.items.forEach(e(jt,t,a))}function $t(t){const n=t.dataset.folder
mt.r.forEach(e(kt,n))}function gt(){dt=!dt,k("disableQuickWearPrompts",dt)}function Lt(e){n(e,t({className:"qwPref",innerHTML:T("disableQuickWearPrompts")}))}function yt(t,e,a){n(a,t(e))}function wt(t,n){U("qwtab-header",Lt),U("qwtab0",e(yt,G,n)),U("qwtab1",e(yt,ft,n)),K(t,["Quick Wear / Use / Extract<br>Manager","Inventory Manager Counter<br>filtered by AH Quick Search"],"qwtab"),b(t,H([[e(W,["smallLink","fshEq"]),bt],[e(W,["smallLink","fshUse"]),pt],[e(j,"fshFolder"),$t],[M("disableQuickWearPrompts"),gt]]))}function Et(t,n){(function(t){return t&&t.s&&q(t.r)})(n)&&(mt=n,wt(t,n))}function At(t){l()&&function(t){const n=t||p
n&&(f(n,"Getting item list from backpack..."),A().then(e(Et,n)),dt=h("disableQuickWearPrompts"))}(t)}export default At
//# sourceMappingURL=quickWear-7af8acd1.js.map
