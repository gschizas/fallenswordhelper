import{o as t,bZ as n,b as e,p as o,u as a,cm as r,B as s,aH as i,a0 as c,E as u,bs as p,k as l,ax as f,P as d,f as m,q as b,a as h,n as g,A as y,i as M,ah as j,aR as L,aa as C,aj as x,e as $,az as v,C as H,c as I,a9 as R,X as N,M as k,b5 as T,bv as S,y as w}from"./calfSystem-d96a3efd.js"
import"./numberIsNaN-5b8bfc11.js"
import"./toLowerCase-a0540d2c.js"
import{c as E}from"./createInput-2717f905.js"
import{t as A}from"./testRange-4bdd4227.js"
import{o as B}from"./onlineDot-17edd2c6.js"
import{b as D}from"./batch-cdb16fc8.js"
import{i as F}from"./isChecked-028fa109.js"
import{a as G}from"./alpha-2978f86d.js"
import{c as P}from"./createTable-13920811.js"
import"./dialogMsg-da77a98e.js"
import"./errorDialog-70b04a3c.js"
import"./dialog-62f3abd8.js"
import{e as W}from"./useItem-d0013989.js"
import"./ajaxReturnCode-2df80530.js"
import"./daUseItem-4a0793b9.js"
import{c as _}from"./createTr-441d9d7e.js"
import{e as q}from"./eventHandler5-d9435eb5.js"
import{s as z}from"./selfIdIs-1c8b1e34.js"
import{c as J}from"./createSelect-2686597e.js"
import{g as Q}from"./getMembrList-5baa5a87.js"
import"./guildInventory-2b763753.js"
import{a as U}from"./queue-5bf1259c.js"
function X(t){return t.match(/&id=(\d+)/)[1]}const Y=`<span class="guildReportSpinner" style="background-image: url('${i}ui/misc/spinner.gif');"></span>`
function Z(t){s('<span class="fastWorn">Worn</span>',t)}function K(t){return t.match(u)[1]}function O(t,n,e){1!==e.r&&("recall"===t?function(t){s('<span class="fastWorn">You successfully recalled the item</span>',t)}(n):Z(n))}function V(t,n,e,o){U(X(n),K(n),e,o).then(a(O,o,t))}function tt(t,n,e){V(t,n,e,"recall")}const nt=[["fast-bp",function(t,n){c("GuildReport","Fast BP"),tt(t,n,0)}],["fast-gs",function(t,n){c("GuildReport","Fast GS"),tt(t,n,1)}],["fast-wear",function(t,n){c("GuildReport","Fast Wear"),Number(K(n))===p()?W(X(n)).then(a(Z,t)):V(t,n,0,"wear")}]]
const et=[["sendLink",function(t){const n=t.parentNode.parentNode
if(!n)return
const{href:e}=n.children[0]
e&&(nt.find(a(r,t))[1](n,e),s(Y,n))}],["a-reply",function(t){window.openQuickMsgDialog(t.getAttribute("target_player"))}]]
const ot='<span class="sendLink fast-bp">Fast BP</span> | ',at='<span class="sendLink fast-gs">Fast GS</span>',rt=' | <span class="sendLink fast-wear">Fast Wear</span>'
let st,it,ct,ut,pt
const lt=[[!0,!0,function(){return ut||(ut=l({innerHTML:ot+at+rt})),ut.cloneNode(!0)}],[!0,!1,function(){return pt||(pt=l({innerHTML:at+rt})),pt.cloneNode(!0)}],[!1,!0,function(){return ct||(ct=l({innerHTML:ot+at})),ct.cloneNode(!0)}],[!1,!1,function(){return it||(it=l({innerHTML:at})),it.cloneNode(!0)}]]
function ft(t,n,e){return e[0]===t&&e[1]===n}function dt(t){const n=!(st||(st=new RegExp("<b>|Bottle|Brew|Draft|Elixir|Potion|Jagua Egg|Gut Rot Head Splitter|Serum")),st).test(t.previousElementSibling.innerHTML),e=2===t.children.length
return lt.find(a(ft,n,e))[2]()}function mt(t,n,e){return n[e]=t[e],n}function bt(t){return f(t).sort(G).reduce(a(mt,t),{})}let ht,gt,yt
function Mt(t,n,e,o){return"Ignore"!==t.myMap[o]&&(e[t.myMap[o]]?e[t.myMap[o]]+=n[o]:e[t.myMap[o]]=n[o]),e}function jt(t,n,e,o){return`${e}<tr><td>${o}</td><td style="background-color: ${function(t){const n=Math.max(Math.min(t,100),0)
let e,o
return n<50?(e=255,o=Math.round(5.1*n)):(o=255,e=Math.round(510-5.1*n)),"#"+("000000"+(65536*e+256*o+0).toString(16)).slice(-6)}((n[o]-t.minpoint)/(t.maxpoint-t.minpoint)*100)};">${n[o].toString()}</td></tr>`}function Lt(t,n){c("potReport","drawInventory")
const e=bt(f(n).reduce(a(Mt,t,n),{}))
s(`<table><tbody>${f(e).reduce(a(jt,t,e),"")}</tbody></table>`,ht)}function Ct(){const t=_()
return t.insertCell(-1),t.insertCell(-1),t}function xt(t){const n=b("option",e)
var e
return n.value=t,n.text=t,n}function $t(t,n){m(t,xt(n[0]))}function vt(t){if(!yt){yt=Ct()
const n=function(t){const n=J({className:"tip-static",dataset:{tipped:'Set to "Ignore" to exclude from report'}})
return m(n,xt("Ignore")),t.forEach(a($t,n)),n}(t)
m(yt.cells[1],n)}return yt.cloneNode(!0)}function Ht(t,n,e,o){const a=vt(o)
y(n[0],a.cells[0])
const r=a.cells[1].children[0];[r.name,r.value]=n,m(t.tBodies[0],a)}function It(t,n,e){const o=E({id:n,type:"button",value:e})
m(t.cells[1],o)}function Rt(t){const n=Ct()
return It(n,"fshIgnoreAll","Ignore All"),M(n.cells[1],"&nbsp;"),It(n,"fshReset","Reset"),m(t.tBodies[0],n),0}function Nt(t){c("potReport","drawMapping")
const n=P({innerHTML:"<tbody></tbody>"})
gt.replaceChild(n,gt.children[0]),h(3,D,[[5,3,g(t.myMap),0,a(Ht,n),a(Rt,n)]])}const kt="fsh_potMap",Tt={pottab1:!1,pottab2:!1,pottab3:!1,myMap:{},minpoint:12,maxpoint:20}
function St(t,n){t.myMap[n]||(t.myMap[n]=n)}function wt(t,n,e){"SELECT"===e.target.tagName&&(t.myMap[e.target.name]=e.target.value,x(kt,t),Lt(t,n))}function Et(t,n,e){return n[e]=t?"Ignore":e,n}function At(t,n,e){!function(t,n,e){t.myMap=f(n).reduce(a(Et,e),{})}(t,n,e),x(kt,t),Nt(t),Lt(t,n)}function Bt(t){return/^pottab\d$/.test(t.id)}function Dt(t,n){t[n.id]=n.checked,x(kt,t)}function Ft(t,n,e){const o=e.target.id,a=A(e.target.value,0,999)
a&&(t[o]=a,x(kt,t),Lt(t,n))}function Gt(n,e,o){$(o,"change",a(wt,n,e)),t(o,q(function(t,n){return[[z("fshIgnoreAll"),a(At,t,n,!0)],[z("fshReset"),a(At,t,n,null)],[Bt,a(Dt,t)]]}(n,e))),$(o,"input",a(Ft,n,e))}function Pt(t,n){const e=function(t){return l({id:"potReport",innerHTML:`<input id="pottab1" type="checkbox"${F(t.pottab1)}><label for="pottab1">Composed Potion Inventory</label><input id="pottab2" type="checkbox"${F(t.pottab2)}><label for="pottab2">Mapping</label><input id="pottab3" type="checkbox"${F(t.pottab3)}><label for="pottab3">Thresholds</label>`})}(t),r=l({id:"panels"})
m(e,r),function(t,n,e){ht=l({id:"inventory"}),t.pottab1?Lt(t,n):d(e.parentNode.children[0],"change",a(Lt,t,n)),m(e,ht)}(t,n,r),function(t,n){gt=l({id:"mapping",innerHTML:"<p></p>"}),t.pottab2?Nt(t):d(n.parentNode.children[2],"change",a(Nt,t)),m(n,gt)}(t,r),function(t,n){const e=l({id:"thresholds",innerHTML:`Min:<input id="minpoint" type="number" value="${t.minpoint}" min="0" max="999">Max:<input id="maxpoint" type="number" value="${t.maxpoint}" min="0" max="999">`})
m(n,e)}(t,r),m(function(t,n){const e=o.lastElementChild.insertRow(2).insertCell(-1)
return Gt(t,n,e),e}(t,n),e)}function Wt(t,n){const e=L({},Tt)
L(e,C(n,{})),e.myMap=function(t,n){return f(n).forEach(a(St,t)),bt(t.myMap)}(e,t),x(kt,e),Pt(e,t)}function _t(t){j(kt).then(a(Wt,t))}let qt,zt,Jt,Qt,Ut
function Xt(t,n){const e=zt[n]
m(e,t)}function Yt(t){qt.push(dt(t)),function(t){if(t.endsWith(" (Potion)")){const n=t.slice(0,-9)
Jt[n]=(Jt[n]||0)+1}}(t.previousElementSibling.innerHTML)}function Zt(){D([5,3,qt,0,Xt,a(_t,Jt)])}function Kt(){zt=v("#pCC table table tr:not(.fshHide) td:nth-of-type(3n)"),Jt={},qt=[],D([5,3,zt,0,Yt,Zt])}function Ot(t){const n=H(t)
I.membrList[n]&&s(function(t){return`${B({last_login:I.membrList[t].last_login})}<a href="${R}${I.membrList[t].id}">${t}</a> [ <span class="a-reply fshLink" target_player=${t}>m</span> ]`}(n),t)}function Vt(){const t=v('#pCC table table tr:not(.fshHide) td[bgcolor="#DAA534"][colspan="2"] b')
D([5,3,t,0,Ot])}function tn(t){t.children[0].hasAttribute("bgcolor")&&(Ut=S(Qt,t.children[0].children[0])),Ut||(t.className="fshHide")}function nn(){if(Qt=N("user"),!Qt)return
if(!k('#pCC table table td[bgcolor="#DAA534"] b').some(T(Qt)))return
const t=v("#pCC table table tr")
D([5,2,t,0,tn])}function en(){h(3,Vt)}export default function(){w()||(Q(!1).then(en),h(2,nn),h(3,Kt),t(e("table",o)[1],n(et)))}
//# sourceMappingURL=guildReport-731fe668.js.map
