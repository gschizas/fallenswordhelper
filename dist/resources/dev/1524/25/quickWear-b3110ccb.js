import{m as t,t as n,h as a,A as e,O as r,b7 as s,c as o,aH as i,bE as c,i as f,bF as d,e as m,bj as u,j as l,H as h,P as p,p as b,o as j,l as k,Z as $,V as g,z as L}from"./calfSystem-69dd5601.js"
import"./toLowerCase-c42114e1.js"
import{c as y}from"./createInput-31301338.js"
import{c as w}from"./createLabel-76355438.js"
import{c as E}from"./createUl-713f95e6.js"
import"./isChecked-9f10b428.js"
import{b as H}from"./simpleCheckbox-5b36aca2.js"
import"./alpha-4977b995.js"
import{c as x}from"./createTBody-c786127c.js"
import{c as A}from"./createTable-ba9c0bc4.js"
import"./dialogMsg-1f890a82.js"
import{p as C,s as I}from"./pubsub-95975414.js"
import{c as S}from"./createLi-55cf2570.js"
import"./errorDialog-c0c5c278.js"
import"./indexAjaxJson-2e5777a1.js"
import{t as N}from"./toggleForce-8f3fdd9b.js"
import{a as v}from"./stringSort-eee1b201.js"
import{j as P}from"./jConfirm-f84302cc.js"
import"./daUseItem-0f92a11f.js"
import{e as Q}from"./eventHandler5-edf8409d.js"
import{s as W}from"./selfIdIs-6ca8a9a1.js"
import{m as q}from"./makeFolderSpan-1e60fc0e.js"
import{d as U}from"./daLoadInventory-c2ac8ac3.js"
import"./dialog-294b8a9c.js"
import{u as M,e as T}from"./useItem-dcc84b39.js"
import{h as F}from"./hasClasses-66c682df.js"
const O=(t,n)=>t+String(n)
function B(t,n,a){return y({checked:0===a,id:O(t,a),name:t,type:"radio"})}function _(t,n,e,s){const o=S({className:"ui-state-default ui-corner-top"})
return a(o,w({htmlFor:O(t,s),innerHTML:e})),0!==s&&r(o,"click",()=>{C(O(t,s),n[s])}),o}const D=()=>t({className:"ui-tabs-panel ui-corner-bottom"})
function Z(r,s,o){const i=t({className:"fshTabSet ui-tabs ui-widget-content ui-corner-all"}),c=n(a,i)
s.map(n(B,o)).forEach(c)
const f=s.map(D)
C(O(o,0),f[0])
const d=function(t,e,r){const s=E({className:"ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"})
return t.map(n(_,e,r)).forEach(n(a,s)),s}(s,o,f)
return C(o+"-header",d),a(i,d),f.forEach(c),e("",r),a(r,i),0}function z(t,n,a){const r=t.insertRow(-1)
a.dom=r
let s="fshEq ",o="fshUse "
a.t<9?s+="smallLink":s+="notLink",o+=function(t){return-1!==[10,12,15,16].indexOf(t.t)||"Zombie Coffin"===t.n?"smallLink":"notLink"}(a),e(`<td class="fshCenter"><span class="${s}" data-itemid="${a.a}">Wear</span>&nbsp;|&nbsp;<span class="${o}" data-itemid="${a.a}">Use/Ext</span></td><td><img src="${function(t){let n=i
return 13699===t.b?n+=`composing/${t.extra.design}_${t.extra.color}.png`:n+=`items/${t.b}.gif`,n}(a)}" class="tip-dynamic" data-tipped="fetchitem.php?item_id=${a.b}&amp;inv_id=${a.a}&amp;t=1&amp;p=${n}&amp;currentPlayerId=${n}" width="30" height="30" border="0"></td><td width="90%">&nbsp;${a.n}</td>`,r)}function G(t){return q(String(t.id),t.name)}function J(t){return q("0","All")+t.r.map(G).join("")}function R(t,a,e){e.items.sort(v).forEach(n(z,t,a))}function V(t){const e=A({width:"100%",innerHTML:`<thead><tr><th class="fshCenter" colspan="3">${J(t)}</th></tr><tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th><th colspan="2">Items</th></tr></thead>`}),r=x()
return a(e,r),o.sortBy="n",o.sortAsc=!0,t.r.forEach(n(R,r,s())),e}function K(n){const e=V(n),r=t()
return a(r,e),r}function X(t,n){return`<a href="${u}${t}">${n}</a>`}function Y(t){return t[1].nicknameList.length>0}function tt(t){return`<tr><td>${t[0]}</td><td>${t[1].nicknameList.map(n(X,t[0])).join(" ")}</td><td>${t[1].count}</td><td></td><td></td></tr>`}function nt(t){return t.displayOnAH&&!t.found}function at(t){return X(t.searchname,t.nickname)}function et(t){return 0===t[1].nicknameList.length}function rt(t){return`<tr><td>${t[0]}</td><td></td><td>${t[1].count}</td><td></td><td></td></tr>`}function st(t,n){return`<table width="100%" cellspacing="2" cellpadding="2"><thead><tr><th colspan="5" class="fshCenter">Items from <a href="${d}">AH Quick Search</a> found in your inventory</th></tr><tr><th>Name</th><th>Nick Name</th><th>Inv Count</th><th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>${function(t){return m(t).filter(Y).map(tt).join("")}(t)}<tr><td colspan="5"><hr></td></tr><tr><td>Did not find:</td><td colspan="4">${function(t){return t.filter(nt).map(at).join(", ")}(n)}</td></tr><tr><td colspan="5"><hr></td></tr></tbody><thead><tr><th colspan="5" class="fshCenter">Items NOT from <a href="${d}">AH Quick Search</a> found in your inventory</td></thead><tbody>${function(t){return m(t).filter(et).map(rt).join("")}(t)}</tbody></table>`}function ot(t,n,a){n===a.searchname&&(a.found=!0,t[n].nicknameList.indexOf(a.nickname)<0&&t[n].nicknameList.push(a.nickname))}function it(t,a,e){const r=e.n
!function(t,n){t[n]?t[n].count+=1:t[n]={count:1,nicknameList:[]}}(t,r),a.forEach(n(ot,t,r))}function ct(t,a,e){e.items.forEach(n(it,t,a))}function ft(a){const e={},r=c("quickSearchList")||[]
a.r.forEach(n(ct,e,r))
const s=t()
return f(s,st(e,r)),s}let dt,mt
function ut(t,n,a){0===a.r&&e(`<span class="fastWorn">${n}</span>`,t.parentNode)}function lt(t,a,e){g("QuickWear","doAction - "+e),L("",t),t.classList.remove("smallLink"),t.classList.add("fshSpinner","fshSpin12"),a(t.dataset.itemid).then(n(ut,t,e))}function ht(t){lt(t,M,"Used")}function pt(t){dt?ht(t):P("Use/Extract Item","Are you sure you want to use/extract the item?",n(ht,t))}function bt(t){lt(t,T,"Worn")}function jt(t,n,a){const e=a.dom
if("0"===t)e.classList.remove("fshHide")
else{const a=t!==n.toString()
N(e,a)}}function kt(t,a){const e=a.id
a.items.forEach(n(jt,t,e))}function $t(t){const a=t.dataset.folder
mt.r.forEach(n(kt,a))}function gt(){dt=!dt,$("disableQuickWearPrompts",dt)}function Lt(n){a(n,t({className:"qwPref",innerHTML:H("disableQuickWearPrompts")}))}function yt(t,n,e){a(e,t(n))}function wt(t,a){I("qwtab-header",Lt),I("qwtab0",n(yt,K,a)),I("qwtab1",n(yt,ft,a)),Z(t,["Quick Wear / Use / Extract<br>Manager","Inventory Manager Counter<br>filtered by AH Quick Search"],"qwtab"),j(t,Q([[n(F,["smallLink","fshEq"]),bt],[n(F,["smallLink","fshUse"]),pt],[n(k,"fshFolder"),$t],[W("disableQuickWearPrompts"),gt]]))}function Et(t,n){(function(t){return t&&t.s&&p(t.r)})(n)&&(mt=n,wt(t,n))}function Ht(t){l()&&function(t){const a=t||b
a&&(f(a,"Getting item list from backpack..."),U().then(n(Et,a)),dt=h("disableQuickWearPrompts"))}(t)}export default Ht
//# sourceMappingURL=quickWear-b3110ccb.js.map
