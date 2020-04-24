import{o as t,b_ as n,b as e,p as o,v as a,cn as r,C as i,aI as s,a1 as c,F as u,bt as l,l as p,ay as f,Q as d,h as m,r as b,a as h,q as g,B as y,i as M,ai as j,aS as L,ab as C,ak as $,f as x,aA as I,D as v,e as N,aa as H,Y as R,N as k,b6 as S,bw as T,z as w}from"./calfSystem-9b1fa4ca.js"
import"./numberIsNaN-6f59053c.js"
import"./toLowerCase-cb0a8722.js"
import{c as A}from"./createInput-097870f4.js"
import{t as E}from"./testRange-1bde9118.js"
import{o as B}from"./onlineDot-ae55259c.js"
import{b as F}from"./batch-71913221.js"
import{i as D}from"./isChecked-c7d79538.js"
import{a as G}from"./alpha-4bb25a31.js"
import{c as W}from"./createTable-aa7942b1.js"
import"./dialogMsg-91ed6ec0.js"
import{a as _}from"./useItem-7b4c354b.js"
import"./dialog-e9780cd9.js"
import"./ajaxReturnCode-a3777f53.js"
import"./daUseItem-d939d24c.js"
import{c as P}from"./createTr-7c0ff45c.js"
import{e as q}from"./eventHandler5-77817b9f.js"
import{s as Q}from"./selfIdIs-f7a979b8.js"
import{c as Y}from"./createSelect-30dd16c2.js"
import{g as z}from"./getMembrList-ec594fbc.js"
import"./guildInventory-5702bd9c.js"
import{a as J}from"./queue-75f7fa3c.js"
function U(t){return t.match(/&id=(\d+)/)[1]}const K='<span class="guildReportSpinner" '+`style="background-image: url('${s}ui/misc/spinner.gif');"></span>`
function O(t){i('<span class="fastWorn">Worn</span>',t)}function V(t){return t.match(u)[1]}function X(t,n,e){1!==e.r&&("recall"===t?function(t){i('<span class="fastWorn">You successfully recalled the item</span>',t)}(n):O(n))}function Z(t,n,e,o){J(U(n),V(n),e,o).then(a(X,o,t))}function tt(t,n,e){Z(t,n,e,"recall")}const nt=[["fast-bp",function(t,n){c("GuildReport","Fast BP"),tt(t,n,0)}],["fast-gs",function(t,n){c("GuildReport","Fast GS"),tt(t,n,1)}],["fast-wear",function(t,n){c("GuildReport","Fast Wear"),Number(V(n))===l()?_(U(n)).then(a(O,t)):Z(t,n,0,"wear")}]]
const et=[["sendLink",function(t){const n=t.parentNode.parentNode
if(!n)return
const{href:e}=n.children[0]
e&&(nt.find(a(r,t))[1](n,e),i(K,n))}],["a-reply",function(t){window.openQuickMsgDialog(t.getAttribute("target_player"))}]]
const ot='<span class="sendLink fast-bp">Fast BP</span> | ',at='<span class="sendLink fast-gs">Fast GS</span>',rt=' | <span class="sendLink fast-wear">Fast Wear</span>'
let it,st,ct,ut,lt
const pt=[[!0,!0,function(){return ut||(ut=p({innerHTML:ot+at+rt})),ut.cloneNode(!0)}],[!0,!1,function(){return lt||(lt=p({innerHTML:at+rt})),lt.cloneNode(!0)}],[!1,!0,function(){return ct||(ct=p({innerHTML:ot+at})),ct.cloneNode(!0)}],[!1,!1,function(){return st||(st=p({innerHTML:at})),st.cloneNode(!0)}]]
function ft(t,n,e){return e[0]===t&&e[1]===n}function dt(t){const n=!(it||(it=new RegExp("<b>|Bottle|Brew|Draft|Elixir|Potion|Jagua Egg|Gut Rot Head Splitter|Serum")),it).test(t.previousElementSibling.innerHTML),e=2===t.children.length
return pt.find(a(ft,n,e))[2]()}function mt(t,n,e){return n[e]=t[e],n}function bt(t){return f(t).sort(G).reduce(a(mt,t),{})}let ht,gt,yt
function Mt(t,n,e,o){return"Ignore"!==t.myMap[o]&&(e[t.myMap[o]]?e[t.myMap[o]]+=n[o]:e[t.myMap[o]]=n[o]),e}function jt(t,n,e,o){return`${e}<tr><td>${o}</td><td style="background-color: ${function(t){const n=Math.max(Math.min(t,100),0)
let e,o
return n<50?(e=255,o=Math.round(5.1*n)):(o=255,e=Math.round(510-5.1*n)),`#${`000000${(65536*e+256*o+0).toString(16)}`.slice(-6)}`}((n[o]-t.minpoint)/(t.maxpoint-t.minpoint)*100)};">${n[o].toString()}</td></tr>`}function Lt(t,n){c("potReport","drawInventory")
const e=bt(f(n).reduce(a(Mt,t,n),{}))
i(`<table><tbody>${f(e).reduce(a(jt,t,e),"")}</tbody></table>`,ht)}function Ct(){const t=P()
return t.insertCell(-1),t.insertCell(-1),t}function $t(t){const n=b("option",e)
var e
return n.value=t,n.text=t,n}function xt(t,n){m(t,$t(n[0]))}function It(t){if(!yt){yt=Ct()
const n=function(t){const n=Y({className:"tip-static",dataset:{tipped:'Set to "Ignore" to exclude from report'}})
return m(n,$t("Ignore")),t.forEach(a(xt,n)),n}(t)
m(yt.cells[1],n)}return yt.cloneNode(!0)}function vt(t,n,e,o){const a=It(o)
y(n[0],a.cells[0])
const r=a.cells[1].children[0];[r.name,r.value]=n,m(t.tBodies[0],a)}function Nt(t,n,e){const o=A({id:n,type:"button",value:e})
m(t.cells[1],o)}function Ht(t){const n=Ct()
return Nt(n,"fshIgnoreAll","Ignore All"),M(n.cells[1],"&nbsp;"),Nt(n,"fshReset","Reset"),m(t.tBodies[0],n),0}function Rt(t){c("potReport","drawMapping")
const n=W({innerHTML:"<tbody></tbody>"})
gt.replaceChild(n,gt.children[0]),h(3,F,[[5,3,g(t.myMap),0,a(vt,n),a(Ht,n)]])}const kt="fsh_potMap",St={pottab1:!1,pottab2:!1,pottab3:!1,myMap:{},minpoint:12,maxpoint:20}
function Tt(t,n){t.myMap[n]||(t.myMap[n]=n)}function wt(t,n,e){"SELECT"===e.target.tagName&&(t.myMap[e.target.name]=e.target.value,$(kt,t),Lt(t,n))}function At(t,n,e){return n[e]=t?"Ignore":e,n}function Et(t,n,e){!function(t,n,e){t.myMap=f(n).reduce(a(At,e),{})}(t,n,e),$(kt,t),Rt(t),Lt(t,n)}function Bt(t){return/^pottab\d$/.test(t.id)}function Ft(t,n){t[n.id]=n.checked,$(kt,t)}function Dt(t,n,e){const o=e.target.id,a=E(e.target.value,0,999)
a&&(t[o]=a,$(kt,t),Lt(t,n))}function Gt(n,e,o){x(o,"change",a(wt,n,e)),t(o,q(function(t,n){return[[Q("fshIgnoreAll"),a(Et,t,n,!0)],[Q("fshReset"),a(Et,t,n,null)],[Bt,a(Ft,t)]]}(n,e))),x(o,"input",a(Dt,n,e))}function Wt(t,n){const e=function(t){return p({id:"potReport",innerHTML:`<input id="pottab1" type="checkbox"${D(t.pottab1)}>`+'<label for="pottab1">Composed Potion Inventory</label>'+`<input id="pottab2" type="checkbox"${D(t.pottab2)}>`+'<label for="pottab2">Mapping</label>'+`<input id="pottab3" type="checkbox"${D(t.pottab3)}>`+'<label for="pottab3">Thresholds</label>'})}(t),r=p({id:"panels"})
m(e,r),function(t,n,e){ht=p({id:"inventory"}),t.pottab1?Lt(t,n):d(e.parentNode.children[0],"change",a(Lt,t,n)),m(e,ht)}(t,n,r),function(t,n){gt=p({id:"mapping",innerHTML:"<p></p>"}),t.pottab2?Rt(t):d(n.parentNode.children[2],"change",a(Rt,t)),m(n,gt)}(t,r),function(t,n){const e=p({id:"thresholds",innerHTML:`Min:<input id="minpoint" type="number" value="${t.minpoint}" min="0" max="999">`+`Max:<input id="maxpoint" type="number" value="${t.maxpoint}" min="0" max="999">`})
m(n,e)}(t,r),m(function(t,n){const e=o.lastElementChild.insertRow(2).insertCell(-1)
return Gt(t,n,e),e}(t,n),e)}function _t(t,n){const e=L({},St)
L(e,C(n,{})),e.myMap=function(t,n){return f(n).forEach(a(Tt,t)),bt(t.myMap)}(e,t),$(kt,e),Wt(e,t)}function Pt(t){j(kt).then(a(_t,t))}let qt,Qt,Yt,zt,Jt
function Ut(t,n){const e=Qt[n]
m(e,t)}function Kt(t){qt.push(dt(t)),function(t){if(t.endsWith(" (Potion)")){const n=t.slice(0,-9)
Yt[n]=(Yt[n]||0)+1}}(t.previousElementSibling.innerHTML)}function Ot(){F([5,3,qt,0,Ut,a(Pt,Yt)])}function Vt(){Qt=I("#pCC table table tr:not(.fshHide) td:nth-of-type(3n)"),Yt={},qt=[],F([5,3,Qt,0,Kt,Ot])}function Xt(t){const n=v(t)
N.membrList[n]&&i(function(t){return`${B({last_login:N.membrList[t].last_login})}<a href="${H}${N.membrList[t].id}">${t}</a> [ <span class="a-reply fshLink" target_player=${t}>m</span> ]`}(n),t)}function Zt(){const t=I('#pCC table table tr:not(.fshHide) td[bgcolor="#DAA534"][colspan="2"] b')
F([5,3,t,0,Xt])}function tn(t){t.children[0].hasAttribute("bgcolor")&&(Jt=T(zt,t.children[0].children[0])),Jt||(t.className="fshHide")}function nn(){if(zt=R("user"),!zt)return
if(!k('#pCC table table td[bgcolor="#DAA534"] b').some(S(zt)))return
const t=I("#pCC table table tr")
F([5,2,t,0,tn])}function en(){h(3,Zt)}export default function(){w()||(z(!1).then(en),h(2,nn),h(3,Vt),t(e("table",o)[1],n(et)))}
//# sourceMappingURL=guildReport-5dba5747.js.map
