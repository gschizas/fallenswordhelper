import{m as t,t as n,h as a,A as r,O as e,b2 as s,c as o,aD as i,bz as c,i as f,bA as d,e as m,bc as u,j as l,H as h,p,o as b,l as j,Y as k,U as $,z as g}from"./calfSystem-cf4d22a7.js"
import{i as L}from"./isArray-fd538fb3.js"
import"./toLowerCase-b21b7cc8.js"
import{c as y}from"./createInput-6dbf94aa.js"
import{c as w}from"./createLabel-da133942.js"
import{c as A}from"./createUl-47f4cf49.js"
import"./isChecked-4820f42a.js"
import{b as E}from"./simpleCheckbox-358d4bfe.js"
import"./alpha-3f5d4865.js"
import{c as x}from"./createTBody-7bca64b5.js"
import{c as C}from"./createTable-a63e2578.js"
import"./dialogMsg-b49f78a4.js"
import{p as H,s as I}from"./pubsub-e41fbca5.js"
import{c as S}from"./createLi-c2c5249d.js"
import"./errorDialog-4ea6fda9.js"
import"./indexAjaxJson-451a313a.js"
import{t as N}from"./toggleForce-a095aa43.js"
import{a as v}from"./stringSort-6038030e.js"
import{j as Q}from"./jConfirm-b973a4a2.js"
import"./daUseItem-7b392c79.js"
import{e as U}from"./eventHandler5-7cb92943.js"
import{s as W}from"./selfIdIs-e0a8096b.js"
import{m as q}from"./makeFolderSpan-ecd9811a.js"
import{d as P}from"./daLoadInventory-cf33b37e.js"
import"./dialog-e2d24ff9.js"
import{u as M,e as T}from"./useItem-9c2612f7.js"
import{h as O}from"./hasClasses-8a2d9bc3.js"
const F=(t,n)=>t+String(n)
function B(t,n,a){return y({checked:0===a,id:F(t,a),name:t,type:"radio"})}function D(t,n,r,s){const o=S({className:"ui-state-default ui-corner-top"})
return a(o,w({htmlFor:F(t,s),innerHTML:r})),0!==s&&e(o,"click",()=>{H(F(t,s),n[s])}),o}const _=()=>t({className:"ui-tabs-panel ui-corner-bottom"})
function z(e,s,o){const i=t({className:"fshTabSet ui-tabs ui-widget-content ui-corner-all"}),c=n(a,i)
s.map(n(B,o)).forEach(c)
const f=s.map(_)
H(F(o,0),f[0])
const d=function(t,r,e){const s=A({className:"ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"})
return t.map(n(D,r,e)).forEach(n(a,s)),s}(s,o,f)
return H(o+"-header",d),a(i,d),f.forEach(c),r("",e),a(e,i),0}function G(t,n,a){const e=t.insertRow(-1)
a.dom=e
let s="fshEq ",o="fshUse "
a.t<9?s+="smallLink":s+="notLink",o+=function(t){return-1!==[10,12,15,16].indexOf(t.t)||"Zombie Coffin"===t.n?"smallLink":"notLink"}(a),r(`<td class="fshCenter"><span class="${s}" data-itemid="${a.a}">Wear</span>&nbsp;|&nbsp;<span class="${o}" data-itemid="${a.a}">Use/Ext</span></td><td><img src="${function(t){let n=i
return 13699===t.b?n+=`composing/${t.extra.design}_${t.extra.color}.png`:n+=`items/${t.b}.gif`,n}(a)}" class="tip-dynamic" data-tipped="fetchitem.php?item_id=${a.b}&amp;inv_id=${a.a}&amp;t=1&amp;p=${n}&amp;currentPlayerId=${n}" width="30" height="30" border="0"></td><td width="90%">&nbsp;${a.n}</td>`,e)}function J(t){return q(String(t.id),t.name)}function R(t){return q("0","All")+t.r.map(J).join("")}function Y(t,a,r){r.items.sort(v).forEach(n(G,t,a))}function Z(t){const r=C({width:"100%",innerHTML:`<thead><tr><th class="fshCenter" colspan="3">${R(t)}</th></tr><tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th><th colspan="2">Items</th></tr></thead>`}),e=x()
return a(r,e),o.sortBy="n",o.sortAsc=!0,t.r.forEach(n(Y,e,s())),r}function K(n){const r=Z(n),e=t()
return a(e,r),e}function V(t,n){return`<a href="${u}${t}">${n}</a>`}function X(t){return t[1].nicknameList.length>0}function tt(t){return`<tr><td>${t[0]}</td><td>${t[1].nicknameList.map(n(V,t[0])).join(" ")}</td><td>${t[1].count}</td><td></td><td></td></tr>`}function nt(t){return t.displayOnAH&&!t.found}function at(t){return V(t.searchname,t.nickname)}function rt(t){return 0===t[1].nicknameList.length}function et(t){return`<tr><td>${t[0]}</td><td></td><td>${t[1].count}</td><td></td><td></td></tr>`}function st(t,n){return`<table width="100%" cellspacing="2" cellpadding="2"><thead><tr><th colspan="5" class="fshCenter">Items from <a href="${d}">AH Quick Search</a> found in your inventory</th></tr><tr><th>Name</th><th>Nick Name</th><th>Inv Count</th><th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>${function(t){return m(t).filter(X).map(tt).join("")}(t)}<tr><td colspan="5"><hr></td></tr><tr><td>Did not find:</td><td colspan="4">${function(t){return t.filter(nt).map(at).join(", ")}(n)}</td></tr><tr><td colspan="5"><hr></td></tr></tbody><thead><tr><th colspan="5" class="fshCenter">Items NOT from <a href="${d}">AH Quick Search</a> found in your inventory</td></thead><tbody>${function(t){return m(t).filter(rt).map(et).join("")}(t)}</tbody></table>`}function ot(t,n,a){n===a.searchname&&(a.found=!0,t[n].nicknameList.indexOf(a.nickname)<0&&t[n].nicknameList.push(a.nickname))}function it(t,a,r){const e=r.n
!function(t,n){t[n]?t[n].count+=1:t[n]={count:1,nicknameList:[]}}(t,e),a.forEach(n(ot,t,e))}function ct(t,a,r){r.items.forEach(n(it,t,a))}function ft(a){const r={},e=c("quickSearchList")||[]
a.r.forEach(n(ct,r,e))
const s=t()
return f(s,st(r,e)),s}let dt,mt
function ut(t,n,a){0===a.r&&r(`<span class="fastWorn">${n}</span>`,t.parentNode)}function lt(t,a,r){$("QuickWear","doAction - "+r),g("",t),t.classList.remove("smallLink"),t.classList.add("fshSpinner","fshSpin12"),a(t.dataset.itemid).then(n(ut,t,r))}function ht(t){lt(t,M,"Used")}function pt(t){dt?ht(t):Q("Use/Extract Item","Are you sure you want to use/extract the item?",n(ht,t))}function bt(t){lt(t,T,"Worn")}function jt(t,n,a){const r=a.dom
if("0"===t)r.classList.remove("fshHide")
else{const a=t!==n.toString()
N(r,a)}}function kt(t,a){const r=a.id
a.items.forEach(n(jt,t,r))}function $t(t){const a=t.dataset.folder
mt.r.forEach(n(kt,a))}function gt(){dt=!dt,k("disableQuickWearPrompts",dt)}function Lt(n){a(n,t({className:"qwPref",innerHTML:E("disableQuickWearPrompts")}))}function yt(t,n,r){a(r,t(n))}function wt(t,a){I("qwtab-header",Lt),I("qwtab0",n(yt,K,a)),I("qwtab1",n(yt,ft,a)),z(t,["Quick Wear / Use / Extract<br>Manager","Inventory Manager Counter<br>filtered by AH Quick Search"],"qwtab"),b(t,U([[n(O,["smallLink","fshEq"]),bt],[n(O,["smallLink","fshUse"]),pt],[n(j,"fshFolder"),$t],[W("disableQuickWearPrompts"),gt]]))}function At(t,n){(function(t){return t&&t.s&&L(t.r)})(n)&&(mt=n,wt(t,n))}function Et(t){l()&&function(t){const a=t||p
a&&(f(a,"Getting item list from backpack..."),P().then(n(At,a)),dt=h("disableQuickWearPrompts"))}(t)}export default Et
//# sourceMappingURL=quickWear-22dac4a2.js.map
