import{m as t,h as n,t as e,as as a,c as r,A as s,ah as o,O as i,bB as c,i as d,bC as f,e as m,b7 as u,j as h,H as l,p,o as b,l as j,Y as k,U as $,z as g}from"./calfSystem-7aee5245.js"
import{c as L}from"./createTBody-7285c274.js"
import{c as y}from"./createTable-2f08d1b1.js"
import{m as w}from"./makeFolderSpan-ee78140a.js"
import{a as E}from"./stringSort-a715adc3.js"
import{d as A}from"./daLoadInventory-9a6a53ba.js"
import{u as C,e as x}from"./useItem-dc858b80.js"
import{e as H}from"./eventHandler5-25bc8f9d.js"
import{c as I}from"./createInput-cd4a36ae.js"
import{c as S}from"./createLabel-de7e9c70.js"
import{c as N}from"./createLi-d50677c3.js"
import{c as v}from"./createUl-e99a308b.js"
import{p as Q,a as U}from"./pubsub-fbbf5a73.js"
import{h as W}from"./hasClasses-df59ee66.js"
import{i as q}from"./isArray-551d6583.js"
import{j as P}from"./jConfirm-c46714b5.js"
import{s as M}from"./selfIdIs-71809de5.js"
import{b as T}from"./simpleCheckbox-4f66a590.js"
import{t as O}from"./toggleForce-8e48254b.js"
import"./alpha-80a926ba.js"
import"./toLowerCase-51740687.js"
import"./dialog-d161529e.js"
import"./dialogMsg-844edf4e.js"
import"./indexAjaxJson-d7e2ce82.js"
import"./daUseItem-5d872d5f.js"
import"./errorDialog-9d880b0d.js"
import"./isChecked-1c18cd61.js"
function B(t,n,e){const a=t.insertRow(-1)
e.dom=a
let r="fshEq ",i="fshUse "
e.t<9?r+="smallLink":r+="notLink",i+=function(t){return-1!==[10,12,15,16].indexOf(t.t)||"Zombie Coffin"===t.n?"smallLink":"notLink"}(e),s(`<td class="fshCenter"><span class="${r}" data-itemid="${e.a}">Wear</span>&nbsp;|&nbsp;<span class="${i}" data-itemid="${e.a}">Use/Ext</span></td><td><img src="${function(t){let n=o
return 13699===t.b?n+=`composing/${t.extra.design}_${t.extra.color}.png`:n+=`items/${t.b}.gif`,n}(e)}" class="tip-dynamic" data-tipped="fetchitem.php?item_id=${e.b}&amp;inv_id=${e.a}&amp;t=1&amp;p=${n}&amp;currentPlayerId=${n}" width="30" height="30" border="0"></td><td width="90%">&nbsp;${e.n}</td>`,a)}function F(t){return w(String(t.id),t.name)}function _(t){return w("0","All")+t.r.map(F).join("")}function D(t,n,a){a.items.sort(E).forEach(e(B,t,n))}function z(t){const s=y({width:"100%",innerHTML:`<thead><tr><th class="fshCenter" colspan="3">${_(t)}</th></tr><tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th><th colspan="2">Items</th></tr></thead>`}),o=L()
return n(s,o),r.sortBy="n",r.sortAsc=!0,t.r.forEach(e(D,o,a())),s}function G(e){const a=z(e),r=t()
return n(r,a),r}const J=(t,n)=>t+String(n)
function R(t,n,e){return I({checked:0===e,id:J(t,e),name:t,type:"radio"})}function Y(t,e,a,r){const s=N({className:"ui-state-default ui-corner-top"})
return n(s,S({htmlFor:J(t,r),innerHTML:a})),0!==r&&i(s,"click",(()=>{Q(J(t,r),e[r])})),s}const Z=()=>t({className:"ui-tabs-panel ui-corner-bottom"})
function K(a,r,o){const i=t({className:"fshTabSet ui-tabs ui-widget-content ui-corner-all"}),c=e(n,i)
r.map(e(R,o)).forEach(c)
const d=r.map(Z)
Q(J(o,0),d[0])
const f=function(t,a,r){const s=v({className:"ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"})
return t.map(e(Y,a,r)).forEach(e(n,s)),s}(r,o,d)
Q(`${o}-header`,f),n(i,f),d.forEach(c),s("",a),n(a,i)}function V(t,n){return`<a href="${u}${t}">${n}</a>`}function X(t){return t[1].nicknameList.length>0}function tt(t){return`<tr><td>${t[0]}</td><td>${t[1].nicknameList.map(e(V,t[0])).join(" ")}</td><td>${t[1].count}</td><td></td><td></td></tr>`}function nt(t){return t.displayOnAH&&!t.found}function et(t){return V(t.searchname,t.nickname)}function at(t){return 0===t[1].nicknameList.length}function rt(t){return`<tr><td>${t[0]}</td><td></td><td>${t[1].count}</td><td></td><td></td></tr>`}function st(t,n){return`<table width="100%" cellspacing="2" cellpadding="2"><thead><tr><th colspan="5" class="fshCenter">Items from <a href="${f}">AH Quick Search</a> found in your inventory</th></tr><tr><th>Name</th><th>Nick Name</th><th>Inv Count</th><th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>${function(t){return m(t).filter(X).map(tt).join("")}(t)}<tr><td colspan="5"><hr></td></tr><tr><td>Did not find:</td><td colspan="4">${function(t){return t.filter(nt).map(et).join(", ")}(n)}</td></tr><tr><td colspan="5"><hr></td></tr></tbody><thead><tr><th colspan="5" class="fshCenter">Items NOT from <a href="${f}">AH Quick Search</a> found in your inventory</td></thead><tbody>${function(t){return m(t).filter(at).map(rt).join("")}(t)}</tbody></table>`}function ot(t,n,e){n===e.searchname&&(e.found=!0,t[n].nicknameList.indexOf(e.nickname)<0&&t[n].nicknameList.push(e.nickname))}function it(t,n,a){const r=a.n
!function(t,n){t[n]?t[n].count+=1:t[n]={count:1,nicknameList:[]}}(t,r),n.forEach(e(ot,t,r))}function ct(t,n,a){a.items.forEach(e(it,t,n))}function dt(n){const a={},r=c("quickSearchList")||[]
n.r.forEach(e(ct,a,r))
const s=t()
return d(s,st(a,r)),s}let ft,mt
function ut(t,n,e){0===e.r&&s(`<span class="fastWorn">${n}</span>`,t.parentNode)}function ht(t,n,a){$("QuickWear",`doAction - ${a}`),g("",t),t.classList.remove("smallLink"),t.classList.add("fshSpinner","fshSpin12"),n(t.dataset.itemid).then(e(ut,t,a))}function lt(t){ht(t,C,"Used")}function pt(t){ft?lt(t):P("Use/Extract Item","Are you sure you want to use/extract the item?",e(lt,t))}function bt(t){ht(t,x,"Worn")}function jt(t,n,e){const a=e.dom
if("0"===t)a.classList.remove("fshHide")
else{const e=t!==n.toString()
O(a,e)}}function kt(t,n){const a=n.id
n.items.forEach(e(jt,t,a))}function $t(t){const n=t.dataset.folder
mt.r.forEach(e(kt,n))}function gt(){ft=!ft,k("disableQuickWearPrompts",ft)}function Lt(e){n(e,t({className:"qwPref",innerHTML:T("disableQuickWearPrompts")}))}function yt(t,e,a){n(a,t(e))}function wt(t,n){U("qwtab-header",Lt),U("qwtab0",e(yt,G,n)),U("qwtab1",e(yt,dt,n)),K(t,["Quick Wear / Use / Extract<br>Manager","Inventory Manager Counter<br>filtered by AH Quick Search"],"qwtab"),b(t,H([[e(W,["smallLink","fshEq"]),bt],[e(W,["smallLink","fshUse"]),pt],[e(j,"fshFolder"),$t],[M("disableQuickWearPrompts"),gt]]))}function Et(t,n){(function(t){return t&&t.s&&q(t.r)})(n)&&(mt=n,wt(t,n))}function At(t){h()&&function(t){const n=t||p
n&&(d(n,"Getting item list from backpack..."),A().then(e(Et,n)),ft=l("disableQuickWearPrompts"))}(t)}export default At
//# sourceMappingURL=quickWear-6bb5da0e.js.map
