import{k as t,s as n,f as e,z as r,L as a,b3 as s,c as o,aB as i,bH as c,i as f,bI as d,l as m,bf as u,j as l,D as p,p as h,o as b,aC as j,W as k,S as $,y as g}from"./calfSystem-57340987.js"
import{i as L}from"./isArray-f770eec0.js"
import"./toLowerCase-b755896e.js"
import{c as y}from"./createInput-b52727dd.js"
import{c as w}from"./createLabel-688f4536.js"
import{c as C}from"./createUl-177687e9.js"
import"./isChecked-e2c7160f.js"
import{b as E}from"./simpleCheckbox-0095209e.js"
import"./alpha-ef81c50b.js"
import{c as x}from"./createTBody-6df13176.js"
import{c as I}from"./createTable-f10ae272.js"
import"./dialogMsg-e1203629.js"
import{p as S,s as A}from"./pubsub-7774f7b2.js"
import{c as H}from"./createLi-75db58db.js"
import"./errorDialog-b114c11e.js"
import{j as N}from"./jConfirm-367848b2.js"
import"./dialog-bc1710e0.js"
import"./indexAjaxJson-f0b26dd6.js"
import{u as v,e as W}from"./useItem-45980044.js"
import"./ajaxReturnCode-76c0bbbd.js"
import"./daUseItem-1a5662fc.js"
import{m as Q}from"./makeFolderSpan-f56bb33c.js"
import{e as q}from"./eventHandler5-4b6e79d6.js"
import{t as P}from"./toggleForce-1813ed31.js"
import{s as U}from"./selfIdIs-b8c2cc2a.js"
import{a as M}from"./stringSort-f05896d8.js"
import{d as T}from"./daLoadInventory-88bf4de2.js"
import{h as B}from"./hasClasses-a71fe23b.js"
const F=(t,n)=>t+String(n)
function O(t,n,e){return y({checked:0===e,id:F(t,e),name:t,type:"radio"})}function D(t,n,r,s){const o=H({className:"ui-state-default ui-corner-top"})
return e(o,w({htmlFor:F(t,s),innerHTML:r})),0!==s&&a(o,"click",()=>{S(F(t,s),n[s])}),o}const _=()=>t({className:"ui-tabs-panel ui-corner-bottom"})
function R(a,s,o){const i=t({className:"fshTabSet ui-tabs ui-widget-content ui-corner-all"}),c=n(e,i)
s.map(n(O,o)).forEach(c)
const f=s.map(_)
S(F(o,0),f[0])
const d=function(t,r,a){const s=C({className:"ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"})
return t.map(n(D,r,a)).forEach(n(e,s)),s}(s,o,f)
return S(o+"-header",d),e(i,d),f.forEach(c),r("",a),e(a,i),0}function z(t,n,e){const a=t.insertRow(-1)
e.dom=a
let s="fshEq ",o="fshUse "
e.t<9?s+="smallLink":s+="notLink",o+=function(t){return-1!==[10,12,15,16].indexOf(t.t)||"Zombie Coffin"===t.n?"smallLink":"notLink"}(e),r(`<td class="fshCenter"><span class="${s}" data-itemid="${e.a}">Wear</span>&nbsp;|&nbsp;<span class="${o}" data-itemid="${e.a}">Use/Ext</span></td><td><img src="${function(t){let n=i
return 13699===t.b?n+=`composing/${t.extra.design}_${t.extra.color}.png`:n+=`items/${t.b}.gif`,n}(e)}" class="tip-dynamic" data-tipped="fetchitem.php?item_id=${e.b}&amp;inv_id=${e.a}&amp;t=1&amp;p=${n}&amp;currentPlayerId=${n}" width="30" height="30" border="0"></td><td width="90%">&nbsp;${e.n}</td>`,a)}function G(t){return Q(String(t.id),t.name)}function J(t){return Q("0","All")+t.r.map(G).join("")}function Z(t,e,r){r.items.sort(M).forEach(n(z,t,e))}function K(t){const r=I({width:"100%",innerHTML:`<thead><tr><th class="fshCenter" colspan="3">${J(t)}</th></tr><tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th><th colspan="2">Items</th></tr></thead>`}),a=x()
return e(r,a),o.sortBy="n",o.sortAsc=!0,t.r.forEach(n(Z,a,s())),r}function V(n){const r=K(n),a=t()
return e(a,r),a}function X(t,n){return`<a href="${u}${t}">${n}</a>`}function Y(t){return t[1].nicknameList.length>0}function tt(t){return`<tr><td>${t[0]}</td><td>${t[1].nicknameList.map(n(X,t[0])).join(" ")}</td><td>${t[1].count}</td><td></td><td></td></tr>`}function nt(t){return t.displayOnAH&&!t.found}function et(t){return X(t.searchname,t.nickname)}function rt(t){return 0===t[1].nicknameList.length}function at(t){return`<tr><td>${t[0]}</td><td></td><td>${t[1].count}</td><td></td><td></td></tr>`}function st(t,n){return`<table width="100%" cellspacing="2" cellpadding="2"><thead><tr><th colspan="5" class="fshCenter">Items from <a href="${d}">AH Quick Search</a> found in your inventory</th></tr><tr><th>Name</th><th>Nick Name</th><th>Inv Count</th><th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>${function(t){return m(t).filter(Y).map(tt).join("")}(t)}<tr><td colspan="5"><hr></td></tr><tr><td>Did not find:</td><td colspan="4">${function(t){return t.filter(nt).map(et).join(", ")}(n)}</td></tr><tr><td colspan="5"><hr></td></tr></tbody><thead><tr><th colspan="5" class="fshCenter">Items NOT from <a href="${d}">AH Quick Search</a> found in your inventory</td></thead><tbody>${function(t){return m(t).filter(rt).map(at).join("")}(t)}</tbody></table>`}function ot(t,n,e){n===e.searchname&&(e.found=!0,t[n].nicknameList.indexOf(e.nickname)<0&&t[n].nicknameList.push(e.nickname))}function it(t,e,r){const a=r.n
!function(t,n){t[n]?t[n].count+=1:t[n]={count:1,nicknameList:[]}}(t,a),e.forEach(n(ot,t,a))}function ct(t,e,r){r.items.forEach(n(it,t,e))}function ft(e){const r={},a=c("quickSearchList")||[]
e.r.forEach(n(ct,r,a))
const s=t()
return f(s,st(r,a)),s}let dt,mt
function ut(t,n,e){0===e.r&&r(`<span class="fastWorn">${n}</span>`,t.parentNode)}function lt(t,e,r){$("QuickWear","doAction - "+r),g("",t),t.classList.remove("smallLink"),t.classList.add("fshSpinner","fshSpin12"),e(t.dataset.itemid).then(n(ut,t,r))}function pt(t){lt(t,v,"Used")}function ht(t){dt?pt(t):N("Use/Extract Item","Are you sure you want to use/extract the item?",n(pt,t))}function bt(t){lt(t,W,"Worn")}function jt(t,n,e){const r=e.dom
if("0"===t)r.classList.remove("fshHide")
else{const e=t!==n.toString()
P(r,e)}}function kt(t,e){const r=e.id
e.items.forEach(n(jt,t,r))}function $t(t){const e=t.dataset.folder
mt.r.forEach(n(kt,e))}function gt(){dt=!dt,k("disableQuickWearPrompts",dt)}function Lt(n){e(n,t({className:"qwPref",innerHTML:E("disableQuickWearPrompts")}))}function yt(t,n,r){e(r,t(n))}function wt(t,e){A("qwtab-header",Lt),A("qwtab0",n(yt,V,e)),A("qwtab1",n(yt,ft,e)),R(t,["Quick Wear / Use / Extract<br>Manager","Inventory Manager Counter<br>filtered by AH Quick Search"],"qwtab"),b(t,q([[n(B,["smallLink","fshEq"]),bt],[n(B,["smallLink","fshUse"]),ht],[n(j,"fshFolder"),$t],[U("disableQuickWearPrompts"),gt]]))}function Ct(t,n){(function(t){return t&&t.s&&L(t.r)})(n)&&(mt=n,wt(t,n))}export default function(t){l()&&function(t){const e=t||h
e&&(f(e,"Getting item list from backpack..."),T().then(n(Ct,e)),dt=p("disableQuickWearPrompts"))}(t)}
//# sourceMappingURL=quickWear-e91d0a8f.js.map
