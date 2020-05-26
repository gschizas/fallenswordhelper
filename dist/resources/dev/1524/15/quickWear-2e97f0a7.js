import{k as t,s as n,f as e,z as a,K as r,bm as s,c as o,aw as i,bX as c,i as d,bY as f,l as m,bt as u,j as l,D as h,L as p,p as b,o as j,ax as k,W as $,S as g,y as L}from"./calfSystem-ee582533.js"
import"./toLowerCase-6383ba3b.js"
import{c as y}from"./createInput-2410e798.js"
import{c as w}from"./createLabel-96cdd0a5.js"
import{c as x}from"./createUl-25b39286.js"
import"./isChecked-21b2756d.js"
import{b as E}from"./simpleCheckbox-eb1aed29.js"
import"./alpha-df6d1f94.js"
import{c as C}from"./createTBody-aa153e3a.js"
import{c as S}from"./createTable-cbb3667c.js"
import"./dialogMsg-b9afb04d.js"
import{p as I,s as A}from"./pubsub-c72fe5ed.js"
import{c as H}from"./createLi-7e31709a.js"
import"./errorDialog-647ae9d2.js"
import{j as N}from"./jConfirm-4bd5807a.js"
import"./dialog-b2af5043.js"
import"./indexAjaxJson-e486d467.js"
import{u as v,e as W}from"./useItem-bfe3ee6a.js"
import"./ajaxReturnCode-c49dbedc.js"
import"./daUseItem-f1308817.js"
import{m as Q}from"./makeFolderSpan-8b9c7bfc.js"
import{e as q}from"./eventHandler5-39a91f1e.js"
import{t as P}from"./toggleForce-3b831976.js"
import{s as U}from"./selfIdIs-2732dbd2.js"
import{a as M}from"./stringSort-e128e507.js"
import{d as T}from"./daLoadInventory-99aae1f1.js"
import{h as F}from"./hasClasses-b5f62ccc.js"
const O=(t,n)=>t+String(n)
function B(t,n,e){return y({checked:0===e,id:O(t,e),name:t,type:"radio"})}function D(t,n,a,s){const o=H({className:"ui-state-default ui-corner-top"})
return e(o,w({htmlFor:O(t,s),innerHTML:a})),0!==s&&r(o,"click",()=>{I(O(t,s),n[s])}),o}const _=()=>t({className:"ui-tabs-panel ui-corner-bottom"})
function R(r,s,o){const i=t({className:"fshTabSet ui-tabs ui-widget-content ui-corner-all"}),c=n(e,i)
s.map(n(B,o)).forEach(c)
const d=s.map(_)
I(O(o,0),d[0])
const f=function(t,a,r){const s=x({className:"ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"})
return t.map(n(D,a,r)).forEach(n(e,s)),s}(s,o,d)
return I(o+"-header",f),e(i,f),d.forEach(c),a("",r),e(r,i),0}function z(t,n,e){const r=t.insertRow(-1)
e.dom=r
let s="fshEq ",o="fshUse "
e.t<9?s+="smallLink":s+="notLink",o+=function(t){return-1!==[10,12,15,16].indexOf(t.t)||"Zombie Coffin"===t.n?"smallLink":"notLink"}(e),a(`<td class="fshCenter"><span class="${s}" data-itemid="${e.a}">Wear</span>&nbsp;|&nbsp;<span class="${o}" data-itemid="${e.a}">Use/Ext</span></td><td><img src="${function(t){let n=i
return 13699===t.b?n+=`composing/${t.extra.design}_${t.extra.color}.png`:n+=`items/${t.b}.gif`,n}(e)}" class="tip-dynamic" data-tipped="fetchitem.php?item_id=${e.b}&amp;inv_id=${e.a}&amp;t=1&amp;p=${n}&amp;currentPlayerId=${n}" width="30" height="30" border="0"></td><td width="90%">&nbsp;${e.n}</td>`,r)}function G(t){return Q(String(t.id),t.name)}function J(t){return Q("0","All")+t.r.map(G).join("")}function K(t,e,a){a.items.sort(M).forEach(n(z,t,e))}function X(t){const a=S({width:"100%",innerHTML:`<thead><tr><th class="fshCenter" colspan="3">${J(t)}</th></tr><tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th><th colspan="2">Items</th></tr></thead>`}),r=C()
return e(a,r),o.sortBy="n",o.sortAsc=!0,t.r.forEach(n(K,r,s())),a}function Y(n){const a=X(n),r=t()
return e(r,a),r}function Z(t,n){return`<a href="${u}${t}">${n}</a>`}function V(t){return t[1].nicknameList.length>0}function tt(t){return`<tr><td>${t[0]}</td><td>${t[1].nicknameList.map(n(Z,t[0])).join(" ")}</td><td>${t[1].count}</td><td></td><td></td></tr>`}function nt(t){return t.displayOnAH&&!t.found}function et(t){return Z(t.searchname,t.nickname)}function at(t){return 0===t[1].nicknameList.length}function rt(t){return`<tr><td>${t[0]}</td><td></td><td>${t[1].count}</td><td></td><td></td></tr>`}function st(t,n){return`<table width="100%" cellspacing="2" cellpadding="2"><thead><tr><th colspan="5" class="fshCenter">Items from <a href="${f}">AH Quick Search</a> found in your inventory</th></tr><tr><th>Name</th><th>Nick Name</th><th>Inv Count</th><th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>${function(t){return m(t).filter(V).map(tt).join("")}(t)}<tr><td colspan="5"><hr></td></tr><tr><td>Did not find:</td><td colspan="4">${function(t){return t.filter(nt).map(et).join(", ")}(n)}</td></tr><tr><td colspan="5"><hr></td></tr></tbody><thead><tr><th colspan="5" class="fshCenter">Items NOT from <a href="${f}">AH Quick Search</a> found in your inventory</td></thead><tbody>${function(t){return m(t).filter(at).map(rt).join("")}(t)}</tbody></table>`}function ot(t,n,e){n===e.searchname&&(e.found=!0,t[n].nicknameList.indexOf(e.nickname)<0&&t[n].nicknameList.push(e.nickname))}function it(t,e,a){const r=a.n
!function(t,n){t[n]?t[n].count+=1:t[n]={count:1,nicknameList:[]}}(t,r),e.forEach(n(ot,t,r))}function ct(t,e,a){a.items.forEach(n(it,t,e))}function dt(e){const a={},r=c("quickSearchList")||[]
e.r.forEach(n(ct,a,r))
const s=t()
return d(s,st(a,r)),s}let ft,mt
function ut(t,n,e){0===e.r&&a(`<span class="fastWorn">${n}</span>`,t.parentNode)}function lt(t,e,a){g("QuickWear","doAction - "+a),L("",t),t.classList.remove("smallLink"),t.classList.add("fshSpinner","fshSpin12"),e(t.dataset.itemid).then(n(ut,t,a))}function ht(t){lt(t,v,"Used")}function pt(t){ft?ht(t):N("Use/Extract Item","Are you sure you want to use/extract the item?",n(ht,t))}function bt(t){lt(t,W,"Worn")}function jt(t,n,e){const a=e.dom
if("0"===t)a.classList.remove("fshHide")
else{const e=t!==n.toString()
P(a,e)}}function kt(t,e){const a=e.id
e.items.forEach(n(jt,t,a))}function $t(t){const e=t.dataset.folder
mt.r.forEach(n(kt,e))}function gt(){ft=!ft,$("disableQuickWearPrompts",ft)}function Lt(n){e(n,t({className:"qwPref",innerHTML:E("disableQuickWearPrompts")}))}function yt(t,n,a){e(a,t(n))}function wt(t,e){A("qwtab-header",Lt),A("qwtab0",n(yt,Y,e)),A("qwtab1",n(yt,dt,e)),R(t,["Quick Wear / Use / Extract<br>Manager","Inventory Manager Counter<br>filtered by AH Quick Search"],"qwtab"),j(t,q([[n(F,["smallLink","fshEq"]),bt],[n(F,["smallLink","fshUse"]),pt],[n(k,"fshFolder"),$t],[U("disableQuickWearPrompts"),gt]]))}function xt(t,n){(function(t){return t&&t.s&&p(t.r)})(n)&&(mt=n,wt(t,n))}export default function(t){l()&&function(t){const e=t||b
e&&(d(e,"Getting item list from backpack..."),T().then(n(xt,e)),ft=h("disableQuickWearPrompts"))}(t)}
//# sourceMappingURL=quickWear-2e97f0a7.js.map
