import{o as t,bQ as n,b as e,p as o,t as a,c0 as r,A as i,aD as s,U as c,bb as u,b2 as p,m as l,aq as f,O as d,h as m,n as b,a as g,e as h,z as y,i as M,q as j,a2 as L,f as x,a9 as C,B as I,c as $,a1 as v,P as H,D as N,b1 as R,b5 as T,x as k}from"./calfSystem-89b939c8.js"
import"./numberIsNaN-913aebac.js"
import"./toLowerCase-5d1ed3f8.js"
import{c as S}from"./createInput-efc68c10.js"
import{t as w}from"./testRange-0e5174be.js"
import{o as A}from"./onlineDot-3ced5a13.js"
import{b as E}from"./batch-e839e453.js"
import"./currentGuildId-ae8f3699.js"
import{g as D,s as B}from"./idb-9be3057e.js"
import{i as G}from"./isChecked-3ea89984.js"
import{a as F}from"./alpha-823633da.js"
import{c as P}from"./createTable-fd00f6db.js"
import"./dialogMsg-d061ece2.js"
import"./errorDialog-28ee21dd.js"
import"./indexAjaxJson-dab169e3.js"
import"./cmdExport-788e7045.js"
import"./daUseItem-8aa44a50.js"
import{e as W}from"./eventHandler5-f37cd843.js"
import{s as _}from"./selfIdIs-dafb02a3.js"
import"./dialog-7eea8a00.js"
import{e as q}from"./useItem-e911a362.js"
import"./guild-9c2b49e2.js"
import{c as J}from"./createSelect-14b7b2e6.js"
import{g as Q}from"./getMembrList-2a0664e8.js"
import{a as U}from"./queue-1d5f331b.js"
import"./guildInventory-8b9578c9.js"
import{c as z}from"./createTr-b71fd75f.js"
function O(t){return t.match(/&id=(\d+)/)[1]}const Y=`<span class="guildReportSpinner" style="background-image: url('${s}ui/misc/spinner.gif');"></span>`
function K(t){i('<span class="fastWorn">Worn</span>',t)}function V(t){return t.match(u)[1]}function X(t,n,e){1!==e.r&&("recall"===t?function(t){i('<span class="fastWorn">You successfully recalled the item</span>',t)}(n):K(n))}function Z(t,n,e,o){U(O(n),V(n),e,o).then(a(X,o,t))}function tt(t,n,e){Z(t,n,e,"recall")}const nt=[["fast-bp",function(t,n){c("GuildReport","Fast BP"),tt(t,n,0)}],["fast-gs",function(t,n){c("GuildReport","Fast GS"),tt(t,n,1)}],["fast-wear",function(t,n){c("GuildReport","Fast Wear"),Number(V(n))===p()?q(O(n)).then(a(K,t)):Z(t,n,0,"wear")}]]
const et=[["sendLink",function(t){const n=t.parentNode.parentNode
if(!n)return
const{href:e}=n.children[0]
e&&(nt.find(a(r,t))[1](n,e),i(Y,n))}],["a-reply",function(t){window.openQuickMsgDialog(t.getAttribute("target_player"))}]]
const ot='<span class="sendLink fast-bp">Fast BP</span> | ',at='<span class="sendLink fast-gs">Fast GS</span>',rt=' | <span class="sendLink fast-wear">Fast Wear</span>'
let it,st,ct,ut,pt
const lt=[[!0,!0,function(){return ut||(ut=l({innerHTML:ot+at+rt})),ut.cloneNode(!0)}],[!0,!1,function(){return pt||(pt=l({innerHTML:at+rt})),pt.cloneNode(!0)}],[!1,!0,function(){return ct||(ct=l({innerHTML:ot+at})),ct.cloneNode(!0)}],[!1,!1,function(){return st||(st=l({innerHTML:at})),st.cloneNode(!0)}]]
function ft(t,n,e){return e[0]===t&&e[1]===n}function dt(t){const n=!(it||(it=new RegExp("<b>|Bottle|Brew|Draft|Elixir|Potion|Jagua Egg|Gut Rot Head Splitter|Serum")),it).test(t.previousElementSibling.innerHTML),e=2===t.children.length
return lt.find(a(ft,n,e))[2]()}function mt(t,n,e){return n[e]=t[e],n}function bt(t){return f(t).sort(F).reduce(a(mt,t),{})}let gt,ht,yt
function Mt(t,n,e,o){return"Ignore"!==t.myMap[o]&&(e[t.myMap[o]]?e[t.myMap[o]]+=n[o]:e[t.myMap[o]]=n[o]),e}function jt(t,n,e,o){return`${e}<tr><td>${o}</td><td style="background-color: ${function(t){const n=Math.max(Math.min(t,100),0)
let e,o
return n<50?(e=255,o=Math.round(5.1*n)):(o=255,e=Math.round(510-5.1*n)),"#"+("000000"+(65536*e+256*o+0).toString(16)).slice(-6)}((n[o]-t.minpoint)/(t.maxpoint-t.minpoint)*100)};">${n[o].toString()}</td></tr>`}function Lt(t,n){c("potReport","drawInventory")
const e=bt(f(n).reduce(a(Mt,t,n),{}))
i(`<table><tbody>${f(e).reduce(a(jt,t,e),"")}</tbody></table>`,gt)}function xt(){const t=z()
return t.insertCell(-1),t.insertCell(-1),t}function Ct(t){const n=b("option",e)
var e
return n.value=t,n.text=t,n}function It(t,n){m(t,Ct(n[0]))}function $t(t){if(!yt){yt=xt()
const n=function(t){const n=J({className:"tip-static",dataset:{tipped:'Set to "Ignore" to exclude from report'}})
return m(n,Ct("Ignore")),t.forEach(a(It,n)),n}(t)
m(yt.cells[1],n)}return yt.cloneNode(!0)}function vt(t,n,e,o){const a=$t(o)
y(n[0],a.cells[0])
const r=a.cells[1].children[0];[r.name,r.value]=n,m(t.tBodies[0],a)}function Ht(t,n,e){const o=S({id:n,type:"button",value:e})
m(t.cells[1],o)}function Nt(t){const n=xt()
return Ht(n,"fshIgnoreAll","Ignore All"),M(n.cells[1],"&nbsp;"),Ht(n,"fshReset","Reset"),m(t.tBodies[0],n),0}function Rt(t){c("potReport","drawMapping")
const n=P({innerHTML:"<tbody></tbody>"})
ht.replaceChild(n,ht.children[0]),g(3,E,[[5,3,h(t.myMap),0,a(vt,n),a(Nt,n)]])}const Tt="fsh_potMap",kt={pottab1:!1,pottab2:!1,pottab3:!1,myMap:{},minpoint:12,maxpoint:20}
function St(t,n){t.myMap[n]||(t.myMap[n]=n)}function wt(t,n,e){"SELECT"===e.target.tagName&&(t.myMap[e.target.name]=e.target.value,B(Tt,t),Lt(t,n))}function At(t,n,e){return n[e]=t?"Ignore":e,n}function Et(t,n,e){!function(t,n,e){t.myMap=f(n).reduce(a(At,e),{})}(t,n,e),B(Tt,t),Rt(t),Lt(t,n)}function Dt(t){return/^pottab\d$/.test(t.id)}function Bt(t,n){t[n.id]=n.checked,B(Tt,t)}function Gt(t,n,e){const o=e.target.id,a=w(e.target.value,0,999)
a&&(t[o]=a,B(Tt,t),Lt(t,n))}function Ft(n,e,o){x(o,"change",a(wt,n,e)),t(o,W(function(t,n){return[[_("fshIgnoreAll"),a(Et,t,n,!0)],[_("fshReset"),a(Et,t,n,null)],[Dt,a(Bt,t)]]}(n,e))),x(o,"input",a(Gt,n,e))}function Pt(t,n){const e=function(t){return l({id:"potReport",innerHTML:`<input id="pottab1" type="checkbox"${G(t.pottab1)}><label for="pottab1">Composed Potion Inventory</label><input id="pottab2" type="checkbox"${G(t.pottab2)}><label for="pottab2">Mapping</label><input id="pottab3" type="checkbox"${G(t.pottab3)}><label for="pottab3">Thresholds</label>`})}(t),r=l({id:"panels"})
m(e,r),function(t,n,e){gt=l({id:"inventory"}),t.pottab1?Lt(t,n):d(e.parentNode.children[0],"change",a(Lt,t,n)),m(e,gt)}(t,n,r),function(t,n){ht=l({id:"mapping",innerHTML:"<p></p>"}),t.pottab2?Rt(t):d(n.parentNode.children[2],"change",a(Rt,t)),m(n,ht)}(t,r),function(t,n){const e=l({id:"thresholds",innerHTML:`Min:<input id="minpoint" type="number" value="${t.minpoint}" min="0" max="999">Max:<input id="maxpoint" type="number" value="${t.maxpoint}" min="0" max="999">`})
m(n,e)}(t,r),m(function(t,n){const e=o.lastElementChild.insertRow(2).insertCell(-1)
return Ft(t,n,e),e}(t,n),e)}function Wt(t,n){const e=j({},kt)
j(e,L(n,{})),e.myMap=function(t,n){return f(n).forEach(a(St,t)),bt(t.myMap)}(e,t),B(Tt,e),Pt(e,t)}function _t(t){D(Tt).then(a(Wt,t))}let qt,Jt,Qt,Ut,zt
function Ot(t,n){const e=Jt[n]
m(e,t)}function Yt(t){qt.push(dt(t)),function(t){if(t.endsWith(" (Potion)")){const n=t.slice(0,-9)
Qt[n]=(Qt[n]||0)+1}}(t.previousElementSibling.innerHTML)}function Kt(){E([5,3,qt,0,Ot,a(_t,Qt)])}function Vt(){Jt=C("#pCC table table tr:not(.fshHide) td:nth-of-type(3n)"),Qt={},qt=[],E([5,3,Jt,0,Yt,Kt])}function Xt(t){const n=I(t)
$.membrList[n]&&i(function(t){return`${A({last_login:$.membrList[t].last_login})}<a href="${v}${$.membrList[t].id}">${t}</a> [ <span class="a-reply fshLink" target_player=${t}>m</span> ]`}(n),t)}function Zt(){const t=C('#pCC table table tr:not(.fshHide) td[bgcolor="#DAA534"][colspan="2"] b')
E([5,3,t,0,Xt])}function tn(t){t.children[0].hasAttribute("bgcolor")&&(zt=T(Ut,t.children[0].children[0])),zt||(t.className="fshHide")}function nn(){if(Ut=H("user"),!Ut)return
if(!N('#pCC table table td[bgcolor="#DAA534"] b').some(R(Ut)))return
const t=C("#pCC table table tr")
E([5,2,t,0,tn])}function en(){g(3,Zt)}export default function(){k()||(Q(!1).then(en),g(2,nn),g(3,Vt),t(e("table",o)[1],n(et)))}
//# sourceMappingURL=guildReport-6261e473.js.map
