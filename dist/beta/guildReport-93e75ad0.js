import{o as t,bW as n,b as e,p as o,v as a,cj as r,C as s,aF as i,a0 as c,F as u,bo as l,l as p,av as f,Q as d,h as m,r as b,a as h,q as g,B as y,i as M,ah as j,aP as L,aa as C,aj as $,f as x,ax as v,D as I,e as N,a9 as H,X as R,N as T,bn as k,br as S,z as w}from"./calfSystem-07c25a1c.js"
import"./numberIsNaN-77d2bff3.js"
import"./toLowerCase-5806cc21.js"
import{c as E}from"./createInput-2b2e8237.js"
import{t as A}from"./testRange-9bc6fe1b.js"
import{o as F}from"./onlineDot-5308cdcc.js"
import{b as B}from"./batch-a0e92c81.js"
import{i as W}from"./isChecked-7fc8132c.js"
import{a as D}from"./alpha-6cdf0d3e.js"
import{c as G}from"./createTable-be6cef64.js"
import"./dialogMsg-3e572607.js"
import{a as P}from"./useItem-4133d4d9.js"
import"./dialog-cdd815db.js"
import"./ajaxReturnCode-7d8a3377.js"
import"./daUseItem-12fcbae2.js"
import{c as _}from"./createTr-8d11f5dc.js"
import{e as q}from"./eventHandler5-1e23b9ef.js"
import{s as Q}from"./selfIdIs-bde4a223.js"
import{c as z}from"./createSelect-6f7b7b53.js"
import{g as J}from"./getMembrList-a4cf03c7.js"
import"./guildInventory-c5217275.js"
import{a as U}from"./queue-519261ae.js"
function X(t){return t.match(/&id=(\d+)/)[1]}const Y='<span class="guildReportSpinner" '+`style="background-image: url('${i}ui/misc/spinner.gif');"></span>`
function K(t){s('<span class="fastWorn">Worn</span>',t)}function O(t){return t.match(u)[1]}function V(t,n,e){1!==e.r&&("recall"===t?function(t){s('<span class="fastWorn">You successfully recalled the item</span>',t)}(n):K(n))}function Z(t,n,e,o){U(X(n),O(n),e,o).then(a(V,o,t))}function tt(t,n,e){Z(t,n,e,"recall")}const nt=[["fast-bp",function(t,n){c("GuildReport","Fast BP"),tt(t,n,0)}],["fast-gs",function(t,n){c("GuildReport","Fast GS"),tt(t,n,1)}],["fast-wear",function(t,n){c("GuildReport","Fast Wear"),Number(O(n))===l()?P(X(n)).then(a(K,t)):Z(t,n,0,"wear")}]]
const et=[["sendLink",function(t){const n=t.parentNode.parentNode
if(!n)return
const{href:e}=n.children[0]
e&&(nt.find(a(r,t))[1](n,e),s(Y,n))}],["a-reply",function(t){window.openQuickMsgDialog(t.getAttribute("target_player"))}]]
const ot='<span class="sendLink fast-bp">Fast BP</span> | ',at='<span class="sendLink fast-gs">Fast GS</span>',rt=' | <span class="sendLink fast-wear">Fast Wear</span>'
let st,it,ct,ut,lt
const pt=[[!0,!0,function(){return ut||(ut=p({innerHTML:ot+at+rt})),ut.cloneNode(!0)}],[!0,!1,function(){return lt||(lt=p({innerHTML:at+rt})),lt.cloneNode(!0)}],[!1,!0,function(){return ct||(ct=p({innerHTML:ot+at})),ct.cloneNode(!0)}],[!1,!1,function(){return it||(it=p({innerHTML:at})),it.cloneNode(!0)}]]
function ft(t,n,e){return e[0]===t&&e[1]===n}function dt(t){const n=!(st||(st=new RegExp("<b>|Bottle|Brew|Draft|Elixir|Potion|Jagua Egg|Gut Rot Head Splitter|Serum")),st).test(t.previousElementSibling.innerHTML),e=2===t.children.length
return pt.find(a(ft,n,e))[2]()}function mt(t,n,e){return n[e]=t[e],n}function bt(t){return f(t).sort(D).reduce(a(mt,t),{})}let ht,gt,yt
function Mt(t,n,e,o){return"Ignore"!==t.myMap[o]&&(e[t.myMap[o]]?e[t.myMap[o]]+=n[o]:e[t.myMap[o]]=n[o]),e}function jt(t,n,e,o){return`${e}<tr><td>${o}</td><td style="background-color: ${function(t){const n=Math.max(Math.min(t,100),0)
let e,o
return n<50?(e=255,o=Math.round(5.1*n)):(o=255,e=Math.round(510-5.1*n)),`#${`000000${(65536*e+256*o+0).toString(16)}`.slice(-6)}`}((n[o]-t.minpoint)/(t.maxpoint-t.minpoint)*100)};">${n[o].toString()}</td></tr>`}function Lt(t,n){c("potReport","drawInventory")
const e=bt(f(n).reduce(a(Mt,t,n),{}))
s(`<table><tbody>${f(e).reduce(a(jt,t,e),"")}</tbody></table>`,ht)}function Ct(){const t=_()
return t.insertCell(-1),t.insertCell(-1),t}function $t(t){const n=b("option",e)
var e
return n.value=t,n.text=t,n}function xt(t,n){m(t,$t(n[0]))}function vt(t){if(!yt){yt=Ct()
const n=function(t){const n=z({className:"tip-static",dataset:{tipped:'Set to "Ignore" to exclude from report'}})
return m(n,$t("Ignore")),t.forEach(a(xt,n)),n}(t)
m(yt.cells[1],n)}return yt.cloneNode(!0)}function It(t,n,e,o){const a=vt(o)
y(n[0],a.cells[0])
const r=a.cells[1].children[0];[r.name,r.value]=n,m(t.tBodies[0],a)}function Nt(t,n,e){const o=E({id:n,type:"button",value:e})
m(t.cells[1],o)}function Ht(t){const n=Ct()
return Nt(n,"fshIgnoreAll","Ignore All"),M(n.cells[1],"&nbsp;"),Nt(n,"fshReset","Reset"),m(t.tBodies[0],n),0}function Rt(t){c("potReport","drawMapping")
const n=G({innerHTML:"<tbody></tbody>"})
gt.replaceChild(n,gt.children[0]),h(3,B,[[5,3,g(t.myMap),0,a(It,n),a(Ht,n)]])}const Tt="fsh_potMap",kt={pottab1:!1,pottab2:!1,pottab3:!1,myMap:{},minpoint:12,maxpoint:20}
function St(t,n){t.myMap[n]||(t.myMap[n]=n)}function wt(t,n,e){"SELECT"===e.target.tagName&&(t.myMap[e.target.name]=e.target.value,$(Tt,t),Lt(t,n))}function Et(t,n,e){return n[e]=t?"Ignore":e,n}function At(t,n,e){!function(t,n,e){t.myMap=f(n).reduce(a(Et,e),{})}(t,n,e),$(Tt,t),Rt(t),Lt(t,n)}function Ft(t){return/^pottab\d$/.test(t.id)}function Bt(t,n){t[n.id]=n.checked,$(Tt,t)}function Wt(t,n,e){const o=e.target.id,a=A(e.target.value,0,999)
a&&(t[o]=a,$(Tt,t),Lt(t,n))}function Dt(n,e,o){x(o,"change",a(wt,n,e)),t(o,q(function(t,n){return[[Q("fshIgnoreAll"),a(At,t,n,!0)],[Q("fshReset"),a(At,t,n,null)],[Ft,a(Bt,t)]]}(n,e))),x(o,"input",a(Wt,n,e))}function Gt(t,n){const e=function(t){return p({id:"potReport",innerHTML:`<input id="pottab1" type="checkbox"${W(t.pottab1)}>`+'<label for="pottab1">Composed Potion Inventory</label>'+`<input id="pottab2" type="checkbox"${W(t.pottab2)}>`+'<label for="pottab2">Mapping</label>'+`<input id="pottab3" type="checkbox"${W(t.pottab3)}>`+'<label for="pottab3">Thresholds</label>'})}(t),r=p({id:"panels"})
m(e,r),function(t,n,e){ht=p({id:"inventory"}),t.pottab1?Lt(t,n):d(e.parentNode.children[0],"change",a(Lt,t,n)),m(e,ht)}(t,n,r),function(t,n){gt=p({id:"mapping",innerHTML:"<p></p>"}),t.pottab2?Rt(t):d(n.parentNode.children[2],"change",a(Rt,t)),m(n,gt)}(t,r),function(t,n){const e=p({id:"thresholds",innerHTML:`Min:<input id="minpoint" type="number" value="${t.minpoint}" min="0" max="999">`+`Max:<input id="maxpoint" type="number" value="${t.maxpoint}" min="0" max="999">`})
m(n,e)}(t,r),m(function(t,n){const e=o.lastElementChild.insertRow(2).insertCell(-1)
return Dt(t,n,e),e}(t,n),e)}function Pt(t,n){const e=L({},kt)
L(e,C(n,{})),e.myMap=function(t,n){return f(n).forEach(a(St,t)),bt(t.myMap)}(e,t),$(Tt,e),Gt(e,t)}function _t(t){j(Tt).then(a(Pt,t))}let qt,Qt,zt,Jt,Ut
function Xt(t,n){const e=Qt[n]
m(e,t)}function Yt(t){qt.push(dt(t)),function(t){if(t.endsWith(" (Potion)")){const n=t.slice(0,-9)
zt[n]=(zt[n]||0)+1}}(t.previousElementSibling.innerHTML)}function Kt(){B([5,3,qt,0,Xt,a(_t,zt)])}function Ot(){Qt=v("#pCC table table tr:not(.fshHide) td:nth-of-type(3n)"),zt={},qt=[],B([5,3,Qt,0,Yt,Kt])}function Vt(t){const n=I(t)
N.membrList[n]&&s(function(t){return`${F({last_login:N.membrList[t].last_login})}<a href="${H}${N.membrList[t].id}">${t}</a> [ <span class="a-reply fshLink" target_player=${t}>m</span> ]`}(n),t)}function Zt(){const t=v('#pCC table table tr:not(.fshHide) td[bgcolor="#DAA534"][colspan="2"] b')
B([5,3,t,0,Vt])}function tn(t){t.children[0].hasAttribute("bgcolor")&&(Ut=S(Jt,t.children[0].children[0])),Ut||(t.className="fshHide")}function nn(){if(Jt=R("user"),!Jt)return
if(!T('#pCC table table td[bgcolor="#DAA534"] b').some(k(Jt)))return
const t=v("#pCC table table tr")
B([5,2,t,0,tn])}function en(){h(3,Zt)}export default function(){w()||(J(!1).then(en),h(2,nn),h(3,Ot),t(e("table",o)[1],n(et)))}
//# sourceMappingURL=guildReport-93e75ad0.js.map
