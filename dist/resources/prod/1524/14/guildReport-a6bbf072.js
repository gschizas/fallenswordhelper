import{o as t,bP as n,b as e,p as o,u as a,cd as r,B as i,aE as s,$ as c,E as u,bl as l,k as p,au as f,P as d,f as m,q as b,a as h,n as g,A as y,i as M,ag as j,aO as L,a9 as C,ai as $,e as x,aw as I,C as k,c as v,a8 as H,W as N,M as R,bk as T,bo as S,y as w}from"./calfSystem-d587d232.js"
import"./numberIsNaN-054e0c59.js"
import"./toLowerCase-f57cc259.js"
import{c as E}from"./createInput-f5f615ed.js"
import{t as A}from"./testRange-1c2a927f.js"
import{o as B}from"./onlineDot-c976faff.js"
import{b as P}from"./batch-a68928f8.js"
import{i as W}from"./isChecked-75e8367b.js"
import{a as F}from"./alpha-7dc073eb.js"
import{c as G}from"./createTable-5f8e2bd3.js"
import"./dialogMsg-8c5a22d3.js"
import{a as D}from"./useItem-00e6e986.js"
import"./dialog-f9fad105.js"
import"./ajaxReturnCode-b9bc06f8.js"
import"./daUseItem-3fde36ea.js"
import{c as _}from"./createTr-ebe71d20.js"
import{e as q}from"./eventHandler5-35b55bc4.js"
import{s as J}from"./selfIdIs-b085da1e.js"
import{c as O}from"./createSelect-722a4f03.js"
import{g as Q}from"./getMembrList-bff94964.js"
import"./guildInventory-bbccbfe0.js"
import{a as U}from"./queue-eb07a828.js"
function Y(t){return t.match(/&id=(\d+)/)[1]}const z=`<span class="guildReportSpinner" style="background-image: url('${s}ui/misc/spinner.gif');"></span>`
function K(t){i('<span class="fastWorn">Worn</span>',t)}function V(t){return t.match(u)[1]}function X(t,n,e){1!==e.r&&("recall"===t?function(t){i('<span class="fastWorn">You successfully recalled the item</span>',t)}(n):K(n))}function Z(t,n,e,o){U(Y(n),V(n),e,o).then(a(X,o,t))}function tt(t,n,e){Z(t,n,e,"recall")}const nt=[["fast-bp",function(t,n){c("GuildReport","Fast BP"),tt(t,n,0)}],["fast-gs",function(t,n){c("GuildReport","Fast GS"),tt(t,n,1)}],["fast-wear",function(t,n){c("GuildReport","Fast Wear"),Number(V(n))===l()?D(Y(n)).then(a(K,t)):Z(t,n,0,"wear")}]]
const et=[["sendLink",function(t){const n=t.parentNode.parentNode
if(!n)return
const{href:e}=n.children[0]
e&&(nt.find(a(r,t))[1](n,e),i(z,n))}],["a-reply",function(t){window.openQuickMsgDialog(t.getAttribute("target_player"))}]]
const ot='<span class="sendLink fast-bp">Fast BP</span> | ',at='<span class="sendLink fast-gs">Fast GS</span>',rt=' | <span class="sendLink fast-wear">Fast Wear</span>'
let it,st,ct,ut,lt
const pt=[[!0,!0,function(){return ut||(ut=p({innerHTML:ot+at+rt})),ut.cloneNode(!0)}],[!0,!1,function(){return lt||(lt=p({innerHTML:at+rt})),lt.cloneNode(!0)}],[!1,!0,function(){return ct||(ct=p({innerHTML:ot+at})),ct.cloneNode(!0)}],[!1,!1,function(){return st||(st=p({innerHTML:at})),st.cloneNode(!0)}]]
function ft(t,n,e){return e[0]===t&&e[1]===n}function dt(t){const n=!(it||(it=new RegExp("<b>|Bottle|Brew|Draft|Elixir|Potion|Jagua Egg|Gut Rot Head Splitter|Serum")),it).test(t.previousElementSibling.innerHTML),e=2===t.children.length
return pt.find(a(ft,n,e))[2]()}function mt(t,n,e){return n[e]=t[e],n}function bt(t){return f(t).sort(F).reduce(a(mt,t),{})}let ht,gt,yt
function Mt(t,n,e,o){return"Ignore"!==t.myMap[o]&&(e[t.myMap[o]]?e[t.myMap[o]]+=n[o]:e[t.myMap[o]]=n[o]),e}function jt(t,n,e,o){return`${e}<tr><td>${o}</td><td style="background-color: ${function(t){const n=Math.max(Math.min(t,100),0)
let e,o
return n<50?(e=255,o=Math.round(5.1*n)):(o=255,e=Math.round(510-5.1*n)),"#"+("000000"+(65536*e+256*o+0).toString(16)).slice(-6)}((n[o]-t.minpoint)/(t.maxpoint-t.minpoint)*100)};">${n[o].toString()}</td></tr>`}function Lt(t,n){c("potReport","drawInventory")
const e=bt(f(n).reduce(a(Mt,t,n),{}))
i(`<table><tbody>${f(e).reduce(a(jt,t,e),"")}</tbody></table>`,ht)}function Ct(){const t=_()
return t.insertCell(-1),t.insertCell(-1),t}function $t(t){const n=b("option",e)
var e
return n.value=t,n.text=t,n}function xt(t,n){m(t,$t(n[0]))}function It(t){if(!yt){yt=Ct()
const n=function(t){const n=O({className:"tip-static",dataset:{tipped:'Set to "Ignore" to exclude from report'}})
return m(n,$t("Ignore")),t.forEach(a(xt,n)),n}(t)
m(yt.cells[1],n)}return yt.cloneNode(!0)}function kt(t,n,e,o){const a=It(o)
y(n[0],a.cells[0])
const r=a.cells[1].children[0];[r.name,r.value]=n,m(t.tBodies[0],a)}function vt(t,n,e){const o=E({id:n,type:"button",value:e})
m(t.cells[1],o)}function Ht(t){const n=Ct()
return vt(n,"fshIgnoreAll","Ignore All"),M(n.cells[1],"&nbsp;"),vt(n,"fshReset","Reset"),m(t.tBodies[0],n),0}function Nt(t){c("potReport","drawMapping")
const n=G({innerHTML:"<tbody></tbody>"})
gt.replaceChild(n,gt.children[0]),h(3,P,[[5,3,g(t.myMap),0,a(kt,n),a(Ht,n)]])}const Rt="fsh_potMap",Tt={pottab1:!1,pottab2:!1,pottab3:!1,myMap:{},minpoint:12,maxpoint:20}
function St(t,n){t.myMap[n]||(t.myMap[n]=n)}function wt(t,n,e){"SELECT"===e.target.tagName&&(t.myMap[e.target.name]=e.target.value,$(Rt,t),Lt(t,n))}function Et(t,n,e){return n[e]=t?"Ignore":e,n}function At(t,n,e){!function(t,n,e){t.myMap=f(n).reduce(a(Et,e),{})}(t,n,e),$(Rt,t),Nt(t),Lt(t,n)}function Bt(t){return/^pottab\d$/.test(t.id)}function Pt(t,n){t[n.id]=n.checked,$(Rt,t)}function Wt(t,n,e){const o=e.target.id,a=A(e.target.value,0,999)
a&&(t[o]=a,$(Rt,t),Lt(t,n))}function Ft(n,e,o){x(o,"change",a(wt,n,e)),t(o,q(function(t,n){return[[J("fshIgnoreAll"),a(At,t,n,!0)],[J("fshReset"),a(At,t,n,null)],[Bt,a(Pt,t)]]}(n,e))),x(o,"input",a(Wt,n,e))}function Gt(t,n){const e=function(t){return p({id:"potReport",innerHTML:`<input id="pottab1" type="checkbox"${W(t.pottab1)}><label for="pottab1">Composed Potion Inventory</label><input id="pottab2" type="checkbox"${W(t.pottab2)}><label for="pottab2">Mapping</label><input id="pottab3" type="checkbox"${W(t.pottab3)}><label for="pottab3">Thresholds</label>`})}(t),r=p({id:"panels"})
m(e,r),function(t,n,e){ht=p({id:"inventory"}),t.pottab1?Lt(t,n):d(e.parentNode.children[0],"change",a(Lt,t,n)),m(e,ht)}(t,n,r),function(t,n){gt=p({id:"mapping",innerHTML:"<p></p>"}),t.pottab2?Nt(t):d(n.parentNode.children[2],"change",a(Nt,t)),m(n,gt)}(t,r),function(t,n){const e=p({id:"thresholds",innerHTML:`Min:<input id="minpoint" type="number" value="${t.minpoint}" min="0" max="999">Max:<input id="maxpoint" type="number" value="${t.maxpoint}" min="0" max="999">`})
m(n,e)}(t,r),m(function(t,n){const e=o.lastElementChild.insertRow(2).insertCell(-1)
return Ft(t,n,e),e}(t,n),e)}function Dt(t,n){const e=L({},Tt)
L(e,C(n,{})),e.myMap=function(t,n){return f(n).forEach(a(St,t)),bt(t.myMap)}(e,t),$(Rt,e),Gt(e,t)}function _t(t){j(Rt).then(a(Dt,t))}let qt,Jt,Ot,Qt,Ut
function Yt(t,n){const e=Jt[n]
m(e,t)}function zt(t){qt.push(dt(t)),function(t){if(t.endsWith(" (Potion)")){const n=t.slice(0,-9)
Ot[n]=(Ot[n]||0)+1}}(t.previousElementSibling.innerHTML)}function Kt(){P([5,3,qt,0,Yt,a(_t,Ot)])}function Vt(){Jt=I("#pCC table table tr:not(.fshHide) td:nth-of-type(3n)"),Ot={},qt=[],P([5,3,Jt,0,zt,Kt])}function Xt(t){const n=k(t)
v.membrList[n]&&i(function(t){return`${B({last_login:v.membrList[t].last_login})}<a href="${H}${v.membrList[t].id}">${t}</a> [ <span class="a-reply fshLink" target_player=${t}>m</span> ]`}(n),t)}function Zt(){const t=I('#pCC table table tr:not(.fshHide) td[bgcolor="#DAA534"][colspan="2"] b')
P([5,3,t,0,Xt])}function tn(t){t.children[0].hasAttribute("bgcolor")&&(Ut=S(Qt,t.children[0].children[0])),Ut||(t.className="fshHide")}function nn(){if(Qt=N("user"),!Qt)return
if(!R('#pCC table table td[bgcolor="#DAA534"] b').some(T(Qt)))return
const t=I("#pCC table table tr")
P([5,2,t,0,tn])}function en(){h(3,Zt)}export default function(){w()||(Q(!1).then(en),h(2,nn),h(3,Vt),t(e("table",o)[1],n(et)))}
//# sourceMappingURL=guildReport-a6bbf072.js.map
