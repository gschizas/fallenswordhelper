import{o as t,bS as n,b as e,p as o,t as a,c2 as r,A as i,aH as s,V as c,bg as u,b7 as p,m as l,au as f,O as d,h as m,n as b,a as g,e as h,z as y,i as M,q as j,a3 as L,f as x,ab as C,B as I,c as $,a2 as H,Q as v,D as N,a4 as R,ba as S,x as T}from"./calfSystem-9c7241dc.js"
import"./numberIsNaN-7270cc8c.js"
import"./toLowerCase-9b533dae.js"
import{c as k}from"./createInput-6e753077.js"
import{t as w}from"./testRange-6b7745bd.js"
import{o as A}from"./onlineDot-4bf0b1ba.js"
import{b as E}from"./batch-2ee31e9e.js"
import"./currentGuildId-00053b50.js"
import{g as B,s as D}from"./idb-5f8a9591.js"
import{i as G}from"./isChecked-6dfc89f5.js"
import{a as F}from"./alpha-21b3b885.js"
import{c as W}from"./createTable-711dc1b7.js"
import"./dialogMsg-b559bd6b.js"
import"./errorDialog-48c0f67b.js"
import"./indexAjaxJson-82fdd15d.js"
import"./cmdExport-cec76f08.js"
import"./daUseItem-d9050f10.js"
import{e as P}from"./eventHandler5-6f9d400f.js"
import{s as _}from"./selfIdIs-7002309a.js"
import"./dialog-be45be25.js"
import{e as q}from"./useItem-6b26d1e2.js"
import"./guild-92790ca6.js"
import{c as J}from"./createSelect-2095351f.js"
import{g as Q}from"./getMembrList-885dcf81.js"
import{a as z}from"./queue-fda29eb1.js"
import"./guildInventory-56728670.js"
import{c as O}from"./createTr-cb258b3f.js"
function U(t){return t.match(/&id=(\d+)/)[1]}const V=`<span class="guildReportSpinner" style="background-image: url('${s}ui/misc/spinner.gif');"></span>`
function Y(t){i('<span class="fastWorn">Worn</span>',t)}function K(t){return t.match(u)[1]}function X(t,n,e){1!==e.r&&("recall"===t?function(t){i('<span class="fastWorn">You successfully recalled the item</span>',t)}(n):Y(n))}function Z(t,n,e,o){z(U(n),K(n),e,o).then(a(X,o,t))}function tt(t,n,e){Z(t,n,e,"recall")}const nt=[["fast-bp",function(t,n){c("GuildReport","Fast BP"),tt(t,n,0)}],["fast-gs",function(t,n){c("GuildReport","Fast GS"),tt(t,n,1)}],["fast-wear",function(t,n){c("GuildReport","Fast Wear"),Number(K(n))===p()?q(U(n)).then(a(Y,t)):Z(t,n,0,"wear")}]]
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
return n<50?(e=255,o=Math.round(5.1*n)):(o=255,e=Math.round(510-5.1*n)),"#"+("000000"+(65536*e+256*o+0).toString(16)).slice(-6)}((n[o]-t.minpoint)/(t.maxpoint-t.minpoint)*100)};">${n[o].toString()}</td></tr>`}function Lt(t,n){c("potReport","drawInventory")
const e=bt(f(n).reduce(a(Mt,t,n),{}))
i(`<table><tbody>${f(e).reduce(a(jt,t,e),"")}</tbody></table>`,gt)}function xt(){const t=O()
return t.insertCell(-1),t.insertCell(-1),t}function Ct(t){const n=b("option",e)
var e
return n.value=t,n.text=t,n}function It(t,n){m(t,Ct(n[0]))}function $t(t){if(!yt){yt=xt()
const n=function(t){const n=J({className:"tip-static",dataset:{tipped:'Set to "Ignore" to exclude from report'}})
return m(n,Ct("Ignore")),t.forEach(a(It,n)),n}(t)
m(yt.cells[1],n)}return yt.cloneNode(!0)}function Ht(t,n,e,o){const a=$t(o)
y(n[0],a.cells[0])
const r=a.cells[1].children[0];[r.name,r.value]=n,m(t.tBodies[0],a)}function vt(t,n,e){const o=k({id:n,type:"button",value:e})
m(t.cells[1],o)}function Nt(t){const n=xt()
return vt(n,"fshIgnoreAll","Ignore All"),M(n.cells[1],"&nbsp;"),vt(n,"fshReset","Reset"),m(t.tBodies[0],n),0}function Rt(t){c("potReport","drawMapping")
const n=W({innerHTML:"<tbody></tbody>"})
ht.replaceChild(n,ht.children[0]),g(3,E,[[5,3,h(t.myMap),0,a(Ht,n),a(Nt,n)]])}const St="fsh_potMap",Tt={pottab1:!1,pottab2:!1,pottab3:!1,myMap:{},minpoint:12,maxpoint:20}
function kt(t,n){t.myMap[n]||(t.myMap[n]=n)}function wt(t,n,e){"SELECT"===e.target.tagName&&(t.myMap[e.target.name]=e.target.value,D(St,t),Lt(t,n))}function At(t,n,e){return n[e]=t?"Ignore":e,n}function Et(t,n,e){!function(t,n,e){t.myMap=f(n).reduce(a(At,e),{})}(t,n,e),D(St,t),Rt(t),Lt(t,n)}function Bt(t){return/^pottab\d$/.test(t.id)}function Dt(t,n){t[n.id]=n.checked,D(St,t)}function Gt(t,n,e){const o=e.target.id,a=w(e.target.value,0,999)
a&&(t[o]=a,D(St,t),Lt(t,n))}function Ft(n,e,o){x(o,"change",a(wt,n,e)),t(o,P(function(t,n){return[[_("fshIgnoreAll"),a(Et,t,n,!0)],[_("fshReset"),a(Et,t,n,null)],[Bt,a(Dt,t)]]}(n,e))),x(o,"input",a(Gt,n,e))}function Wt(t,n){const e=function(t){return l({id:"potReport",innerHTML:`<input id="pottab1" type="checkbox"${G(t.pottab1)}><label for="pottab1">Composed Potion Inventory</label><input id="pottab2" type="checkbox"${G(t.pottab2)}><label for="pottab2">Mapping</label><input id="pottab3" type="checkbox"${G(t.pottab3)}><label for="pottab3">Thresholds</label>`})}(t),r=l({id:"panels"})
m(e,r),function(t,n,e){gt=l({id:"inventory"}),t.pottab1?Lt(t,n):d(e.parentNode.children[0],"change",a(Lt,t,n)),m(e,gt)}(t,n,r),function(t,n){ht=l({id:"mapping",innerHTML:"<p></p>"}),t.pottab2?Rt(t):d(n.parentNode.children[2],"change",a(Rt,t)),m(n,ht)}(t,r),function(t,n){const e=l({id:"thresholds",innerHTML:`Min:<input id="minpoint" type="number" value="${t.minpoint}" min="0" max="999">Max:<input id="maxpoint" type="number" value="${t.maxpoint}" min="0" max="999">`})
m(n,e)}(t,r),m(function(t,n){const e=o.lastElementChild.insertRow(2).insertCell(-1)
return Ft(t,n,e),e}(t,n),e)}function Pt(t,n){const e=j({},Tt)
j(e,L(n,{})),e.myMap=function(t,n){return f(n).forEach(a(kt,t)),bt(t.myMap)}(e,t),D(St,e),Wt(e,t)}function _t(t){B(St).then(a(Pt,t))}let qt,Jt,Qt,zt,Ot
function Ut(t,n){const e=Jt[n]
m(e,t)}function Vt(t){qt.push(dt(t)),function(t){if(t.endsWith(" (Potion)")){const n=t.slice(0,-9)
Qt[n]=(Qt[n]||0)+1}}(t.previousElementSibling.innerHTML)}function Yt(){E([5,3,qt,0,Ut,a(_t,Qt)])}function Kt(){Jt=C("#pCC table table tr:not(.fshHide) td:nth-of-type(3n)"),Qt={},qt=[],E([5,3,Jt,0,Vt,Yt])}function Xt(t){const n=I(t)
$.membrList[n]&&i(function(t){return`${A({last_login:$.membrList[t].last_login})}<a href="${H}${$.membrList[t].id}">${t}</a> [ <span class="a-reply fshLink" target_player=${t}>m</span> ]`}(n),t)}function Zt(){const t=C('#pCC table table tr:not(.fshHide) td[bgcolor="#DAA534"][colspan="2"] b')
E([5,3,t,0,Xt])}function tn(t){t.children[0].hasAttribute("bgcolor")&&(Ot=S(zt,t.children[0].children[0])),Ot||(t.className="fshHide")}function nn(){if(zt=v("user"),!zt)return
if(!N('#pCC table table td[bgcolor="#DAA534"] b').some(R(zt)))return
const t=C("#pCC table table tr")
E([5,2,t,0,tn])}function en(){g(3,Zt)}export default function(){T()||(Q(!1).then(en),g(2,nn),g(3,Kt),t(e("table",o)[1],n(et)))}
//# sourceMappingURL=guildReport-0ff2c33c.js.map
