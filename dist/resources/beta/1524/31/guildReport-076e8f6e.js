import{o as t,bM as n,b as e,p as o,t as a,bZ as r,A as i,aj as s,U as c,b_ as u,au as p,m as l,aN as f,O as d,h as m,n as b,f as g,a as h,e as y,z as M,i as j,q as L,a2 as x,a9 as $,B as C,c as v,a1 as I,Q as N,D as H,ar as T,aA as R,x as S}from"./calfSystem-47fc08ae.js"
import{e as k}from"./useItem-cee16f1c.js"
import{a as w}from"./queue-3da49e7a.js"
import{g as E}from"./getMembrList-55873124.js"
import{b as A}from"./batch-cd69b94b.js"
import{e as B}from"./eventHandler5-32312767.js"
import{i as D}from"./isChecked-1c18cd61.js"
import{s as G}from"./selfIdIs-16c65443.js"
import{a as F}from"./alpha-80a926ba.js"
import{t as W}from"./testRange-1fdfe636.js"
import{c as _}from"./createInput-e0371f2c.js"
import{c as P}from"./createSelect-0a182dfb.js"
import{c as q}from"./createTable-c916e6a3.js"
import{c as J}from"./createTr-009fb5b7.js"
import{g as Q,s as U}from"./idb-b72d80f0.js"
import{o as z}from"./onlineDot-b5276d0b.js"
import"./dialog-d161529e.js"
import"./dialogMsg-844edf4e.js"
import"./indexAjaxJson-be24760c.js"
import"./daUseItem-f2fce1a1.js"
import"./errorDialog-9d880b0d.js"
import"./guildInventory-599ef5b2.js"
import"./guild-36586aac.js"
import"./currentGuildId-72bd2a1a.js"
import"./cmdExport-ca6a6b3e.js"
import"./toLowerCase-51740687.js"
import"./numberIsNaN-53300e34.js"
function O(t){return t.match(/&id=(\d+)/)[1]}const Y=`<span class="guildReportSpinner" style="background-image: url('${s}ui/misc/spinner.gif');"></span>`
function Z(t){i('<span class="fastWorn">Worn</span>',t)}function K(t){return t.match(u)[1]}function V(t,n,e){1!==e.r&&("recall"===t?function(t){i('<span class="fastWorn">You successfully recalled the item</span>',t)}(n):Z(n))}function X(t,n,e,o){w(O(n),K(n),e,o).then(a(V,o,t))}function tt(t,n,e){X(t,n,e,"recall")}const nt=[["fast-bp",function(t,n){c("GuildReport","Fast BP"),tt(t,n,0)}],["fast-gs",function(t,n){c("GuildReport","Fast GS"),tt(t,n,1)}],["fast-wear",function(t,n){c("GuildReport","Fast Wear"),Number(K(n))===p()?k(O(n)).then(a(Z,t)):X(t,n,0,"wear")}]]
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
return n<50?(e=255,o=Math.round(5.1*n)):(o=255,e=Math.round(510-5.1*n)),`#${`000000${(65536*e+256*o+0).toString(16)}`.slice(-6)}`}((n[o]-t.minpoint)/(t.maxpoint-t.minpoint)*100)};">${n[o].toString()}</td></tr>`}function Lt(t,n){c("potReport","drawInventory")
const e=bt(f(n).reduce(a(Mt,t,n),{}))
i(`<table><tbody>${f(e).reduce(a(jt,t,e),"")}</tbody></table>`,gt)}function xt(){const t=J()
return t.insertCell(-1),t.insertCell(-1),t}function $t(t){const n=b("option",e)
var e
return n.value=t,n.text=t,n}function Ct(t,n){m(t,$t(n[0]))}function vt(){if(!yt){yt=xt()
const t=P({className:"tip-static",dataset:{tipped:'Set to "Ignore" to exclude from report'},style:{width:"130px"}})
m(yt.cells[1],t)}return yt.cloneNode(!0)}function It(t,n){const e=vt()
M(n[0],e.cells[0])
const o=e.cells[1].children[0]
m(o,$t(n[1])),[o.name,o.value]=n,m(t.tBodies[0],e)}function Nt(t,n,e){const o=_({id:n,type:"button",value:e})
m(t.cells[1],o)}function Ht(t){const n=xt()
Nt(n,"fshIgnoreAll","Ignore All"),j(n.cells[1],"&nbsp;"),Nt(n,"fshReset","Reset"),m(t.tBodies[0],n)}function Tt(t,n){if("SELECT"===n.target.tagName){const e=n.target,{value:o}=e
i("",e),m(e,$t("Ignore")),y(t).forEach(a(Ct,e)),e.value=o}}function Rt(t){c("potReport","drawMapping")
const n=q({innerHTML:"<tbody></tbody>"})
ht.replaceChild(n,ht.children[0]),g(ht,"mousedown",a(Tt,t.myMap)),h(3,A,[[5,3,y(t.myMap),0,a(It,n),a(Ht,n)]])}const St="fsh_potMap",kt={pottab1:!1,pottab2:!1,pottab3:!1,myMap:{},minpoint:12,maxpoint:20}
function wt(t,n){t.myMap[n]||(t.myMap[n]=n)}function Et(t,n,e){"SELECT"===e.target.tagName&&(t.myMap[e.target.name]=e.target.value,U(St,t),Lt(t,n))}function At(t,n,e){return n[e]=t?"Ignore":e,n}function Bt(t,n,e){!function(t,n,e){t.myMap=f(n).reduce(a(At,e),{})}(t,n,e),U(St,t),Rt(t),Lt(t,n)}function Dt(t){return/^pottab\d$/.test(t.id)}function Gt(t,n){t[n.id]=n.checked,U(St,t)}function Ft(t,n,e){const o=e.target.id,a=W(e.target.value,0,999)
a&&(t[o]=a,U(St,t),Lt(t,n))}function Wt(n,e,o){g(o,"change",a(Et,n,e)),t(o,B(function(t,n){return[[G("fshIgnoreAll"),a(Bt,t,n,!0)],[G("fshReset"),a(Bt,t,n,null)],[Dt,a(Gt,t)]]}(n,e))),g(o,"input",a(Ft,n,e))}function _t(t,n){const e=function(t){return l({id:"potReport",innerHTML:`<input id="pottab1" type="checkbox"${D(t.pottab1)}><label for="pottab1">Composed Potion Inventory</label><input id="pottab2" type="checkbox"${D(t.pottab2)}><label for="pottab2">Mapping</label><input id="pottab3" type="checkbox"${D(t.pottab3)}><label for="pottab3">Thresholds</label>`})}(t),r=l({id:"panels"})
m(e,r),function(t,n,e){gt=l({id:"inventory"}),t.pottab1?Lt(t,n):d(e.parentNode.children[0],"change",a(Lt,t,n)),m(e,gt)}(t,n,r),function(t,n){ht=l({id:"mapping",innerHTML:"<p></p>"}),t.pottab2?Rt(t):d(n.parentNode.children[2],"change",a(Rt,t)),m(n,ht)}(t,r),function(t,n){const e=l({id:"thresholds",innerHTML:`Min:<input id="minpoint" type="number" value="${t.minpoint}" min="0" max="999">Max:<input id="maxpoint" type="number" value="${t.maxpoint}" min="0" max="999">`})
m(n,e)}(t,r),m(function(t,n){const e=o.lastElementChild.insertRow(2).insertCell(-1)
return Wt(t,n,e),e}(t,n),e)}function Pt(t,n){const e=L({},kt)
L(e,x(n,{})),e.myMap=function(t,n){return f(n).forEach(a(wt,t)),bt(t.myMap)}(e,t),U(St,e),_t(e,t)}function qt(t){Q(St).then(a(Pt,t))}let Jt,Qt,Ut,zt,Ot
function Yt(t,n){const e=Qt[n]
m(e,t)}function Zt(t){Jt.push(dt(t)),function(t){if(t.endsWith(" (Potion)")){const n=t.slice(0,-9)
Ut[n]=(Ut[n]||0)+1}}(t.previousElementSibling.innerHTML)}function Kt(){A([5,3,Jt,0,Yt,a(qt,Ut)])}function Vt(){Qt=$("#pCC table table tr:not(.fshHide) td:nth-of-type(3n)"),Ut={},Jt=[],A([5,3,Qt,0,Zt,Kt])}function Xt(t){const n=C(t)
v.membrList[n]&&i(function(t){return`${z({last_login:v.membrList[t].last_login})}<a href="${I}${v.membrList[t].id}">${t}</a> [ <span class="a-reply fshLink" target_player=${t}>m</span> ]`}(n),t)}function tn(){const t=$('#pCC table table tr:not(.fshHide) td[bgcolor="#DAA534"][colspan="2"] b')
A([5,3,t,0,Xt])}function nn(t){t.children[0].hasAttribute("bgcolor")&&(Ot=R(zt,t.children[0].children[0])),Ot||(t.className="fshHide")}function en(){if(zt=N("user"),!zt)return
if(!H('#pCC table table td[bgcolor="#DAA534"] b').some(T(zt)))return
const t=$("#pCC table table tr")
A([5,2,t,0,nn])}function on(){h(3,tn)}function an(){S()||(E(!1).then(on),h(2,en),h(3,Vt),t(e("table",o)[1],n(et)))}export default an
//# sourceMappingURL=guildReport-076e8f6e.js.map
