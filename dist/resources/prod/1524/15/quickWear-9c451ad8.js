import{k as t,s as n,f as e,z as r,K as a,be as s,c as o,at as i,bO as c,i as d,bP as f,l as m,bl as u,j as l,D as p,p as h,o as b,au as j,V as k,R as $,y as g}from"./calfSystem-740ec4d2.js"
import{i as L}from"./isArray-3eb52569.js"
import"./toLowerCase-dcd4458e.js"
import{c as y}from"./createInput-e6e1d6b3.js"
import{c as w}from"./createLabel-de0fa934.js"
import{c as E}from"./createUl-ebfbcd93.js"
import"./isChecked-3cb537d5.js"
import{b as x}from"./simpleCheckbox-f50ed15c.js"
import"./alpha-28899565.js"
import{c as C}from"./createTBody-cd7d668a.js"
import{c as A}from"./createTable-0cac6208.js"
import"./dialogMsg-a44aafc4.js"
import{p as I,s as S}from"./pubsub-c43ae41e.js"
import{c as H}from"./createLi-1ed628b4.js"
import"./errorDialog-d5947e19.js"
import{j as N}from"./jConfirm-bbb6e556.js"
import"./dialog-004172c3.js"
import"./indexAjaxJson-1e1af708.js"
import{u as v,e as P}from"./useItem-6598ea1f.js"
import"./ajaxReturnCode-e6ac4096.js"
import"./daUseItem-77f590b8.js"
import{m as Q}from"./makeFolderSpan-5ec2fcee.js"
import{e as W}from"./eventHandler5-0c9435d1.js"
import{t as q}from"./toggleForce-d0f18056.js"
import{s as U}from"./selfIdIs-154fe41e.js"
import{a as M}from"./stringSort-5f60d1ed.js"
import{d as T}from"./daLoadInventory-6f5180fd.js"
import{h as O}from"./hasClasses-d69da7f1.js"
const F=(t,n)=>t+String(n)
function B(t,n,e){return y({checked:0===e,id:F(t,e),name:t,type:"radio"})}function D(t,n,r,s){const o=H({className:"ui-state-default ui-corner-top"})
return e(o,w({htmlFor:F(t,s),innerHTML:r})),0!==s&&a(o,"click",()=>{I(F(t,s),n[s])}),o}const R=()=>t({className:"ui-tabs-panel ui-corner-bottom"})
function _(a,s,o){const i=t({className:"fshTabSet ui-tabs ui-widget-content ui-corner-all"}),c=n(e,i)
s.map(n(B,o)).forEach(c)
const d=s.map(R)
I(F(o,0),d[0])
const f=function(t,r,a){const s=E({className:"ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"})
return t.map(n(D,r,a)).forEach(n(e,s)),s}(s,o,d)
return I(o+"-header",f),e(i,f),d.forEach(c),r("",a),e(a,i),0}function z(t,n,e){const a=t.insertRow(-1)
e.dom=a
let s="fshEq ",o="fshUse "
e.t<9?s+="smallLink":s+="notLink",o+=function(t){return-1!==[10,12,15,16].indexOf(t.t)||"Zombie Coffin"===t.n?"smallLink":"notLink"}(e),r(`<td class="fshCenter"><span class="${s}" data-itemid="${e.a}">Wear</span>&nbsp;|&nbsp;<span class="${o}" data-itemid="${e.a}">Use/Ext</span></td><td><img src="${function(t){let n=i
return 13699===t.b?n+=`composing/${t.extra.design}_${t.extra.color}.png`:n+=`items/${t.b}.gif`,n}(e)}" class="tip-dynamic" data-tipped="fetchitem.php?item_id=${e.b}&amp;inv_id=${e.a}&amp;t=1&amp;p=${n}&amp;currentPlayerId=${n}" width="30" height="30" border="0"></td><td width="90%">&nbsp;${e.n}</td>`,a)}function G(t){return Q(String(t.id),t.name)}function J(t){return Q("0","All")+t.r.map(G).join("")}function K(t,e,r){r.items.sort(M).forEach(n(z,t,e))}function V(t){const r=A({width:"100%",innerHTML:`<thead><tr><th class="fshCenter" colspan="3">${J(t)}</th></tr><tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th><th colspan="2">Items</th></tr></thead>`}),a=C()
return e(r,a),o.sortBy="n",o.sortAsc=!0,t.r.forEach(n(K,a,s())),r}function Z(n){const r=V(n),a=t()
return e(a,r),a}function X(t,n){return`<a href="${u}${t}">${n}</a>`}function Y(t){return t[1].nicknameList.length>0}function tt(t){return`<tr><td>${t[0]}</td><td>${t[1].nicknameList.map(n(X,t[0])).join(" ")}</td><td>${t[1].count}</td><td></td><td></td></tr>`}function nt(t){return t.displayOnAH&&!t.found}function et(t){return X(t.searchname,t.nickname)}function rt(t){return 0===t[1].nicknameList.length}function at(t){return`<tr><td>${t[0]}</td><td></td><td>${t[1].count}</td><td></td><td></td></tr>`}function st(t,n){return`<table width="100%" cellspacing="2" cellpadding="2"><thead><tr><th colspan="5" class="fshCenter">Items from <a href="${f}">AH Quick Search</a> found in your inventory</th></tr><tr><th>Name</th><th>Nick Name</th><th>Inv Count</th><th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>${function(t){return m(t).filter(Y).map(tt).join("")}(t)}<tr><td colspan="5"><hr></td></tr><tr><td>Did not find:</td><td colspan="4">${function(t){return t.filter(nt).map(et).join(", ")}(n)}</td></tr><tr><td colspan="5"><hr></td></tr></tbody><thead><tr><th colspan="5" class="fshCenter">Items NOT from <a href="${f}">AH Quick Search</a> found in your inventory</td></thead><tbody>${function(t){return m(t).filter(rt).map(at).join("")}(t)}</tbody></table>`}function ot(t,n,e){n===e.searchname&&(e.found=!0,t[n].nicknameList.indexOf(e.nickname)<0&&t[n].nicknameList.push(e.nickname))}function it(t,e,r){const a=r.n
!function(t,n){t[n]?t[n].count+=1:t[n]={count:1,nicknameList:[]}}(t,a),e.forEach(n(ot,t,a))}function ct(t,e,r){r.items.forEach(n(it,t,e))}function dt(e){const r={},a=c("quickSearchList")||[]
e.r.forEach(n(ct,r,a))
const s=t()
return d(s,st(r,a)),s}let ft,mt
function ut(t,n,e){0===e.r&&r(`<span class="fastWorn">${n}</span>`,t.parentNode)}function lt(t,e,r){$("QuickWear","doAction - "+r),g("",t),t.classList.remove("smallLink"),t.classList.add("fshSpinner","fshSpin12"),e(t.dataset.itemid).then(n(ut,t,r))}function pt(t){lt(t,v,"Used")}function ht(t){ft?pt(t):N("Use/Extract Item","Are you sure you want to use/extract the item?",n(pt,t))}function bt(t){lt(t,P,"Worn")}function jt(t,n,e){const r=e.dom
if("0"===t)r.classList.remove("fshHide")
else{const e=t!==n.toString()
q(r,e)}}function kt(t,e){const r=e.id
e.items.forEach(n(jt,t,r))}function $t(t){const e=t.dataset.folder
mt.r.forEach(n(kt,e))}function gt(){ft=!ft,k("disableQuickWearPrompts",ft)}function Lt(n){e(n,t({className:"qwPref",innerHTML:x("disableQuickWearPrompts")}))}function yt(t,n,r){e(r,t(n))}function wt(t,e){S("qwtab-header",Lt),S("qwtab0",n(yt,Z,e)),S("qwtab1",n(yt,dt,e)),_(t,["Quick Wear / Use / Extract<br>Manager","Inventory Manager Counter<br>filtered by AH Quick Search"],"qwtab"),b(t,W([[n(O,["smallLink","fshEq"]),bt],[n(O,["smallLink","fshUse"]),ht],[n(j,"fshFolder"),$t],[U("disableQuickWearPrompts"),gt]]))}function Et(t,n){(function(t){return t&&t.s&&L(t.r)})(n)&&(mt=n,wt(t,n))}export default function(t){l()&&function(t){const e=t||h
e&&(d(e,"Getting item list from backpack..."),T().then(n(Et,e)),ft=p("disableQuickWearPrompts"))}(t)}
//# sourceMappingURL=quickWear-9c451ad8.js.map
