import{l as t,t as n,f as a,A as e,O as r,b0 as s,c as o,aD as i,bw as c,i as f,bx as d,m,bc as u,j as l,G as p,p as h,o as b,k as j,Y as k,U as $,z as g}from"./calfSystem-03970067.js"
import{i as L}from"./isArray-aff0783a.js"
import"./toLowerCase-5a7ad345.js"
import{c as y}from"./createInput-7a44ee58.js"
import{c as w}from"./createLabel-f2e8b03d.js"
import{c as x}from"./createUl-ac0a6ac2.js"
import"./isChecked-02800593.js"
import{b as E}from"./simpleCheckbox-6af8c076.js"
import"./alpha-bba33c85.js"
import{c as A}from"./createTBody-63c3fb8b.js"
import{c as C}from"./createTable-fdc4e68e.js"
import"./dialogMsg-9c4f0c44.js"
import{p as I,s as S}from"./pubsub-8e6f8f7b.js"
import{c as H}from"./createLi-1e5d4784.js"
import"./ajaxReturnCode-f8cf1a95.js"
import{m as N}from"./makeFolderSpan-d3b21d1c.js"
import"./dialog-d5dff1df.js"
import"./indexAjaxJson-d04ad897.js"
import{e as v}from"./eventHandler5-4178a6d1.js"
import{t as Q}from"./toggleForce-1be6b2e6.js"
import{s as U}from"./selfIdIs-02ed6fe5.js"
import"./errorDialog-2397605e.js"
import{a as W}from"./stringSort-2a353898.js"
import{j as q}from"./jConfirm-c653b2b7.js"
import"./daUseItem-b89c80c7.js"
import{d as P}from"./daLoadInventory-b7fe1b82.js"
import{u as M,e as T}from"./useItem-79767d67.js"
import{h as O}from"./hasClasses-a621aa23.js"
const F=(t,n)=>t+String(n)
function B(t,n,a){return y({checked:0===a,id:F(t,a),name:t,type:"radio"})}function D(t,n,e,s){const o=H({className:"ui-state-default ui-corner-top"})
return a(o,w({htmlFor:F(t,s),innerHTML:e})),0!==s&&r(o,"click",()=>{I(F(t,s),n[s])}),o}const _=()=>t({className:"ui-tabs-panel ui-corner-bottom"})
function G(r,s,o){const i=t({className:"fshTabSet ui-tabs ui-widget-content ui-corner-all"}),c=n(a,i)
s.map(n(B,o)).forEach(c)
const f=s.map(_)
I(F(o,0),f[0])
const d=function(t,e,r){const s=x({className:"ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"})
return t.map(n(D,e,r)).forEach(n(a,s)),s}(s,o,f)
return I(o+"-header",d),a(i,d),f.forEach(c),e("",r),a(r,i),0}function R(t,n,a){const r=t.insertRow(-1)
a.dom=r
let s="fshEq ",o="fshUse "
a.t<9?s+="smallLink":s+="notLink",o+=function(t){return-1!==[10,12,15,16].indexOf(t.t)||"Zombie Coffin"===t.n?"smallLink":"notLink"}(a),e(`<td class="fshCenter"><span class="${s}" data-itemid="${a.a}">Wear</span>&nbsp;|&nbsp;<span class="${o}" data-itemid="${a.a}">Use/Ext</span></td><td><img src="${function(t){let n=i
return 13699===t.b?n+=`composing/${t.extra.design}_${t.extra.color}.png`:n+=`items/${t.b}.gif`,n}(a)}" class="tip-dynamic" data-tipped="fetchitem.php?item_id=${a.b}&amp;inv_id=${a.a}&amp;t=1&amp;p=${n}&amp;currentPlayerId=${n}" width="30" height="30" border="0"></td><td width="90%">&nbsp;${a.n}</td>`,r)}function z(t){return N(String(t.id),t.name)}function J(t){return N("0","All")+t.r.map(z).join("")}function Y(t,a,e){e.items.sort(W).forEach(n(R,t,a))}function Z(t){const e=C({width:"100%",innerHTML:`<thead><tr><th class="fshCenter" colspan="3">${J(t)}</th></tr><tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th><th colspan="2">Items</th></tr></thead>`}),r=A()
return a(e,r),o.sortBy="n",o.sortAsc=!0,t.r.forEach(n(Y,r,s())),e}function K(n){const e=Z(n),r=t()
return a(r,e),r}function V(t,n){return`<a href="${u}${t}">${n}</a>`}function X(t){return t[1].nicknameList.length>0}function tt(t){return`<tr><td>${t[0]}</td><td>${t[1].nicknameList.map(n(V,t[0])).join(" ")}</td><td>${t[1].count}</td><td></td><td></td></tr>`}function nt(t){return t.displayOnAH&&!t.found}function at(t){return V(t.searchname,t.nickname)}function et(t){return 0===t[1].nicknameList.length}function rt(t){return`<tr><td>${t[0]}</td><td></td><td>${t[1].count}</td><td></td><td></td></tr>`}function st(t,n){return`<table width="100%" cellspacing="2" cellpadding="2"><thead><tr><th colspan="5" class="fshCenter">Items from <a href="${d}">AH Quick Search</a> found in your inventory</th></tr><tr><th>Name</th><th>Nick Name</th><th>Inv Count</th><th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>${function(t){return m(t).filter(X).map(tt).join("")}(t)}<tr><td colspan="5"><hr></td></tr><tr><td>Did not find:</td><td colspan="4">${function(t){return t.filter(nt).map(at).join(", ")}(n)}</td></tr><tr><td colspan="5"><hr></td></tr></tbody><thead><tr><th colspan="5" class="fshCenter">Items NOT from <a href="${d}">AH Quick Search</a> found in your inventory</td></thead><tbody>${function(t){return m(t).filter(et).map(rt).join("")}(t)}</tbody></table>`}function ot(t,n,a){n===a.searchname&&(a.found=!0,t[n].nicknameList.indexOf(a.nickname)<0&&t[n].nicknameList.push(a.nickname))}function it(t,a,e){const r=e.n
!function(t,n){t[n]?t[n].count+=1:t[n]={count:1,nicknameList:[]}}(t,r),a.forEach(n(ot,t,r))}function ct(t,a,e){e.items.forEach(n(it,t,a))}function ft(a){const e={},r=c("quickSearchList")||[]
a.r.forEach(n(ct,e,r))
const s=t()
return f(s,st(e,r)),s}let dt,mt
function ut(t,n,a){0===a.r&&e(`<span class="fastWorn">${n}</span>`,t.parentNode)}function lt(t,a,e){$("QuickWear","doAction - "+e),g("",t),t.classList.remove("smallLink"),t.classList.add("fshSpinner","fshSpin12"),a(t.dataset.itemid).then(n(ut,t,e))}function pt(t){lt(t,M,"Used")}function ht(t){dt?pt(t):q("Use/Extract Item","Are you sure you want to use/extract the item?",n(pt,t))}function bt(t){lt(t,T,"Worn")}function jt(t,n,a){const e=a.dom
if("0"===t)e.classList.remove("fshHide")
else{const a=t!==n.toString()
Q(e,a)}}function kt(t,a){const e=a.id
a.items.forEach(n(jt,t,e))}function $t(t){const a=t.dataset.folder
mt.r.forEach(n(kt,a))}function gt(){dt=!dt,k("disableQuickWearPrompts",dt)}function Lt(n){a(n,t({className:"qwPref",innerHTML:E("disableQuickWearPrompts")}))}function yt(t,n,e){a(e,t(n))}function wt(t,a){S("qwtab-header",Lt),S("qwtab0",n(yt,K,a)),S("qwtab1",n(yt,ft,a)),G(t,["Quick Wear / Use / Extract<br>Manager","Inventory Manager Counter<br>filtered by AH Quick Search"],"qwtab"),b(t,v([[n(O,["smallLink","fshEq"]),bt],[n(O,["smallLink","fshUse"]),ht],[n(j,"fshFolder"),$t],[U("disableQuickWearPrompts"),gt]]))}function xt(t,n){(function(t){return t&&t.s&&L(t.r)})(n)&&(mt=n,wt(t,n))}export default function(t){l()&&function(t){const a=t||h
a&&(f(a,"Getting item list from backpack..."),P().then(n(xt,a)),dt=p("disableQuickWearPrompts"))}(t)}
//# sourceMappingURL=quickWear-1ea3975f.js.map
