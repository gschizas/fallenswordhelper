import{l as t,h as n,v as a,bo as e,e as r,C as s,aF as i,a$ as o,Q as c,c6 as f,i as d,c7 as m,q as u,by as h,j as l,G as p,p as b,o as k,aG as j,a4 as $,a0 as y,B as L,t as g}from"./calfSystem-07c25a1c.js"
import{i as w}from"./isArray-9e480d80.js"
import"./toLowerCase-5806cc21.js"
import{c as C}from"./createInput-2b2e8237.js"
import{c as E}from"./createLabel-758fd9df.js"
import{c as I}from"./createUl-06e31567.js"
import"./isChecked-7fc8132c.js"
import{b as S}from"./simpleCheckbox-754ddbda.js"
import"./alpha-6cdf0d3e.js"
import{c as x}from"./createTBody-9ae87977.js"
import{c as A}from"./createTable-be6cef64.js"
import"./dialogMsg-3e572607.js"
import{u as H,a as v}from"./useItem-4133d4d9.js"
import{j as N}from"./jConfirm-a8e451f9.js"
import"./dialog-cdd815db.js"
import"./ajaxReturnCode-7d8a3377.js"
import"./daUseItem-12fcbae2.js"
import{m as Q}from"./makeFolderSpan-5a54ca8f.js"
import{e as q}from"./eventHandler5-1e23b9ef.js"
import{s as W}from"./selfIdIs-bde4a223.js"
import{a as P}from"./stringSort-0ff2a1dc.js"
import{d as U}from"./daLoadInventory-8ef73bf6.js"
import{p as M,s as T}from"./pubsub-f5a81b68.js"
import{h as B}from"./hasClasses-5021bffb.js"
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
function ut(t,n,a){0===a.r&&s(`<span class="fastWorn">${n}</span>`,t.parentNode)}function ht(t,n,e){y("QuickWear",`doAction - ${e}`),L("",t),t.classList.remove("smallLink"),t.classList.add("fshSpinner","fshSpin12"),n(t.dataset.itemid).then(a(ut,t,e))}function lt(t){ht(t,H,"Used")}function pt(t){dt?lt(t):N("Use/Extract Item","Are you sure you want to use/extract the item?",a(lt,t))}function bt(t){ht(t,v,"Worn")}function kt(t,n,a){const e=a.dom
if("0"===t)e.classList.remove("fshHide")
else{const a=t!==n.toString()
g(e,a)}}function jt(t,n){const e=n.id
n.items.forEach(a(kt,t,e))}function $t(t){const n=t.dataset.folder
mt.r.forEach(a(jt,n))}function yt(){dt=!dt,$("disableQuickWearPrompts",dt)}function Lt(a){n(a,t({className:"qwPref",innerHTML:S("disableQuickWearPrompts")}))}function gt(t,a,e){n(e,t(a))}function wt(t,n){T("qwtab-header",Lt),T("qwtab0",a(gt,D,n)),T("qwtab1",a(gt,ft,n)),V(t,["Quick Wear / Use / Extract<br>Manager","Inventory Manager Counter<br>filtered by AH Quick Search"],"qwtab"),k(t,q([[a(B,["smallLink","fshEq"]),bt],[a(B,["smallLink","fshUse"]),pt],[a(j,"fshFolder"),$t],[W("disableQuickWearPrompts"),yt]]))}function Ct(t,n){(function(t){return t&&t.s&&w(t.r)})(n)&&(mt=n,wt(t,n))}export default function(t){l()&&function(t){const n=t||b
n&&(d(n,"Getting item list from backpack..."),U().then(a(Ct,n)),dt=p("disableQuickWearPrompts"))}(t)}
//# sourceMappingURL=quickWear-a87c1f5b.js.map
