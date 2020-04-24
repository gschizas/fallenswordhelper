import{l as t,h as n,v as a,bm as e,e as r,C as s,aF as i,a$ as o,Q as c,c1 as f,i as d,c2 as m,q as u,bw as h,j as l,G as p,p as b,o as k,aG as j,a4 as $,a0 as L,B as g,t as y}from"./calfSystem-3956a623.js"
import{i as w}from"./isArray-03eca71a.js"
import"./toLowerCase-cc930098.js"
import{c as C}from"./createInput-f6e26d5e.js"
import{c as E}from"./createLabel-6f6560b1.js"
import{c as I}from"./createUl-f72477f7.js"
import"./isChecked-fb51e5d1.js"
import{b as S}from"./simpleCheckbox-6ac789e1.js"
import"./alpha-308d451e.js"
import{c as x}from"./createTBody-c1bf0f07.js"
import{c as A}from"./createTable-b54e7aab.js"
import"./dialogMsg-6c4a948a.js"
import{u as H,a as v}from"./useItem-7811c104.js"
import{j as N}from"./jConfirm-3e64a8fb.js"
import"./dialog-a6efa002.js"
import"./ajaxReturnCode-69077631.js"
import"./daUseItem-35f02c30.js"
import{m as Q}from"./makeFolderSpan-583f0e94.js"
import{e as q}from"./eventHandler5-d9e6cbc2.js"
import{s as W}from"./selfIdIs-473d6b56.js"
import{a as P}from"./stringSort-a19d18f6.js"
import{d as U}from"./daLoadInventory-92507457.js"
import{p as M,s as T}from"./pubsub-5dfccef9.js"
import{h as B}from"./hasClasses-fb9f0074.js"
function F(t,n,a){const e=t.insertRow(-1)
a.dom=e
let r="fshEq ",o="fshUse "
a.t<9?r+="smallLink":r+="notLink",o+=function(t){return-1!==[10,12,15,16].indexOf(t.t)||"Zombie Coffin"===t.n?"smallLink":"notLink"}(a),s(`<td class="fshCenter"><span class="${r}" data-itemid="${a.a}">Wear</span>&nbsp;|&nbsp;<span class="${o}" data-itemid="${a.a}">Use/Ext</span></td><td><img src="${function(t){let n=i
return 13699===t.b?n+=`composing/${t.extra.design}_${t.extra.color}.png`:n+=`items/${t.b}.gif`,n}(a)}" class="tip-dynamic" data-tipped="fetchitem.php?item_id=${a.b}&amp;inv_id=${a.a}&amp;t=1&amp;p=${n}&amp;currentPlayerId=${n}" width="30" height="30" border="0"></td>`+`<td width="90%">&nbsp;${a.n}</td>`,e)}function O(t){return Q(String(t.id),t.name)}function G(t){return Q("0","All")+t.r.map(O).join("")}function _(t,n,e){e.items.sort(P).forEach(a(F,t,n))}function R(t){const s=A({width:"100%",innerHTML:`<thead><tr><th class="fshCenter" colspan="3">${G(t)}</th></tr>`+'<tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th><th colspan="2">Items</th></tr></thead>'}),i=x()
return n(s,i),r.sortBy="n",r.sortAsc=!0,t.r.forEach(a(_,i,e())),s}function D(a){const e=R(a),r=t()
return n(r,e),r}const Z=(t,n)=>t+String(n)
function z(t,n,a){return C({checked:0===a,id:Z(t,a),name:t,type:"radio"})}function J(t,a,e,r){const s=o({className:"ui-state-default ui-corner-top"})
return n(s,E({htmlFor:Z(t,r),innerHTML:e})),0!==r&&c(s,"click",()=>{M(Z(t,r),a[r])}),s}const K=()=>t({className:"ui-tabs-panel ui-corner-bottom"})
function V(e,r,i){const o=t({className:"fshTabSet ui-tabs ui-widget-content ui-corner-all"}),c=a(n,o)
r.map(a(z,i)).forEach(c)
const f=r.map(K)
M(Z(i,0),f[0])
const d=function(t,e,r){const s=I({className:"ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"})
return t.map(a(J,e,r)).forEach(a(n,s)),s}(r,i,f)
return M(`${i}-header`,d),n(o,d),f.forEach(c),s("",e),n(e,o),0}function X(t,n){return`<a href="${h}${t}">${n}</a>`}function Y(t){return t[1].nicknameList.length>0}function tt(t){return`<tr><td>${t[0]}</td><td>${t[1].nicknameList.map(a(X,t[0])).join(" ")}</td><td>${t[1].count}</td><td></td><td></td></tr>`}function nt(t){return t.displayOnAH&&!t.found}function at(t){return X(t.searchname,t.nickname)}function et(t){return 0===t[1].nicknameList.length}function rt(t){return`<tr><td>${t[0]}</td><td></td><td>${t[1].count}</td><td></td><td></td></tr>`}function st(t,n){return'<table width="100%" cellspacing="2" cellpadding="2"><thead><tr><th colspan="5" class="fshCenter">Items from '+`<a href="${m}">`+"AH Quick Search</a> found in your inventory</th></tr><tr><th>Name</th><th>Nick Name</th><th>Inv Count</th>"+`<th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>${function(t){return u(t).filter(Y).map(tt).join("")}(t)}<tr><td colspan="5"><hr></td></tr>`+`<tr><td>Did not find:</td><td colspan="4">${function(t){return t.filter(nt).map(at).join(", ")}(n)}</td></tr><tr><td colspan="5"><hr></td></tr></tbody>`+'<thead><tr><th colspan="5" class="fshCenter">Items NOT from '+`<a href="${m}">`+`AH Quick Search</a> found in your inventory</td></thead><tbody>${function(t){return u(t).filter(et).map(rt).join("")}(t)}</tbody></table>`}function it(t,n,a){n===a.searchname&&(a.found=!0,t[n].nicknameList.indexOf(a.nickname)<0&&t[n].nicknameList.push(a.nickname))}function ot(t,n,e){const r=e.n
!function(t,n){t[n]?t[n].count+=1:t[n]={count:1,nicknameList:[]}}(t,r),n.forEach(a(it,t,r))}function ct(t,n,e){e.items.forEach(a(ot,t,n))}function ft(n){const e={},r=f("quickSearchList")||[]
n.r.forEach(a(ct,e,r))
const s=t()
return d(s,st(e,r)),s}let dt,mt
function ut(t,n,a){0===a.r&&s(`<span class="fastWorn">${n}</span>`,t.parentNode)}function ht(t,n,e){L("QuickWear",`doAction - ${e}`),g("",t),t.classList.remove("smallLink"),t.classList.add("fshSpinner","fshSpin12"),n(t.dataset.itemid).then(a(ut,t,e))}function lt(t){ht(t,H,"Used")}function pt(t){dt?lt(t):N("Use/Extract Item","Are you sure you want to use/extract the item?",a(lt,t))}function bt(t){ht(t,v,"Worn")}function kt(t,n,a){const e=a.dom
if("0"===t)e.classList.remove("fshHide")
else{const a=t!==n.toString()
y(e,a)}}function jt(t,n){const e=n.id
n.items.forEach(a(kt,t,e))}function $t(t){const n=t.dataset.folder
mt.r.forEach(a(jt,n))}function Lt(){dt=!dt,$("disableQuickWearPrompts",dt)}function gt(a){n(a,t({className:"qwPref",innerHTML:S("disableQuickWearPrompts")}))}function yt(t,a,e){n(e,t(a))}function wt(t,n){T("qwtab-header",gt),T("qwtab0",a(yt,D,n)),T("qwtab1",a(yt,ft,n)),V(t,["Quick Wear / Use / Extract<br>Manager","Inventory Manager Counter<br>filtered by AH Quick Search"],"qwtab"),k(t,q([[a(B,["smallLink","fshEq"]),bt],[a(B,["smallLink","fshUse"]),pt],[a(j,"fshFolder"),$t],[W("disableQuickWearPrompts"),Lt]]))}function Ct(t,n){(function(t){return t&&t.s&&w(t.r)})(n)&&(mt=n,wt(t,n))}export default function(t){l()&&function(t){const n=t||b
n&&(d(n,"Getting item list from backpack..."),U().then(a(Ct,n)),dt=p("disableQuickWearPrompts"))}(t)}
//# sourceMappingURL=quickWear-828885be.js.map
