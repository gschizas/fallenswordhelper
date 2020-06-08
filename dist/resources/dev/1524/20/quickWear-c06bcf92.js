import{l as t,t as n,f as e,A as a,O as r,b7 as s,c as o,aH as i,bD as c,i as f,bE as d,m,bj as u,j as l,G as h,P as p,p as b,o as j,k,Z as $,V as g,z as L}from"./calfSystem-a2862afc.js"
import"./toLowerCase-2574a84c.js"
import{c as y}from"./createInput-457456bb.js"
import{c as w}from"./createLabel-0e59a017.js"
import{c as E}from"./createUl-1aaeeb73.js"
import"./isChecked-e0d689b2.js"
import{b as x}from"./simpleCheckbox-c8f3914c.js"
import"./alpha-557396ad.js"
import{c as C}from"./createTBody-9b48ed82.js"
import{c as A}from"./createTable-6dbc7d62.js"
import"./dialogMsg-98e801f7.js"
import{p as H,s as I}from"./pubsub-92866278.js"
import{c as S}from"./createLi-bf7f453f.js"
import"./ajaxReturnCode-f0b1c41c.js"
import{m as N}from"./makeFolderSpan-1e92cbcf.js"
import"./dialog-65e58e09.js"
import"./indexAjaxJson-afc1ac85.js"
import{e as v}from"./eventHandler5-0d938057.js"
import{t as P}from"./toggleForce-4bee24df.js"
import{s as Q}from"./selfIdIs-7f51e683.js"
import"./errorDialog-a4de6042.js"
import{a as W}from"./stringSort-a5841eee.js"
import{j as q}from"./jConfirm-40a47e4d.js"
import"./daUseItem-10f8bb4a.js"
import{d as U}from"./daLoadInventory-e250af82.js"
import{u as M,e as T}from"./useItem-8cd86b52.js"
import{h as O}from"./hasClasses-ca2c6818.js"
const F=(t,n)=>t+String(n)
function B(t,n,e){return y({checked:0===e,id:F(t,e),name:t,type:"radio"})}function D(t,n,a,s){const o=S({className:"ui-state-default ui-corner-top"})
return e(o,w({htmlFor:F(t,s),innerHTML:a})),0!==s&&r(o,"click",()=>{H(F(t,s),n[s])}),o}const _=()=>t({className:"ui-tabs-panel ui-corner-bottom"})
function G(r,s,o){const i=t({className:"fshTabSet ui-tabs ui-widget-content ui-corner-all"}),c=n(e,i)
s.map(n(B,o)).forEach(c)
const f=s.map(_)
H(F(o,0),f[0])
const d=function(t,a,r){const s=E({className:"ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"})
return t.map(n(D,a,r)).forEach(n(e,s)),s}(s,o,f)
return H(o+"-header",d),e(i,d),f.forEach(c),a("",r),e(r,i),0}function R(t,n,e){const r=t.insertRow(-1)
e.dom=r
let s="fshEq ",o="fshUse "
e.t<9?s+="smallLink":s+="notLink",o+=function(t){return-1!==[10,12,15,16].indexOf(t.t)||"Zombie Coffin"===t.n?"smallLink":"notLink"}(e),a(`<td class="fshCenter"><span class="${s}" data-itemid="${e.a}">Wear</span>&nbsp;|&nbsp;<span class="${o}" data-itemid="${e.a}">Use/Ext</span></td><td><img src="${function(t){let n=i
return 13699===t.b?n+=`composing/${t.extra.design}_${t.extra.color}.png`:n+=`items/${t.b}.gif`,n}(e)}" class="tip-dynamic" data-tipped="fetchitem.php?item_id=${e.b}&amp;inv_id=${e.a}&amp;t=1&amp;p=${n}&amp;currentPlayerId=${n}" width="30" height="30" border="0"></td><td width="90%">&nbsp;${e.n}</td>`,r)}function Z(t){return N(String(t.id),t.name)}function z(t){return N("0","All")+t.r.map(Z).join("")}function J(t,e,a){a.items.sort(W).forEach(n(R,t,e))}function V(t){const a=A({width:"100%",innerHTML:`<thead><tr><th class="fshCenter" colspan="3">${z(t)}</th></tr><tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th><th colspan="2">Items</th></tr></thead>`}),r=C()
return e(a,r),o.sortBy="n",o.sortAsc=!0,t.r.forEach(n(J,r,s())),a}function K(n){const a=V(n),r=t()
return e(r,a),r}function X(t,n){return`<a href="${u}${t}">${n}</a>`}function Y(t){return t[1].nicknameList.length>0}function tt(t){return`<tr><td>${t[0]}</td><td>${t[1].nicknameList.map(n(X,t[0])).join(" ")}</td><td>${t[1].count}</td><td></td><td></td></tr>`}function nt(t){return t.displayOnAH&&!t.found}function et(t){return X(t.searchname,t.nickname)}function at(t){return 0===t[1].nicknameList.length}function rt(t){return`<tr><td>${t[0]}</td><td></td><td>${t[1].count}</td><td></td><td></td></tr>`}function st(t,n){return`<table width="100%" cellspacing="2" cellpadding="2"><thead><tr><th colspan="5" class="fshCenter">Items from <a href="${d}">AH Quick Search</a> found in your inventory</th></tr><tr><th>Name</th><th>Nick Name</th><th>Inv Count</th><th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>${function(t){return m(t).filter(Y).map(tt).join("")}(t)}<tr><td colspan="5"><hr></td></tr><tr><td>Did not find:</td><td colspan="4">${function(t){return t.filter(nt).map(et).join(", ")}(n)}</td></tr><tr><td colspan="5"><hr></td></tr></tbody><thead><tr><th colspan="5" class="fshCenter">Items NOT from <a href="${d}">AH Quick Search</a> found in your inventory</td></thead><tbody>${function(t){return m(t).filter(at).map(rt).join("")}(t)}</tbody></table>`}function ot(t,n,e){n===e.searchname&&(e.found=!0,t[n].nicknameList.indexOf(e.nickname)<0&&t[n].nicknameList.push(e.nickname))}function it(t,e,a){const r=a.n
!function(t,n){t[n]?t[n].count+=1:t[n]={count:1,nicknameList:[]}}(t,r),e.forEach(n(ot,t,r))}function ct(t,e,a){a.items.forEach(n(it,t,e))}function ft(e){const a={},r=c("quickSearchList")||[]
e.r.forEach(n(ct,a,r))
const s=t()
return f(s,st(a,r)),s}let dt,mt
function ut(t,n,e){0===e.r&&a(`<span class="fastWorn">${n}</span>`,t.parentNode)}function lt(t,e,a){g("QuickWear","doAction - "+a),L("",t),t.classList.remove("smallLink"),t.classList.add("fshSpinner","fshSpin12"),e(t.dataset.itemid).then(n(ut,t,a))}function ht(t){lt(t,M,"Used")}function pt(t){dt?ht(t):q("Use/Extract Item","Are you sure you want to use/extract the item?",n(ht,t))}function bt(t){lt(t,T,"Worn")}function jt(t,n,e){const a=e.dom
if("0"===t)a.classList.remove("fshHide")
else{const e=t!==n.toString()
P(a,e)}}function kt(t,e){const a=e.id
e.items.forEach(n(jt,t,a))}function $t(t){const e=t.dataset.folder
mt.r.forEach(n(kt,e))}function gt(){dt=!dt,$("disableQuickWearPrompts",dt)}function Lt(n){e(n,t({className:"qwPref",innerHTML:x("disableQuickWearPrompts")}))}function yt(t,n,a){e(a,t(n))}function wt(t,e){I("qwtab-header",Lt),I("qwtab0",n(yt,K,e)),I("qwtab1",n(yt,ft,e)),G(t,["Quick Wear / Use / Extract<br>Manager","Inventory Manager Counter<br>filtered by AH Quick Search"],"qwtab"),j(t,v([[n(O,["smallLink","fshEq"]),bt],[n(O,["smallLink","fshUse"]),pt],[n(k,"fshFolder"),$t],[Q("disableQuickWearPrompts"),gt]]))}function Et(t,n){(function(t){return t&&t.s&&p(t.r)})(n)&&(mt=n,wt(t,n))}export default function(t){l()&&function(t){const e=t||b
e&&(f(e,"Getting item list from backpack..."),U().then(n(Et,e)),dt=h("disableQuickWearPrompts"))}(t)}
//# sourceMappingURL=quickWear-c06bcf92.js.map
