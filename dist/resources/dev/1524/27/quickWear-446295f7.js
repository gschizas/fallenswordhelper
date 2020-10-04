import{m as t,t as n,h as a,A as e,O as r,b7 as s,c as o,aI as i,bB as c,i as d,bC as f,e as m,bh as u,j as h,H as l,P as p,p as b,o as j,l as k,_ as $,W as g,z as L}from"./calfSystem-ec5e5725.js"
import"./toLowerCase-33399b5a.js"
import{c as y}from"./createInput-a9a25c4d.js"
import{c as w}from"./createLabel-de3c44aa.js"
import{c as E}from"./createUl-94da6fbb.js"
import"./isChecked-ed98077f.js"
import{b as C}from"./simpleCheckbox-e694b596.js"
import"./alpha-d5278d39.js"
import{c as I}from"./createTBody-b1c8bf61.js"
import{c as x}from"./createTable-4d32a607.js"
import"./dialogMsg-9c8d1b20.js"
import{p as A,s as H}from"./pubsub-e9c1dc0d.js"
import{c as S}from"./createLi-3233a571.js"
import"./errorDialog-7f9c11b0.js"
import"./indexAjaxJson-b7f888c6.js"
import{t as N}from"./toggleForce-7e736fc3.js"
import{a as v}from"./stringSort-d6c01557.js"
import{j as W}from"./jConfirm-516372c3.js"
import"./daUseItem-030e2858.js"
import{e as P}from"./eventHandler5-1471192b.js"
import{s as Q}from"./selfIdIs-3ab2425b.js"
import{m as q}from"./makeFolderSpan-b10ef92b.js"
import{d as U}from"./daLoadInventory-4a023c91.js"
import"./dialog-370f639a.js"
import{u as M,e as T}from"./useItem-b974a641.js"
import{h as O}from"./hasClasses-8500c109.js"
const B=(t,n)=>t+String(n)
function F(t,n,a){return y({checked:0===a,id:B(t,a),name:t,type:"radio"})}function _(t,n,e,s){const o=S({className:"ui-state-default ui-corner-top"})
return a(o,w({htmlFor:B(t,s),innerHTML:e})),0!==s&&r(o,"click",()=>{A(B(t,s),n[s])}),o}const D=()=>t({className:"ui-tabs-panel ui-corner-bottom"})
function z(r,s,o){const i=t({className:"fshTabSet ui-tabs ui-widget-content ui-corner-all"}),c=n(a,i)
s.map(n(F,o)).forEach(c)
const d=s.map(D)
A(B(o,0),d[0])
const f=function(t,e,r){const s=E({className:"ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"})
return t.map(n(_,e,r)).forEach(n(a,s)),s}(s,o,d)
A(o+"-header",f),a(i,f),d.forEach(c),e("",r),a(r,i)}function G(t,n,a){const r=t.insertRow(-1)
a.dom=r
let s="fshEq ",o="fshUse "
a.t<9?s+="smallLink":s+="notLink",o+=function(t){return-1!==[10,12,15,16].indexOf(t.t)||"Zombie Coffin"===t.n?"smallLink":"notLink"}(a),e(`<td class="fshCenter"><span class="${s}" data-itemid="${a.a}">Wear</span>&nbsp;|&nbsp;<span class="${o}" data-itemid="${a.a}">Use/Ext</span></td><td><img src="${function(t){let n=i
return 13699===t.b?n+=`composing/${t.extra.design}_${t.extra.color}.png`:n+=`items/${t.b}.gif`,n}(a)}" class="tip-dynamic" data-tipped="fetchitem.php?item_id=${a.b}&amp;inv_id=${a.a}&amp;t=1&amp;p=${n}&amp;currentPlayerId=${n}" width="30" height="30" border="0"></td><td width="90%">&nbsp;${a.n}</td>`,r)}function J(t){return q(String(t.id),t.name)}function R(t){return q("0","All")+t.r.map(J).join("")}function Z(t,a,e){e.items.sort(v).forEach(n(G,t,a))}function K(t){const e=x({width:"100%",innerHTML:`<thead><tr><th class="fshCenter" colspan="3">${R(t)}</th></tr><tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th><th colspan="2">Items</th></tr></thead>`}),r=I()
return a(e,r),o.sortBy="n",o.sortAsc=!0,t.r.forEach(n(Z,r,s())),e}function V(n){const e=K(n),r=t()
return a(r,e),r}function X(t,n){return`<a href="${u}${t}">${n}</a>`}function Y(t){return t[1].nicknameList.length>0}function tt(t){return`<tr><td>${t[0]}</td><td>${t[1].nicknameList.map(n(X,t[0])).join(" ")}</td><td>${t[1].count}</td><td></td><td></td></tr>`}function nt(t){return t.displayOnAH&&!t.found}function at(t){return X(t.searchname,t.nickname)}function et(t){return 0===t[1].nicknameList.length}function rt(t){return`<tr><td>${t[0]}</td><td></td><td>${t[1].count}</td><td></td><td></td></tr>`}function st(t,n){return`<table width="100%" cellspacing="2" cellpadding="2"><thead><tr><th colspan="5" class="fshCenter">Items from <a href="${f}">AH Quick Search</a> found in your inventory</th></tr><tr><th>Name</th><th>Nick Name</th><th>Inv Count</th><th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>${function(t){return m(t).filter(Y).map(tt).join("")}(t)}<tr><td colspan="5"><hr></td></tr><tr><td>Did not find:</td><td colspan="4">${function(t){return t.filter(nt).map(at).join(", ")}(n)}</td></tr><tr><td colspan="5"><hr></td></tr></tbody><thead><tr><th colspan="5" class="fshCenter">Items NOT from <a href="${f}">AH Quick Search</a> found in your inventory</td></thead><tbody>${function(t){return m(t).filter(et).map(rt).join("")}(t)}</tbody></table>`}function ot(t,n,a){n===a.searchname&&(a.found=!0,t[n].nicknameList.indexOf(a.nickname)<0&&t[n].nicknameList.push(a.nickname))}function it(t,a,e){const r=e.n
!function(t,n){t[n]?t[n].count+=1:t[n]={count:1,nicknameList:[]}}(t,r),a.forEach(n(ot,t,r))}function ct(t,a,e){e.items.forEach(n(it,t,a))}function dt(a){const e={},r=c("quickSearchList")||[]
a.r.forEach(n(ct,e,r))
const s=t()
return d(s,st(e,r)),s}let ft,mt
function ut(t,n,a){0===a.r&&e(`<span class="fastWorn">${n}</span>`,t.parentNode)}function ht(t,a,e){g("QuickWear","doAction - "+e),L("",t),t.classList.remove("smallLink"),t.classList.add("fshSpinner","fshSpin12"),a(t.dataset.itemid).then(n(ut,t,e))}function lt(t){ht(t,M,"Used")}function pt(t){ft?lt(t):W("Use/Extract Item","Are you sure you want to use/extract the item?",n(lt,t))}function bt(t){ht(t,T,"Worn")}function jt(t,n,a){const e=a.dom
if("0"===t)e.classList.remove("fshHide")
else{const a=t!==n.toString()
N(e,a)}}function kt(t,a){const e=a.id
a.items.forEach(n(jt,t,e))}function $t(t){const a=t.dataset.folder
mt.r.forEach(n(kt,a))}function gt(){ft=!ft,$("disableQuickWearPrompts",ft)}function Lt(n){a(n,t({className:"qwPref",innerHTML:C("disableQuickWearPrompts")}))}function yt(t,n,e){a(e,t(n))}function wt(t,a){H("qwtab-header",Lt),H("qwtab0",n(yt,V,a)),H("qwtab1",n(yt,dt,a)),z(t,["Quick Wear / Use / Extract<br>Manager","Inventory Manager Counter<br>filtered by AH Quick Search"],"qwtab"),j(t,P([[n(O,["smallLink","fshEq"]),bt],[n(O,["smallLink","fshUse"]),pt],[n(k,"fshFolder"),$t],[Q("disableQuickWearPrompts"),gt]]))}function Et(t,n){(function(t){return t&&t.s&&p(t.r)})(n)&&(mt=n,wt(t,n))}function Ct(t){h()&&function(t){const a=t||b
a&&(d(a,"Getting item list from backpack..."),U().then(n(Et,a)),ft=l("disableQuickWearPrompts"))}(t)}export default Ct
//# sourceMappingURL=quickWear-446295f7.js.map
