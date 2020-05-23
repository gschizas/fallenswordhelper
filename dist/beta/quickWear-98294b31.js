import{l as t,v as n,h as a,C as r,a$ as e,Q as s,bo as i,e as o,aF as c,c6 as f,i as d,c7 as m,q as u,by as h,j as l,G as p,p as b,o as j,aG as k,a4 as $,a0 as g,B as y,t as L}from"./calfSystem-70c0e373.js"
import{i as w}from"./isArray-4a5a2451.js"
import"./toLowerCase-fa13dddd.js"
import{c as C}from"./createInput-0bc2f786.js"
import{c as E}from"./createLabel-1ae85585.js"
import{c as I}from"./createUl-48b7bdd1.js"
import"./isChecked-92f0e13a.js"
import{b as S}from"./simpleCheckbox-a38925a1.js"
import"./alpha-22cde0f7.js"
import{c as x}from"./createTBody-81f63b95.js"
import{c as A}from"./createTable-9ce47553.js"
import"./dialogMsg-2fcaccca.js"
import{p as H,s as v}from"./pubsub-28410bb6.js"
import"./errorDialog-06521700.js"
import{j as N}from"./jConfirm-a9978f6f.js"
import"./dialog-b905c96a.js"
import{u as Q,e as q}from"./useItem-10a66ac5.js"
import"./ajaxReturnCode-7fc00e1d.js"
import"./daUseItem-c62a143e.js"
import{m as W}from"./makeFolderSpan-c9b6c6b8.js"
import{e as P}from"./eventHandler5-c3fdeca2.js"
import{s as U}from"./selfIdIs-50af74dc.js"
import{a as M}from"./stringSort-17463142.js"
import{d as T}from"./daLoadInventory-8024dad6.js"
import{h as B}from"./hasClasses-44d3f7f3.js"
const F=(t,n)=>t+String(n)
function O(t,n,a){return C({checked:0===a,id:F(t,a),name:t,type:"radio"})}function G(t,n,r,i){const o=e({className:"ui-state-default ui-corner-top"})
return a(o,E({htmlFor:F(t,i),innerHTML:r})),0!==i&&s(o,"click",()=>{H(F(t,i),n[i])}),o}const _=()=>t({className:"ui-tabs-panel ui-corner-bottom"})
function D(e,s,i){const o=t({className:"fshTabSet ui-tabs ui-widget-content ui-corner-all"}),c=n(a,o)
s.map(n(O,i)).forEach(c)
const f=s.map(_)
H(F(i,0),f[0])
const d=function(t,r,e){const s=I({className:"ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"})
return t.map(n(G,r,e)).forEach(n(a,s)),s}(s,i,f)
return H(`${i}-header`,d),a(o,d),f.forEach(c),r("",e),a(e,o),0}function R(t,n,a){const e=t.insertRow(-1)
a.dom=e
let s="fshEq ",i="fshUse "
a.t<9?s+="smallLink":s+="notLink",i+=function(t){return-1!==[10,12,15,16].indexOf(t.t)||"Zombie Coffin"===t.n?"smallLink":"notLink"}(a),r(`<td class="fshCenter"><span class="${s}" data-itemid="${a.a}">Wear</span>&nbsp;|&nbsp;<span class="${i}" data-itemid="${a.a}">Use/Ext</span></td><td><img src="${function(t){let n=c
return 13699===t.b?n+=`composing/${t.extra.design}_${t.extra.color}.png`:n+=`items/${t.b}.gif`,n}(a)}" class="tip-dynamic" data-tipped="fetchitem.php?item_id=${a.b}&amp;inv_id=${a.a}&amp;t=1&amp;p=${n}&amp;currentPlayerId=${n}" width="30" height="30" border="0"></td>`+`<td width="90%">&nbsp;${a.n}</td>`,e)}function Z(t){return W(String(t.id),t.name)}function z(t){return W("0","All")+t.r.map(Z).join("")}function J(t,a,r){r.items.sort(M).forEach(n(R,t,a))}function K(t){const r=A({width:"100%",innerHTML:`<thead><tr><th class="fshCenter" colspan="3">${z(t)}</th></tr>`+'<tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th><th colspan="2">Items</th></tr></thead>'}),e=x()
return a(r,e),o.sortBy="n",o.sortAsc=!0,t.r.forEach(n(J,e,i())),r}function V(n){const r=K(n),e=t()
return a(e,r),e}function X(t,n){return`<a href="${h}${t}">${n}</a>`}function Y(t){return t[1].nicknameList.length>0}function tt(t){return`<tr><td>${t[0]}</td><td>${t[1].nicknameList.map(n(X,t[0])).join(" ")}</td><td>${t[1].count}</td><td></td><td></td></tr>`}function nt(t){return t.displayOnAH&&!t.found}function at(t){return X(t.searchname,t.nickname)}function rt(t){return 0===t[1].nicknameList.length}function et(t){return`<tr><td>${t[0]}</td><td></td><td>${t[1].count}</td><td></td><td></td></tr>`}function st(t,n){return'<table width="100%" cellspacing="2" cellpadding="2"><thead><tr><th colspan="5" class="fshCenter">Items from '+`<a href="${m}">`+"AH Quick Search</a> found in your inventory</th></tr><tr><th>Name</th><th>Nick Name</th><th>Inv Count</th>"+`<th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>${function(t){return u(t).filter(Y).map(tt).join("")}(t)}<tr><td colspan="5"><hr></td></tr>`+`<tr><td>Did not find:</td><td colspan="4">${function(t){return t.filter(nt).map(at).join(", ")}(n)}</td></tr><tr><td colspan="5"><hr></td></tr></tbody>`+'<thead><tr><th colspan="5" class="fshCenter">Items NOT from '+`<a href="${m}">`+`AH Quick Search</a> found in your inventory</td></thead><tbody>${function(t){return u(t).filter(rt).map(et).join("")}(t)}</tbody></table>`}function it(t,n,a){n===a.searchname&&(a.found=!0,t[n].nicknameList.indexOf(a.nickname)<0&&t[n].nicknameList.push(a.nickname))}function ot(t,a,r){const e=r.n
!function(t,n){t[n]?t[n].count+=1:t[n]={count:1,nicknameList:[]}}(t,e),a.forEach(n(it,t,e))}function ct(t,a,r){r.items.forEach(n(ot,t,a))}function ft(a){const r={},e=f("quickSearchList")||[]
a.r.forEach(n(ct,r,e))
const s=t()
return d(s,st(r,e)),s}let dt,mt
function ut(t,n,a){0===a.r&&r(`<span class="fastWorn">${n}</span>`,t.parentNode)}function ht(t,a,r){g("QuickWear",`doAction - ${r}`),y("",t),t.classList.remove("smallLink"),t.classList.add("fshSpinner","fshSpin12"),a(t.dataset.itemid).then(n(ut,t,r))}function lt(t){ht(t,Q,"Used")}function pt(t){dt?lt(t):N("Use/Extract Item","Are you sure you want to use/extract the item?",n(lt,t))}function bt(t){ht(t,q,"Worn")}function jt(t,n,a){const r=a.dom
if("0"===t)r.classList.remove("fshHide")
else{const a=t!==n.toString()
L(r,a)}}function kt(t,a){const r=a.id
a.items.forEach(n(jt,t,r))}function $t(t){const a=t.dataset.folder
mt.r.forEach(n(kt,a))}function gt(){dt=!dt,$("disableQuickWearPrompts",dt)}function yt(n){a(n,t({className:"qwPref",innerHTML:S("disableQuickWearPrompts")}))}function Lt(t,n,r){a(r,t(n))}function wt(t,a){v("qwtab-header",yt),v("qwtab0",n(Lt,V,a)),v("qwtab1",n(Lt,ft,a)),D(t,["Quick Wear / Use / Extract<br>Manager","Inventory Manager Counter<br>filtered by AH Quick Search"],"qwtab"),j(t,P([[n(B,["smallLink","fshEq"]),bt],[n(B,["smallLink","fshUse"]),pt],[n(k,"fshFolder"),$t],[U("disableQuickWearPrompts"),gt]]))}function Ct(t,n){(function(t){return t&&t.s&&w(t.r)})(n)&&(mt=n,wt(t,n))}export default function(t){l()&&function(t){const a=t||b
a&&(d(a,"Getting item list from backpack..."),T().then(n(Ct,a)),dt=p("disableQuickWearPrompts"))}(t)}
//# sourceMappingURL=quickWear-98294b31.js.map
