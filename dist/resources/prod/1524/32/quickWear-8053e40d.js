import{m as t,h as n,t as a,at as e,c as r,A as s,ai as i,P as o,bC as c,i as f,bD as d,e as m,b8 as u,j as l,H as h,p,o as b,l as j,Z as k,V as $,z as g}from"./calfSystem-45544049.js"
import{c as L}from"./createTBody-ac35e412.js"
import{c as y}from"./createTable-7f36caa1.js"
import{m as w}from"./makeFolderSpan-5ef90585.js"
import{a as E}from"./stringSort-649ff303.js"
import{d as A}from"./daLoadInventory-1e3c6d71.js"
import{u as C,e as x}from"./useItem-131d8a6a.js"
import{e as H}from"./eventHandler5-5d91830a.js"
import{c as I}from"./createInput-8791792e.js"
import{c as S}from"./createLabel-1e17e412.js"
import{c as N}from"./createLi-d9f67232.js"
import{c as v}from"./createUl-cac51f38.js"
import{p as P,a as Q}from"./pubsub-3d2f0afe.js"
import{h as W}from"./hasClasses-bd8e81af.js"
import{i as q}from"./isArray-73a21c38.js"
import{j as U}from"./jConfirm-be6c821c.js"
import{s as M}from"./selfIdIs-05e1a8a1.js"
import{b as T}from"./simpleCheckbox-30d3f70c.js"
import{t as F}from"./toggleForce-d3228ccb.js"
import"./alpha-6743d5a2.js"
import"./toLowerCase-ace931b6.js"
import"./dialog-2c5b535b.js"
import"./dialogMsg-0a235932.js"
import"./indexAjaxJson-e79ad7ee.js"
import"./daUseItem-be1ad8f6.js"
import"./errorDialog-56c5d78c.js"
import"./isChecked-00f5c23d.js"
function O(t,n,a){const e=t.insertRow(-1)
a.dom=e
let r="fshEq ",o="fshUse "
a.t<9?r+="smallLink":r+="notLink",o+=function(t){return-1!==[10,12,15,16].indexOf(t.t)||"Zombie Coffin"===t.n?"smallLink":"notLink"}(a),s(`<td class="fshCenter"><span class="${r}" data-itemid="${a.a}">Wear</span>&nbsp;|&nbsp;<span class="${o}" data-itemid="${a.a}">Use/Ext</span></td><td><img src="${function(t){let n=i
return 13699===t.b?n+=`composing/${t.extra.design}_${t.extra.color}.png`:n+=`items/${t.b}.gif`,n}(a)}" class="tip-dynamic" data-tipped="fetchitem.php?item_id=${a.b}&amp;inv_id=${a.a}&amp;t=1&amp;p=${n}&amp;currentPlayerId=${n}" width="30" height="30" border="0"></td><td width="90%">&nbsp;${a.n}</td>`,e)}function B(t){return w(String(t.id),t.name)}function D(t){return w("0","All")+t.r.map(B).join("")}function _(t,n,e){e.items.sort(E).forEach(a(O,t,n))}function Z(t){const s=y({width:"100%",innerHTML:`<thead><tr><th class="fshCenter" colspan="3">${D(t)}</th></tr><tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th><th colspan="2">Items</th></tr></thead>`}),i=L()
return n(s,i),r.sortBy="n",r.sortAsc=!0,t.r.forEach(a(_,i,e())),s}function z(a){const e=Z(a),r=t()
return n(r,e),r}const G=(t,n)=>t+String(n)
function J(t,n,a){return I({checked:0===a,id:G(t,a),name:t,type:"radio"})}function R(t,a,e,r){const s=N({className:"ui-state-default ui-corner-top"})
return n(s,S({htmlFor:G(t,r),innerHTML:e})),0!==r&&o(s,"click",(()=>{P(G(t,r),a[r])})),s}const V=()=>t({className:"ui-tabs-panel ui-corner-bottom"})
function K(e,r,i){const o=t({className:"fshTabSet ui-tabs ui-widget-content ui-corner-all"}),c=a(n,o)
r.map(a(J,i)).forEach(c)
const f=r.map(V)
P(G(i,0),f[0])
const d=function(t,e,r){const s=v({className:"ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"})
return t.map(a(R,e,r)).forEach(a(n,s)),s}(r,i,f)
P(`${i}-header`,d),n(o,d),f.forEach(c),s("",e),n(e,o)}function X(t,n){return`<a href="${u}${t}">${n}</a>`}function Y(t){return t[1].nicknameList.length>0}function tt(t){return`<tr><td>${t[0]}</td><td>${t[1].nicknameList.map(a(X,t[0])).join(" ")}</td><td>${t[1].count}</td><td></td><td></td></tr>`}function nt(t){return t.displayOnAH&&!t.found}function at(t){return X(t.searchname,t.nickname)}function et(t){return 0===t[1].nicknameList.length}function rt(t){return`<tr><td>${t[0]}</td><td></td><td>${t[1].count}</td><td></td><td></td></tr>`}function st(t,n){return`<table width="100%" cellspacing="2" cellpadding="2"><thead><tr><th colspan="5" class="fshCenter">Items from <a href="${d}">AH Quick Search</a> found in your inventory</th></tr><tr><th>Name</th><th>Nick Name</th><th>Inv Count</th><th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>${function(t){return m(t).filter(Y).map(tt).join("")}(t)}<tr><td colspan="5"><hr></td></tr><tr><td>Did not find:</td><td colspan="4">${function(t){return t.filter(nt).map(at).join(", ")}(n)}</td></tr><tr><td colspan="5"><hr></td></tr></tbody><thead><tr><th colspan="5" class="fshCenter">Items NOT from <a href="${d}">AH Quick Search</a> found in your inventory</td></thead><tbody>${function(t){return m(t).filter(et).map(rt).join("")}(t)}</tbody></table>`}function it(t,n,a){n===a.searchname&&(a.found=!0,t[n].nicknameList.indexOf(a.nickname)<0&&t[n].nicknameList.push(a.nickname))}function ot(t,n,e){const r=e.n
!function(t,n){t[n]?t[n].count+=1:t[n]={count:1,nicknameList:[]}}(t,r),n.forEach(a(it,t,r))}function ct(t,n,e){e.items.forEach(a(ot,t,n))}function ft(n){const e={},r=c("quickSearchList")||[]
n.r.forEach(a(ct,e,r))
const s=t()
return f(s,st(e,r)),s}let dt,mt
function ut(t,n,a){0===a.r&&s(`<span class="fastWorn">${n}</span>`,t.parentNode)}function lt(t,n,e){$("QuickWear",`doAction - ${e}`),g("",t),t.classList.remove("smallLink"),t.classList.add("fshSpinner","fshSpin12"),n(t.dataset.itemid).then(a(ut,t,e))}function ht(t){lt(t,C,"Used")}function pt(t){dt?ht(t):U("Use/Extract Item","Are you sure you want to use/extract the item?",a(ht,t))}function bt(t){lt(t,x,"Worn")}function jt(t,n,a){const e=a.dom
if("0"===t)e.classList.remove("fshHide")
else{const a=t!==n.toString()
F(e,a)}}function kt(t,n){const e=n.id
n.items.forEach(a(jt,t,e))}function $t(t){const n=t.dataset.folder
mt.r.forEach(a(kt,n))}function gt(){dt=!dt,k("disableQuickWearPrompts",dt)}function Lt(a){n(a,t({className:"qwPref",innerHTML:T("disableQuickWearPrompts")}))}function yt(t,a,e){n(e,t(a))}function wt(t,n){Q("qwtab-header",Lt),Q("qwtab0",a(yt,z,n)),Q("qwtab1",a(yt,ft,n)),K(t,["Quick Wear / Use / Extract<br>Manager","Inventory Manager Counter<br>filtered by AH Quick Search"],"qwtab"),b(t,H([[a(W,["smallLink","fshEq"]),bt],[a(W,["smallLink","fshUse"]),pt],[a(j,"fshFolder"),$t],[M("disableQuickWearPrompts"),gt]]))}function Et(t,n){(function(t){return t&&t.s&&q(t.r)})(n)&&(mt=n,wt(t,n))}function At(t){l()&&function(t){const n=t||p
n&&(f(n,"Getting item list from backpack..."),A().then(a(Et,n)),dt=h("disableQuickWearPrompts"))}(t)}export default At
//# sourceMappingURL=quickWear-8053e40d.js.map
