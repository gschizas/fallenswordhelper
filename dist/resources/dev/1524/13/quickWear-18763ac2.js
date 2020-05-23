import{l as t,v as n,h as e,C as a,b0 as r,Q as s,bt as i,e as o,aI as c,ca as d,i as f,cb as m,q as u,bD as h,j as l,G as p,R as b,p as k,o as j,aJ as $,a5 as g,a1 as L,B as y,t as w}from"./calfSystem-01eb06ed.js"
import"./toLowerCase-b5dc48c4.js"
import{c as C}from"./createInput-7fd54c66.js"
import{c as E}from"./createLabel-94fe4ec2.js"
import{c as I}from"./createUl-c1a39af0.js"
import"./isChecked-4667e9c3.js"
import{b as S}from"./simpleCheckbox-d5402db3.js"
import"./alpha-73167256.js"
import{c as x}from"./createTBody-dcdfd89a.js"
import{c as H}from"./createTable-1806515f.js"
import"./dialogMsg-7ec2c29d.js"
import{p as v,s as A}from"./pubsub-095d0f5c.js"
import"./errorDialog-3344f8b2.js"
import{j as N}from"./jConfirm-71949d67.js"
import"./dialog-e8202133.js"
import{u as Q,e as q}from"./useItem-e62d6147.js"
import"./ajaxReturnCode-13dfe8bc.js"
import"./daUseItem-50a1f978.js"
import{m as W}from"./makeFolderSpan-21f0eb39.js"
import{e as P}from"./eventHandler5-32a6db3c.js"
import{s as U}from"./selfIdIs-8b9ed274.js"
import{a as M}from"./stringSort-83e6c4f5.js"
import{d as T}from"./daLoadInventory-9feaf540.js"
import{h as B}from"./hasClasses-8857f04e.js"
const O=(t,n)=>t+String(n)
function D(t,n,e){return C({checked:0===e,id:O(t,e),name:t,type:"radio"})}function F(t,n,a,i){const o=r({className:"ui-state-default ui-corner-top"})
return e(o,E({htmlFor:O(t,i),innerHTML:a})),0!==i&&s(o,"click",()=>{v(O(t,i),n[i])}),o}const R=()=>t({className:"ui-tabs-panel ui-corner-bottom"})
function _(r,s,i){const o=t({className:"fshTabSet ui-tabs ui-widget-content ui-corner-all"}),c=n(e,o)
s.map(n(D,i)).forEach(c)
const d=s.map(R)
v(O(i,0),d[0])
const f=function(t,a,r){const s=I({className:"ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"})
return t.map(n(F,a,r)).forEach(n(e,s)),s}(s,i,d)
return v(i+"-header",f),e(o,f),d.forEach(c),a("",r),e(r,o),0}function G(t,n,e){const r=t.insertRow(-1)
e.dom=r
let s="fshEq ",i="fshUse "
e.t<9?s+="smallLink":s+="notLink",i+=function(t){return-1!==[10,12,15,16].indexOf(t.t)||"Zombie Coffin"===t.n?"smallLink":"notLink"}(e),a(`<td class="fshCenter"><span class="${s}" data-itemid="${e.a}">Wear</span>&nbsp;|&nbsp;<span class="${i}" data-itemid="${e.a}">Use/Ext</span></td><td><img src="${function(t){let n=c
return 13699===t.b?n+=`composing/${t.extra.design}_${t.extra.color}.png`:n+=`items/${t.b}.gif`,n}(e)}" class="tip-dynamic" data-tipped="fetchitem.php?item_id=${e.b}&amp;inv_id=${e.a}&amp;t=1&amp;p=${n}&amp;currentPlayerId=${n}" width="30" height="30" border="0"></td><td width="90%">&nbsp;${e.n}</td>`,r)}function J(t){return W(String(t.id),t.name)}function Z(t){return W("0","All")+t.r.map(J).join("")}function z(t,e,a){a.items.sort(M).forEach(n(G,t,e))}function K(t){const a=H({width:"100%",innerHTML:`<thead><tr><th class="fshCenter" colspan="3">${Z(t)}</th></tr><tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th><th colspan="2">Items</th></tr></thead>`}),r=x()
return e(a,r),o.sortBy="n",o.sortAsc=!0,t.r.forEach(n(z,r,i())),a}function V(n){const a=K(n),r=t()
return e(r,a),r}function X(t,n){return`<a href="${h}${t}">${n}</a>`}function Y(t){return t[1].nicknameList.length>0}function tt(t){return`<tr><td>${t[0]}</td><td>${t[1].nicknameList.map(n(X,t[0])).join(" ")}</td><td>${t[1].count}</td><td></td><td></td></tr>`}function nt(t){return t.displayOnAH&&!t.found}function et(t){return X(t.searchname,t.nickname)}function at(t){return 0===t[1].nicknameList.length}function rt(t){return`<tr><td>${t[0]}</td><td></td><td>${t[1].count}</td><td></td><td></td></tr>`}function st(t,n){return`<table width="100%" cellspacing="2" cellpadding="2"><thead><tr><th colspan="5" class="fshCenter">Items from <a href="${m}">AH Quick Search</a> found in your inventory</th></tr><tr><th>Name</th><th>Nick Name</th><th>Inv Count</th><th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>${function(t){return u(t).filter(Y).map(tt).join("")}(t)}<tr><td colspan="5"><hr></td></tr><tr><td>Did not find:</td><td colspan="4">${function(t){return t.filter(nt).map(et).join(", ")}(n)}</td></tr><tr><td colspan="5"><hr></td></tr></tbody><thead><tr><th colspan="5" class="fshCenter">Items NOT from <a href="${m}">AH Quick Search</a> found in your inventory</td></thead><tbody>${function(t){return u(t).filter(at).map(rt).join("")}(t)}</tbody></table>`}function it(t,n,e){n===e.searchname&&(e.found=!0,t[n].nicknameList.indexOf(e.nickname)<0&&t[n].nicknameList.push(e.nickname))}function ot(t,e,a){const r=a.n
!function(t,n){t[n]?t[n].count+=1:t[n]={count:1,nicknameList:[]}}(t,r),e.forEach(n(it,t,r))}function ct(t,e,a){a.items.forEach(n(ot,t,e))}function dt(e){const a={},r=d("quickSearchList")||[]
e.r.forEach(n(ct,a,r))
const s=t()
return f(s,st(a,r)),s}let ft,mt
function ut(t,n,e){0===e.r&&a(`<span class="fastWorn">${n}</span>`,t.parentNode)}function ht(t,e,a){L("QuickWear","doAction - "+a),y("",t),t.classList.remove("smallLink"),t.classList.add("fshSpinner","fshSpin12"),e(t.dataset.itemid).then(n(ut,t,a))}function lt(t){ht(t,Q,"Used")}function pt(t){ft?lt(t):N("Use/Extract Item","Are you sure you want to use/extract the item?",n(lt,t))}function bt(t){ht(t,q,"Worn")}function kt(t,n,e){const a=e.dom
if("0"===t)a.classList.remove("fshHide")
else{const e=t!==n.toString()
w(a,e)}}function jt(t,e){const a=e.id
e.items.forEach(n(kt,t,a))}function $t(t){const e=t.dataset.folder
mt.r.forEach(n(jt,e))}function gt(){ft=!ft,g("disableQuickWearPrompts",ft)}function Lt(n){e(n,t({className:"qwPref",innerHTML:S("disableQuickWearPrompts")}))}function yt(t,n,a){e(a,t(n))}function wt(t,e){A("qwtab-header",Lt),A("qwtab0",n(yt,V,e)),A("qwtab1",n(yt,dt,e)),_(t,["Quick Wear / Use / Extract<br>Manager","Inventory Manager Counter<br>filtered by AH Quick Search"],"qwtab"),j(t,P([[n(B,["smallLink","fshEq"]),bt],[n(B,["smallLink","fshUse"]),pt],[n($,"fshFolder"),$t],[U("disableQuickWearPrompts"),gt]]))}function Ct(t,n){(function(t){return t&&t.s&&b(t.r)})(n)&&(mt=n,wt(t,n))}export default function(t){l()&&function(t){const e=t||k
e&&(f(e,"Getting item list from backpack..."),T().then(n(Ct,e)),ft=p("disableQuickWearPrompts"))}(t)}
//# sourceMappingURL=quickWear-18763ac2.js.map
