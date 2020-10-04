import{m as t,t as n,h as a,A as e,O as r,b2 as s,c as o,aE as i,bz as c,i as f,bA as d,e as m,bc as u,j as l,H as h,p,o as b,l as j,Z as k,V as $,z as g}from"./calfSystem-70c7a660.js"
import{i as L}from"./isArray-5d976413.js"
import"./toLowerCase-33399b5a.js"
import{c as y}from"./createInput-1c8df108.js"
import{c as w}from"./createLabel-5339f796.js"
import{c as E}from"./createUl-41b45dbb.js"
import"./isChecked-ed98077f.js"
import{b as A}from"./simpleCheckbox-334243d2.js"
import"./alpha-d5278d39.js"
import{c as x}from"./createTBody-0057c25b.js"
import{c as C}from"./createTable-72dc1b73.js"
import"./dialogMsg-9c8d1b20.js"
import{p as H,s as I}from"./pubsub-14bf0172.js"
import{c as S}from"./createLi-ab74d72c.js"
import"./errorDialog-7f9c11b0.js"
import"./indexAjaxJson-4ca9de3e.js"
import{t as N}from"./toggleForce-7e736fc3.js"
import{a as v}from"./stringSort-03aea817.js"
import{j as Q}from"./jConfirm-a9b29986.js"
import"./daUseItem-3db6debf.js"
import{e as W}from"./eventHandler5-bf8af028.js"
import{s as q}from"./selfIdIs-b829380b.js"
import{m as P}from"./makeFolderSpan-b10ef92b.js"
import{d as U}from"./daLoadInventory-bebf6eee.js"
import"./dialog-370f639a.js"
import{u as M,e as T}from"./useItem-08f466b8.js"
import{h as O}from"./hasClasses-aa13c48b.js"
const F=(t,n)=>t+String(n)
function B(t,n,a){return y({checked:0===a,id:F(t,a),name:t,type:"radio"})}function _(t,n,e,s){const o=S({className:"ui-state-default ui-corner-top"})
return a(o,w({htmlFor:F(t,s),innerHTML:e})),0!==s&&r(o,"click",()=>{H(F(t,s),n[s])}),o}const z=()=>t({className:"ui-tabs-panel ui-corner-bottom"})
function D(r,s,o){const i=t({className:"fshTabSet ui-tabs ui-widget-content ui-corner-all"}),c=n(a,i)
s.map(n(B,o)).forEach(c)
const f=s.map(z)
H(F(o,0),f[0])
const d=function(t,e,r){const s=E({className:"ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"})
return t.map(n(_,e,r)).forEach(n(a,s)),s}(s,o,f)
H(o+"-header",d),a(i,d),f.forEach(c),e("",r),a(r,i)}function Z(t,n,a){const r=t.insertRow(-1)
a.dom=r
let s="fshEq ",o="fshUse "
a.t<9?s+="smallLink":s+="notLink",o+=function(t){return-1!==[10,12,15,16].indexOf(t.t)||"Zombie Coffin"===t.n?"smallLink":"notLink"}(a),e(`<td class="fshCenter"><span class="${s}" data-itemid="${a.a}">Wear</span>&nbsp;|&nbsp;<span class="${o}" data-itemid="${a.a}">Use/Ext</span></td><td><img src="${function(t){let n=i
return 13699===t.b?n+=`composing/${t.extra.design}_${t.extra.color}.png`:n+=`items/${t.b}.gif`,n}(a)}" class="tip-dynamic" data-tipped="fetchitem.php?item_id=${a.b}&amp;inv_id=${a.a}&amp;t=1&amp;p=${n}&amp;currentPlayerId=${n}" width="30" height="30" border="0"></td><td width="90%">&nbsp;${a.n}</td>`,r)}function G(t){return P(String(t.id),t.name)}function J(t){return P("0","All")+t.r.map(G).join("")}function R(t,a,e){e.items.sort(v).forEach(n(Z,t,a))}function V(t){const e=C({width:"100%",innerHTML:`<thead><tr><th class="fshCenter" colspan="3">${J(t)}</th></tr><tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th><th colspan="2">Items</th></tr></thead>`}),r=x()
return a(e,r),o.sortBy="n",o.sortAsc=!0,t.r.forEach(n(R,r,s())),e}function K(n){const e=V(n),r=t()
return a(r,e),r}function X(t,n){return`<a href="${u}${t}">${n}</a>`}function Y(t){return t[1].nicknameList.length>0}function tt(t){return`<tr><td>${t[0]}</td><td>${t[1].nicknameList.map(n(X,t[0])).join(" ")}</td><td>${t[1].count}</td><td></td><td></td></tr>`}function nt(t){return t.displayOnAH&&!t.found}function at(t){return X(t.searchname,t.nickname)}function et(t){return 0===t[1].nicknameList.length}function rt(t){return`<tr><td>${t[0]}</td><td></td><td>${t[1].count}</td><td></td><td></td></tr>`}function st(t,n){return`<table width="100%" cellspacing="2" cellpadding="2"><thead><tr><th colspan="5" class="fshCenter">Items from <a href="${d}">AH Quick Search</a> found in your inventory</th></tr><tr><th>Name</th><th>Nick Name</th><th>Inv Count</th><th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>${function(t){return m(t).filter(Y).map(tt).join("")}(t)}<tr><td colspan="5"><hr></td></tr><tr><td>Did not find:</td><td colspan="4">${function(t){return t.filter(nt).map(at).join(", ")}(n)}</td></tr><tr><td colspan="5"><hr></td></tr></tbody><thead><tr><th colspan="5" class="fshCenter">Items NOT from <a href="${d}">AH Quick Search</a> found in your inventory</td></thead><tbody>${function(t){return m(t).filter(et).map(rt).join("")}(t)}</tbody></table>`}function ot(t,n,a){n===a.searchname&&(a.found=!0,t[n].nicknameList.indexOf(a.nickname)<0&&t[n].nicknameList.push(a.nickname))}function it(t,a,e){const r=e.n
!function(t,n){t[n]?t[n].count+=1:t[n]={count:1,nicknameList:[]}}(t,r),a.forEach(n(ot,t,r))}function ct(t,a,e){e.items.forEach(n(it,t,a))}function ft(a){const e={},r=c("quickSearchList")||[]
a.r.forEach(n(ct,e,r))
const s=t()
return f(s,st(e,r)),s}let dt,mt
function ut(t,n,a){0===a.r&&e(`<span class="fastWorn">${n}</span>`,t.parentNode)}function lt(t,a,e){$("QuickWear","doAction - "+e),g("",t),t.classList.remove("smallLink"),t.classList.add("fshSpinner","fshSpin12"),a(t.dataset.itemid).then(n(ut,t,e))}function ht(t){lt(t,M,"Used")}function pt(t){dt?ht(t):Q("Use/Extract Item","Are you sure you want to use/extract the item?",n(ht,t))}function bt(t){lt(t,T,"Worn")}function jt(t,n,a){const e=a.dom
if("0"===t)e.classList.remove("fshHide")
else{const a=t!==n.toString()
N(e,a)}}function kt(t,a){const e=a.id
a.items.forEach(n(jt,t,e))}function $t(t){const a=t.dataset.folder
mt.r.forEach(n(kt,a))}function gt(){dt=!dt,k("disableQuickWearPrompts",dt)}function Lt(n){a(n,t({className:"qwPref",innerHTML:A("disableQuickWearPrompts")}))}function yt(t,n,e){a(e,t(n))}function wt(t,a){I("qwtab-header",Lt),I("qwtab0",n(yt,K,a)),I("qwtab1",n(yt,ft,a)),D(t,["Quick Wear / Use / Extract<br>Manager","Inventory Manager Counter<br>filtered by AH Quick Search"],"qwtab"),b(t,W([[n(O,["smallLink","fshEq"]),bt],[n(O,["smallLink","fshUse"]),pt],[n(j,"fshFolder"),$t],[q("disableQuickWearPrompts"),gt]]))}function Et(t,n){(function(t){return t&&t.s&&L(t.r)})(n)&&(mt=n,wt(t,n))}function At(t){l()&&function(t){const a=t||p
a&&(f(a,"Getting item list from backpack..."),U().then(n(Et,a)),dt=h("disableQuickWearPrompts"))}(t)}export default At
//# sourceMappingURL=quickWear-a6ef7016.js.map
