import{l as t,v as n,h as a,C as e,b0 as r,Q as s,bt as i,e as o,aI as c,ca as d,i as f,cb as m,q as u,bD as h,j as l,G as p,R as b,p as k,o as j,aJ as $,a5 as g,a1 as L,B as y,t as w}from"./calfSystem-fd021443.js"
import"./toLowerCase-4cca5593.js"
import{c as C}from"./createInput-309e97c5.js"
import{c as E}from"./createLabel-7143722b.js"
import{c as I}from"./createUl-d213d71d.js"
import"./isChecked-fadd6c27.js"
import{b as S}from"./simpleCheckbox-3543dc2c.js"
import"./alpha-39cc7a36.js"
import{c as x}from"./createTBody-00882f12.js"
import{c as H}from"./createTable-c0a20196.js"
import"./dialogMsg-280d6f63.js"
import{p as v,s as A}from"./pubsub-febdce28.js"
import"./errorDialog-c89dc139.js"
import{j as N}from"./jConfirm-ca6a99a6.js"
import"./dialog-a08a4c3c.js"
import{u as Q,e as q}from"./useItem-518ed308.js"
import"./ajaxReturnCode-ee8e978d.js"
import"./daUseItem-602cd31a.js"
import{m as W}from"./makeFolderSpan-f7e59b0b.js"
import{e as P}from"./eventHandler5-29815432.js"
import{s as U}from"./selfIdIs-e22a1c50.js"
import{a as M}from"./stringSort-6ec221ba.js"
import{d as T}from"./daLoadInventory-ced9a074.js"
import{h as B}from"./hasClasses-360a31b0.js"
const O=(t,n)=>t+String(n)
function D(t,n,a){return C({checked:0===a,id:O(t,a),name:t,type:"radio"})}function F(t,n,e,i){const o=r({className:"ui-state-default ui-corner-top"})
return a(o,E({htmlFor:O(t,i),innerHTML:e})),0!==i&&s(o,"click",()=>{v(O(t,i),n[i])}),o}const R=()=>t({className:"ui-tabs-panel ui-corner-bottom"})
function _(r,s,i){const o=t({className:"fshTabSet ui-tabs ui-widget-content ui-corner-all"}),c=n(a,o)
s.map(n(D,i)).forEach(c)
const d=s.map(R)
v(O(i,0),d[0])
const f=function(t,e,r){const s=I({className:"ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"})
return t.map(n(F,e,r)).forEach(n(a,s)),s}(s,i,d)
return v(i+"-header",f),a(o,f),d.forEach(c),e("",r),a(r,o),0}function G(t,n,a){const r=t.insertRow(-1)
a.dom=r
let s="fshEq ",i="fshUse "
a.t<9?s+="smallLink":s+="notLink",i+=function(t){return-1!==[10,12,15,16].indexOf(t.t)||"Zombie Coffin"===t.n?"smallLink":"notLink"}(a),e(`<td class="fshCenter"><span class="${s}" data-itemid="${a.a}">Wear</span>&nbsp;|&nbsp;<span class="${i}" data-itemid="${a.a}">Use/Ext</span></td><td><img src="${function(t){let n=c
return 13699===t.b?n+=`composing/${t.extra.design}_${t.extra.color}.png`:n+=`items/${t.b}.gif`,n}(a)}" class="tip-dynamic" data-tipped="fetchitem.php?item_id=${a.b}&amp;inv_id=${a.a}&amp;t=1&amp;p=${n}&amp;currentPlayerId=${n}" width="30" height="30" border="0"></td><td width="90%">&nbsp;${a.n}</td>`,r)}function J(t){return W(String(t.id),t.name)}function Z(t){return W("0","All")+t.r.map(J).join("")}function z(t,a,e){e.items.sort(M).forEach(n(G,t,a))}function K(t){const e=H({width:"100%",innerHTML:`<thead><tr><th class="fshCenter" colspan="3">${Z(t)}</th></tr><tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th><th colspan="2">Items</th></tr></thead>`}),r=x()
return a(e,r),o.sortBy="n",o.sortAsc=!0,t.r.forEach(n(z,r,i())),e}function V(n){const e=K(n),r=t()
return a(r,e),r}function X(t,n){return`<a href="${h}${t}">${n}</a>`}function Y(t){return t[1].nicknameList.length>0}function tt(t){return`<tr><td>${t[0]}</td><td>${t[1].nicknameList.map(n(X,t[0])).join(" ")}</td><td>${t[1].count}</td><td></td><td></td></tr>`}function nt(t){return t.displayOnAH&&!t.found}function at(t){return X(t.searchname,t.nickname)}function et(t){return 0===t[1].nicknameList.length}function rt(t){return`<tr><td>${t[0]}</td><td></td><td>${t[1].count}</td><td></td><td></td></tr>`}function st(t,n){return`<table width="100%" cellspacing="2" cellpadding="2"><thead><tr><th colspan="5" class="fshCenter">Items from <a href="${m}">AH Quick Search</a> found in your inventory</th></tr><tr><th>Name</th><th>Nick Name</th><th>Inv Count</th><th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>${function(t){return u(t).filter(Y).map(tt).join("")}(t)}<tr><td colspan="5"><hr></td></tr><tr><td>Did not find:</td><td colspan="4">${function(t){return t.filter(nt).map(at).join(", ")}(n)}</td></tr><tr><td colspan="5"><hr></td></tr></tbody><thead><tr><th colspan="5" class="fshCenter">Items NOT from <a href="${m}">AH Quick Search</a> found in your inventory</td></thead><tbody>${function(t){return u(t).filter(et).map(rt).join("")}(t)}</tbody></table>`}function it(t,n,a){n===a.searchname&&(a.found=!0,t[n].nicknameList.indexOf(a.nickname)<0&&t[n].nicknameList.push(a.nickname))}function ot(t,a,e){const r=e.n
!function(t,n){t[n]?t[n].count+=1:t[n]={count:1,nicknameList:[]}}(t,r),a.forEach(n(it,t,r))}function ct(t,a,e){e.items.forEach(n(ot,t,a))}function dt(a){const e={},r=d("quickSearchList")||[]
a.r.forEach(n(ct,e,r))
const s=t()
return f(s,st(e,r)),s}let ft,mt
function ut(t,n,a){0===a.r&&e(`<span class="fastWorn">${n}</span>`,t.parentNode)}function ht(t,a,e){L("QuickWear","doAction - "+e),y("",t),t.classList.remove("smallLink"),t.classList.add("fshSpinner","fshSpin12"),a(t.dataset.itemid).then(n(ut,t,e))}function lt(t){ht(t,Q,"Used")}function pt(t){ft?lt(t):N("Use/Extract Item","Are you sure you want to use/extract the item?",n(lt,t))}function bt(t){ht(t,q,"Worn")}function kt(t,n,a){const e=a.dom
if("0"===t)e.classList.remove("fshHide")
else{const a=t!==n.toString()
w(e,a)}}function jt(t,a){const e=a.id
a.items.forEach(n(kt,t,e))}function $t(t){const a=t.dataset.folder
mt.r.forEach(n(jt,a))}function gt(){ft=!ft,g("disableQuickWearPrompts",ft)}function Lt(n){a(n,t({className:"qwPref",innerHTML:S("disableQuickWearPrompts")}))}function yt(t,n,e){a(e,t(n))}function wt(t,a){A("qwtab-header",Lt),A("qwtab0",n(yt,V,a)),A("qwtab1",n(yt,dt,a)),_(t,["Quick Wear / Use / Extract<br>Manager","Inventory Manager Counter<br>filtered by AH Quick Search"],"qwtab"),j(t,P([[n(B,["smallLink","fshEq"]),bt],[n(B,["smallLink","fshUse"]),pt],[n($,"fshFolder"),$t],[U("disableQuickWearPrompts"),gt]]))}function Ct(t,n){(function(t){return t&&t.s&&b(t.r)})(n)&&(mt=n,wt(t,n))}export default function(t){l()&&function(t){const a=t||k
a&&(f(a,"Getting item list from backpack..."),T().then(n(Ct,a)),ft=p("disableQuickWearPrompts"))}(t)}
//# sourceMappingURL=quickWear-c141c0c4.js.map
