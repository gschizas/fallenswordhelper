import{o as t,bJ as n,b as e,p as o,t as a,bV as r,A as i,aD as s,U as c,bW as p,a$ as u,m as l,aq as f,O as d,h as m,n as b,f as g,a as h,e as y,z as M,i as j,q as L,a2 as x,a9 as C,B as $,c as v,a1 as I,Q as N,D as H,a_ as T,b2 as R,x as S}from"./calfSystem-6459f18a.js"
import"./numberIsNaN-fa7d637d.js"
import"./toLowerCase-5e186769.js"
import{c as k}from"./createInput-7be6e294.js"
import{t as w}from"./testRange-e43cb031.js"
import{o as E}from"./onlineDot-6aa5ba99.js"
import{b as A}from"./batch-68f3579a.js"
import"./currentGuildId-da0b8fda.js"
import{g as D,s as B}from"./idb-737f325b.js"
import{i as G}from"./isChecked-6167b36b.js"
import{a as W}from"./alpha-e9f582ea.js"
import{c as F}from"./createTable-0679902c.js"
import"./dialogMsg-27e2dc98.js"
import"./errorDialog-f6569d61.js"
import"./indexAjaxJson-14aa1022.js"
import"./cmdExport-7faecab1.js"
import"./daUseItem-3b77cb95.js"
import{e as _}from"./eventHandler5-269709a1.js"
import{s as P}from"./selfIdIs-e4985f40.js"
import"./dialog-81b3293d.js"
import{e as q}from"./useItem-4fe503f3.js"
import"./guild-c7684629.js"
import{c as J}from"./createSelect-b8122a28.js"
import{g as Q}from"./getMembrList-78f4e922.js"
import{a as U}from"./queue-a14fef99.js"
import"./guildInventory-ecc11c54.js"
import{c as z}from"./createTr-fa705a98.js"
function O(t){return t.match(/&id=(\d+)/)[1]}const V=`<span class="guildReportSpinner" style="background-image: url('${s}ui/misc/spinner.gif');"></span>`
function Y(t){i('<span class="fastWorn">Worn</span>',t)}function K(t){return t.match(p)[1]}function X(t,n,e){1!==e.r&&("recall"===t?function(t){i('<span class="fastWorn">You successfully recalled the item</span>',t)}(n):Y(n))}function Z(t,n,e,o){U(O(n),K(n),e,o).then(a(X,o,t))}function tt(t,n,e){Z(t,n,e,"recall")}const nt=[["fast-bp",function(t,n){c("GuildReport","Fast BP"),tt(t,n,0)}],["fast-gs",function(t,n){c("GuildReport","Fast GS"),tt(t,n,1)}],["fast-wear",function(t,n){c("GuildReport","Fast Wear"),Number(K(n))===u()?q(O(n)).then(a(Y,t)):Z(t,n,0,"wear")}]]
const et=[["sendLink",function(t){const n=t.parentNode.parentNode
if(!n)return
const{href:e}=n.children[0]
e&&(nt.find(a(r,t))[1](n,e),i(V,n))}],["a-reply",function(t){window.openQuickMsgDialog(t.getAttribute("target_player"))}]]
const ot='<span class="sendLink fast-bp">Fast BP</span> | ',at='<span class="sendLink fast-gs">Fast GS</span>',rt=' | <span class="sendLink fast-wear">Fast Wear</span>'
let it,st,ct,pt,ut
const lt=[[!0,!0,function(){return pt||(pt=l({innerHTML:ot+at+rt})),pt.cloneNode(!0)}],[!0,!1,function(){return ut||(ut=l({innerHTML:at+rt})),ut.cloneNode(!0)}],[!1,!0,function(){return ct||(ct=l({innerHTML:ot+at})),ct.cloneNode(!0)}],[!1,!1,function(){return st||(st=l({innerHTML:at})),st.cloneNode(!0)}]]
function ft(t,n,e){return e[0]===t&&e[1]===n}function dt(t){const n=!(it||(it=new RegExp("<b>|Bottle|Brew|Draft|Elixir|Potion|Jagua Egg|Gut Rot Head Splitter|Serum")),it).test(t.previousElementSibling.innerHTML),e=2===t.children.length
return lt.find(a(ft,n,e))[2]()}function mt(t,n,e){return n[e]=t[e],n}function bt(t){return f(t).sort(W).reduce(a(mt,t),{})}let gt,ht,yt
function Mt(t,n,e,o){return"Ignore"!==t.myMap[o]&&(e[t.myMap[o]]?e[t.myMap[o]]+=n[o]:e[t.myMap[o]]=n[o]),e}function jt(t,n,e,o){return`${e}<tr><td>${o}</td><td style="background-color: ${function(t){const n=Math.max(Math.min(t,100),0)
let e,o
return n<50?(e=255,o=Math.round(5.1*n)):(o=255,e=Math.round(510-5.1*n)),"#"+("000000"+(65536*e+256*o+0).toString(16)).slice(-6)}((n[o]-t.minpoint)/(t.maxpoint-t.minpoint)*100)};">${n[o].toString()}</td></tr>`}function Lt(t,n){c("potReport","drawInventory")
const e=bt(f(n).reduce(a(Mt,t,n),{}))
i(`<table><tbody>${f(e).reduce(a(jt,t,e),"")}</tbody></table>`,gt)}function xt(){const t=z()
return t.insertCell(-1),t.insertCell(-1),t}function Ct(t){const n=b("option",e)
var e
return n.value=t,n.text=t,n}function $t(t,n){m(t,Ct(n[0]))}function vt(){if(!yt){yt=xt()
const t=J({className:"tip-static",dataset:{tipped:'Set to "Ignore" to exclude from report'},style:{width:"130px"}})
m(yt.cells[1],t)}return yt.cloneNode(!0)}function It(t,n){const e=vt()
M(n[0],e.cells[0])
const o=e.cells[1].children[0]
m(o,Ct(n[1])),[o.name,o.value]=n,m(t.tBodies[0],e)}function Nt(t,n,e){const o=k({id:n,type:"button",value:e})
m(t.cells[1],o)}function Ht(t){const n=xt()
Nt(n,"fshIgnoreAll","Ignore All"),j(n.cells[1],"&nbsp;"),Nt(n,"fshReset","Reset"),m(t.tBodies[0],n)}function Tt(t,n){if("SELECT"===n.target.tagName){const e=n.target,{value:o}=e
i("",e),m(e,Ct("Ignore")),y(t).forEach(a($t,e)),e.value=o}}function Rt(t){c("potReport","drawMapping")
const n=F({innerHTML:"<tbody></tbody>"})
ht.replaceChild(n,ht.children[0]),g(ht,"mousedown",a(Tt,t.myMap)),h(3,A,[[5,3,y(t.myMap),0,a(It,n),a(Ht,n)]])}const St="fsh_potMap",kt={pottab1:!1,pottab2:!1,pottab3:!1,myMap:{},minpoint:12,maxpoint:20}
function wt(t,n){t.myMap[n]||(t.myMap[n]=n)}function Et(t,n,e){"SELECT"===e.target.tagName&&(t.myMap[e.target.name]=e.target.value,B(St,t),Lt(t,n))}function At(t,n,e){return n[e]=t?"Ignore":e,n}function Dt(t,n,e){!function(t,n,e){t.myMap=f(n).reduce(a(At,e),{})}(t,n,e),B(St,t),Rt(t),Lt(t,n)}function Bt(t){return/^pottab\d$/.test(t.id)}function Gt(t,n){t[n.id]=n.checked,B(St,t)}function Wt(t,n,e){const o=e.target.id,a=w(e.target.value,0,999)
a&&(t[o]=a,B(St,t),Lt(t,n))}function Ft(n,e,o){g(o,"change",a(Et,n,e)),t(o,_(function(t,n){return[[P("fshIgnoreAll"),a(Dt,t,n,!0)],[P("fshReset"),a(Dt,t,n,null)],[Bt,a(Gt,t)]]}(n,e))),g(o,"input",a(Wt,n,e))}function _t(t,n){const e=function(t){return l({id:"potReport",innerHTML:`<input id="pottab1" type="checkbox"${G(t.pottab1)}><label for="pottab1">Composed Potion Inventory</label><input id="pottab2" type="checkbox"${G(t.pottab2)}><label for="pottab2">Mapping</label><input id="pottab3" type="checkbox"${G(t.pottab3)}><label for="pottab3">Thresholds</label>`})}(t),r=l({id:"panels"})
m(e,r),function(t,n,e){gt=l({id:"inventory"}),t.pottab1?Lt(t,n):d(e.parentNode.children[0],"change",a(Lt,t,n)),m(e,gt)}(t,n,r),function(t,n){ht=l({id:"mapping",innerHTML:"<p></p>"}),t.pottab2?Rt(t):d(n.parentNode.children[2],"change",a(Rt,t)),m(n,ht)}(t,r),function(t,n){const e=l({id:"thresholds",innerHTML:`Min:<input id="minpoint" type="number" value="${t.minpoint}" min="0" max="999">Max:<input id="maxpoint" type="number" value="${t.maxpoint}" min="0" max="999">`})
m(n,e)}(t,r),m(function(t,n){const e=o.lastElementChild.insertRow(2).insertCell(-1)
return Ft(t,n,e),e}(t,n),e)}function Pt(t,n){const e=L({},kt)
L(e,x(n,{})),e.myMap=function(t,n){return f(n).forEach(a(wt,t)),bt(t.myMap)}(e,t),B(St,e),_t(e,t)}function qt(t){D(St).then(a(Pt,t))}let Jt,Qt,Ut,zt,Ot
function Vt(t,n){const e=Qt[n]
m(e,t)}function Yt(t){Jt.push(dt(t)),function(t){if(t.endsWith(" (Potion)")){const n=t.slice(0,-9)
Ut[n]=(Ut[n]||0)+1}}(t.previousElementSibling.innerHTML)}function Kt(){A([5,3,Jt,0,Vt,a(qt,Ut)])}function Xt(){Qt=C("#pCC table table tr:not(.fshHide) td:nth-of-type(3n)"),Ut={},Jt=[],A([5,3,Qt,0,Yt,Kt])}function Zt(t){const n=$(t)
v.membrList[n]&&i(function(t){return`${E({last_login:v.membrList[t].last_login})}<a href="${I}${v.membrList[t].id}">${t}</a> [ <span class="a-reply fshLink" target_player=${t}>m</span> ]`}(n),t)}function tn(){const t=C('#pCC table table tr:not(.fshHide) td[bgcolor="#DAA534"][colspan="2"] b')
A([5,3,t,0,Zt])}function nn(t){t.children[0].hasAttribute("bgcolor")&&(Ot=R(zt,t.children[0].children[0])),Ot||(t.className="fshHide")}function en(){if(zt=N("user"),!zt)return
if(!H('#pCC table table td[bgcolor="#DAA534"] b').some(T(zt)))return
const t=C("#pCC table table tr")
A([5,2,t,0,nn])}function on(){h(3,tn)}function an(){S()||(Q(!1).then(on),h(2,en),h(3,Xt),t(e("table",o)[1],n(et)))}export default an
//# sourceMappingURL=guildReport-1ffc34cb.js.map
