import{o as t,bN as n,b as e,p as o,s as a,ca as r,z as i,aw as s,S as c,C as u,bm as p,k as l,aj as f,K as d,f as m,m as b,a as h,l as g,y,i as M,a5 as j,n as L,a0 as x,a7 as C,e as I,ak as $,A as N,c as k,$ as v,N as H,I as R,aP as S,bp as T,w}from"./calfSystem-ee582533.js"
import"./numberIsNaN-c9f76e43.js"
import"./toLowerCase-6383ba3b.js"
import{c as A}from"./createInput-2410e798.js"
import{t as E}from"./testRange-b6b0d52c.js"
import{o as G}from"./onlineDot-6ce6d139.js"
import{b as B}from"./batch-59d43fba.js"
import"./currentGuildId-0564d9a0.js"
import{i as D}from"./isChecked-21b2756d.js"
import{a as F}from"./alpha-df6d1f94.js"
import{c as P}from"./createTable-cbb3667c.js"
import"./dialogMsg-b9afb04d.js"
import"./errorDialog-647ae9d2.js"
import"./dialog-b2af5043.js"
import"./indexAjaxJson-e486d467.js"
import{e as W}from"./useItem-bfe3ee6a.js"
import"./ajaxReturnCode-c49dbedc.js"
import"./daUseItem-f1308817.js"
import{c as _}from"./createTr-bfcbc414.js"
import{e as J}from"./eventHandler5-39a91f1e.js"
import"./cmdExport-23cec039.js"
import{s as q}from"./selfIdIs-2732dbd2.js"
import{c as z}from"./createSelect-8ae33cf3.js"
import{g as K}from"./getMembrList-d7782e14.js"
import"./guildInventory-51e0780d.js"
import{a as Q}from"./queue-da3e83af.js"
function U(t){return t.match(/&id=(\d+)/)[1]}const Y=`<span class="guildReportSpinner" style="background-image: url('${s}ui/misc/spinner.gif');"></span>`
function O(t){i('<span class="fastWorn">Worn</span>',t)}function V(t){return t.match(u)[1]}function X(t,n,e){1!==e.r&&("recall"===t?function(t){i('<span class="fastWorn">You successfully recalled the item</span>',t)}(n):O(n))}function Z(t,n,e,o){Q(U(n),V(n),e,o).then(a(X,o,t))}function tt(t,n,e){Z(t,n,e,"recall")}const nt=[["fast-bp",function(t,n){c("GuildReport","Fast BP"),tt(t,n,0)}],["fast-gs",function(t,n){c("GuildReport","Fast GS"),tt(t,n,1)}],["fast-wear",function(t,n){c("GuildReport","Fast Wear"),Number(V(n))===p()?W(U(n)).then(a(O,t)):Z(t,n,0,"wear")}]]
const et=[["sendLink",function(t){const n=t.parentNode.parentNode
if(!n)return
const{href:e}=n.children[0]
e&&(nt.find(a(r,t))[1](n,e),i(Y,n))}],["a-reply",function(t){window.openQuickMsgDialog(t.getAttribute("target_player"))}]]
const ot='<span class="sendLink fast-bp">Fast BP</span> | ',at='<span class="sendLink fast-gs">Fast GS</span>',rt=' | <span class="sendLink fast-wear">Fast Wear</span>'
let it,st,ct,ut,pt
const lt=[[!0,!0,function(){return ut||(ut=l({innerHTML:ot+at+rt})),ut.cloneNode(!0)}],[!0,!1,function(){return pt||(pt=l({innerHTML:at+rt})),pt.cloneNode(!0)}],[!1,!0,function(){return ct||(ct=l({innerHTML:ot+at})),ct.cloneNode(!0)}],[!1,!1,function(){return st||(st=l({innerHTML:at})),st.cloneNode(!0)}]]
function ft(t,n,e){return e[0]===t&&e[1]===n}function dt(t){const n=!(it||(it=new RegExp("<b>|Bottle|Brew|Draft|Elixir|Potion|Jagua Egg|Gut Rot Head Splitter|Serum")),it).test(t.previousElementSibling.innerHTML),e=2===t.children.length
return lt.find(a(ft,n,e))[2]()}function mt(t,n,e){return n[e]=t[e],n}function bt(t){return f(t).sort(F).reduce(a(mt,t),{})}let ht,gt,yt
function Mt(t,n,e,o){return"Ignore"!==t.myMap[o]&&(e[t.myMap[o]]?e[t.myMap[o]]+=n[o]:e[t.myMap[o]]=n[o]),e}function jt(t,n,e,o){return`${e}<tr><td>${o}</td><td style="background-color: ${function(t){const n=Math.max(Math.min(t,100),0)
let e,o
return n<50?(e=255,o=Math.round(5.1*n)):(o=255,e=Math.round(510-5.1*n)),"#"+("000000"+(65536*e+256*o+0).toString(16)).slice(-6)}((n[o]-t.minpoint)/(t.maxpoint-t.minpoint)*100)};">${n[o].toString()}</td></tr>`}function Lt(t,n){c("potReport","drawInventory")
const e=bt(f(n).reduce(a(Mt,t,n),{}))
i(`<table><tbody>${f(e).reduce(a(jt,t,e),"")}</tbody></table>`,ht)}function xt(){const t=_()
return t.insertCell(-1),t.insertCell(-1),t}function Ct(t){const n=b("option",e)
var e
return n.value=t,n.text=t,n}function It(t,n){m(t,Ct(n[0]))}function $t(t){if(!yt){yt=xt()
const n=function(t){const n=z({className:"tip-static",dataset:{tipped:'Set to "Ignore" to exclude from report'}})
return m(n,Ct("Ignore")),t.forEach(a(It,n)),n}(t)
m(yt.cells[1],n)}return yt.cloneNode(!0)}function Nt(t,n,e,o){const a=$t(o)
y(n[0],a.cells[0])
const r=a.cells[1].children[0];[r.name,r.value]=n,m(t.tBodies[0],a)}function kt(t,n,e){const o=A({id:n,type:"button",value:e})
m(t.cells[1],o)}function vt(t){const n=xt()
return kt(n,"fshIgnoreAll","Ignore All"),M(n.cells[1],"&nbsp;"),kt(n,"fshReset","Reset"),m(t.tBodies[0],n),0}function Ht(t){c("potReport","drawMapping")
const n=P({innerHTML:"<tbody></tbody>"})
gt.replaceChild(n,gt.children[0]),h(3,B,[[5,3,g(t.myMap),0,a(Nt,n),a(vt,n)]])}const Rt="fsh_potMap",St={pottab1:!1,pottab2:!1,pottab3:!1,myMap:{},minpoint:12,maxpoint:20}
function Tt(t,n){t.myMap[n]||(t.myMap[n]=n)}function wt(t,n,e){"SELECT"===e.target.tagName&&(t.myMap[e.target.name]=e.target.value,C(Rt,t),Lt(t,n))}function At(t,n,e){return n[e]=t?"Ignore":e,n}function Et(t,n,e){!function(t,n,e){t.myMap=f(n).reduce(a(At,e),{})}(t,n,e),C(Rt,t),Ht(t),Lt(t,n)}function Gt(t){return/^pottab\d$/.test(t.id)}function Bt(t,n){t[n.id]=n.checked,C(Rt,t)}function Dt(t,n,e){const o=e.target.id,a=E(e.target.value,0,999)
a&&(t[o]=a,C(Rt,t),Lt(t,n))}function Ft(n,e,o){I(o,"change",a(wt,n,e)),t(o,J(function(t,n){return[[q("fshIgnoreAll"),a(Et,t,n,!0)],[q("fshReset"),a(Et,t,n,null)],[Gt,a(Bt,t)]]}(n,e))),I(o,"input",a(Dt,n,e))}function Pt(t,n){const e=function(t){return l({id:"potReport",innerHTML:`<input id="pottab1" type="checkbox"${D(t.pottab1)}><label for="pottab1">Composed Potion Inventory</label><input id="pottab2" type="checkbox"${D(t.pottab2)}><label for="pottab2">Mapping</label><input id="pottab3" type="checkbox"${D(t.pottab3)}><label for="pottab3">Thresholds</label>`})}(t),r=l({id:"panels"})
m(e,r),function(t,n,e){ht=l({id:"inventory"}),t.pottab1?Lt(t,n):d(e.parentNode.children[0],"change",a(Lt,t,n)),m(e,ht)}(t,n,r),function(t,n){gt=l({id:"mapping",innerHTML:"<p></p>"}),t.pottab2?Ht(t):d(n.parentNode.children[2],"change",a(Ht,t)),m(n,gt)}(t,r),function(t,n){const e=l({id:"thresholds",innerHTML:`Min:<input id="minpoint" type="number" value="${t.minpoint}" min="0" max="999">Max:<input id="maxpoint" type="number" value="${t.maxpoint}" min="0" max="999">`})
m(n,e)}(t,r),m(function(t,n){const e=o.lastElementChild.insertRow(2).insertCell(-1)
return Ft(t,n,e),e}(t,n),e)}function Wt(t,n){const e=L({},St)
L(e,x(n,{})),e.myMap=function(t,n){return f(n).forEach(a(Tt,t)),bt(t.myMap)}(e,t),C(Rt,e),Pt(e,t)}function _t(t){j(Rt).then(a(Wt,t))}let Jt,qt,zt,Kt,Qt
function Ut(t,n){const e=qt[n]
m(e,t)}function Yt(t){Jt.push(dt(t)),function(t){if(t.endsWith(" (Potion)")){const n=t.slice(0,-9)
zt[n]=(zt[n]||0)+1}}(t.previousElementSibling.innerHTML)}function Ot(){B([5,3,Jt,0,Ut,a(_t,zt)])}function Vt(){qt=$("#pCC table table tr:not(.fshHide) td:nth-of-type(3n)"),zt={},Jt=[],B([5,3,qt,0,Yt,Ot])}function Xt(t){const n=N(t)
k.membrList[n]&&i(function(t){return`${G({last_login:k.membrList[t].last_login})}<a href="${v}${k.membrList[t].id}">${t}</a> [ <span class="a-reply fshLink" target_player=${t}>m</span> ]`}(n),t)}function Zt(){const t=$('#pCC table table tr:not(.fshHide) td[bgcolor="#DAA534"][colspan="2"] b')
B([5,3,t,0,Xt])}function tn(t){t.children[0].hasAttribute("bgcolor")&&(Qt=T(Kt,t.children[0].children[0])),Qt||(t.className="fshHide")}function nn(){if(Kt=H("user"),!Kt)return
if(!R('#pCC table table td[bgcolor="#DAA534"] b').some(S(Kt)))return
const t=$("#pCC table table tr")
B([5,2,t,0,tn])}function en(){h(3,Zt)}export default function(){w()||(K(!1).then(en),h(2,nn),h(3,Vt),t(e("table",o)[1],n(et)))}
//# sourceMappingURL=guildReport-029409b3.js.map
