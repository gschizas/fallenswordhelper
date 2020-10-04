import{m as t,t as n,h as e,A as r,O as a,b0 as s,c as o,aE as i,bu as c,i as f,bv as d,e as m,ba as u,j as l,H as h,p,o as b,l as j,Z as k,V as $,z as g}from"./calfSystem-3bdf319e.js"
import{i as L}from"./isArray-5d976413.js"
import"./toLowerCase-33399b5a.js"
import{c as y}from"./createInput-52b88e62.js"
import{c as w}from"./createLabel-5e5a446f.js"
import{c as E}from"./createUl-4c832f49.js"
import"./isChecked-ed98077f.js"
import{b as A}from"./simpleCheckbox-4f2c6115.js"
import"./alpha-d5278d39.js"
import{c as x}from"./createTBody-e1fd2ed4.js"
import{c as C}from"./createTable-bf1faf4f.js"
import"./dialogMsg-9c8d1b20.js"
import{p as H,s as I}from"./pubsub-fba74854.js"
import{c as S}from"./createLi-ffa2cc54.js"
import"./errorDialog-7f9c11b0.js"
import"./indexAjaxJson-5033dc48.js"
import{t as v}from"./toggleForce-7e736fc3.js"
import{a as N}from"./stringSort-331e7e45.js"
import{j as Q}from"./jConfirm-109020dd.js"
import"./daUseItem-3dd70138.js"
import{e as W}from"./eventHandler5-bcef620b.js"
import{s as q}from"./selfIdIs-f5089bf1.js"
import{m as P}from"./makeFolderSpan-b10ef92b.js"
import{d as U}from"./daLoadInventory-661f98dc.js"
import"./dialog-370f639a.js"
import{u as M,e as T}from"./useItem-48f21584.js"
import{h as O}from"./hasClasses-ad54a461.js"
const F=(t,n)=>t+String(n)
function B(t,n,e){return y({checked:0===e,id:F(t,e),name:t,type:"radio"})}function _(t,n,r,s){const o=S({className:"ui-state-default ui-corner-top"})
return e(o,w({htmlFor:F(t,s),innerHTML:r})),0!==s&&a(o,"click",()=>{H(F(t,s),n[s])}),o}const D=()=>t({className:"ui-tabs-panel ui-corner-bottom"})
function Z(a,s,o){const i=t({className:"fshTabSet ui-tabs ui-widget-content ui-corner-all"}),c=n(e,i)
s.map(n(B,o)).forEach(c)
const f=s.map(D)
H(F(o,0),f[0])
const d=function(t,r,a){const s=E({className:"ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"})
return t.map(n(_,r,a)).forEach(n(e,s)),s}(s,o,f)
H(o+"-header",d),e(i,d),f.forEach(c),r("",a),e(a,i)}function z(t,n,e){const a=t.insertRow(-1)
e.dom=a
let s="fshEq ",o="fshUse "
e.t<9?s+="smallLink":s+="notLink",o+=function(t){return-1!==[10,12,15,16].indexOf(t.t)||"Zombie Coffin"===t.n?"smallLink":"notLink"}(e),r(`<td class="fshCenter"><span class="${s}" data-itemid="${e.a}">Wear</span>&nbsp;|&nbsp;<span class="${o}" data-itemid="${e.a}">Use/Ext</span></td><td><img src="${function(t){let n=i
return 13699===t.b?n+=`composing/${t.extra.design}_${t.extra.color}.png`:n+=`items/${t.b}.gif`,n}(e)}" class="tip-dynamic" data-tipped="fetchitem.php?item_id=${e.b}&amp;inv_id=${e.a}&amp;t=1&amp;p=${n}&amp;currentPlayerId=${n}" width="30" height="30" border="0"></td><td width="90%">&nbsp;${e.n}</td>`,a)}function G(t){return P(String(t.id),t.name)}function J(t){return P("0","All")+t.r.map(G).join("")}function R(t,e,r){r.items.sort(N).forEach(n(z,t,e))}function V(t){const r=C({width:"100%",innerHTML:`<thead><tr><th class="fshCenter" colspan="3">${J(t)}</th></tr><tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th><th colspan="2">Items</th></tr></thead>`}),a=x()
return e(r,a),o.sortBy="n",o.sortAsc=!0,t.r.forEach(n(R,a,s())),r}function K(n){const r=V(n),a=t()
return e(a,r),a}function X(t,n){return`<a href="${u}${t}">${n}</a>`}function Y(t){return t[1].nicknameList.length>0}function tt(t){return`<tr><td>${t[0]}</td><td>${t[1].nicknameList.map(n(X,t[0])).join(" ")}</td><td>${t[1].count}</td><td></td><td></td></tr>`}function nt(t){return t.displayOnAH&&!t.found}function et(t){return X(t.searchname,t.nickname)}function rt(t){return 0===t[1].nicknameList.length}function at(t){return`<tr><td>${t[0]}</td><td></td><td>${t[1].count}</td><td></td><td></td></tr>`}function st(t,n){return`<table width="100%" cellspacing="2" cellpadding="2"><thead><tr><th colspan="5" class="fshCenter">Items from <a href="${d}">AH Quick Search</a> found in your inventory</th></tr><tr><th>Name</th><th>Nick Name</th><th>Inv Count</th><th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>${function(t){return m(t).filter(Y).map(tt).join("")}(t)}<tr><td colspan="5"><hr></td></tr><tr><td>Did not find:</td><td colspan="4">${function(t){return t.filter(nt).map(et).join(", ")}(n)}</td></tr><tr><td colspan="5"><hr></td></tr></tbody><thead><tr><th colspan="5" class="fshCenter">Items NOT from <a href="${d}">AH Quick Search</a> found in your inventory</td></thead><tbody>${function(t){return m(t).filter(rt).map(at).join("")}(t)}</tbody></table>`}function ot(t,n,e){n===e.searchname&&(e.found=!0,t[n].nicknameList.indexOf(e.nickname)<0&&t[n].nicknameList.push(e.nickname))}function it(t,e,r){const a=r.n
!function(t,n){t[n]?t[n].count+=1:t[n]={count:1,nicknameList:[]}}(t,a),e.forEach(n(ot,t,a))}function ct(t,e,r){r.items.forEach(n(it,t,e))}function ft(e){const r={},a=c("quickSearchList")||[]
e.r.forEach(n(ct,r,a))
const s=t()
return f(s,st(r,a)),s}let dt,mt
function ut(t,n,e){0===e.r&&r(`<span class="fastWorn">${n}</span>`,t.parentNode)}function lt(t,e,r){$("QuickWear","doAction - "+r),g("",t),t.classList.remove("smallLink"),t.classList.add("fshSpinner","fshSpin12"),e(t.dataset.itemid).then(n(ut,t,r))}function ht(t){lt(t,M,"Used")}function pt(t){dt?ht(t):Q("Use/Extract Item","Are you sure you want to use/extract the item?",n(ht,t))}function bt(t){lt(t,T,"Worn")}function jt(t,n,e){const r=e.dom
if("0"===t)r.classList.remove("fshHide")
else{const e=t!==n.toString()
v(r,e)}}function kt(t,e){const r=e.id
e.items.forEach(n(jt,t,r))}function $t(t){const e=t.dataset.folder
mt.r.forEach(n(kt,e))}function gt(){dt=!dt,k("disableQuickWearPrompts",dt)}function Lt(n){e(n,t({className:"qwPref",innerHTML:A("disableQuickWearPrompts")}))}function yt(t,n,r){e(r,t(n))}function wt(t,e){I("qwtab-header",Lt),I("qwtab0",n(yt,K,e)),I("qwtab1",n(yt,ft,e)),Z(t,["Quick Wear / Use / Extract<br>Manager","Inventory Manager Counter<br>filtered by AH Quick Search"],"qwtab"),b(t,W([[n(O,["smallLink","fshEq"]),bt],[n(O,["smallLink","fshUse"]),pt],[n(j,"fshFolder"),$t],[q("disableQuickWearPrompts"),gt]]))}function Et(t,n){(function(t){return t&&t.s&&L(t.r)})(n)&&(mt=n,wt(t,n))}function At(t){l()&&function(t){const e=t||p
e&&(f(e,"Getting item list from backpack..."),U().then(n(Et,e)),dt=h("disableQuickWearPrompts"))}(t)}export default At
//# sourceMappingURL=quickWear-ee8dde4f.js.map
