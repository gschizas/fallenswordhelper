import{k as t,s as n,f as a,z as r,L as e,b1 as s,c as o,aB as i,bD as c,i as f,bE as d,l as m,bd as u,j as l,D as p,p as h,o as b,aC as j,W as k,S as $,y as g}from"./calfSystem-6fc0cc1b.js"
import{i as L}from"./isArray-5986f48a.js"
import"./toLowerCase-9e782464.js"
import{c as y}from"./createInput-75e5aa25.js"
import{c as w}from"./createLabel-2a8f516e.js"
import{c as E}from"./createUl-a91b6072.js"
import"./isChecked-ce5ca840.js"
import{b as C}from"./simpleCheckbox-a0ada781.js"
import"./alpha-f3b92543.js"
import{c as x}from"./createTBody-f954eeed.js"
import{c as S}from"./createTable-380d7c97.js"
import"./dialogMsg-adf09e8d.js"
import{p as A,s as I}from"./pubsub-902b8b4e.js"
import{c as H}from"./createLi-9b7c875f.js"
import"./errorDialog-a6db364d.js"
import{j as N}from"./jConfirm-049ac721.js"
import"./dialog-2c2225f5.js"
import"./indexAjaxJson-608117f0.js"
import{u as v,e as W}from"./useItem-ec24475d.js"
import"./ajaxReturnCode-465058b0.js"
import"./daUseItem-b44fd8f7.js"
import{m as Q}from"./makeFolderSpan-95077aab.js"
import{e as q}from"./eventHandler5-f88189ac.js"
import{t as P}from"./toggleForce-e87c07c6.js"
import{s as U}from"./selfIdIs-77f3b204.js"
import{a as M}from"./stringSort-2da85e79.js"
import{d as T}from"./daLoadInventory-3952dfcf.js"
import{h as B}from"./hasClasses-8481f235.js"
const D=(t,n)=>t+String(n)
function F(t,n,a){return y({checked:0===a,id:D(t,a),name:t,type:"radio"})}function O(t,n,r,s){const o=H({className:"ui-state-default ui-corner-top"})
return a(o,w({htmlFor:D(t,s),innerHTML:r})),0!==s&&e(o,"click",()=>{A(D(t,s),n[s])}),o}const _=()=>t({className:"ui-tabs-panel ui-corner-bottom"})
function R(e,s,o){const i=t({className:"fshTabSet ui-tabs ui-widget-content ui-corner-all"}),c=n(a,i)
s.map(n(F,o)).forEach(c)
const f=s.map(_)
A(D(o,0),f[0])
const d=function(t,r,e){const s=E({className:"ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"})
return t.map(n(O,r,e)).forEach(n(a,s)),s}(s,o,f)
return A(o+"-header",d),a(i,d),f.forEach(c),r("",e),a(e,i),0}function z(t,n,a){const e=t.insertRow(-1)
a.dom=e
let s="fshEq ",o="fshUse "
a.t<9?s+="smallLink":s+="notLink",o+=function(t){return-1!==[10,12,15,16].indexOf(t.t)||"Zombie Coffin"===t.n?"smallLink":"notLink"}(a),r(`<td class="fshCenter"><span class="${s}" data-itemid="${a.a}">Wear</span>&nbsp;|&nbsp;<span class="${o}" data-itemid="${a.a}">Use/Ext</span></td><td><img src="${function(t){let n=i
return 13699===t.b?n+=`composing/${t.extra.design}_${t.extra.color}.png`:n+=`items/${t.b}.gif`,n}(a)}" class="tip-dynamic" data-tipped="fetchitem.php?item_id=${a.b}&amp;inv_id=${a.a}&amp;t=1&amp;p=${n}&amp;currentPlayerId=${n}" width="30" height="30" border="0"></td><td width="90%">&nbsp;${a.n}</td>`,e)}function G(t){return Q(String(t.id),t.name)}function J(t){return Q("0","All")+t.r.map(G).join("")}function Z(t,a,r){r.items.sort(M).forEach(n(z,t,a))}function K(t){const r=S({width:"100%",innerHTML:`<thead><tr><th class="fshCenter" colspan="3">${J(t)}</th></tr><tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th><th colspan="2">Items</th></tr></thead>`}),e=x()
return a(r,e),o.sortBy="n",o.sortAsc=!0,t.r.forEach(n(Z,e,s())),r}function V(n){const r=K(n),e=t()
return a(e,r),e}function X(t,n){return`<a href="${u}${t}">${n}</a>`}function Y(t){return t[1].nicknameList.length>0}function tt(t){return`<tr><td>${t[0]}</td><td>${t[1].nicknameList.map(n(X,t[0])).join(" ")}</td><td>${t[1].count}</td><td></td><td></td></tr>`}function nt(t){return t.displayOnAH&&!t.found}function at(t){return X(t.searchname,t.nickname)}function rt(t){return 0===t[1].nicknameList.length}function et(t){return`<tr><td>${t[0]}</td><td></td><td>${t[1].count}</td><td></td><td></td></tr>`}function st(t,n){return`<table width="100%" cellspacing="2" cellpadding="2"><thead><tr><th colspan="5" class="fshCenter">Items from <a href="${d}">AH Quick Search</a> found in your inventory</th></tr><tr><th>Name</th><th>Nick Name</th><th>Inv Count</th><th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>${function(t){return m(t).filter(Y).map(tt).join("")}(t)}<tr><td colspan="5"><hr></td></tr><tr><td>Did not find:</td><td colspan="4">${function(t){return t.filter(nt).map(at).join(", ")}(n)}</td></tr><tr><td colspan="5"><hr></td></tr></tbody><thead><tr><th colspan="5" class="fshCenter">Items NOT from <a href="${d}">AH Quick Search</a> found in your inventory</td></thead><tbody>${function(t){return m(t).filter(rt).map(et).join("")}(t)}</tbody></table>`}function ot(t,n,a){n===a.searchname&&(a.found=!0,t[n].nicknameList.indexOf(a.nickname)<0&&t[n].nicknameList.push(a.nickname))}function it(t,a,r){const e=r.n
!function(t,n){t[n]?t[n].count+=1:t[n]={count:1,nicknameList:[]}}(t,e),a.forEach(n(ot,t,e))}function ct(t,a,r){r.items.forEach(n(it,t,a))}function ft(a){const r={},e=c("quickSearchList")||[]
a.r.forEach(n(ct,r,e))
const s=t()
return f(s,st(r,e)),s}let dt,mt
function ut(t,n,a){0===a.r&&r(`<span class="fastWorn">${n}</span>`,t.parentNode)}function lt(t,a,r){$("QuickWear","doAction - "+r),g("",t),t.classList.remove("smallLink"),t.classList.add("fshSpinner","fshSpin12"),a(t.dataset.itemid).then(n(ut,t,r))}function pt(t){lt(t,v,"Used")}function ht(t){dt?pt(t):N("Use/Extract Item","Are you sure you want to use/extract the item?",n(pt,t))}function bt(t){lt(t,W,"Worn")}function jt(t,n,a){const r=a.dom
if("0"===t)r.classList.remove("fshHide")
else{const a=t!==n.toString()
P(r,a)}}function kt(t,a){const r=a.id
a.items.forEach(n(jt,t,r))}function $t(t){const a=t.dataset.folder
mt.r.forEach(n(kt,a))}function gt(){dt=!dt,k("disableQuickWearPrompts",dt)}function Lt(n){a(n,t({className:"qwPref",innerHTML:C("disableQuickWearPrompts")}))}function yt(t,n,r){a(r,t(n))}function wt(t,a){I("qwtab-header",Lt),I("qwtab0",n(yt,V,a)),I("qwtab1",n(yt,ft,a)),R(t,["Quick Wear / Use / Extract<br>Manager","Inventory Manager Counter<br>filtered by AH Quick Search"],"qwtab"),b(t,q([[n(B,["smallLink","fshEq"]),bt],[n(B,["smallLink","fshUse"]),ht],[n(j,"fshFolder"),$t],[U("disableQuickWearPrompts"),gt]]))}function Et(t,n){(function(t){return t&&t.s&&L(t.r)})(n)&&(mt=n,wt(t,n))}export default function(t){l()&&function(t){const a=t||h
a&&(f(a,"Getting item list from backpack..."),T().then(n(Et,a)),dt=p("disableQuickWearPrompts"))}(t)}
//# sourceMappingURL=quickWear-be6e5136.js.map
