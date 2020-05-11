import{l as t,v as n,h as a,C as e,b0 as r,Q as s,bt as i,e as o,aI as c,ca as d,i as f,cb as u,q as m,bD as h,j as l,G as p,R as b,p as k,o as j,aJ as $,a5 as L,a1 as g,B as y,t as w}from"./calfSystem-8dc0fa4b.js"
import"./toLowerCase-26121da0.js"
import{c as C}from"./createInput-29f46dac.js"
import{c as E}from"./createLabel-fd3e7486.js"
import{c as I}from"./createUl-ea106be9.js"
import"./isChecked-1bdf83c2.js"
import{b as S}from"./simpleCheckbox-1f751e80.js"
import"./alpha-e6301006.js"
import{c as x}from"./createTBody-1d0f01f5.js"
import{c as H}from"./createTable-5d1d98c3.js"
import"./dialogMsg-7427fbc4.js"
import{p as v,s as A}from"./pubsub-6ddab1ae.js"
import{u as N,a as Q}from"./useItem-38fc1d00.js"
import{j as q}from"./jConfirm-bea89dc0.js"
import"./dialog-f4d2194e.js"
import"./ajaxReturnCode-c433c790.js"
import"./daUseItem-b72fd30b.js"
import{m as W}from"./makeFolderSpan-abc934ab.js"
import{e as P}from"./eventHandler5-31d45a93.js"
import{s as U}from"./selfIdIs-531fc9b8.js"
import{a as M}from"./stringSort-97449c2c.js"
import{d as T}from"./daLoadInventory-d95e12ed.js"
import{h as B}from"./hasClasses-f2e27da8.js"
const O=(t,n)=>t+String(n)
function F(t,n,a){return C({checked:0===a,id:O(t,a),name:t,type:"radio"})}function R(t,n,e,i){const o=r({className:"ui-state-default ui-corner-top"})
return a(o,E({htmlFor:O(t,i),innerHTML:e})),0!==i&&s(o,"click",()=>{v(O(t,i),n[i])}),o}const _=()=>t({className:"ui-tabs-panel ui-corner-bottom"})
function D(r,s,i){const o=t({className:"fshTabSet ui-tabs ui-widget-content ui-corner-all"}),c=n(a,o)
s.map(n(F,i)).forEach(c)
const d=s.map(_)
v(O(i,0),d[0])
const f=function(t,e,r){const s=I({className:"ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"})
return t.map(n(R,e,r)).forEach(n(a,s)),s}(s,i,d)
return v(`${i}-header`,f),a(o,f),d.forEach(c),e("",r),a(r,o),0}function G(t,n,a){const r=t.insertRow(-1)
a.dom=r
let s="fshEq ",i="fshUse "
a.t<9?s+="smallLink":s+="notLink",i+=function(t){return-1!==[10,12,15,16].indexOf(t.t)||"Zombie Coffin"===t.n?"smallLink":"notLink"}(a),e(`<td class="fshCenter"><span class="${s}" data-itemid="${a.a}">Wear</span>&nbsp;|&nbsp;<span class="${i}" data-itemid="${a.a}">Use/Ext</span></td><td><img src="${function(t){let n=c
return 13699===t.b?n+=`composing/${t.extra.design}_${t.extra.color}.png`:n+=`items/${t.b}.gif`,n}(a)}" class="tip-dynamic" data-tipped="fetchitem.php?item_id=${a.b}&amp;inv_id=${a.a}&amp;t=1&amp;p=${n}&amp;currentPlayerId=${n}" width="30" height="30" border="0"></td>`+`<td width="90%">&nbsp;${a.n}</td>`,r)}function J(t){return W(String(t.id),t.name)}function Z(t){return W("0","All")+t.r.map(J).join("")}function z(t,a,e){e.items.sort(M).forEach(n(G,t,a))}function K(t){const e=H({width:"100%",innerHTML:`<thead><tr><th class="fshCenter" colspan="3">${Z(t)}</th></tr>`+'<tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th><th colspan="2">Items</th></tr></thead>'}),r=x()
return a(e,r),o.sortBy="n",o.sortAsc=!0,t.r.forEach(n(z,r,i())),e}function V(n){const e=K(n),r=t()
return a(r,e),r}function X(t,n){return`<a href="${h}${t}">${n}</a>`}function Y(t){return t[1].nicknameList.length>0}function tt(t){return`<tr><td>${t[0]}</td><td>${t[1].nicknameList.map(n(X,t[0])).join(" ")}</td><td>${t[1].count}</td><td></td><td></td></tr>`}function nt(t){return t.displayOnAH&&!t.found}function at(t){return X(t.searchname,t.nickname)}function et(t){return 0===t[1].nicknameList.length}function rt(t){return`<tr><td>${t[0]}</td><td></td><td>${t[1].count}</td><td></td><td></td></tr>`}function st(t,n){return'<table width="100%" cellspacing="2" cellpadding="2"><thead><tr><th colspan="5" class="fshCenter">Items from '+`<a href="${u}">`+"AH Quick Search</a> found in your inventory</th></tr><tr><th>Name</th><th>Nick Name</th><th>Inv Count</th>"+`<th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>${function(t){return m(t).filter(Y).map(tt).join("")}(t)}<tr><td colspan="5"><hr></td></tr>`+`<tr><td>Did not find:</td><td colspan="4">${function(t){return t.filter(nt).map(at).join(", ")}(n)}</td></tr><tr><td colspan="5"><hr></td></tr></tbody>`+'<thead><tr><th colspan="5" class="fshCenter">Items NOT from '+`<a href="${u}">`+`AH Quick Search</a> found in your inventory</td></thead><tbody>${function(t){return m(t).filter(et).map(rt).join("")}(t)}</tbody></table>`}function it(t,n,a){n===a.searchname&&(a.found=!0,t[n].nicknameList.indexOf(a.nickname)<0&&t[n].nicknameList.push(a.nickname))}function ot(t,a,e){const r=e.n
!function(t,n){t[n]?t[n].count+=1:t[n]={count:1,nicknameList:[]}}(t,r),a.forEach(n(it,t,r))}function ct(t,a,e){e.items.forEach(n(ot,t,a))}function dt(a){const e={},r=d("quickSearchList")||[]
a.r.forEach(n(ct,e,r))
const s=t()
return f(s,st(e,r)),s}let ft,ut
function mt(t,n,a){0===a.r&&e(`<span class="fastWorn">${n}</span>`,t.parentNode)}function ht(t,a,e){g("QuickWear",`doAction - ${e}`),y("",t),t.classList.remove("smallLink"),t.classList.add("fshSpinner","fshSpin12"),a(t.dataset.itemid).then(n(mt,t,e))}function lt(t){ht(t,N,"Used")}function pt(t){ft?lt(t):q("Use/Extract Item","Are you sure you want to use/extract the item?",n(lt,t))}function bt(t){ht(t,Q,"Worn")}function kt(t,n,a){const e=a.dom
if("0"===t)e.classList.remove("fshHide")
else{const a=t!==n.toString()
w(e,a)}}function jt(t,a){const e=a.id
a.items.forEach(n(kt,t,e))}function $t(t){const a=t.dataset.folder
ut.r.forEach(n(jt,a))}function Lt(){ft=!ft,L("disableQuickWearPrompts",ft)}function gt(n){a(n,t({className:"qwPref",innerHTML:S("disableQuickWearPrompts")}))}function yt(t,n,e){a(e,t(n))}function wt(t,a){A("qwtab-header",gt),A("qwtab0",n(yt,V,a)),A("qwtab1",n(yt,dt,a)),D(t,["Quick Wear / Use / Extract<br>Manager","Inventory Manager Counter<br>filtered by AH Quick Search"],"qwtab"),j(t,P([[n(B,["smallLink","fshEq"]),bt],[n(B,["smallLink","fshUse"]),pt],[n($,"fshFolder"),$t],[U("disableQuickWearPrompts"),Lt]]))}function Ct(t,n){(function(t){return t&&t.s&&b(t.r)})(n)&&(ut=n,wt(t,n))}export default function(t){l()&&function(t){const a=t||k
a&&(f(a,"Getting item list from backpack..."),T().then(n(Ct,a)),ft=p("disableQuickWearPrompts"))}(t)}
//# sourceMappingURL=quickWear-70994ce2.js.map
