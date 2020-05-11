import{l as t,v as n,h as a,C as e,a$ as r,Q as s,bm as i,e as o,aF as c,c1 as d,i as f,c2 as m,q as u,bw as h,j as l,G as p,p as b,o as k,aG as j,a4 as $,a0 as L,B as g,t as y}from"./calfSystem-72fdbe97.js"
import{i as w}from"./isArray-4303dc86.js"
import"./toLowerCase-019d771a.js"
import{c as C}from"./createInput-00d19dd2.js"
import{c as E}from"./createLabel-0393d946.js"
import{c as I}from"./createUl-43d45b37.js"
import"./isChecked-66e1d489.js"
import{b as S}from"./simpleCheckbox-c6b19142.js"
import"./alpha-583924df.js"
import{c as x}from"./createTBody-48199bf0.js"
import{c as A}from"./createTable-8595230a.js"
import"./dialogMsg-efcd2089.js"
import{p as H,s as v}from"./pubsub-1c44ab8d.js"
import{u as N,a as Q}from"./useItem-022a28bb.js"
import{j as q}from"./jConfirm-03560f1c.js"
import"./dialog-9c6ee33b.js"
import"./ajaxReturnCode-e0b3c2c2.js"
import"./daUseItem-dc556c06.js"
import{m as W}from"./makeFolderSpan-890d1d02.js"
import{e as P}from"./eventHandler5-a647dfa3.js"
import{s as U}from"./selfIdIs-7bb53ec5.js"
import{a as M}from"./stringSort-0006ad0b.js"
import{d as T}from"./daLoadInventory-7e4bd3a6.js"
import{h as B}from"./hasClasses-7ad1a4f3.js"
const F=(t,n)=>t+String(n)
function O(t,n,a){return C({checked:0===a,id:F(t,a),name:t,type:"radio"})}function G(t,n,e,i){const o=r({className:"ui-state-default ui-corner-top"})
return a(o,E({htmlFor:F(t,i),innerHTML:e})),0!==i&&s(o,"click",()=>{H(F(t,i),n[i])}),o}const _=()=>t({className:"ui-tabs-panel ui-corner-bottom"})
function R(r,s,i){const o=t({className:"fshTabSet ui-tabs ui-widget-content ui-corner-all"}),c=n(a,o)
s.map(n(O,i)).forEach(c)
const d=s.map(_)
H(F(i,0),d[0])
const f=function(t,e,r){const s=I({className:"ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"})
return t.map(n(G,e,r)).forEach(n(a,s)),s}(s,i,d)
return H(`${i}-header`,f),a(o,f),d.forEach(c),e("",r),a(r,o),0}function D(t,n,a){const r=t.insertRow(-1)
a.dom=r
let s="fshEq ",i="fshUse "
a.t<9?s+="smallLink":s+="notLink",i+=function(t){return-1!==[10,12,15,16].indexOf(t.t)||"Zombie Coffin"===t.n?"smallLink":"notLink"}(a),e(`<td class="fshCenter"><span class="${s}" data-itemid="${a.a}">Wear</span>&nbsp;|&nbsp;<span class="${i}" data-itemid="${a.a}">Use/Ext</span></td><td><img src="${function(t){let n=c
return 13699===t.b?n+=`composing/${t.extra.design}_${t.extra.color}.png`:n+=`items/${t.b}.gif`,n}(a)}" class="tip-dynamic" data-tipped="fetchitem.php?item_id=${a.b}&amp;inv_id=${a.a}&amp;t=1&amp;p=${n}&amp;currentPlayerId=${n}" width="30" height="30" border="0"></td>`+`<td width="90%">&nbsp;${a.n}</td>`,r)}function Z(t){return W(String(t.id),t.name)}function z(t){return W("0","All")+t.r.map(Z).join("")}function J(t,a,e){e.items.sort(M).forEach(n(D,t,a))}function K(t){const e=A({width:"100%",innerHTML:`<thead><tr><th class="fshCenter" colspan="3">${z(t)}</th></tr>`+'<tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th><th colspan="2">Items</th></tr></thead>'}),r=x()
return a(e,r),o.sortBy="n",o.sortAsc=!0,t.r.forEach(n(J,r,i())),e}function V(n){const e=K(n),r=t()
return a(r,e),r}function X(t,n){return`<a href="${h}${t}">${n}</a>`}function Y(t){return t[1].nicknameList.length>0}function tt(t){return`<tr><td>${t[0]}</td><td>${t[1].nicknameList.map(n(X,t[0])).join(" ")}</td><td>${t[1].count}</td><td></td><td></td></tr>`}function nt(t){return t.displayOnAH&&!t.found}function at(t){return X(t.searchname,t.nickname)}function et(t){return 0===t[1].nicknameList.length}function rt(t){return`<tr><td>${t[0]}</td><td></td><td>${t[1].count}</td><td></td><td></td></tr>`}function st(t,n){return'<table width="100%" cellspacing="2" cellpadding="2"><thead><tr><th colspan="5" class="fshCenter">Items from '+`<a href="${m}">`+"AH Quick Search</a> found in your inventory</th></tr><tr><th>Name</th><th>Nick Name</th><th>Inv Count</th>"+`<th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>${function(t){return u(t).filter(Y).map(tt).join("")}(t)}<tr><td colspan="5"><hr></td></tr>`+`<tr><td>Did not find:</td><td colspan="4">${function(t){return t.filter(nt).map(at).join(", ")}(n)}</td></tr><tr><td colspan="5"><hr></td></tr></tbody>`+'<thead><tr><th colspan="5" class="fshCenter">Items NOT from '+`<a href="${m}">`+`AH Quick Search</a> found in your inventory</td></thead><tbody>${function(t){return u(t).filter(et).map(rt).join("")}(t)}</tbody></table>`}function it(t,n,a){n===a.searchname&&(a.found=!0,t[n].nicknameList.indexOf(a.nickname)<0&&t[n].nicknameList.push(a.nickname))}function ot(t,a,e){const r=e.n
!function(t,n){t[n]?t[n].count+=1:t[n]={count:1,nicknameList:[]}}(t,r),a.forEach(n(it,t,r))}function ct(t,a,e){e.items.forEach(n(ot,t,a))}function dt(a){const e={},r=d("quickSearchList")||[]
a.r.forEach(n(ct,e,r))
const s=t()
return f(s,st(e,r)),s}let ft,mt
function ut(t,n,a){0===a.r&&e(`<span class="fastWorn">${n}</span>`,t.parentNode)}function ht(t,a,e){L("QuickWear",`doAction - ${e}`),g("",t),t.classList.remove("smallLink"),t.classList.add("fshSpinner","fshSpin12"),a(t.dataset.itemid).then(n(ut,t,e))}function lt(t){ht(t,N,"Used")}function pt(t){ft?lt(t):q("Use/Extract Item","Are you sure you want to use/extract the item?",n(lt,t))}function bt(t){ht(t,Q,"Worn")}function kt(t,n,a){const e=a.dom
if("0"===t)e.classList.remove("fshHide")
else{const a=t!==n.toString()
y(e,a)}}function jt(t,a){const e=a.id
a.items.forEach(n(kt,t,e))}function $t(t){const a=t.dataset.folder
mt.r.forEach(n(jt,a))}function Lt(){ft=!ft,$("disableQuickWearPrompts",ft)}function gt(n){a(n,t({className:"qwPref",innerHTML:S("disableQuickWearPrompts")}))}function yt(t,n,e){a(e,t(n))}function wt(t,a){v("qwtab-header",gt),v("qwtab0",n(yt,V,a)),v("qwtab1",n(yt,dt,a)),R(t,["Quick Wear / Use / Extract<br>Manager","Inventory Manager Counter<br>filtered by AH Quick Search"],"qwtab"),k(t,P([[n(B,["smallLink","fshEq"]),bt],[n(B,["smallLink","fshUse"]),pt],[n(j,"fshFolder"),$t],[U("disableQuickWearPrompts"),Lt]]))}function Ct(t,n){(function(t){return t&&t.s&&w(t.r)})(n)&&(mt=n,wt(t,n))}export default function(t){l()&&function(t){const a=t||b
a&&(f(a,"Getting item list from backpack..."),T().then(n(Ct,a)),ft=p("disableQuickWearPrompts"))}(t)}
//# sourceMappingURL=quickWear-067ba05f.js.map
