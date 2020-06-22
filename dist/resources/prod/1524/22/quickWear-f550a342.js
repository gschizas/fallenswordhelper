import{m as t,t as n,h as e,A as r,O as a,b0 as s,c as o,aD as i,bx as c,i as d,by as f,e as m,bc as u,j as l,G as h,p,o as b,l as j,Y as k,U as $,z as g}from"./calfSystem-d04e4be4.js"
import{i as L}from"./isArray-7fc52818.js"
import"./toLowerCase-17c594e8.js"
import{c as y}from"./createInput-06f9cad3.js"
import{c as w}from"./createLabel-19df454f.js"
import{c as E}from"./createUl-0f36c584.js"
import"./isChecked-522ec787.js"
import{b as x}from"./simpleCheckbox-b64120a0.js"
import"./alpha-0537efc9.js"
import{c as A}from"./createTBody-75503ae6.js"
import{c as C}from"./createTable-4846a76e.js"
import"./dialogMsg-88e95d9f.js"
import{p as I,s as S}from"./pubsub-c1e59c70.js"
import{c as H}from"./createLi-392dacb2.js"
import"./errorDialog-e5c2f840.js"
import"./indexAjaxJson-73d427c9.js"
import{t as N}from"./toggleForce-6cbae4af.js"
import{a as v}from"./stringSort-a20d164a.js"
import{j as Q}from"./jConfirm-c94725d8.js"
import"./daUseItem-d85e7388.js"
import{e as U}from"./eventHandler5-296d432a.js"
import{s as W}from"./selfIdIs-f08d01d9.js"
import{m as q}from"./makeFolderSpan-1f29e99d.js"
import{d as P}from"./daLoadInventory-25db8b92.js"
import"./dialog-8f80d849.js"
import{u as M,e as T}from"./useItem-ef0646d2.js"
import{h as O}from"./hasClasses-b8df68e2.js"
const F=(t,n)=>t+String(n)
function B(t,n,e){return y({checked:0===e,id:F(t,e),name:t,type:"radio"})}function D(t,n,r,s){const o=H({className:"ui-state-default ui-corner-top"})
return e(o,w({htmlFor:F(t,s),innerHTML:r})),0!==s&&a(o,"click",()=>{I(F(t,s),n[s])}),o}const _=()=>t({className:"ui-tabs-panel ui-corner-bottom"})
function G(a,s,o){const i=t({className:"fshTabSet ui-tabs ui-widget-content ui-corner-all"}),c=n(e,i)
s.map(n(B,o)).forEach(c)
const d=s.map(_)
I(F(o,0),d[0])
const f=function(t,r,a){const s=E({className:"ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"})
return t.map(n(D,r,a)).forEach(n(e,s)),s}(s,o,d)
return I(o+"-header",f),e(i,f),d.forEach(c),r("",a),e(a,i),0}function z(t,n,e){const a=t.insertRow(-1)
e.dom=a
let s="fshEq ",o="fshUse "
e.t<9?s+="smallLink":s+="notLink",o+=function(t){return-1!==[10,12,15,16].indexOf(t.t)||"Zombie Coffin"===t.n?"smallLink":"notLink"}(e),r(`<td class="fshCenter"><span class="${s}" data-itemid="${e.a}">Wear</span>&nbsp;|&nbsp;<span class="${o}" data-itemid="${e.a}">Use/Ext</span></td><td><img src="${function(t){let n=i
return 13699===t.b?n+=`composing/${t.extra.design}_${t.extra.color}.png`:n+=`items/${t.b}.gif`,n}(e)}" class="tip-dynamic" data-tipped="fetchitem.php?item_id=${e.b}&amp;inv_id=${e.a}&amp;t=1&amp;p=${n}&amp;currentPlayerId=${n}" width="30" height="30" border="0"></td><td width="90%">&nbsp;${e.n}</td>`,a)}function J(t){return q(String(t.id),t.name)}function R(t){return q("0","All")+t.r.map(J).join("")}function Y(t,e,r){r.items.sort(v).forEach(n(z,t,e))}function Z(t){const r=C({width:"100%",innerHTML:`<thead><tr><th class="fshCenter" colspan="3">${R(t)}</th></tr><tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th><th colspan="2">Items</th></tr></thead>`}),a=A()
return e(r,a),o.sortBy="n",o.sortAsc=!0,t.r.forEach(n(Y,a,s())),r}function K(n){const r=Z(n),a=t()
return e(a,r),a}function V(t,n){return`<a href="${u}${t}">${n}</a>`}function X(t){return t[1].nicknameList.length>0}function tt(t){return`<tr><td>${t[0]}</td><td>${t[1].nicknameList.map(n(V,t[0])).join(" ")}</td><td>${t[1].count}</td><td></td><td></td></tr>`}function nt(t){return t.displayOnAH&&!t.found}function et(t){return V(t.searchname,t.nickname)}function rt(t){return 0===t[1].nicknameList.length}function at(t){return`<tr><td>${t[0]}</td><td></td><td>${t[1].count}</td><td></td><td></td></tr>`}function st(t,n){return`<table width="100%" cellspacing="2" cellpadding="2"><thead><tr><th colspan="5" class="fshCenter">Items from <a href="${f}">AH Quick Search</a> found in your inventory</th></tr><tr><th>Name</th><th>Nick Name</th><th>Inv Count</th><th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>${function(t){return m(t).filter(X).map(tt).join("")}(t)}<tr><td colspan="5"><hr></td></tr><tr><td>Did not find:</td><td colspan="4">${function(t){return t.filter(nt).map(et).join(", ")}(n)}</td></tr><tr><td colspan="5"><hr></td></tr></tbody><thead><tr><th colspan="5" class="fshCenter">Items NOT from <a href="${f}">AH Quick Search</a> found in your inventory</td></thead><tbody>${function(t){return m(t).filter(rt).map(at).join("")}(t)}</tbody></table>`}function ot(t,n,e){n===e.searchname&&(e.found=!0,t[n].nicknameList.indexOf(e.nickname)<0&&t[n].nicknameList.push(e.nickname))}function it(t,e,r){const a=r.n
!function(t,n){t[n]?t[n].count+=1:t[n]={count:1,nicknameList:[]}}(t,a),e.forEach(n(ot,t,a))}function ct(t,e,r){r.items.forEach(n(it,t,e))}function dt(e){const r={},a=c("quickSearchList")||[]
e.r.forEach(n(ct,r,a))
const s=t()
return d(s,st(r,a)),s}let ft,mt
function ut(t,n,e){0===e.r&&r(`<span class="fastWorn">${n}</span>`,t.parentNode)}function lt(t,e,r){$("QuickWear","doAction - "+r),g("",t),t.classList.remove("smallLink"),t.classList.add("fshSpinner","fshSpin12"),e(t.dataset.itemid).then(n(ut,t,r))}function ht(t){lt(t,M,"Used")}function pt(t){ft?ht(t):Q("Use/Extract Item","Are you sure you want to use/extract the item?",n(ht,t))}function bt(t){lt(t,T,"Worn")}function jt(t,n,e){const r=e.dom
if("0"===t)r.classList.remove("fshHide")
else{const e=t!==n.toString()
N(r,e)}}function kt(t,e){const r=e.id
e.items.forEach(n(jt,t,r))}function $t(t){const e=t.dataset.folder
mt.r.forEach(n(kt,e))}function gt(){ft=!ft,k("disableQuickWearPrompts",ft)}function Lt(n){e(n,t({className:"qwPref",innerHTML:x("disableQuickWearPrompts")}))}function yt(t,n,r){e(r,t(n))}function wt(t,e){S("qwtab-header",Lt),S("qwtab0",n(yt,K,e)),S("qwtab1",n(yt,dt,e)),G(t,["Quick Wear / Use / Extract<br>Manager","Inventory Manager Counter<br>filtered by AH Quick Search"],"qwtab"),b(t,U([[n(O,["smallLink","fshEq"]),bt],[n(O,["smallLink","fshUse"]),pt],[n(j,"fshFolder"),$t],[W("disableQuickWearPrompts"),gt]]))}function Et(t,n){(function(t){return t&&t.s&&L(t.r)})(n)&&(mt=n,wt(t,n))}export default function(t){l()&&function(t){const e=t||p
e&&(d(e,"Getting item list from backpack..."),P().then(n(Et,e)),ft=h("disableQuickWearPrompts"))}(t)}
//# sourceMappingURL=quickWear-f550a342.js.map
