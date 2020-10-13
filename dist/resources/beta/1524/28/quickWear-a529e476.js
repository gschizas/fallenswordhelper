import{m as t,t as n,h as a,A as e,O as r,b1 as s,c as o,aD as i,by as c,i as d,bz as f,e as m,bb as u,j as l,H as h,p,o as b,l as j,Y as k,U as $,z as g}from"./calfSystem-964f4fc9.js"
import{i as L}from"./isArray-40d05c68.js"
import"./toLowerCase-27ea448e.js"
import{c as y}from"./createInput-cbbea5aa.js"
import{c as w}from"./createLabel-02722bfd.js"
import{c as E}from"./createUl-ad078013.js"
import"./isChecked-12c32ad5.js"
import{b as A}from"./simpleCheckbox-db80ba61.js"
import"./alpha-08ee6ec8.js"
import{c as x}from"./createTBody-9ba9f235.js"
import{c as C}from"./createTable-30815142.js"
import"./dialogMsg-8ea305bd.js"
import{p as H,s as I}from"./pubsub-b3a7d9ad.js"
import{c as S}from"./createLi-8aac306c.js"
import"./errorDialog-326900ed.js"
import"./indexAjaxJson-0d030f07.js"
import{t as N}from"./toggleForce-10d35470.js"
import{a as v}from"./stringSort-60dd2951.js"
import{j as Q}from"./jConfirm-49ed85ad.js"
import"./daUseItem-b27aa4c9.js"
import{e as U}from"./eventHandler5-831e4d3a.js"
import{s as W}from"./selfIdIs-1fbbac57.js"
import{m as q}from"./makeFolderSpan-1546f7b2.js"
import{d as P}from"./daLoadInventory-509b8f55.js"
import"./dialog-a12ad7bf.js"
import{u as M,e as T}from"./useItem-be9f5375.js"
import{h as O}from"./hasClasses-581c5807.js"
const F=(t,n)=>t+String(n)
function B(t,n,a){return y({checked:0===a,id:F(t,a),name:t,type:"radio"})}function D(t,n,e,s){const o=S({className:"ui-state-default ui-corner-top"})
return a(o,w({htmlFor:F(t,s),innerHTML:e})),0!==s&&r(o,"click",()=>{H(F(t,s),n[s])}),o}const _=()=>t({className:"ui-tabs-panel ui-corner-bottom"})
function z(r,s,o){const i=t({className:"fshTabSet ui-tabs ui-widget-content ui-corner-all"}),c=n(a,i)
s.map(n(B,o)).forEach(c)
const d=s.map(_)
H(F(o,0),d[0])
const f=function(t,e,r){const s=E({className:"ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"})
return t.map(n(D,e,r)).forEach(n(a,s)),s}(s,o,d)
H(o+"-header",f),a(i,f),d.forEach(c),e("",r),a(r,i)}function G(t,n,a){const r=t.insertRow(-1)
a.dom=r
let s="fshEq ",o="fshUse "
a.t<9?s+="smallLink":s+="notLink",o+=function(t){return-1!==[10,12,15,16].indexOf(t.t)||"Zombie Coffin"===t.n?"smallLink":"notLink"}(a),e(`<td class="fshCenter"><span class="${s}" data-itemid="${a.a}">Wear</span>&nbsp;|&nbsp;<span class="${o}" data-itemid="${a.a}">Use/Ext</span></td><td><img src="${function(t){let n=i
return 13699===t.b?n+=`composing/${t.extra.design}_${t.extra.color}.png`:n+=`items/${t.b}.gif`,n}(a)}" class="tip-dynamic" data-tipped="fetchitem.php?item_id=${a.b}&amp;inv_id=${a.a}&amp;t=1&amp;p=${n}&amp;currentPlayerId=${n}" width="30" height="30" border="0"></td><td width="90%">&nbsp;${a.n}</td>`,r)}function J(t){return q(String(t.id),t.name)}function R(t){return q("0","All")+t.r.map(J).join("")}function Y(t,a,e){e.items.sort(v).forEach(n(G,t,a))}function Z(t){const e=C({width:"100%",innerHTML:`<thead><tr><th class="fshCenter" colspan="3">${R(t)}</th></tr><tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th><th colspan="2">Items</th></tr></thead>`}),r=x()
return a(e,r),o.sortBy="n",o.sortAsc=!0,t.r.forEach(n(Y,r,s())),e}function K(n){const e=Z(n),r=t()
return a(r,e),r}function V(t,n){return`<a href="${u}${t}">${n}</a>`}function X(t){return t[1].nicknameList.length>0}function tt(t){return`<tr><td>${t[0]}</td><td>${t[1].nicknameList.map(n(V,t[0])).join(" ")}</td><td>${t[1].count}</td><td></td><td></td></tr>`}function nt(t){return t.displayOnAH&&!t.found}function at(t){return V(t.searchname,t.nickname)}function et(t){return 0===t[1].nicknameList.length}function rt(t){return`<tr><td>${t[0]}</td><td></td><td>${t[1].count}</td><td></td><td></td></tr>`}function st(t,n){return`<table width="100%" cellspacing="2" cellpadding="2"><thead><tr><th colspan="5" class="fshCenter">Items from <a href="${f}">AH Quick Search</a> found in your inventory</th></tr><tr><th>Name</th><th>Nick Name</th><th>Inv Count</th><th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>${function(t){return m(t).filter(X).map(tt).join("")}(t)}<tr><td colspan="5"><hr></td></tr><tr><td>Did not find:</td><td colspan="4">${function(t){return t.filter(nt).map(at).join(", ")}(n)}</td></tr><tr><td colspan="5"><hr></td></tr></tbody><thead><tr><th colspan="5" class="fshCenter">Items NOT from <a href="${f}">AH Quick Search</a> found in your inventory</td></thead><tbody>${function(t){return m(t).filter(et).map(rt).join("")}(t)}</tbody></table>`}function ot(t,n,a){n===a.searchname&&(a.found=!0,t[n].nicknameList.indexOf(a.nickname)<0&&t[n].nicknameList.push(a.nickname))}function it(t,a,e){const r=e.n
!function(t,n){t[n]?t[n].count+=1:t[n]={count:1,nicknameList:[]}}(t,r),a.forEach(n(ot,t,r))}function ct(t,a,e){e.items.forEach(n(it,t,a))}function dt(a){const e={},r=c("quickSearchList")||[]
a.r.forEach(n(ct,e,r))
const s=t()
return d(s,st(e,r)),s}let ft,mt
function ut(t,n,a){0===a.r&&e(`<span class="fastWorn">${n}</span>`,t.parentNode)}function lt(t,a,e){$("QuickWear","doAction - "+e),g("",t),t.classList.remove("smallLink"),t.classList.add("fshSpinner","fshSpin12"),a(t.dataset.itemid).then(n(ut,t,e))}function ht(t){lt(t,M,"Used")}function pt(t){ft?ht(t):Q("Use/Extract Item","Are you sure you want to use/extract the item?",n(ht,t))}function bt(t){lt(t,T,"Worn")}function jt(t,n,a){const e=a.dom
if("0"===t)e.classList.remove("fshHide")
else{const a=t!==n.toString()
N(e,a)}}function kt(t,a){const e=a.id
a.items.forEach(n(jt,t,e))}function $t(t){const a=t.dataset.folder
mt.r.forEach(n(kt,a))}function gt(){ft=!ft,k("disableQuickWearPrompts",ft)}function Lt(n){a(n,t({className:"qwPref",innerHTML:A("disableQuickWearPrompts")}))}function yt(t,n,e){a(e,t(n))}function wt(t,a){I("qwtab-header",Lt),I("qwtab0",n(yt,K,a)),I("qwtab1",n(yt,dt,a)),z(t,["Quick Wear / Use / Extract<br>Manager","Inventory Manager Counter<br>filtered by AH Quick Search"],"qwtab"),b(t,U([[n(O,["smallLink","fshEq"]),bt],[n(O,["smallLink","fshUse"]),pt],[n(j,"fshFolder"),$t],[W("disableQuickWearPrompts"),gt]]))}function Et(t,n){(function(t){return t&&t.s&&L(t.r)})(n)&&(mt=n,wt(t,n))}function At(t){l()&&function(t){const a=t||p
a&&(d(a,"Getting item list from backpack..."),P().then(n(Et,a)),ft=h("disableQuickWearPrompts"))}(t)}export default At
//# sourceMappingURL=quickWear-a529e476.js.map
