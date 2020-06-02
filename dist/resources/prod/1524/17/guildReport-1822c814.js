import{o as t,bp as n,b as e,p as o,s as a,bZ as r,z as i,aB as s,S as c,C as p,b1 as u,k as l,ap as f,L as d,f as m,m as b,a as g,l as h,y,i as M,n as j,a0 as L,e as x,a7 as C,A as I,c as $,$ as N,N as v,I as H,b0 as R,b4 as k,w as S}from"./calfSystem-dec5e071.js"
import"./numberIsNaN-ea515379.js"
import"./toLowerCase-1ea9a651.js"
import{c as T}from"./createInput-6f4c3b04.js"
import{t as w}from"./testRange-ff9cba6f.js"
import{o as A}from"./onlineDot-093223e2.js"
import{b as E}from"./batch-6962fbd8.js"
import"./currentGuildId-694bbc76.js"
import{g as B,s as G}from"./idb-8fe34e30.js"
import{i as D}from"./isChecked-9b2ad5c2.js"
import{a as F}from"./alpha-55be3c2d.js"
import{c as W}from"./createTable-e5b9da81.js"
import"./dialogMsg-1ae9be91.js"
import"./errorDialog-5d76ff73.js"
import"./dialog-b7388abb.js"
import"./indexAjaxJson-ecf8d1f5.js"
import{e as P}from"./useItem-fcbdc3fc.js"
import"./ajaxReturnCode-361085b2.js"
import"./daUseItem-a1c5450c.js"
import{c as _}from"./createTr-30b5cdd2.js"
import{e as J}from"./eventHandler5-3bf558e6.js"
import"./cmdExport-965d881b.js"
import{s as q}from"./selfIdIs-b67caa4c.js"
import"./guild-3a4d4022.js"
import{c as z}from"./createSelect-eb09d534.js"
import{g as Q}from"./getMembrList-05aad6b2.js"
import"./guildInventory-4312cd62.js"
import{a as U}from"./queue-3ff2dd7e.js"
function Y(t){return t.match(/&id=(\d+)/)[1]}const Z=`<span class="guildReportSpinner" style="background-image: url('${s}ui/misc/spinner.gif');"></span>`
function K(t){i('<span class="fastWorn">Worn</span>',t)}function O(t){return t.match(p)[1]}function V(t,n,e){1!==e.r&&("recall"===t?function(t){i('<span class="fastWorn">You successfully recalled the item</span>',t)}(n):K(n))}function X(t,n,e,o){U(Y(n),O(n),e,o).then(a(V,o,t))}function tt(t,n,e){X(t,n,e,"recall")}const nt=[["fast-bp",function(t,n){c("GuildReport","Fast BP"),tt(t,n,0)}],["fast-gs",function(t,n){c("GuildReport","Fast GS"),tt(t,n,1)}],["fast-wear",function(t,n){c("GuildReport","Fast Wear"),Number(O(n))===u()?P(Y(n)).then(a(K,t)):X(t,n,0,"wear")}]]
const et=[["sendLink",function(t){const n=t.parentNode.parentNode
if(!n)return
const{href:e}=n.children[0]
e&&(nt.find(a(r,t))[1](n,e),i(Z,n))}],["a-reply",function(t){window.openQuickMsgDialog(t.getAttribute("target_player"))}]]
const ot='<span class="sendLink fast-bp">Fast BP</span> | ',at='<span class="sendLink fast-gs">Fast GS</span>',rt=' | <span class="sendLink fast-wear">Fast Wear</span>'
let it,st,ct,pt,ut
const lt=[[!0,!0,function(){return pt||(pt=l({innerHTML:ot+at+rt})),pt.cloneNode(!0)}],[!0,!1,function(){return ut||(ut=l({innerHTML:at+rt})),ut.cloneNode(!0)}],[!1,!0,function(){return ct||(ct=l({innerHTML:ot+at})),ct.cloneNode(!0)}],[!1,!1,function(){return st||(st=l({innerHTML:at})),st.cloneNode(!0)}]]
function ft(t,n,e){return e[0]===t&&e[1]===n}function dt(t){const n=!(it||(it=new RegExp("<b>|Bottle|Brew|Draft|Elixir|Potion|Jagua Egg|Gut Rot Head Splitter|Serum")),it).test(t.previousElementSibling.innerHTML),e=2===t.children.length
return lt.find(a(ft,n,e))[2]()}function mt(t,n,e){return n[e]=t[e],n}function bt(t){return f(t).sort(F).reduce(a(mt,t),{})}let gt,ht,yt
function Mt(t,n,e,o){return"Ignore"!==t.myMap[o]&&(e[t.myMap[o]]?e[t.myMap[o]]+=n[o]:e[t.myMap[o]]=n[o]),e}function jt(t,n,e,o){return`${e}<tr><td>${o}</td><td style="background-color: ${function(t){const n=Math.max(Math.min(t,100),0)
let e,o
return n<50?(e=255,o=Math.round(5.1*n)):(o=255,e=Math.round(510-5.1*n)),"#"+("000000"+(65536*e+256*o+0).toString(16)).slice(-6)}((n[o]-t.minpoint)/(t.maxpoint-t.minpoint)*100)};">${n[o].toString()}</td></tr>`}function Lt(t,n){c("potReport","drawInventory")
const e=bt(f(n).reduce(a(Mt,t,n),{}))
i(`<table><tbody>${f(e).reduce(a(jt,t,e),"")}</tbody></table>`,gt)}function xt(){const t=_()
return t.insertCell(-1),t.insertCell(-1),t}function Ct(t){const n=b("option",e)
var e
return n.value=t,n.text=t,n}function It(t,n){m(t,Ct(n[0]))}function $t(t){if(!yt){yt=xt()
const n=function(t){const n=z({className:"tip-static",dataset:{tipped:'Set to "Ignore" to exclude from report'}})
return m(n,Ct("Ignore")),t.forEach(a(It,n)),n}(t)
m(yt.cells[1],n)}return yt.cloneNode(!0)}function Nt(t,n,e,o){const a=$t(o)
y(n[0],a.cells[0])
const r=a.cells[1].children[0];[r.name,r.value]=n,m(t.tBodies[0],a)}function vt(t,n,e){const o=T({id:n,type:"button",value:e})
m(t.cells[1],o)}function Ht(t){const n=xt()
return vt(n,"fshIgnoreAll","Ignore All"),M(n.cells[1],"&nbsp;"),vt(n,"fshReset","Reset"),m(t.tBodies[0],n),0}function Rt(t){c("potReport","drawMapping")
const n=W({innerHTML:"<tbody></tbody>"})
ht.replaceChild(n,ht.children[0]),g(3,E,[[5,3,h(t.myMap),0,a(Nt,n),a(Ht,n)]])}const kt="fsh_potMap",St={pottab1:!1,pottab2:!1,pottab3:!1,myMap:{},minpoint:12,maxpoint:20}
function Tt(t,n){t.myMap[n]||(t.myMap[n]=n)}function wt(t,n,e){"SELECT"===e.target.tagName&&(t.myMap[e.target.name]=e.target.value,G(kt,t),Lt(t,n))}function At(t,n,e){return n[e]=t?"Ignore":e,n}function Et(t,n,e){!function(t,n,e){t.myMap=f(n).reduce(a(At,e),{})}(t,n,e),G(kt,t),Rt(t),Lt(t,n)}function Bt(t){return/^pottab\d$/.test(t.id)}function Gt(t,n){t[n.id]=n.checked,G(kt,t)}function Dt(t,n,e){const o=e.target.id,a=w(e.target.value,0,999)
a&&(t[o]=a,G(kt,t),Lt(t,n))}function Ft(n,e,o){x(o,"change",a(wt,n,e)),t(o,J(function(t,n){return[[q("fshIgnoreAll"),a(Et,t,n,!0)],[q("fshReset"),a(Et,t,n,null)],[Bt,a(Gt,t)]]}(n,e))),x(o,"input",a(Dt,n,e))}function Wt(t,n){const e=function(t){return l({id:"potReport",innerHTML:`<input id="pottab1" type="checkbox"${D(t.pottab1)}><label for="pottab1">Composed Potion Inventory</label><input id="pottab2" type="checkbox"${D(t.pottab2)}><label for="pottab2">Mapping</label><input id="pottab3" type="checkbox"${D(t.pottab3)}><label for="pottab3">Thresholds</label>`})}(t),r=l({id:"panels"})
m(e,r),function(t,n,e){gt=l({id:"inventory"}),t.pottab1?Lt(t,n):d(e.parentNode.children[0],"change",a(Lt,t,n)),m(e,gt)}(t,n,r),function(t,n){ht=l({id:"mapping",innerHTML:"<p></p>"}),t.pottab2?Rt(t):d(n.parentNode.children[2],"change",a(Rt,t)),m(n,ht)}(t,r),function(t,n){const e=l({id:"thresholds",innerHTML:`Min:<input id="minpoint" type="number" value="${t.minpoint}" min="0" max="999">Max:<input id="maxpoint" type="number" value="${t.maxpoint}" min="0" max="999">`})
m(n,e)}(t,r),m(function(t,n){const e=o.lastElementChild.insertRow(2).insertCell(-1)
return Ft(t,n,e),e}(t,n),e)}function Pt(t,n){const e=j({},St)
j(e,L(n,{})),e.myMap=function(t,n){return f(n).forEach(a(Tt,t)),bt(t.myMap)}(e,t),G(kt,e),Wt(e,t)}function _t(t){B(kt).then(a(Pt,t))}let Jt,qt,zt,Qt,Ut
function Yt(t,n){const e=qt[n]
m(e,t)}function Zt(t){Jt.push(dt(t)),function(t){if(t.endsWith(" (Potion)")){const n=t.slice(0,-9)
zt[n]=(zt[n]||0)+1}}(t.previousElementSibling.innerHTML)}function Kt(){E([5,3,Jt,0,Yt,a(_t,zt)])}function Ot(){qt=C("#pCC table table tr:not(.fshHide) td:nth-of-type(3n)"),zt={},Jt=[],E([5,3,qt,0,Zt,Kt])}function Vt(t){const n=I(t)
$.membrList[n]&&i(function(t){return`${A({last_login:$.membrList[t].last_login})}<a href="${N}${$.membrList[t].id}">${t}</a> [ <span class="a-reply fshLink" target_player=${t}>m</span> ]`}(n),t)}function Xt(){const t=C('#pCC table table tr:not(.fshHide) td[bgcolor="#DAA534"][colspan="2"] b')
E([5,3,t,0,Vt])}function tn(t){t.children[0].hasAttribute("bgcolor")&&(Ut=k(Qt,t.children[0].children[0])),Ut||(t.className="fshHide")}function nn(){if(Qt=v("user"),!Qt)return
if(!H('#pCC table table td[bgcolor="#DAA534"] b').some(R(Qt)))return
const t=C("#pCC table table tr")
E([5,2,t,0,tn])}function en(){g(3,Xt)}export default function(){S()||(Q(!1).then(en),g(2,nn),g(3,Ot),t(e("table",o)[1],n(et)))}
//# sourceMappingURL=guildReport-1822c814.js.map
