import{o as t,bP as n,b as e,p as o,t as a,c0 as r,A as i,ak as s,V as c,c1 as p,aA as u,m as l,aU as f,O as d,h as m,n as b,f as g,a as h,e as y,z as M,i as j,q as x,a3 as L,aa as $,B as C,c as v,a2 as I,R as N,D as H,ax as R,aF as T,x as k}from"./calfSystem-393ab895.js"
import{e as S}from"./useItem-7ed14570.js"
import{a as w}from"./queue-d672397c.js"
import{g as E}from"./getMembrList-32a78217.js"
import{b as A}from"./batch-28b89a64.js"
import{e as B}from"./eventHandler5-a2b2bc41.js"
import{i as D}from"./isChecked-1c18cd61.js"
import{s as F}from"./selfIdIs-fd8b3a9a.js"
import{a as G}from"./alpha-80a926ba.js"
import{t as P}from"./testRange-1fdfe636.js"
import{c as W}from"./createInput-f7e07c00.js"
import{c as _}from"./createSelect-586b1e3a.js"
import{c as q}from"./createTable-aae48322.js"
import{c as J}from"./createTr-3445c81f.js"
import{g as U,s as z}from"./idb-46b78b1e.js"
import{o as O}from"./onlineDot-9b46cf0c.js"
import"./dialog-d161529e.js"
import"./dialogMsg-844edf4e.js"
import"./indexAjaxJson-f78a3fe6.js"
import"./daUseItem-796c6f75.js"
import"./errorDialog-9d880b0d.js"
import"./guildInventory-0f776cc2.js"
import"./guild-f28a431e.js"
import"./currentGuildId-469c60c3.js"
import"./cmdExport-ef0399c5.js"
import"./toLowerCase-51740687.js"
import"./numberIsNaN-53300e34.js"
function Q(t){return t.match(/&id=(\d+)/)[1]}const V=`<span class="guildReportSpinner" style="background-image: url('${s}ui/misc/spinner.gif');"></span>`
function Y(t){i('<span class="fastWorn">Worn</span>',t)}function K(t){return t.match(p)[1]}function X(t,n,e){1!==e.r&&("recall"===t?function(t){i('<span class="fastWorn">You successfully recalled the item</span>',t)}(n):Y(n))}function Z(t,n,e,o){w(Q(n),K(n),e,o).then(a(X,o,t))}function tt(t,n,e){Z(t,n,e,"recall")}const nt=[["fast-bp",function(t,n){c("GuildReport","Fast BP"),tt(t,n,0)}],["fast-gs",function(t,n){c("GuildReport","Fast GS"),tt(t,n,1)}],["fast-wear",function(t,n){c("GuildReport","Fast Wear"),Number(K(n))===u()?S(Q(n)).then(a(Y,t)):Z(t,n,0,"wear")}]]
const et=[["sendLink",function(t){const n=t.parentNode.parentNode
if(!n)return
const{href:e}=n.children[0]
e&&(nt.find(a(r,t))[1](n,e),i(V,n))}],["a-reply",function(t){window.openQuickMsgDialog(t.getAttribute("target_player"))}]]
const ot='<span class="sendLink fast-bp">Fast BP</span> | ',at='<span class="sendLink fast-gs">Fast GS</span>',rt=' | <span class="sendLink fast-wear">Fast Wear</span>'
let it,st,ct,pt,ut
const lt=[[!0,!0,function(){return pt||(pt=l({innerHTML:ot+at+rt})),pt.cloneNode(!0)}],[!0,!1,function(){return ut||(ut=l({innerHTML:at+rt})),ut.cloneNode(!0)}],[!1,!0,function(){return ct||(ct=l({innerHTML:ot+at})),ct.cloneNode(!0)}],[!1,!1,function(){return st||(st=l({innerHTML:at})),st.cloneNode(!0)}]]
function ft(t,n,e){return e[0]===t&&e[1]===n}function dt(t){const n=!(it||(it=new RegExp("<b>|Bottle|Brew|Draft|Elixir|Potion|Jagua Egg|Gut Rot Head Splitter|Serum")),it).test(t.previousElementSibling.innerHTML),e=2===t.children.length
return lt.find(a(ft,n,e))[2]()}function mt(t,n,e){return n[e]=t[e],n}function bt(t){return f(t).sort(G).reduce(a(mt,t),{})}let gt,ht,yt
function Mt(t,n,e,o){return"Ignore"!==t.myMap[o]&&(e[t.myMap[o]]?e[t.myMap[o]]+=n[o]:e[t.myMap[o]]=n[o]),e}function jt(t,n,e,o){return`${e}<tr><td>${o}</td><td style="background-color: ${function(t){const n=Math.max(Math.min(t,100),0)
let e,o
return n<50?(e=255,o=Math.round(5.1*n)):(o=255,e=Math.round(510-5.1*n)),`#${`000000${(65536*e+256*o+0).toString(16)}`.slice(-6)}`}((n[o]-t.minpoint)/(t.maxpoint-t.minpoint)*100)};">${n[o].toString()}</td></tr>`}function xt(t,n){c("potReport","drawInventory")
const e=bt(f(n).reduce(a(Mt,t,n),{}))
i(`<table><tbody>${f(e).reduce(a(jt,t,e),"")}</tbody></table>`,gt)}function Lt(){const t=J()
return t.insertCell(-1),t.insertCell(-1),t}function $t(t){const n=b("option",e)
var e
return n.value=t,n.text=t,n}function Ct(t,n){m(t,$t(n[0]))}function vt(){if(!yt){yt=Lt()
const t=_({className:"tip-static",dataset:{tipped:'Set to "Ignore" to exclude from report'},style:{width:"130px"}})
m(yt.cells[1],t)}return yt.cloneNode(!0)}function It(t,n){const e=vt()
M(n[0],e.cells[0])
const o=e.cells[1].children[0]
m(o,$t(n[1])),[o.name,o.value]=n,m(t.tBodies[0],e)}function Nt(t,n,e){const o=W({id:n,type:"button",value:e})
m(t.cells[1],o)}function Ht(t){const n=Lt()
Nt(n,"fshIgnoreAll","Ignore All"),j(n.cells[1],"&nbsp;"),Nt(n,"fshReset","Reset"),m(t.tBodies[0],n)}function Rt(t,n){if("SELECT"===n.target.tagName){const e=n.target,{value:o}=e
i("",e),m(e,$t("Ignore")),y(t).forEach(a(Ct,e)),e.value=o}}function Tt(t){c("potReport","drawMapping")
const n=q({innerHTML:"<tbody></tbody>"})
ht.replaceChild(n,ht.children[0]),g(ht,"mousedown",a(Rt,t.myMap)),h(3,A,[[5,3,y(t.myMap),0,a(It,n),a(Ht,n)]])}const kt="fsh_potMap",St={pottab1:!1,pottab2:!1,pottab3:!1,myMap:{},minpoint:12,maxpoint:20}
function wt(t,n){t.myMap[n]||(t.myMap[n]=n)}function Et(t,n,e){"SELECT"===e.target.tagName&&(t.myMap[e.target.name]=e.target.value,z(kt,t),xt(t,n))}function At(t,n,e){return n[e]=t?"Ignore":e,n}function Bt(t,n,e){!function(t,n,e){t.myMap=f(n).reduce(a(At,e),{})}(t,n,e),z(kt,t),Tt(t),xt(t,n)}function Dt(t){return/^pottab\d$/.test(t.id)}function Ft(t,n){t[n.id]=n.checked,z(kt,t)}function Gt(t,n,e){const o=e.target.id,a=P(e.target.value,0,999)
a&&(t[o]=a,z(kt,t),xt(t,n))}function Pt(n,e,o){g(o,"change",a(Et,n,e)),t(o,B(function(t,n){return[[F("fshIgnoreAll"),a(Bt,t,n,!0)],[F("fshReset"),a(Bt,t,n,null)],[Dt,a(Ft,t)]]}(n,e))),g(o,"input",a(Gt,n,e))}function Wt(t,n){const e=function(t){return l({id:"potReport",innerHTML:`<input id="pottab1" type="checkbox"${D(t.pottab1)}><label for="pottab1">Composed Potion Inventory</label><input id="pottab2" type="checkbox"${D(t.pottab2)}><label for="pottab2">Mapping</label><input id="pottab3" type="checkbox"${D(t.pottab3)}><label for="pottab3">Thresholds</label>`})}(t),r=l({id:"panels"})
m(e,r),function(t,n,e){gt=l({id:"inventory"}),t.pottab1?xt(t,n):d(e.parentNode.children[0],"change",a(xt,t,n)),m(e,gt)}(t,n,r),function(t,n){ht=l({id:"mapping",innerHTML:"<p></p>"}),t.pottab2?Tt(t):d(n.parentNode.children[2],"change",a(Tt,t)),m(n,ht)}(t,r),function(t,n){const e=l({id:"thresholds",innerHTML:`Min:<input id="minpoint" type="number" value="${t.minpoint}" min="0" max="999">Max:<input id="maxpoint" type="number" value="${t.maxpoint}" min="0" max="999">`})
m(n,e)}(t,r),m(function(t,n){const e=o.lastElementChild.insertRow(2).insertCell(-1)
return Pt(t,n,e),e}(t,n),e)}function _t(t,n){const e=x({},St)
x(e,L(n,{})),e.myMap=function(t,n){return f(n).forEach(a(wt,t)),bt(t.myMap)}(e,t),z(kt,e),Wt(e,t)}function qt(t){U(kt).then(a(_t,t))}let Jt,Ut,zt,Ot,Qt
function Vt(t,n){const e=Ut[n]
m(e,t)}function Yt(t){Jt.push(dt(t)),function(t){if(t.endsWith(" (Potion)")){const n=t.slice(0,-9)
zt[n]=(zt[n]||0)+1}}(t.previousElementSibling.innerHTML)}function Kt(){A([5,3,Jt,0,Vt,a(qt,zt)])}function Xt(){Ut=$("#pCC table table tr:not(.fshHide) td:nth-of-type(3n)"),zt={},Jt=[],A([5,3,Ut,0,Yt,Kt])}function Zt(t){const n=C(t)
v.membrList[n]&&i(function(t){return`${O({last_login:v.membrList[t].last_login})}<a href="${I}${v.membrList[t].id}">${t}</a> [ <span class="a-reply fshLink" target_player=${t}>m</span> ]`}(n),t)}function tn(){const t=$('#pCC table table tr:not(.fshHide) td[bgcolor="#DAA534"][colspan="2"] b')
A([5,3,t,0,Zt])}function nn(t){t.children[0].hasAttribute("bgcolor")&&(Qt=T(Ot,t.children[0].children[0])),Qt||(t.className="fshHide")}function en(){if(Ot=N("user"),!Ot)return
if(!H('#pCC table table td[bgcolor="#DAA534"] b').some(R(Ot)))return
const t=$("#pCC table table tr")
A([5,2,t,0,nn])}function on(){h(3,tn)}function an(){k()||(E(!1).then(on),h(2,en),h(3,Xt),t(e("table",o)[1],n(et)))}export default an
//# sourceMappingURL=guildReport-aa02e887.js.map
