import{o as t,bD as n,b as e,p as o,s as a,c1 as r,z as i,at as s,R as c,C as u,be as p,k as l,ag as f,K as d,f as m,m as b,a as h,l as g,y,i as M,a4 as j,n as L,$ as x,a6 as C,e as I,ah as $,A as R,c as v,_ as H,M as N,I as k,b8 as T,bh as S,w}from"./calfSystem-740ec4d2.js"
import"./numberIsNaN-2fbabd4d.js"
import"./toLowerCase-dcd4458e.js"
import{c as A}from"./createInput-e6e1d6b3.js"
import{t as E}from"./testRange-c1779f47.js"
import{o as D}from"./onlineDot-176ac2e8.js"
import{b as G}from"./batch-b6a89158.js"
import"./currentGuildId-ce4d8404.js"
import{i as B}from"./isChecked-3cb537d5.js"
import{a as F}from"./alpha-28899565.js"
import{c as W}from"./createTable-0cac6208.js"
import"./dialogMsg-a44aafc4.js"
import"./errorDialog-d5947e19.js"
import"./dialog-004172c3.js"
import"./indexAjaxJson-1e1af708.js"
import{e as _}from"./useItem-6598ea1f.js"
import"./ajaxReturnCode-e6ac4096.js"
import"./daUseItem-77f590b8.js"
import{c as P}from"./createTr-23c406d8.js"
import{e as J}from"./eventHandler5-0c9435d1.js"
import"./cmdExport-7c541a4f.js"
import{s as q}from"./selfIdIs-154fe41e.js"
import{c as z}from"./createSelect-b7c26f37.js"
import{g as K}from"./getMembrList-cd652176.js"
import"./guildInventory-34eff095.js"
import{a as Q}from"./queue-8b390c55.js"
function U(t){return t.match(/&id=(\d+)/)[1]}const Y=`<span class="guildReportSpinner" style="background-image: url('${s}ui/misc/spinner.gif');"></span>`
function O(t){i('<span class="fastWorn">Worn</span>',t)}function V(t){return t.match(u)[1]}function X(t,n,e){1!==e.r&&("recall"===t?function(t){i('<span class="fastWorn">You successfully recalled the item</span>',t)}(n):O(n))}function Z(t,n,e,o){Q(U(n),V(n),e,o).then(a(X,o,t))}function tt(t,n,e){Z(t,n,e,"recall")}const nt=[["fast-bp",function(t,n){c("GuildReport","Fast BP"),tt(t,n,0)}],["fast-gs",function(t,n){c("GuildReport","Fast GS"),tt(t,n,1)}],["fast-wear",function(t,n){c("GuildReport","Fast Wear"),Number(V(n))===p()?_(U(n)).then(a(O,t)):Z(t,n,0,"wear")}]]
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
i(`<table><tbody>${f(e).reduce(a(jt,t,e),"")}</tbody></table>`,ht)}function xt(){const t=P()
return t.insertCell(-1),t.insertCell(-1),t}function Ct(t){const n=b("option",e)
var e
return n.value=t,n.text=t,n}function It(t,n){m(t,Ct(n[0]))}function $t(t){if(!yt){yt=xt()
const n=function(t){const n=z({className:"tip-static",dataset:{tipped:'Set to "Ignore" to exclude from report'}})
return m(n,Ct("Ignore")),t.forEach(a(It,n)),n}(t)
m(yt.cells[1],n)}return yt.cloneNode(!0)}function Rt(t,n,e,o){const a=$t(o)
y(n[0],a.cells[0])
const r=a.cells[1].children[0];[r.name,r.value]=n,m(t.tBodies[0],a)}function vt(t,n,e){const o=A({id:n,type:"button",value:e})
m(t.cells[1],o)}function Ht(t){const n=xt()
return vt(n,"fshIgnoreAll","Ignore All"),M(n.cells[1],"&nbsp;"),vt(n,"fshReset","Reset"),m(t.tBodies[0],n),0}function Nt(t){c("potReport","drawMapping")
const n=W({innerHTML:"<tbody></tbody>"})
gt.replaceChild(n,gt.children[0]),h(3,G,[[5,3,g(t.myMap),0,a(Rt,n),a(Ht,n)]])}const kt="fsh_potMap",Tt={pottab1:!1,pottab2:!1,pottab3:!1,myMap:{},minpoint:12,maxpoint:20}
function St(t,n){t.myMap[n]||(t.myMap[n]=n)}function wt(t,n,e){"SELECT"===e.target.tagName&&(t.myMap[e.target.name]=e.target.value,C(kt,t),Lt(t,n))}function At(t,n,e){return n[e]=t?"Ignore":e,n}function Et(t,n,e){!function(t,n,e){t.myMap=f(n).reduce(a(At,e),{})}(t,n,e),C(kt,t),Nt(t),Lt(t,n)}function Dt(t){return/^pottab\d$/.test(t.id)}function Gt(t,n){t[n.id]=n.checked,C(kt,t)}function Bt(t,n,e){const o=e.target.id,a=E(e.target.value,0,999)
a&&(t[o]=a,C(kt,t),Lt(t,n))}function Ft(n,e,o){I(o,"change",a(wt,n,e)),t(o,J(function(t,n){return[[q("fshIgnoreAll"),a(Et,t,n,!0)],[q("fshReset"),a(Et,t,n,null)],[Dt,a(Gt,t)]]}(n,e))),I(o,"input",a(Bt,n,e))}function Wt(t,n){const e=function(t){return l({id:"potReport",innerHTML:`<input id="pottab1" type="checkbox"${B(t.pottab1)}><label for="pottab1">Composed Potion Inventory</label><input id="pottab2" type="checkbox"${B(t.pottab2)}><label for="pottab2">Mapping</label><input id="pottab3" type="checkbox"${B(t.pottab3)}><label for="pottab3">Thresholds</label>`})}(t),r=l({id:"panels"})
m(e,r),function(t,n,e){ht=l({id:"inventory"}),t.pottab1?Lt(t,n):d(e.parentNode.children[0],"change",a(Lt,t,n)),m(e,ht)}(t,n,r),function(t,n){gt=l({id:"mapping",innerHTML:"<p></p>"}),t.pottab2?Nt(t):d(n.parentNode.children[2],"change",a(Nt,t)),m(n,gt)}(t,r),function(t,n){const e=l({id:"thresholds",innerHTML:`Min:<input id="minpoint" type="number" value="${t.minpoint}" min="0" max="999">Max:<input id="maxpoint" type="number" value="${t.maxpoint}" min="0" max="999">`})
m(n,e)}(t,r),m(function(t,n){const e=o.lastElementChild.insertRow(2).insertCell(-1)
return Ft(t,n,e),e}(t,n),e)}function _t(t,n){const e=L({},Tt)
L(e,x(n,{})),e.myMap=function(t,n){return f(n).forEach(a(St,t)),bt(t.myMap)}(e,t),C(kt,e),Wt(e,t)}function Pt(t){j(kt).then(a(_t,t))}let Jt,qt,zt,Kt,Qt
function Ut(t,n){const e=qt[n]
m(e,t)}function Yt(t){Jt.push(dt(t)),function(t){if(t.endsWith(" (Potion)")){const n=t.slice(0,-9)
zt[n]=(zt[n]||0)+1}}(t.previousElementSibling.innerHTML)}function Ot(){G([5,3,Jt,0,Ut,a(Pt,zt)])}function Vt(){qt=$("#pCC table table tr:not(.fshHide) td:nth-of-type(3n)"),zt={},Jt=[],G([5,3,qt,0,Yt,Ot])}function Xt(t){const n=R(t)
v.membrList[n]&&i(function(t){return`${D({last_login:v.membrList[t].last_login})}<a href="${H}${v.membrList[t].id}">${t}</a> [ <span class="a-reply fshLink" target_player=${t}>m</span> ]`}(n),t)}function Zt(){const t=$('#pCC table table tr:not(.fshHide) td[bgcolor="#DAA534"][colspan="2"] b')
G([5,3,t,0,Xt])}function tn(t){t.children[0].hasAttribute("bgcolor")&&(Qt=S(Kt,t.children[0].children[0])),Qt||(t.className="fshHide")}function nn(){if(Kt=N("user"),!Kt)return
if(!k('#pCC table table td[bgcolor="#DAA534"] b').some(T(Kt)))return
const t=$("#pCC table table tr")
G([5,2,t,0,tn])}function en(){h(3,Zt)}export default function(){w()||(K(!1).then(en),h(2,nn),h(3,Vt),t(e("table",o)[1],n(et)))}
//# sourceMappingURL=guildReport-f76d13f1.js.map
