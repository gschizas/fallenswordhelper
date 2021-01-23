import{m as t,h as n,t as e,aA as a,c as r,A as s,ak as o,O as i,bH as c,i as f,bI as d,e as m,be as u,j as l,H as h,P as p,p as b,o as j,l as k,Z as $,V as g,z as L}from"./calfSystem-393ab895.js"
import{c as y}from"./createTBody-528613e5.js"
import{c as w}from"./createTable-aae48322.js"
import{m as E}from"./makeFolderSpan-ee78140a.js"
import{a as A}from"./stringSort-d8214f4c.js"
import{d as H}from"./daLoadInventory-6855dc8f.js"
import{u as I,e as x}from"./useItem-7ed14570.js"
import{e as C}from"./eventHandler5-a2b2bc41.js"
import{c as S}from"./createInput-f7e07c00.js"
import{c as N}from"./createLabel-d7669076.js"
import{c as v}from"./createLi-f8ee049c.js"
import{c as P}from"./createUl-7863af9d.js"
import{p as Q,a as W}from"./pubsub-acba6627.js"
import{h as q}from"./hasClasses-bbe2d865.js"
import{j as U}from"./jConfirm-4efe8fd7.js"
import{s as M}from"./selfIdIs-fd8b3a9a.js"
import{b as T}from"./simpleCheckbox-649df0f1.js"
import{t as O}from"./toggleForce-8e48254b.js"
import"./alpha-80a926ba.js"
import"./toLowerCase-51740687.js"
import"./dialog-d161529e.js"
import"./dialogMsg-844edf4e.js"
import"./indexAjaxJson-f78a3fe6.js"
import"./daUseItem-796c6f75.js"
import"./errorDialog-9d880b0d.js"
import"./isChecked-1c18cd61.js"
function F(t,n,e){const a=t.insertRow(-1)
e.dom=a
let r="fshEq ",i="fshUse "
e.t<9?r+="smallLink":r+="notLink",i+=function(t){return-1!==[10,12,15,16].indexOf(t.t)||"Zombie Coffin"===t.n?"smallLink":"notLink"}(e),s(`<td class="fshCenter"><span class="${r}" data-itemid="${e.a}">Wear</span>&nbsp;|&nbsp;<span class="${i}" data-itemid="${e.a}">Use/Ext</span></td><td><img src="${function(t){let n=o
return 13699===t.b?n+=`composing/${t.extra.design}_${t.extra.color}.png`:n+=`items/${t.b}.gif`,n}(e)}" class="tip-dynamic" data-tipped="fetchitem.php?item_id=${e.b}&amp;inv_id=${e.a}&amp;t=1&amp;p=${n}&amp;currentPlayerId=${n}" width="30" height="30" border="0"></td><td width="90%">&nbsp;${e.n}</td>`,a)}function B(t){return E(String(t.id),t.name)}function _(t){return E("0","All")+t.r.map(B).join("")}function D(t,n,a){a.items.sort(A).forEach(e(F,t,n))}function Z(t){const s=w({width:"100%",innerHTML:`<thead><tr><th class="fshCenter" colspan="3">${_(t)}</th></tr><tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th><th colspan="2">Items</th></tr></thead>`}),o=y()
return n(s,o),r.sortBy="n",r.sortAsc=!0,t.r.forEach(e(D,o,a())),s}function z(e){const a=Z(e),r=t()
return n(r,a),r}const G=(t,n)=>t+String(n)
function J(t,n,e){return S({checked:0===e,id:G(t,e),name:t,type:"radio"})}function R(t,e,a,r){const s=v({className:"ui-state-default ui-corner-top"})
return n(s,N({htmlFor:G(t,r),innerHTML:a})),0!==r&&i(s,"click",(()=>{Q(G(t,r),e[r])})),s}const V=()=>t({className:"ui-tabs-panel ui-corner-bottom"})
function K(a,r,o){const i=t({className:"fshTabSet ui-tabs ui-widget-content ui-corner-all"}),c=e(n,i)
r.map(e(J,o)).forEach(c)
const f=r.map(V)
Q(G(o,0),f[0])
const d=function(t,a,r){const s=P({className:"ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"})
return t.map(e(R,a,r)).forEach(e(n,s)),s}(r,o,f)
Q(`${o}-header`,d),n(i,d),f.forEach(c),s("",a),n(a,i)}function X(t,n){return`<a href="${u}${t}">${n}</a>`}function Y(t){return t[1].nicknameList.length>0}function tt(t){return`<tr><td>${t[0]}</td><td>${t[1].nicknameList.map(e(X,t[0])).join(" ")}</td><td>${t[1].count}</td><td></td><td></td></tr>`}function nt(t){return t.displayOnAH&&!t.found}function et(t){return X(t.searchname,t.nickname)}function at(t){return 0===t[1].nicknameList.length}function rt(t){return`<tr><td>${t[0]}</td><td></td><td>${t[1].count}</td><td></td><td></td></tr>`}function st(t,n){return`<table width="100%" cellspacing="2" cellpadding="2"><thead><tr><th colspan="5" class="fshCenter">Items from <a href="${d}">AH Quick Search</a> found in your inventory</th></tr><tr><th>Name</th><th>Nick Name</th><th>Inv Count</th><th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>${function(t){return m(t).filter(Y).map(tt).join("")}(t)}<tr><td colspan="5"><hr></td></tr><tr><td>Did not find:</td><td colspan="4">${function(t){return t.filter(nt).map(et).join(", ")}(n)}</td></tr><tr><td colspan="5"><hr></td></tr></tbody><thead><tr><th colspan="5" class="fshCenter">Items NOT from <a href="${d}">AH Quick Search</a> found in your inventory</td></thead><tbody>${function(t){return m(t).filter(at).map(rt).join("")}(t)}</tbody></table>`}function ot(t,n,e){n===e.searchname&&(e.found=!0,t[n].nicknameList.indexOf(e.nickname)<0&&t[n].nicknameList.push(e.nickname))}function it(t,n,a){const r=a.n
!function(t,n){t[n]?t[n].count+=1:t[n]={count:1,nicknameList:[]}}(t,r),n.forEach(e(ot,t,r))}function ct(t,n,a){a.items.forEach(e(it,t,n))}function ft(n){const a={},r=c("quickSearchList")||[]
n.r.forEach(e(ct,a,r))
const s=t()
return f(s,st(a,r)),s}let dt,mt
function ut(t,n,e){0===e.r&&s(`<span class="fastWorn">${n}</span>`,t.parentNode)}function lt(t,n,a){g("QuickWear",`doAction - ${a}`),L("",t),t.classList.remove("smallLink"),t.classList.add("fshSpinner","fshSpin12"),n(t.dataset.itemid).then(e(ut,t,a))}function ht(t){lt(t,I,"Used")}function pt(t){dt?ht(t):U("Use/Extract Item","Are you sure you want to use/extract the item?",e(ht,t))}function bt(t){lt(t,x,"Worn")}function jt(t,n,e){const a=e.dom
if("0"===t)a.classList.remove("fshHide")
else{const e=t!==n.toString()
O(a,e)}}function kt(t,n){const a=n.id
n.items.forEach(e(jt,t,a))}function $t(t){const n=t.dataset.folder
mt.r.forEach(e(kt,n))}function gt(){dt=!dt,$("disableQuickWearPrompts",dt)}function Lt(e){n(e,t({className:"qwPref",innerHTML:T("disableQuickWearPrompts")}))}function yt(t,e,a){n(a,t(e))}function wt(t,n){W("qwtab-header",Lt),W("qwtab0",e(yt,z,n)),W("qwtab1",e(yt,ft,n)),K(t,["Quick Wear / Use / Extract<br>Manager","Inventory Manager Counter<br>filtered by AH Quick Search"],"qwtab"),j(t,C([[e(q,["smallLink","fshEq"]),bt],[e(q,["smallLink","fshUse"]),pt],[e(k,"fshFolder"),$t],[M("disableQuickWearPrompts"),gt]]))}function Et(t,n){(function(t){return t&&t.s&&p(t.r)})(n)&&(mt=n,wt(t,n))}function At(t){l()&&function(t){const n=t||b
n&&(f(n,"Getting item list from backpack..."),H().then(e(Et,n)),dt=h("disableQuickWearPrompts"))}(t)}export default At
//# sourceMappingURL=quickWear-389ab9db.js.map
