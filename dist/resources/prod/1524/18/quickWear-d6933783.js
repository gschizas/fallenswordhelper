import{k as t,s as n,f as a,z as r,L as e,b1 as s,c as o,aB as i,bD as c,i as d,bE as f,l as m,bd as u,j as l,D as p,p as h,o as b,aC as j,W as k,S as $,y as g}from"./calfSystem-8b6534a5.js"
import{i as L}from"./isArray-3a70d0a8.js"
import"./toLowerCase-91b39a88.js"
import{c as y}from"./createInput-a695d53e.js"
import{c as w}from"./createLabel-884029b3.js"
import{c as E}from"./createUl-56d1bad6.js"
import"./isChecked-cb800ed0.js"
import{b as C}from"./simpleCheckbox-c60a3930.js"
import"./alpha-a97dc6ad.js"
import{c as x}from"./createTBody-4807b059.js"
import{c as S}from"./createTable-e198f036.js"
import"./dialogMsg-311d8a0e.js"
import{p as A,s as I}from"./pubsub-53d4cc23.js"
import{c as H}from"./createLi-696c646d.js"
import"./errorDialog-2dea8d77.js"
import{j as N}from"./jConfirm-6ccd8d9b.js"
import"./dialog-3c03bbb1.js"
import"./indexAjaxJson-b43ddbcc.js"
import{u as v,e as W}from"./useItem-2973a3f6.js"
import"./ajaxReturnCode-8531f24d.js"
import"./daUseItem-91309247.js"
import{m as Q}from"./makeFolderSpan-e34daae5.js"
import{e as q}from"./eventHandler5-e5345edb.js"
import{t as P}from"./toggleForce-c312b2b1.js"
import{s as U}from"./selfIdIs-0094e7b3.js"
import{a as M}from"./stringSort-e87c1276.js"
import{d as T}from"./daLoadInventory-830b631c.js"
import{h as B}from"./hasClasses-036d0f9b.js"
const D=(t,n)=>t+String(n)
function F(t,n,a){return y({checked:0===a,id:D(t,a),name:t,type:"radio"})}function O(t,n,r,s){const o=H({className:"ui-state-default ui-corner-top"})
return a(o,w({htmlFor:D(t,s),innerHTML:r})),0!==s&&e(o,"click",()=>{A(D(t,s),n[s])}),o}const _=()=>t({className:"ui-tabs-panel ui-corner-bottom"})
function R(e,s,o){const i=t({className:"fshTabSet ui-tabs ui-widget-content ui-corner-all"}),c=n(a,i)
s.map(n(F,o)).forEach(c)
const d=s.map(_)
A(D(o,0),d[0])
const f=function(t,r,e){const s=E({className:"ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"})
return t.map(n(O,r,e)).forEach(n(a,s)),s}(s,o,d)
return A(o+"-header",f),a(i,f),d.forEach(c),r("",e),a(e,i),0}function z(t,n,a){const e=t.insertRow(-1)
a.dom=e
let s="fshEq ",o="fshUse "
a.t<9?s+="smallLink":s+="notLink",o+=function(t){return-1!==[10,12,15,16].indexOf(t.t)||"Zombie Coffin"===t.n?"smallLink":"notLink"}(a),r(`<td class="fshCenter"><span class="${s}" data-itemid="${a.a}">Wear</span>&nbsp;|&nbsp;<span class="${o}" data-itemid="${a.a}">Use/Ext</span></td><td><img src="${function(t){let n=i
return 13699===t.b?n+=`composing/${t.extra.design}_${t.extra.color}.png`:n+=`items/${t.b}.gif`,n}(a)}" class="tip-dynamic" data-tipped="fetchitem.php?item_id=${a.b}&amp;inv_id=${a.a}&amp;t=1&amp;p=${n}&amp;currentPlayerId=${n}" width="30" height="30" border="0"></td><td width="90%">&nbsp;${a.n}</td>`,e)}function G(t){return Q(String(t.id),t.name)}function J(t){return Q("0","All")+t.r.map(G).join("")}function Z(t,a,r){r.items.sort(M).forEach(n(z,t,a))}function K(t){const r=S({width:"100%",innerHTML:`<thead><tr><th class="fshCenter" colspan="3">${J(t)}</th></tr><tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th><th colspan="2">Items</th></tr></thead>`}),e=x()
return a(r,e),o.sortBy="n",o.sortAsc=!0,t.r.forEach(n(Z,e,s())),r}function V(n){const r=K(n),e=t()
return a(e,r),e}function X(t,n){return`<a href="${u}${t}">${n}</a>`}function Y(t){return t[1].nicknameList.length>0}function tt(t){return`<tr><td>${t[0]}</td><td>${t[1].nicknameList.map(n(X,t[0])).join(" ")}</td><td>${t[1].count}</td><td></td><td></td></tr>`}function nt(t){return t.displayOnAH&&!t.found}function at(t){return X(t.searchname,t.nickname)}function rt(t){return 0===t[1].nicknameList.length}function et(t){return`<tr><td>${t[0]}</td><td></td><td>${t[1].count}</td><td></td><td></td></tr>`}function st(t,n){return`<table width="100%" cellspacing="2" cellpadding="2"><thead><tr><th colspan="5" class="fshCenter">Items from <a href="${f}">AH Quick Search</a> found in your inventory</th></tr><tr><th>Name</th><th>Nick Name</th><th>Inv Count</th><th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>${function(t){return m(t).filter(Y).map(tt).join("")}(t)}<tr><td colspan="5"><hr></td></tr><tr><td>Did not find:</td><td colspan="4">${function(t){return t.filter(nt).map(at).join(", ")}(n)}</td></tr><tr><td colspan="5"><hr></td></tr></tbody><thead><tr><th colspan="5" class="fshCenter">Items NOT from <a href="${f}">AH Quick Search</a> found in your inventory</td></thead><tbody>${function(t){return m(t).filter(rt).map(et).join("")}(t)}</tbody></table>`}function ot(t,n,a){n===a.searchname&&(a.found=!0,t[n].nicknameList.indexOf(a.nickname)<0&&t[n].nicknameList.push(a.nickname))}function it(t,a,r){const e=r.n
!function(t,n){t[n]?t[n].count+=1:t[n]={count:1,nicknameList:[]}}(t,e),a.forEach(n(ot,t,e))}function ct(t,a,r){r.items.forEach(n(it,t,a))}function dt(a){const r={},e=c("quickSearchList")||[]
a.r.forEach(n(ct,r,e))
const s=t()
return d(s,st(r,e)),s}let ft,mt
function ut(t,n,a){0===a.r&&r(`<span class="fastWorn">${n}</span>`,t.parentNode)}function lt(t,a,r){$("QuickWear","doAction - "+r),g("",t),t.classList.remove("smallLink"),t.classList.add("fshSpinner","fshSpin12"),a(t.dataset.itemid).then(n(ut,t,r))}function pt(t){lt(t,v,"Used")}function ht(t){ft?pt(t):N("Use/Extract Item","Are you sure you want to use/extract the item?",n(pt,t))}function bt(t){lt(t,W,"Worn")}function jt(t,n,a){const r=a.dom
if("0"===t)r.classList.remove("fshHide")
else{const a=t!==n.toString()
P(r,a)}}function kt(t,a){const r=a.id
a.items.forEach(n(jt,t,r))}function $t(t){const a=t.dataset.folder
mt.r.forEach(n(kt,a))}function gt(){ft=!ft,k("disableQuickWearPrompts",ft)}function Lt(n){a(n,t({className:"qwPref",innerHTML:C("disableQuickWearPrompts")}))}function yt(t,n,r){a(r,t(n))}function wt(t,a){I("qwtab-header",Lt),I("qwtab0",n(yt,V,a)),I("qwtab1",n(yt,dt,a)),R(t,["Quick Wear / Use / Extract<br>Manager","Inventory Manager Counter<br>filtered by AH Quick Search"],"qwtab"),b(t,q([[n(B,["smallLink","fshEq"]),bt],[n(B,["smallLink","fshUse"]),ht],[n(j,"fshFolder"),$t],[U("disableQuickWearPrompts"),gt]]))}function Et(t,n){(function(t){return t&&t.s&&L(t.r)})(n)&&(mt=n,wt(t,n))}export default function(t){l()&&function(t){const a=t||h
a&&(d(a,"Getting item list from backpack..."),T().then(n(Et,a)),ft=p("disableQuickWearPrompts"))}(t)}
//# sourceMappingURL=quickWear-d6933783.js.map
