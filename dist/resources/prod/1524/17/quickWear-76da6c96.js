import{k as t,s as n,f as a,z as e,L as r,b1 as s,c as o,aB as i,bC as c,i as f,bD as d,l as m,bc as u,j as l,D as p,p as h,o as b,aC as j,W as k,S as $,y as g}from"./calfSystem-dec5e071.js"
import{i as L}from"./isArray-5ae0f2ae.js"
import"./toLowerCase-1ea9a651.js"
import{c as y}from"./createInput-6f4c3b04.js"
import{c as w}from"./createLabel-2805259f.js"
import{c as C}from"./createUl-78e7ca74.js"
import"./isChecked-9b2ad5c2.js"
import{b as E}from"./simpleCheckbox-3c52b154.js"
import"./alpha-55be3c2d.js"
import{c as x}from"./createTBody-0a1e0d4a.js"
import{c as S}from"./createTable-e5b9da81.js"
import"./dialogMsg-1ae9be91.js"
import{p as A,s as I}from"./pubsub-771b55c6.js"
import{c as H}from"./createLi-32610676.js"
import"./errorDialog-5d76ff73.js"
import{j as N}from"./jConfirm-68e5f0c8.js"
import"./dialog-b7388abb.js"
import"./indexAjaxJson-ecf8d1f5.js"
import{u as v,e as W}from"./useItem-fcbdc3fc.js"
import"./ajaxReturnCode-361085b2.js"
import"./daUseItem-a1c5450c.js"
import{m as Q}from"./makeFolderSpan-46bebe5a.js"
import{e as q}from"./eventHandler5-3bf558e6.js"
import{t as P}from"./toggleForce-93af29f7.js"
import{s as U}from"./selfIdIs-b67caa4c.js"
import{a as M}from"./stringSort-a99d98f0.js"
import{d as T}from"./daLoadInventory-8d5a0fde.js"
import{h as B}from"./hasClasses-95732c6d.js"
const D=(t,n)=>t+String(n)
function F(t,n,a){return y({checked:0===a,id:D(t,a),name:t,type:"radio"})}function O(t,n,e,s){const o=H({className:"ui-state-default ui-corner-top"})
return a(o,w({htmlFor:D(t,s),innerHTML:e})),0!==s&&r(o,"click",()=>{A(D(t,s),n[s])}),o}const _=()=>t({className:"ui-tabs-panel ui-corner-bottom"})
function R(r,s,o){const i=t({className:"fshTabSet ui-tabs ui-widget-content ui-corner-all"}),c=n(a,i)
s.map(n(F,o)).forEach(c)
const f=s.map(_)
A(D(o,0),f[0])
const d=function(t,e,r){const s=C({className:"ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"})
return t.map(n(O,e,r)).forEach(n(a,s)),s}(s,o,f)
return A(o+"-header",d),a(i,d),f.forEach(c),e("",r),a(r,i),0}function z(t,n,a){const r=t.insertRow(-1)
a.dom=r
let s="fshEq ",o="fshUse "
a.t<9?s+="smallLink":s+="notLink",o+=function(t){return-1!==[10,12,15,16].indexOf(t.t)||"Zombie Coffin"===t.n?"smallLink":"notLink"}(a),e(`<td class="fshCenter"><span class="${s}" data-itemid="${a.a}">Wear</span>&nbsp;|&nbsp;<span class="${o}" data-itemid="${a.a}">Use/Ext</span></td><td><img src="${function(t){let n=i
return 13699===t.b?n+=`composing/${t.extra.design}_${t.extra.color}.png`:n+=`items/${t.b}.gif`,n}(a)}" class="tip-dynamic" data-tipped="fetchitem.php?item_id=${a.b}&amp;inv_id=${a.a}&amp;t=1&amp;p=${n}&amp;currentPlayerId=${n}" width="30" height="30" border="0"></td><td width="90%">&nbsp;${a.n}</td>`,r)}function G(t){return Q(String(t.id),t.name)}function J(t){return Q("0","All")+t.r.map(G).join("")}function Z(t,a,e){e.items.sort(M).forEach(n(z,t,a))}function K(t){const e=S({width:"100%",innerHTML:`<thead><tr><th class="fshCenter" colspan="3">${J(t)}</th></tr><tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th><th colspan="2">Items</th></tr></thead>`}),r=x()
return a(e,r),o.sortBy="n",o.sortAsc=!0,t.r.forEach(n(Z,r,s())),e}function V(n){const e=K(n),r=t()
return a(r,e),r}function X(t,n){return`<a href="${u}${t}">${n}</a>`}function Y(t){return t[1].nicknameList.length>0}function tt(t){return`<tr><td>${t[0]}</td><td>${t[1].nicknameList.map(n(X,t[0])).join(" ")}</td><td>${t[1].count}</td><td></td><td></td></tr>`}function nt(t){return t.displayOnAH&&!t.found}function at(t){return X(t.searchname,t.nickname)}function et(t){return 0===t[1].nicknameList.length}function rt(t){return`<tr><td>${t[0]}</td><td></td><td>${t[1].count}</td><td></td><td></td></tr>`}function st(t,n){return`<table width="100%" cellspacing="2" cellpadding="2"><thead><tr><th colspan="5" class="fshCenter">Items from <a href="${d}">AH Quick Search</a> found in your inventory</th></tr><tr><th>Name</th><th>Nick Name</th><th>Inv Count</th><th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>${function(t){return m(t).filter(Y).map(tt).join("")}(t)}<tr><td colspan="5"><hr></td></tr><tr><td>Did not find:</td><td colspan="4">${function(t){return t.filter(nt).map(at).join(", ")}(n)}</td></tr><tr><td colspan="5"><hr></td></tr></tbody><thead><tr><th colspan="5" class="fshCenter">Items NOT from <a href="${d}">AH Quick Search</a> found in your inventory</td></thead><tbody>${function(t){return m(t).filter(et).map(rt).join("")}(t)}</tbody></table>`}function ot(t,n,a){n===a.searchname&&(a.found=!0,t[n].nicknameList.indexOf(a.nickname)<0&&t[n].nicknameList.push(a.nickname))}function it(t,a,e){const r=e.n
!function(t,n){t[n]?t[n].count+=1:t[n]={count:1,nicknameList:[]}}(t,r),a.forEach(n(ot,t,r))}function ct(t,a,e){e.items.forEach(n(it,t,a))}function ft(a){const e={},r=c("quickSearchList")||[]
a.r.forEach(n(ct,e,r))
const s=t()
return f(s,st(e,r)),s}let dt,mt
function ut(t,n,a){0===a.r&&e(`<span class="fastWorn">${n}</span>`,t.parentNode)}function lt(t,a,e){$("QuickWear","doAction - "+e),g("",t),t.classList.remove("smallLink"),t.classList.add("fshSpinner","fshSpin12"),a(t.dataset.itemid).then(n(ut,t,e))}function pt(t){lt(t,v,"Used")}function ht(t){dt?pt(t):N("Use/Extract Item","Are you sure you want to use/extract the item?",n(pt,t))}function bt(t){lt(t,W,"Worn")}function jt(t,n,a){const e=a.dom
if("0"===t)e.classList.remove("fshHide")
else{const a=t!==n.toString()
P(e,a)}}function kt(t,a){const e=a.id
a.items.forEach(n(jt,t,e))}function $t(t){const a=t.dataset.folder
mt.r.forEach(n(kt,a))}function gt(){dt=!dt,k("disableQuickWearPrompts",dt)}function Lt(n){a(n,t({className:"qwPref",innerHTML:E("disableQuickWearPrompts")}))}function yt(t,n,e){a(e,t(n))}function wt(t,a){I("qwtab-header",Lt),I("qwtab0",n(yt,V,a)),I("qwtab1",n(yt,ft,a)),R(t,["Quick Wear / Use / Extract<br>Manager","Inventory Manager Counter<br>filtered by AH Quick Search"],"qwtab"),b(t,q([[n(B,["smallLink","fshEq"]),bt],[n(B,["smallLink","fshUse"]),ht],[n(j,"fshFolder"),$t],[U("disableQuickWearPrompts"),gt]]))}function Ct(t,n){(function(t){return t&&t.s&&L(t.r)})(n)&&(mt=n,wt(t,n))}export default function(t){l()&&function(t){const a=t||h
a&&(f(a,"Getting item list from backpack..."),T().then(n(Ct,a)),dt=p("disableQuickWearPrompts"))}(t)}
//# sourceMappingURL=quickWear-76da6c96.js.map
