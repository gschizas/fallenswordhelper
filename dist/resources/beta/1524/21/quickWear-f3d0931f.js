import{m as t,t as n,h as a,A as e,O as r,b2 as s,c as o,aD as i,bC as c,i as f,bD as d,e as m,be as u,j as l,G as h,p,o as b,l as j,Y as k,U as $,z as g}from"./calfSystem-89b939c8.js"
import{i as L}from"./isArray-75e85160.js"
import"./toLowerCase-5d1ed3f8.js"
import{c as y}from"./createInput-efc68c10.js"
import{c as w}from"./createLabel-e0d7a850.js"
import{c as E}from"./createUl-f8d9693f.js"
import"./isChecked-3ea89984.js"
import{b as A}from"./simpleCheckbox-9add2311.js"
import"./alpha-823633da.js"
import{c as C}from"./createTBody-fd7adfb3.js"
import{c as x}from"./createTable-fd00f6db.js"
import"./dialogMsg-d061ece2.js"
import{p as I,s as S}from"./pubsub-a5bc92df.js"
import{c as H}from"./createLi-985f971f.js"
import"./errorDialog-28ee21dd.js"
import"./indexAjaxJson-dab169e3.js"
import{t as N}from"./toggleForce-fba73ab8.js"
import{a as v}from"./stringSort-f68cfc58.js"
import{j as Q}from"./jConfirm-4af15c13.js"
import"./daUseItem-8aa44a50.js"
import{e as U}from"./eventHandler5-f37cd843.js"
import{s as W}from"./selfIdIs-dafb02a3.js"
import{m as q}from"./makeFolderSpan-7f262e2e.js"
import{d as P}from"./daLoadInventory-03013a13.js"
import"./dialog-7eea8a00.js"
import{u as M,e as T}from"./useItem-e911a362.js"
import{h as O}from"./hasClasses-389be3b0.js"
const D=(t,n)=>t+String(n)
function F(t,n,a){return y({checked:0===a,id:D(t,a),name:t,type:"radio"})}function B(t,n,e,s){const o=H({className:"ui-state-default ui-corner-top"})
return a(o,w({htmlFor:D(t,s),innerHTML:e})),0!==s&&r(o,"click",()=>{I(D(t,s),n[s])}),o}const _=()=>t({className:"ui-tabs-panel ui-corner-bottom"})
function G(r,s,o){const i=t({className:"fshTabSet ui-tabs ui-widget-content ui-corner-all"}),c=n(a,i)
s.map(n(F,o)).forEach(c)
const f=s.map(_)
I(D(o,0),f[0])
const d=function(t,e,r){const s=E({className:"ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"})
return t.map(n(B,e,r)).forEach(n(a,s)),s}(s,o,f)
return I(o+"-header",d),a(i,d),f.forEach(c),e("",r),a(r,i),0}function z(t,n,a){const r=t.insertRow(-1)
a.dom=r
let s="fshEq ",o="fshUse "
a.t<9?s+="smallLink":s+="notLink",o+=function(t){return-1!==[10,12,15,16].indexOf(t.t)||"Zombie Coffin"===t.n?"smallLink":"notLink"}(a),e(`<td class="fshCenter"><span class="${s}" data-itemid="${a.a}">Wear</span>&nbsp;|&nbsp;<span class="${o}" data-itemid="${a.a}">Use/Ext</span></td><td><img src="${function(t){let n=i
return 13699===t.b?n+=`composing/${t.extra.design}_${t.extra.color}.png`:n+=`items/${t.b}.gif`,n}(a)}" class="tip-dynamic" data-tipped="fetchitem.php?item_id=${a.b}&amp;inv_id=${a.a}&amp;t=1&amp;p=${n}&amp;currentPlayerId=${n}" width="30" height="30" border="0"></td><td width="90%">&nbsp;${a.n}</td>`,r)}function J(t){return q(String(t.id),t.name)}function R(t){return q("0","All")+t.r.map(J).join("")}function Y(t,a,e){e.items.sort(v).forEach(n(z,t,a))}function Z(t){const e=x({width:"100%",innerHTML:`<thead><tr><th class="fshCenter" colspan="3">${R(t)}</th></tr><tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th><th colspan="2">Items</th></tr></thead>`}),r=C()
return a(e,r),o.sortBy="n",o.sortAsc=!0,t.r.forEach(n(Y,r,s())),e}function K(n){const e=Z(n),r=t()
return a(r,e),r}function V(t,n){return`<a href="${u}${t}">${n}</a>`}function X(t){return t[1].nicknameList.length>0}function tt(t){return`<tr><td>${t[0]}</td><td>${t[1].nicknameList.map(n(V,t[0])).join(" ")}</td><td>${t[1].count}</td><td></td><td></td></tr>`}function nt(t){return t.displayOnAH&&!t.found}function at(t){return V(t.searchname,t.nickname)}function et(t){return 0===t[1].nicknameList.length}function rt(t){return`<tr><td>${t[0]}</td><td></td><td>${t[1].count}</td><td></td><td></td></tr>`}function st(t,n){return`<table width="100%" cellspacing="2" cellpadding="2"><thead><tr><th colspan="5" class="fshCenter">Items from <a href="${d}">AH Quick Search</a> found in your inventory</th></tr><tr><th>Name</th><th>Nick Name</th><th>Inv Count</th><th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>${function(t){return m(t).filter(X).map(tt).join("")}(t)}<tr><td colspan="5"><hr></td></tr><tr><td>Did not find:</td><td colspan="4">${function(t){return t.filter(nt).map(at).join(", ")}(n)}</td></tr><tr><td colspan="5"><hr></td></tr></tbody><thead><tr><th colspan="5" class="fshCenter">Items NOT from <a href="${d}">AH Quick Search</a> found in your inventory</td></thead><tbody>${function(t){return m(t).filter(et).map(rt).join("")}(t)}</tbody></table>`}function ot(t,n,a){n===a.searchname&&(a.found=!0,t[n].nicknameList.indexOf(a.nickname)<0&&t[n].nicknameList.push(a.nickname))}function it(t,a,e){const r=e.n
!function(t,n){t[n]?t[n].count+=1:t[n]={count:1,nicknameList:[]}}(t,r),a.forEach(n(ot,t,r))}function ct(t,a,e){e.items.forEach(n(it,t,a))}function ft(a){const e={},r=c("quickSearchList")||[]
a.r.forEach(n(ct,e,r))
const s=t()
return f(s,st(e,r)),s}let dt,mt
function ut(t,n,a){0===a.r&&e(`<span class="fastWorn">${n}</span>`,t.parentNode)}function lt(t,a,e){$("QuickWear","doAction - "+e),g("",t),t.classList.remove("smallLink"),t.classList.add("fshSpinner","fshSpin12"),a(t.dataset.itemid).then(n(ut,t,e))}function ht(t){lt(t,M,"Used")}function pt(t){dt?ht(t):Q("Use/Extract Item","Are you sure you want to use/extract the item?",n(ht,t))}function bt(t){lt(t,T,"Worn")}function jt(t,n,a){const e=a.dom
if("0"===t)e.classList.remove("fshHide")
else{const a=t!==n.toString()
N(e,a)}}function kt(t,a){const e=a.id
a.items.forEach(n(jt,t,e))}function $t(t){const a=t.dataset.folder
mt.r.forEach(n(kt,a))}function gt(){dt=!dt,k("disableQuickWearPrompts",dt)}function Lt(n){a(n,t({className:"qwPref",innerHTML:A("disableQuickWearPrompts")}))}function yt(t,n,e){a(e,t(n))}function wt(t,a){S("qwtab-header",Lt),S("qwtab0",n(yt,K,a)),S("qwtab1",n(yt,ft,a)),G(t,["Quick Wear / Use / Extract<br>Manager","Inventory Manager Counter<br>filtered by AH Quick Search"],"qwtab"),b(t,U([[n(O,["smallLink","fshEq"]),bt],[n(O,["smallLink","fshUse"]),pt],[n(j,"fshFolder"),$t],[W("disableQuickWearPrompts"),gt]]))}function Et(t,n){(function(t){return t&&t.s&&L(t.r)})(n)&&(mt=n,wt(t,n))}export default function(t){l()&&function(t){const a=t||p
a&&(f(a,"Getting item list from backpack..."),P().then(n(Et,a)),dt=h("disableQuickWearPrompts"))}(t)}
//# sourceMappingURL=quickWear-f3d0931f.js.map
