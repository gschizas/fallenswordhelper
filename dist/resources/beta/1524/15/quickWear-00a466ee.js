import{k as t,s as n,f as r,z as e,K as a,bg as s,c as o,at as i,bS as c,i as f,bT as d,l as m,bn as u,j as l,D as p,p as h,o as b,au as j,V as k,R as $,y as g}from"./calfSystem-1262535f.js"
import{i as L}from"./isArray-d09fe8d1.js"
import"./toLowerCase-0c270c29.js"
import{c as y}from"./createInput-62cab8cf.js"
import{c as w}from"./createLabel-7ec6b2f8.js"
import{c as E}from"./createUl-17d107e3.js"
import"./isChecked-d8a3d688.js"
import{b as x}from"./simpleCheckbox-69fdc6eb.js"
import"./alpha-cdb4272d.js"
import{c as C}from"./createTBody-5668a27d.js"
import{c as S}from"./createTable-34bb0f34.js"
import"./dialogMsg-06808fe1.js"
import{p as A,s as I}from"./pubsub-10b9364e.js"
import{c as H}from"./createLi-03da7c3b.js"
import"./errorDialog-dc5450a9.js"
import{j as N}from"./jConfirm-721d8a5e.js"
import"./dialog-c7021814.js"
import"./indexAjaxJson-f27fbe77.js"
import{u as v,e as Q}from"./useItem-89edb088.js"
import"./ajaxReturnCode-cf3ddf46.js"
import"./daUseItem-80afceb3.js"
import{m as W}from"./makeFolderSpan-f7758d3a.js"
import{e as q}from"./eventHandler5-d9f72206.js"
import{t as P}from"./toggleForce-04e33300.js"
import{s as T}from"./selfIdIs-6bd2f09f.js"
import{a as U}from"./stringSort-f2d4f03f.js"
import{d as M}from"./daLoadInventory-8e6a5666.js"
import{h as F}from"./hasClasses-9969ddc2.js"
const O=(t,n)=>t+String(n)
function B(t,n,r){return y({checked:0===r,id:O(t,r),name:t,type:"radio"})}function D(t,n,e,s){const o=H({className:"ui-state-default ui-corner-top"})
return r(o,w({htmlFor:O(t,s),innerHTML:e})),0!==s&&a(o,"click",()=>{A(O(t,s),n[s])}),o}const R=()=>t({className:"ui-tabs-panel ui-corner-bottom"})
function _(a,s,o){const i=t({className:"fshTabSet ui-tabs ui-widget-content ui-corner-all"}),c=n(r,i)
s.map(n(B,o)).forEach(c)
const f=s.map(R)
A(O(o,0),f[0])
const d=function(t,e,a){const s=E({className:"ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"})
return t.map(n(D,e,a)).forEach(n(r,s)),s}(s,o,f)
return A(o+"-header",d),r(i,d),f.forEach(c),e("",a),r(a,i),0}function z(t,n,r){const a=t.insertRow(-1)
r.dom=a
let s="fshEq ",o="fshUse "
r.t<9?s+="smallLink":s+="notLink",o+=function(t){return-1!==[10,12,15,16].indexOf(t.t)||"Zombie Coffin"===t.n?"smallLink":"notLink"}(r),e(`<td class="fshCenter"><span class="${s}" data-itemid="${r.a}">Wear</span>&nbsp;|&nbsp;<span class="${o}" data-itemid="${r.a}">Use/Ext</span></td><td><img src="${function(t){let n=i
return 13699===t.b?n+=`composing/${t.extra.design}_${t.extra.color}.png`:n+=`items/${t.b}.gif`,n}(r)}" class="tip-dynamic" data-tipped="fetchitem.php?item_id=${r.b}&amp;inv_id=${r.a}&amp;t=1&amp;p=${n}&amp;currentPlayerId=${n}" width="30" height="30" border="0"></td><td width="90%">&nbsp;${r.n}</td>`,a)}function G(t){return W(String(t.id),t.name)}function J(t){return W("0","All")+t.r.map(G).join("")}function K(t,r,e){e.items.sort(U).forEach(n(z,t,r))}function V(t){const e=S({width:"100%",innerHTML:`<thead><tr><th class="fshCenter" colspan="3">${J(t)}</th></tr><tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th><th colspan="2">Items</th></tr></thead>`}),a=C()
return r(e,a),o.sortBy="n",o.sortAsc=!0,t.r.forEach(n(K,a,s())),e}function Z(n){const e=V(n),a=t()
return r(a,e),a}function X(t,n){return`<a href="${u}${t}">${n}</a>`}function Y(t){return t[1].nicknameList.length>0}function tt(t){return`<tr><td>${t[0]}</td><td>${t[1].nicknameList.map(n(X,t[0])).join(" ")}</td><td>${t[1].count}</td><td></td><td></td></tr>`}function nt(t){return t.displayOnAH&&!t.found}function rt(t){return X(t.searchname,t.nickname)}function et(t){return 0===t[1].nicknameList.length}function at(t){return`<tr><td>${t[0]}</td><td></td><td>${t[1].count}</td><td></td><td></td></tr>`}function st(t,n){return`<table width="100%" cellspacing="2" cellpadding="2"><thead><tr><th colspan="5" class="fshCenter">Items from <a href="${d}">AH Quick Search</a> found in your inventory</th></tr><tr><th>Name</th><th>Nick Name</th><th>Inv Count</th><th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>${function(t){return m(t).filter(Y).map(tt).join("")}(t)}<tr><td colspan="5"><hr></td></tr><tr><td>Did not find:</td><td colspan="4">${function(t){return t.filter(nt).map(rt).join(", ")}(n)}</td></tr><tr><td colspan="5"><hr></td></tr></tbody><thead><tr><th colspan="5" class="fshCenter">Items NOT from <a href="${d}">AH Quick Search</a> found in your inventory</td></thead><tbody>${function(t){return m(t).filter(et).map(at).join("")}(t)}</tbody></table>`}function ot(t,n,r){n===r.searchname&&(r.found=!0,t[n].nicknameList.indexOf(r.nickname)<0&&t[n].nicknameList.push(r.nickname))}function it(t,r,e){const a=e.n
!function(t,n){t[n]?t[n].count+=1:t[n]={count:1,nicknameList:[]}}(t,a),r.forEach(n(ot,t,a))}function ct(t,r,e){e.items.forEach(n(it,t,r))}function ft(r){const e={},a=c("quickSearchList")||[]
r.r.forEach(n(ct,e,a))
const s=t()
return f(s,st(e,a)),s}let dt,mt
function ut(t,n,r){0===r.r&&e(`<span class="fastWorn">${n}</span>`,t.parentNode)}function lt(t,r,e){$("QuickWear","doAction - "+e),g("",t),t.classList.remove("smallLink"),t.classList.add("fshSpinner","fshSpin12"),r(t.dataset.itemid).then(n(ut,t,e))}function pt(t){lt(t,v,"Used")}function ht(t){dt?pt(t):N("Use/Extract Item","Are you sure you want to use/extract the item?",n(pt,t))}function bt(t){lt(t,Q,"Worn")}function jt(t,n,r){const e=r.dom
if("0"===t)e.classList.remove("fshHide")
else{const r=t!==n.toString()
P(e,r)}}function kt(t,r){const e=r.id
r.items.forEach(n(jt,t,e))}function $t(t){const r=t.dataset.folder
mt.r.forEach(n(kt,r))}function gt(){dt=!dt,k("disableQuickWearPrompts",dt)}function Lt(n){r(n,t({className:"qwPref",innerHTML:x("disableQuickWearPrompts")}))}function yt(t,n,e){r(e,t(n))}function wt(t,r){I("qwtab-header",Lt),I("qwtab0",n(yt,Z,r)),I("qwtab1",n(yt,ft,r)),_(t,["Quick Wear / Use / Extract<br>Manager","Inventory Manager Counter<br>filtered by AH Quick Search"],"qwtab"),b(t,q([[n(F,["smallLink","fshEq"]),bt],[n(F,["smallLink","fshUse"]),ht],[n(j,"fshFolder"),$t],[T("disableQuickWearPrompts"),gt]]))}function Et(t,n){(function(t){return t&&t.s&&L(t.r)})(n)&&(mt=n,wt(t,n))}export default function(t){l()&&function(t){const r=t||h
r&&(f(r,"Getting item list from backpack..."),M().then(n(Et,r)),dt=p("disableQuickWearPrompts"))}(t)}
//# sourceMappingURL=quickWear-00a466ee.js.map
