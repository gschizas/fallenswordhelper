import{l as t,v as n,h as a,C as e,a$ as r,Q as s,bo as i,e as o,aF as c,c6 as f,i as d,c7 as m,q as u,by as h,j as l,G as p,p as b,o as k,aG as j,a4 as $,a0 as y,B as L,t as g}from"./calfSystem-fb94ddf0.js"
import{i as w}from"./isArray-dc6b23b1.js"
import"./toLowerCase-82a9f4ce.js"
import{c as C}from"./createInput-ba8eca60.js"
import{c as E}from"./createLabel-32cbbbf5.js"
import{c as I}from"./createUl-65b855dd.js"
import"./isChecked-b3e3c765.js"
import{b as S}from"./simpleCheckbox-67fe70a6.js"
import"./alpha-5cb424ed.js"
import{c as x}from"./createTBody-9339b8b5.js"
import{c as A}from"./createTable-311a8539.js"
import"./dialogMsg-9bffb5e8.js"
import{p as H,s as v}from"./pubsub-313e1799.js"
import{u as N,a as Q}from"./useItem-bde7a141.js"
import{j as q}from"./jConfirm-413e522b.js"
import"./dialog-df4a277b.js"
import"./ajaxReturnCode-560160ca.js"
import"./daUseItem-8e26dd85.js"
import{m as W}from"./makeFolderSpan-e13ec5de.js"
import{e as P}from"./eventHandler5-7f6e44ca.js"
import{s as U}from"./selfIdIs-bc035a49.js"
import{a as M}from"./stringSort-c77051fa.js"
import{d as T}from"./daLoadInventory-5def6bae.js"
import{h as B}from"./hasClasses-89f4eb88.js"
const F=(t,n)=>t+String(n)
function O(t,n,a){return C({checked:0===a,id:F(t,a),name:t,type:"radio"})}function G(t,n,e,i){const o=r({className:"ui-state-default ui-corner-top"})
return a(o,E({htmlFor:F(t,i),innerHTML:e})),0!==i&&s(o,"click",()=>{H(F(t,i),n[i])}),o}const _=()=>t({className:"ui-tabs-panel ui-corner-bottom"})
function R(r,s,i){const o=t({className:"fshTabSet ui-tabs ui-widget-content ui-corner-all"}),c=n(a,o)
s.map(n(O,i)).forEach(c)
const f=s.map(_)
H(F(i,0),f[0])
const d=function(t,e,r){const s=I({className:"ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"})
return t.map(n(G,e,r)).forEach(n(a,s)),s}(s,i,f)
return H(`${i}-header`,d),a(o,d),f.forEach(c),e("",r),a(r,o),0}function D(t,n,a){const r=t.insertRow(-1)
a.dom=r
let s="fshEq ",i="fshUse "
a.t<9?s+="smallLink":s+="notLink",i+=function(t){return-1!==[10,12,15,16].indexOf(t.t)||"Zombie Coffin"===t.n?"smallLink":"notLink"}(a),e(`<td class="fshCenter"><span class="${s}" data-itemid="${a.a}">Wear</span>&nbsp;|&nbsp;<span class="${i}" data-itemid="${a.a}">Use/Ext</span></td><td><img src="${function(t){let n=c
return 13699===t.b?n+=`composing/${t.extra.design}_${t.extra.color}.png`:n+=`items/${t.b}.gif`,n}(a)}" class="tip-dynamic" data-tipped="fetchitem.php?item_id=${a.b}&amp;inv_id=${a.a}&amp;t=1&amp;p=${n}&amp;currentPlayerId=${n}" width="30" height="30" border="0"></td>`+`<td width="90%">&nbsp;${a.n}</td>`,r)}function Z(t){return W(String(t.id),t.name)}function z(t){return W("0","All")+t.r.map(Z).join("")}function J(t,a,e){e.items.sort(M).forEach(n(D,t,a))}function K(t){const e=A({width:"100%",innerHTML:`<thead><tr><th class="fshCenter" colspan="3">${z(t)}</th></tr>`+'<tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th><th colspan="2">Items</th></tr></thead>'}),r=x()
return a(e,r),o.sortBy="n",o.sortAsc=!0,t.r.forEach(n(J,r,i())),e}function V(n){const e=K(n),r=t()
return a(r,e),r}function X(t,n){return`<a href="${h}${t}">${n}</a>`}function Y(t){return t[1].nicknameList.length>0}function tt(t){return`<tr><td>${t[0]}</td><td>${t[1].nicknameList.map(n(X,t[0])).join(" ")}</td><td>${t[1].count}</td><td></td><td></td></tr>`}function nt(t){return t.displayOnAH&&!t.found}function at(t){return X(t.searchname,t.nickname)}function et(t){return 0===t[1].nicknameList.length}function rt(t){return`<tr><td>${t[0]}</td><td></td><td>${t[1].count}</td><td></td><td></td></tr>`}function st(t,n){return'<table width="100%" cellspacing="2" cellpadding="2"><thead><tr><th colspan="5" class="fshCenter">Items from '+`<a href="${m}">`+"AH Quick Search</a> found in your inventory</th></tr><tr><th>Name</th><th>Nick Name</th><th>Inv Count</th>"+`<th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>${function(t){return u(t).filter(Y).map(tt).join("")}(t)}<tr><td colspan="5"><hr></td></tr>`+`<tr><td>Did not find:</td><td colspan="4">${function(t){return t.filter(nt).map(at).join(", ")}(n)}</td></tr><tr><td colspan="5"><hr></td></tr></tbody>`+'<thead><tr><th colspan="5" class="fshCenter">Items NOT from '+`<a href="${m}">`+`AH Quick Search</a> found in your inventory</td></thead><tbody>${function(t){return u(t).filter(et).map(rt).join("")}(t)}</tbody></table>`}function it(t,n,a){n===a.searchname&&(a.found=!0,t[n].nicknameList.indexOf(a.nickname)<0&&t[n].nicknameList.push(a.nickname))}function ot(t,a,e){const r=e.n
!function(t,n){t[n]?t[n].count+=1:t[n]={count:1,nicknameList:[]}}(t,r),a.forEach(n(it,t,r))}function ct(t,a,e){e.items.forEach(n(ot,t,a))}function ft(a){const e={},r=f("quickSearchList")||[]
a.r.forEach(n(ct,e,r))
const s=t()
return d(s,st(e,r)),s}let dt,mt
function ut(t,n,a){0===a.r&&e(`<span class="fastWorn">${n}</span>`,t.parentNode)}function ht(t,a,e){y("QuickWear",`doAction - ${e}`),L("",t),t.classList.remove("smallLink"),t.classList.add("fshSpinner","fshSpin12"),a(t.dataset.itemid).then(n(ut,t,e))}function lt(t){ht(t,N,"Used")}function pt(t){dt?lt(t):q("Use/Extract Item","Are you sure you want to use/extract the item?",n(lt,t))}function bt(t){ht(t,Q,"Worn")}function kt(t,n,a){const e=a.dom
if("0"===t)e.classList.remove("fshHide")
else{const a=t!==n.toString()
g(e,a)}}function jt(t,a){const e=a.id
a.items.forEach(n(kt,t,e))}function $t(t){const a=t.dataset.folder
mt.r.forEach(n(jt,a))}function yt(){dt=!dt,$("disableQuickWearPrompts",dt)}function Lt(n){a(n,t({className:"qwPref",innerHTML:S("disableQuickWearPrompts")}))}function gt(t,n,e){a(e,t(n))}function wt(t,a){v("qwtab-header",Lt),v("qwtab0",n(gt,V,a)),v("qwtab1",n(gt,ft,a)),R(t,["Quick Wear / Use / Extract<br>Manager","Inventory Manager Counter<br>filtered by AH Quick Search"],"qwtab"),k(t,P([[n(B,["smallLink","fshEq"]),bt],[n(B,["smallLink","fshUse"]),pt],[n(j,"fshFolder"),$t],[U("disableQuickWearPrompts"),yt]]))}function Ct(t,n){(function(t){return t&&t.s&&w(t.r)})(n)&&(mt=n,wt(t,n))}export default function(t){l()&&function(t){const a=t||b
a&&(d(a,"Getting item list from backpack..."),T().then(n(Ct,a)),dt=p("disableQuickWearPrompts"))}(t)}
//# sourceMappingURL=quickWear-fb587ce4.js.map
