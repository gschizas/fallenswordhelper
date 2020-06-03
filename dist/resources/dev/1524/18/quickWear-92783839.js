import{k as t,s as n,f as e,z as a,L as r,b8 as s,c as o,aG as i,bJ as c,i as d,bK as f,l as m,bk as u,j as l,D as h,M as p,p as b,o as j,aH as k,X as $,T as g,y as L}from"./calfSystem-5545a3e6.js"
import"./toLowerCase-57ae178d.js"
import{c as y}from"./createInput-836d9f1f.js"
import{c as w}from"./createLabel-062664fb.js"
import{c as E}from"./createUl-4ac3809c.js"
import"./isChecked-ae232d81.js"
import{b as x}from"./simpleCheckbox-16914843.js"
import"./alpha-e4543f35.js"
import{c as C}from"./createTBody-14d36590.js"
import{c as H}from"./createTable-b1e7ce39.js"
import"./dialogMsg-e3924e5b.js"
import{p as I,s as S}from"./pubsub-a1190879.js"
import{c as A}from"./createLi-721e020f.js"
import"./errorDialog-506fd27f.js"
import{j as N}from"./jConfirm-90c5c1b1.js"
import"./dialog-30daca30.js"
import"./indexAjaxJson-06c0d970.js"
import{u as v,e as Q}from"./useItem-d1797c01.js"
import"./ajaxReturnCode-d5cc1480.js"
import"./daUseItem-d3bafccd.js"
import{m as W}from"./makeFolderSpan-85001e1e.js"
import{e as q}from"./eventHandler5-ffda34ea.js"
import{t as M}from"./toggleForce-c71db530.js"
import{s as P}from"./selfIdIs-f1738628.js"
import{a as T}from"./stringSort-69df5bb5.js"
import{d as U}from"./daLoadInventory-d6390995.js"
import{h as F}from"./hasClasses-844cde85.js"
const O=(t,n)=>t+String(n)
function B(t,n,e){return y({checked:0===e,id:O(t,e),name:t,type:"radio"})}function D(t,n,a,s){const o=A({className:"ui-state-default ui-corner-top"})
return e(o,w({htmlFor:O(t,s),innerHTML:a})),0!==s&&r(o,"click",()=>{I(O(t,s),n[s])}),o}const _=()=>t({className:"ui-tabs-panel ui-corner-bottom"})
function G(r,s,o){const i=t({className:"fshTabSet ui-tabs ui-widget-content ui-corner-all"}),c=n(e,i)
s.map(n(B,o)).forEach(c)
const d=s.map(_)
I(O(o,0),d[0])
const f=function(t,a,r){const s=E({className:"ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"})
return t.map(n(D,a,r)).forEach(n(e,s)),s}(s,o,d)
return I(o+"-header",f),e(i,f),d.forEach(c),a("",r),e(r,i),0}function J(t,n,e){const r=t.insertRow(-1)
e.dom=r
let s="fshEq ",o="fshUse "
e.t<9?s+="smallLink":s+="notLink",o+=function(t){return-1!==[10,12,15,16].indexOf(t.t)||"Zombie Coffin"===t.n?"smallLink":"notLink"}(e),a(`<td class="fshCenter"><span class="${s}" data-itemid="${e.a}">Wear</span>&nbsp;|&nbsp;<span class="${o}" data-itemid="${e.a}">Use/Ext</span></td><td><img src="${function(t){let n=i
return 13699===t.b?n+=`composing/${t.extra.design}_${t.extra.color}.png`:n+=`items/${t.b}.gif`,n}(e)}" class="tip-dynamic" data-tipped="fetchitem.php?item_id=${e.b}&amp;inv_id=${e.a}&amp;t=1&amp;p=${n}&amp;currentPlayerId=${n}" width="30" height="30" border="0"></td><td width="90%">&nbsp;${e.n}</td>`,r)}function R(t){return W(String(t.id),t.name)}function z(t){return W("0","All")+t.r.map(R).join("")}function K(t,e,a){a.items.sort(T).forEach(n(J,t,e))}function X(t){const a=H({width:"100%",innerHTML:`<thead><tr><th class="fshCenter" colspan="3">${z(t)}</th></tr><tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th><th colspan="2">Items</th></tr></thead>`}),r=C()
return e(a,r),o.sortBy="n",o.sortAsc=!0,t.r.forEach(n(K,r,s())),a}function Z(n){const a=X(n),r=t()
return e(r,a),r}function V(t,n){return`<a href="${u}${t}">${n}</a>`}function Y(t){return t[1].nicknameList.length>0}function tt(t){return`<tr><td>${t[0]}</td><td>${t[1].nicknameList.map(n(V,t[0])).join(" ")}</td><td>${t[1].count}</td><td></td><td></td></tr>`}function nt(t){return t.displayOnAH&&!t.found}function et(t){return V(t.searchname,t.nickname)}function at(t){return 0===t[1].nicknameList.length}function rt(t){return`<tr><td>${t[0]}</td><td></td><td>${t[1].count}</td><td></td><td></td></tr>`}function st(t,n){return`<table width="100%" cellspacing="2" cellpadding="2"><thead><tr><th colspan="5" class="fshCenter">Items from <a href="${f}">AH Quick Search</a> found in your inventory</th></tr><tr><th>Name</th><th>Nick Name</th><th>Inv Count</th><th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>${function(t){return m(t).filter(Y).map(tt).join("")}(t)}<tr><td colspan="5"><hr></td></tr><tr><td>Did not find:</td><td colspan="4">${function(t){return t.filter(nt).map(et).join(", ")}(n)}</td></tr><tr><td colspan="5"><hr></td></tr></tbody><thead><tr><th colspan="5" class="fshCenter">Items NOT from <a href="${f}">AH Quick Search</a> found in your inventory</td></thead><tbody>${function(t){return m(t).filter(at).map(rt).join("")}(t)}</tbody></table>`}function ot(t,n,e){n===e.searchname&&(e.found=!0,t[n].nicknameList.indexOf(e.nickname)<0&&t[n].nicknameList.push(e.nickname))}function it(t,e,a){const r=a.n
!function(t,n){t[n]?t[n].count+=1:t[n]={count:1,nicknameList:[]}}(t,r),e.forEach(n(ot,t,r))}function ct(t,e,a){a.items.forEach(n(it,t,e))}function dt(e){const a={},r=c("quickSearchList")||[]
e.r.forEach(n(ct,a,r))
const s=t()
return d(s,st(a,r)),s}let ft,mt
function ut(t,n,e){0===e.r&&a(`<span class="fastWorn">${n}</span>`,t.parentNode)}function lt(t,e,a){g("QuickWear","doAction - "+a),L("",t),t.classList.remove("smallLink"),t.classList.add("fshSpinner","fshSpin12"),e(t.dataset.itemid).then(n(ut,t,a))}function ht(t){lt(t,v,"Used")}function pt(t){ft?ht(t):N("Use/Extract Item","Are you sure you want to use/extract the item?",n(ht,t))}function bt(t){lt(t,Q,"Worn")}function jt(t,n,e){const a=e.dom
if("0"===t)a.classList.remove("fshHide")
else{const e=t!==n.toString()
M(a,e)}}function kt(t,e){const a=e.id
e.items.forEach(n(jt,t,a))}function $t(t){const e=t.dataset.folder
mt.r.forEach(n(kt,e))}function gt(){ft=!ft,$("disableQuickWearPrompts",ft)}function Lt(n){e(n,t({className:"qwPref",innerHTML:x("disableQuickWearPrompts")}))}function yt(t,n,a){e(a,t(n))}function wt(t,e){S("qwtab-header",Lt),S("qwtab0",n(yt,Z,e)),S("qwtab1",n(yt,dt,e)),G(t,["Quick Wear / Use / Extract<br>Manager","Inventory Manager Counter<br>filtered by AH Quick Search"],"qwtab"),j(t,q([[n(F,["smallLink","fshEq"]),bt],[n(F,["smallLink","fshUse"]),pt],[n(k,"fshFolder"),$t],[P("disableQuickWearPrompts"),gt]]))}function Et(t,n){(function(t){return t&&t.s&&p(t.r)})(n)&&(mt=n,wt(t,n))}export default function(t){l()&&function(t){const e=t||b
e&&(d(e,"Getting item list from backpack..."),U().then(n(Et,e)),ft=h("disableQuickWearPrompts"))}(t)}
//# sourceMappingURL=quickWear-92783839.js.map
