import{o as t,bQ as n,b as e,p as o,t as a,c1 as r,A as i,al as s,W as c,c2 as p,aB as u,m as l,aV as f,P as d,h as m,n as b,f as g,a as h,e as y,z as M,i as j,q as L,a4 as x,ab as $,B as C,c as v,a3 as I,S as N,D as H,ay as S,aG as T,x as R}from"./calfSystem-19a5d332.js"
import{e as k}from"./useItem-15a1e3d7.js"
import{a as w}from"./queue-6b778664.js"
import{g as E}from"./getMembrList-24395dcd.js"
import{b as A}from"./batch-2bc71ae7.js"
import{e as B}from"./eventHandler5-6e4ec1c8.js"
import{i as G}from"./isChecked-00f5c23d.js"
import{s as D}from"./selfIdIs-ea044f40.js"
import{a as W}from"./alpha-6743d5a2.js"
import{t as F}from"./testRange-edf4a984.js"
import{c as P}from"./createInput-85638c5e.js"
import{c as _}from"./createSelect-e114f3f9.js"
import{c as q}from"./createTable-13078520.js"
import{c as J}from"./createTr-3100ef5f.js"
import{g as Q,s as z}from"./idb-faef0351.js"
import{o as U}from"./onlineDot-f2638c3d.js"
import"./dialog-2c5b535b.js"
import"./dialogMsg-0a235932.js"
import"./indexAjaxJson-bdfce70d.js"
import"./daUseItem-9248e8fc.js"
import"./errorDialog-56c5d78c.js"
import"./guildInventory-e0ab34f8.js"
import"./guild-88fea2a0.js"
import"./currentGuildId-daa4c793.js"
import"./cmdExport-bf03c29e.js"
import"./toLowerCase-ace931b6.js"
import"./numberIsNaN-fecd7e6d.js"
function V(t){return t.match(/&id=(\d+)/)[1]}const Y=`<span class="guildReportSpinner" style="background-image: url('${s}ui/misc/spinner.gif');"></span>`
function K(t){i('<span class="fastWorn">Worn</span>',t)}function O(t){return t.match(p)[1]}function X(t,n,e){1!==e.r&&("recall"===t?function(t){i('<span class="fastWorn">You successfully recalled the item</span>',t)}(n):K(n))}function Z(t,n,e,o){w(V(n),O(n),e,o).then(a(X,o,t))}function tt(t,n,e){Z(t,n,e,"recall")}const nt=[["fast-bp",function(t,n){c("GuildReport","Fast BP"),tt(t,n,0)}],["fast-gs",function(t,n){c("GuildReport","Fast GS"),tt(t,n,1)}],["fast-wear",function(t,n){c("GuildReport","Fast Wear"),Number(O(n))===u()?k(V(n)).then(a(K,t)):Z(t,n,0,"wear")}]]
const et=[["sendLink",function(t){const n=t.parentNode.parentNode
if(!n)return
const{href:e}=n.children[0]
e&&(nt.find(a(r,t))[1](n,e),i(Y,n))}],["a-reply",function(t){window.openQuickMsgDialog(t.getAttribute("target_player"))}]]
const ot='<span class="sendLink fast-bp">Fast BP</span> | ',at='<span class="sendLink fast-gs">Fast GS</span>',rt=' | <span class="sendLink fast-wear">Fast Wear</span>'
let it,st,ct,pt,ut
const lt=[[!0,!0,function(){return pt||(pt=l({innerHTML:ot+at+rt})),pt.cloneNode(!0)}],[!0,!1,function(){return ut||(ut=l({innerHTML:at+rt})),ut.cloneNode(!0)}],[!1,!0,function(){return ct||(ct=l({innerHTML:ot+at})),ct.cloneNode(!0)}],[!1,!1,function(){return st||(st=l({innerHTML:at})),st.cloneNode(!0)}]]
function ft(t,n,e){return e[0]===t&&e[1]===n}function dt(t){const n=!(it||(it=new RegExp("<b>|Bottle|Brew|Draft|Elixir|Potion|Jagua Egg|Gut Rot Head Splitter|Serum")),it).test(t.previousElementSibling.innerHTML),e=2===t.children.length
return lt.find(a(ft,n,e))[2]()}function mt(t,n,e){return n[e]=t[e],n}function bt(t){return f(t).sort(W).reduce(a(mt,t),{})}let gt,ht,yt
function Mt(t,n,e,o){return"Ignore"!==t.myMap[o]&&(e[t.myMap[o]]?e[t.myMap[o]]+=n[o]:e[t.myMap[o]]=n[o]),e}function jt(t,n,e,o){return`${e}<tr><td>${o}</td><td style="background-color: ${function(t){const n=Math.max(Math.min(t,100),0)
let e,o
return n<50?(e=255,o=Math.round(5.1*n)):(o=255,e=Math.round(510-5.1*n)),`#${`000000${(65536*e+256*o+0).toString(16)}`.slice(-6)}`}((n[o]-t.minpoint)/(t.maxpoint-t.minpoint)*100)};">${n[o].toString()}</td></tr>`}function Lt(t,n){c("potReport","drawInventory")
const e=bt(f(n).reduce(a(Mt,t,n),{}))
i(`<table><tbody>${f(e).reduce(a(jt,t,e),"")}</tbody></table>`,gt)}function xt(){const t=J()
return t.insertCell(-1),t.insertCell(-1),t}function $t(t){const n=b("option",e)
var e
return n.value=t,n.text=t,n}function Ct(t,n){m(t,$t(n[0]))}function vt(){if(!yt){yt=xt()
const t=_({className:"tip-static",dataset:{tipped:'Set to "Ignore" to exclude from report'},style:{width:"130px"}})
m(yt.cells[1],t)}return yt.cloneNode(!0)}function It(t,n){const e=vt()
M(n[0],e.cells[0])
const o=e.cells[1].children[0]
m(o,$t(n[1])),[o.name,o.value]=n,m(t.tBodies[0],e)}function Nt(t,n,e){const o=P({id:n,type:"button",value:e})
m(t.cells[1],o)}function Ht(t){const n=xt()
Nt(n,"fshIgnoreAll","Ignore All"),j(n.cells[1],"&nbsp;"),Nt(n,"fshReset","Reset"),m(t.tBodies[0],n)}function St(t,n){if("SELECT"===n.target.tagName){const e=n.target,{value:o}=e
i("",e),m(e,$t("Ignore")),y(t).forEach(a(Ct,e)),e.value=o}}function Tt(t){c("potReport","drawMapping")
const n=q({innerHTML:"<tbody></tbody>"})
ht.replaceChild(n,ht.children[0]),g(ht,"mousedown",a(St,t.myMap)),h(3,A,[[5,3,y(t.myMap),0,a(It,n),a(Ht,n)]])}const Rt="fsh_potMap",kt={pottab1:!1,pottab2:!1,pottab3:!1,myMap:{},minpoint:12,maxpoint:20}
function wt(t,n){t.myMap[n]||(t.myMap[n]=n)}function Et(t,n,e){"SELECT"===e.target.tagName&&(t.myMap[e.target.name]=e.target.value,z(Rt,t),Lt(t,n))}function At(t,n,e){return n[e]=t?"Ignore":e,n}function Bt(t,n,e){!function(t,n,e){t.myMap=f(n).reduce(a(At,e),{})}(t,n,e),z(Rt,t),Tt(t),Lt(t,n)}function Gt(t){return/^pottab\d$/.test(t.id)}function Dt(t,n){t[n.id]=n.checked,z(Rt,t)}function Wt(t,n,e){const o=e.target.id,a=F(e.target.value,0,999)
a&&(t[o]=a,z(Rt,t),Lt(t,n))}function Ft(n,e,o){g(o,"change",a(Et,n,e)),t(o,B(function(t,n){return[[D("fshIgnoreAll"),a(Bt,t,n,!0)],[D("fshReset"),a(Bt,t,n,null)],[Gt,a(Dt,t)]]}(n,e))),g(o,"input",a(Wt,n,e))}function Pt(t,n){const e=function(t){return l({id:"potReport",innerHTML:`<input id="pottab1" type="checkbox"${G(t.pottab1)}><label for="pottab1">Composed Potion Inventory</label><input id="pottab2" type="checkbox"${G(t.pottab2)}><label for="pottab2">Mapping</label><input id="pottab3" type="checkbox"${G(t.pottab3)}><label for="pottab3">Thresholds</label>`})}(t),r=l({id:"panels"})
m(e,r),function(t,n,e){gt=l({id:"inventory"}),t.pottab1?Lt(t,n):d(e.parentNode.children[0],"change",a(Lt,t,n)),m(e,gt)}(t,n,r),function(t,n){ht=l({id:"mapping",innerHTML:"<p></p>"}),t.pottab2?Tt(t):d(n.parentNode.children[2],"change",a(Tt,t)),m(n,ht)}(t,r),function(t,n){const e=l({id:"thresholds",innerHTML:`Min:<input id="minpoint" type="number" value="${t.minpoint}" min="0" max="999">Max:<input id="maxpoint" type="number" value="${t.maxpoint}" min="0" max="999">`})
m(n,e)}(t,r),m(function(t,n){const e=o.lastElementChild.insertRow(2).insertCell(-1)
return Ft(t,n,e),e}(t,n),e)}function _t(t,n){const e=L({},kt)
L(e,x(n,{})),e.myMap=function(t,n){return f(n).forEach(a(wt,t)),bt(t.myMap)}(e,t),z(Rt,e),Pt(e,t)}function qt(t){Q(Rt).then(a(_t,t))}let Jt,Qt,zt,Ut,Vt
function Yt(t,n){const e=Qt[n]
m(e,t)}function Kt(t){Jt.push(dt(t)),function(t){if(t.endsWith(" (Potion)")){const n=t.slice(0,-9)
zt[n]=(zt[n]||0)+1}}(t.previousElementSibling.innerHTML)}function Ot(){A([5,3,Jt,0,Yt,a(qt,zt)])}function Xt(){Qt=$("#pCC table table tr:not(.fshHide) td:nth-of-type(3n)"),zt={},Jt=[],A([5,3,Qt,0,Kt,Ot])}function Zt(t){const n=C(t)
v.membrList[n]&&i(function(t){return`${U({last_login:v.membrList[t].last_login})}<a href="${I}${v.membrList[t].id}">${t}</a> [ <span class="a-reply fshLink" target_player=${t}>m</span> ]`}(n),t)}function tn(){const t=$('#pCC table table tr:not(.fshHide) td[bgcolor="#DAA534"][colspan="2"] b')
A([5,3,t,0,Zt])}function nn(t){t.children[0].hasAttribute("bgcolor")&&(Vt=T(Ut,t.children[0].children[0])),Vt||(t.className="fshHide")}function en(){if(Ut=N("user"),!Ut)return
if(!H('#pCC table table td[bgcolor="#DAA534"] b').some(S(Ut)))return
const t=$("#pCC table table tr")
A([5,2,t,0,nn])}function on(){h(3,tn)}function an(){R()||(E(!1).then(on),h(2,en),h(3,Xt),t(e("table",o)[1],n(et)))}export default an
//# sourceMappingURL=guildReport-33888247.js.map
