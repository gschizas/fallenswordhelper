import{o as t,bR as n,b as e,p as o,t as a,c2 as r,A as i,aH as s,V as c,bg as u,b7 as p,l,au as f,O as d,f as m,n as b,a as g,m as h,z as y,i as M,q as j,a3 as x,e as L,ab as C,B as I,c as $,a2 as H,Q as R,D as v,a4 as N,ba as T,x as k}from"./calfSystem-a2862afc.js"
import"./numberIsNaN-77d06981.js"
import"./toLowerCase-2574a84c.js"
import{c as S}from"./createInput-457456bb.js"
import{t as w}from"./testRange-1fc78f3c.js"
import{o as A}from"./onlineDot-003f5d07.js"
import{b as E}from"./batch-1aa805d3.js"
import"./currentGuildId-e84c528e.js"
import{g as B,s as D}from"./idb-911ff7c2.js"
import{i as G}from"./isChecked-e0d689b2.js"
import{a as F}from"./alpha-557396ad.js"
import{c as W}from"./createTable-6dbc7d62.js"
import"./dialogMsg-98e801f7.js"
import"./ajaxReturnCode-f0b1c41c.js"
import{c as P}from"./createTr-885e990c.js"
import"./dialog-65e58e09.js"
import"./indexAjaxJson-afc1ac85.js"
import{e as _}from"./eventHandler5-0d938057.js"
import"./cmdExport-356fd6f3.js"
import{s as q}from"./selfIdIs-7f51e683.js"
import"./errorDialog-a4de6042.js"
import"./daUseItem-10f8bb4a.js"
import{e as J}from"./useItem-8cd86b52.js"
import"./guild-4a5b1ef9.js"
import{c as Q}from"./createSelect-18786606.js"
import{g as z}from"./getMembrList-daab7ad2.js"
import"./guildInventory-c6d707d4.js"
import{a as O}from"./queue-6b6e8b79.js"
function U(t){return t.match(/&id=(\d+)/)[1]}const V=`<span class="guildReportSpinner" style="background-image: url('${s}ui/misc/spinner.gif');"></span>`
function Y(t){i('<span class="fastWorn">Worn</span>',t)}function K(t){return t.match(u)[1]}function X(t,n,e){1!==e.r&&("recall"===t?function(t){i('<span class="fastWorn">You successfully recalled the item</span>',t)}(n):Y(n))}function Z(t,n,e,o){O(U(n),K(n),e,o).then(a(X,o,t))}function tt(t,n,e){Z(t,n,e,"recall")}const nt=[["fast-bp",function(t,n){c("GuildReport","Fast BP"),tt(t,n,0)}],["fast-gs",function(t,n){c("GuildReport","Fast GS"),tt(t,n,1)}],["fast-wear",function(t,n){c("GuildReport","Fast Wear"),Number(K(n))===p()?J(U(n)).then(a(Y,t)):Z(t,n,0,"wear")}]]
const et=[["sendLink",function(t){const n=t.parentNode.parentNode
if(!n)return
const{href:e}=n.children[0]
e&&(nt.find(a(r,t))[1](n,e),i(V,n))}],["a-reply",function(t){window.openQuickMsgDialog(t.getAttribute("target_player"))}]]
const ot='<span class="sendLink fast-bp">Fast BP</span> | ',at='<span class="sendLink fast-gs">Fast GS</span>',rt=' | <span class="sendLink fast-wear">Fast Wear</span>'
let it,st,ct,ut,pt
const lt=[[!0,!0,function(){return ut||(ut=l({innerHTML:ot+at+rt})),ut.cloneNode(!0)}],[!0,!1,function(){return pt||(pt=l({innerHTML:at+rt})),pt.cloneNode(!0)}],[!1,!0,function(){return ct||(ct=l({innerHTML:ot+at})),ct.cloneNode(!0)}],[!1,!1,function(){return st||(st=l({innerHTML:at})),st.cloneNode(!0)}]]
function ft(t,n,e){return e[0]===t&&e[1]===n}function dt(t){const n=!(it||(it=new RegExp("<b>|Bottle|Brew|Draft|Elixir|Potion|Jagua Egg|Gut Rot Head Splitter|Serum")),it).test(t.previousElementSibling.innerHTML),e=2===t.children.length
return lt.find(a(ft,n,e))[2]()}function mt(t,n,e){return n[e]=t[e],n}function bt(t){return f(t).sort(F).reduce(a(mt,t),{})}let gt,ht,yt
function Mt(t,n,e,o){return"Ignore"!==t.myMap[o]&&(e[t.myMap[o]]?e[t.myMap[o]]+=n[o]:e[t.myMap[o]]=n[o]),e}function jt(t,n,e,o){return`${e}<tr><td>${o}</td><td style="background-color: ${function(t){const n=Math.max(Math.min(t,100),0)
let e,o
return n<50?(e=255,o=Math.round(5.1*n)):(o=255,e=Math.round(510-5.1*n)),"#"+("000000"+(65536*e+256*o+0).toString(16)).slice(-6)}((n[o]-t.minpoint)/(t.maxpoint-t.minpoint)*100)};">${n[o].toString()}</td></tr>`}function xt(t,n){c("potReport","drawInventory")
const e=bt(f(n).reduce(a(Mt,t,n),{}))
i(`<table><tbody>${f(e).reduce(a(jt,t,e),"")}</tbody></table>`,gt)}function Lt(){const t=P()
return t.insertCell(-1),t.insertCell(-1),t}function Ct(t){const n=b("option",e)
var e
return n.value=t,n.text=t,n}function It(t,n){m(t,Ct(n[0]))}function $t(t){if(!yt){yt=Lt()
const n=function(t){const n=Q({className:"tip-static",dataset:{tipped:'Set to "Ignore" to exclude from report'}})
return m(n,Ct("Ignore")),t.forEach(a(It,n)),n}(t)
m(yt.cells[1],n)}return yt.cloneNode(!0)}function Ht(t,n,e,o){const a=$t(o)
y(n[0],a.cells[0])
const r=a.cells[1].children[0];[r.name,r.value]=n,m(t.tBodies[0],a)}function Rt(t,n,e){const o=S({id:n,type:"button",value:e})
m(t.cells[1],o)}function vt(t){const n=Lt()
return Rt(n,"fshIgnoreAll","Ignore All"),M(n.cells[1],"&nbsp;"),Rt(n,"fshReset","Reset"),m(t.tBodies[0],n),0}function Nt(t){c("potReport","drawMapping")
const n=W({innerHTML:"<tbody></tbody>"})
ht.replaceChild(n,ht.children[0]),g(3,E,[[5,3,h(t.myMap),0,a(Ht,n),a(vt,n)]])}const Tt="fsh_potMap",kt={pottab1:!1,pottab2:!1,pottab3:!1,myMap:{},minpoint:12,maxpoint:20}
function St(t,n){t.myMap[n]||(t.myMap[n]=n)}function wt(t,n,e){"SELECT"===e.target.tagName&&(t.myMap[e.target.name]=e.target.value,D(Tt,t),xt(t,n))}function At(t,n,e){return n[e]=t?"Ignore":e,n}function Et(t,n,e){!function(t,n,e){t.myMap=f(n).reduce(a(At,e),{})}(t,n,e),D(Tt,t),Nt(t),xt(t,n)}function Bt(t){return/^pottab\d$/.test(t.id)}function Dt(t,n){t[n.id]=n.checked,D(Tt,t)}function Gt(t,n,e){const o=e.target.id,a=w(e.target.value,0,999)
a&&(t[o]=a,D(Tt,t),xt(t,n))}function Ft(n,e,o){L(o,"change",a(wt,n,e)),t(o,_(function(t,n){return[[q("fshIgnoreAll"),a(Et,t,n,!0)],[q("fshReset"),a(Et,t,n,null)],[Bt,a(Dt,t)]]}(n,e))),L(o,"input",a(Gt,n,e))}function Wt(t,n){const e=function(t){return l({id:"potReport",innerHTML:`<input id="pottab1" type="checkbox"${G(t.pottab1)}><label for="pottab1">Composed Potion Inventory</label><input id="pottab2" type="checkbox"${G(t.pottab2)}><label for="pottab2">Mapping</label><input id="pottab3" type="checkbox"${G(t.pottab3)}><label for="pottab3">Thresholds</label>`})}(t),r=l({id:"panels"})
m(e,r),function(t,n,e){gt=l({id:"inventory"}),t.pottab1?xt(t,n):d(e.parentNode.children[0],"change",a(xt,t,n)),m(e,gt)}(t,n,r),function(t,n){ht=l({id:"mapping",innerHTML:"<p></p>"}),t.pottab2?Nt(t):d(n.parentNode.children[2],"change",a(Nt,t)),m(n,ht)}(t,r),function(t,n){const e=l({id:"thresholds",innerHTML:`Min:<input id="minpoint" type="number" value="${t.minpoint}" min="0" max="999">Max:<input id="maxpoint" type="number" value="${t.maxpoint}" min="0" max="999">`})
m(n,e)}(t,r),m(function(t,n){const e=o.lastElementChild.insertRow(2).insertCell(-1)
return Ft(t,n,e),e}(t,n),e)}function Pt(t,n){const e=j({},kt)
j(e,x(n,{})),e.myMap=function(t,n){return f(n).forEach(a(St,t)),bt(t.myMap)}(e,t),D(Tt,e),Wt(e,t)}function _t(t){B(Tt).then(a(Pt,t))}let qt,Jt,Qt,zt,Ot
function Ut(t,n){const e=Jt[n]
m(e,t)}function Vt(t){qt.push(dt(t)),function(t){if(t.endsWith(" (Potion)")){const n=t.slice(0,-9)
Qt[n]=(Qt[n]||0)+1}}(t.previousElementSibling.innerHTML)}function Yt(){E([5,3,qt,0,Ut,a(_t,Qt)])}function Kt(){Jt=C("#pCC table table tr:not(.fshHide) td:nth-of-type(3n)"),Qt={},qt=[],E([5,3,Jt,0,Vt,Yt])}function Xt(t){const n=I(t)
$.membrList[n]&&i(function(t){return`${A({last_login:$.membrList[t].last_login})}<a href="${H}${$.membrList[t].id}">${t}</a> [ <span class="a-reply fshLink" target_player=${t}>m</span> ]`}(n),t)}function Zt(){const t=C('#pCC table table tr:not(.fshHide) td[bgcolor="#DAA534"][colspan="2"] b')
E([5,3,t,0,Xt])}function tn(t){t.children[0].hasAttribute("bgcolor")&&(Ot=T(zt,t.children[0].children[0])),Ot||(t.className="fshHide")}function nn(){if(zt=R("user"),!zt)return
if(!v('#pCC table table td[bgcolor="#DAA534"] b').some(N(zt)))return
const t=C("#pCC table table tr")
E([5,2,t,0,tn])}function en(){g(3,Zt)}export default function(){k()||(z(!1).then(en),g(2,nn),g(3,Kt),t(e("table",o)[1],n(et)))}
//# sourceMappingURL=guildReport-cb2f8e24.js.map
