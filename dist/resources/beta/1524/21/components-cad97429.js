import{bh as n,U as t,t as e,A as o,h as r,i as c,aD as s,b2 as a,m as i,z as d,I as u,y as l,g as p,k as m,B as f,C as h,o as b,bQ as N,V as g,cb as C,Q as j}from"./calfSystem-89b939c8.js"
import{i as y}from"./isArray-75e85160.js"
import{t as D}from"./toLowerCase-5d1ed3f8.js"
import{i as T}from"./insertTextBeforeEnd-e624bdeb.js"
import{c as $}from"./createTBody-fd7adfb3.js"
import{c as k}from"./createTable-fd00f6db.js"
import"./dialogMsg-d061ece2.js"
import{c as v}from"./createSpan-716fba1d.js"
import{h as E}from"./hideElement-d2b16586.js"
import{c as B}from"./chunk-cc2730f2.js"
import{e as x}from"./errorDialog-28ee21dd.js"
import{g as A}from"./getArrayByClassName-ed630846.js"
import"./all-ca702d79.js"
import{a as S}from"./allthen-b213c39d.js"
function Q(){return n({subcmd:"loadcomponents"})}let L,w,I
function q(n,t){return n[t.b]=n[t.b]||{a:t.a,b:t.b,count:0,del:[],v:t.v},n[t.b].count+=1,n[t.b].del.push(t.a),n}function R(n,t){return`${n}<tr><td><img src="${s}items/${t.b}.gif" class="fshTblCenter tip-dynamic" data-tipped="fetchitem.php?item_id=${t.b}&inv_id=${t.a}&t=2&p=${a()}&vcode=${t.v}"></td><td>${t.count}</td><td>[<span class="sendLink compDelType" data-compid="${t.b}">Del</span>]</td></tr>`}function V(n){const t=$()
return function(n){L=n.r.reduce(q,{})}(n),c(t,'<tr><td colspan="3">Component Summary</td></tr>'+Object.values(L).reduce(R,"")),t}function _(n,t){const e=function(n){const t=n.insertRow(-1)
c(t,"<td>Total:</td>")
const e=t.insertCell(-1)
return e.colSpan=2,e}(n)
r(e,function(n){const t=n.r.length,e=v()
return o(t,e),e}(t)),T(e," / "+t.h.cm.toString())}function z(n,t){if(!y(t.r))return
const e=n.parentNode
e&&(o("",e),r(e,function(n){const t=k({className:"fshTblCenter",id:"fshTally"})
return r(t,V(n)),_(t,n),t}(t)))}function M(n){const t=i(),e=v({className:"sendLink "+D(n).replace(/ /g,"-"),textContent:n})
return d("[",t),r(t,e),c(t,"]"),t}function O(t){return function(t){return n({subcmd:"destroycomponent",removeIndex:t})}(t)}function U(){if(!w){const n=u("inventory-table",l("profileRightColumn"))
2===n.length&&([,w]=n)}return w}function F(n,t){return n[t.dataset.tipped.match(m)[2]]=t.parentNode.parentNode,n}function G(n,t){n[t]&&o("",n[t])}function H(n){n.forEach(e(G,function(){if(!I){const n=p("img",U())
I=n.reduce(F,{})}return I}()))}function J(n){const t=U().parentNode
if(!t)return
const e=t.children[2].children[1].children[0]
if("TABLE"!==e.tagName)return
const o=e.rows,r=o[o.length-1].cells[1].children[0]
let c=Number(f(r))
c-=n,d(c,r)}function K(n){n.s&&y(n.r)&&(H(n.r),J(n.r.length))}function P(n){n.parentNode.remove()}function W(n){return O(n).then(K)}function X(n,t,e){e.s&&(!function(n){const t=h(`#fshTally [data-compid="${n}"]`)
if(!t)return
const e=t.parentNode.parentNode.children[1],o=Number(f(e))-1
d(o,e)}(t),J(1),n.parentNode&&o("",n.parentNode))}const Y=["Enable Quick Del","Count Components","Quick Extract Components"]
function Z(n,t){return r(n,M(t)),n}function nn(n){c(n.parentNode.parentNode,'<span class="compDelBtn">Del</span>')}const tn=[["quick-extract-components",function(){t("components","insertQuickExtract"),g(C)}],["enable-quick-del",function(n){t("components","enableDelComponent")
const e=n.parentNode
E(e)
const o=e.parentNode
r(o,M("Delete All Visible")),p("img",U()).forEach(nn)}],["delete-all-visible",function(n){t("components","delAllComponent")
const e=n.parentNode.parentNode.parentNode.children[0]
A("compDelBtn",e).forEach(j)}],["compDelBtn",function(n){const{tipped:t}=n.parentNode.children[0].children[0].dataset,o=t.match(m),r=o[1]
O([o[2]]).then(x).then(e(X,n,r))}],["count-components",function(n){t("components","countComponent"),Q().then(e(z,n))}],["compDelType",function(n){const t=L[n.dataset.compid].del,r=n.parentNode
!function(n){o("",n),n.className="guildTagSpinner",n.style.backgroundImage=`url('${s}ui/misc/spinner.gif')`}(r)
const c=B(30,t).map(W)
S(c,e(P,r))}]]
function en(n){const t=n.parentNode
r(t,Y.reduce(Z,i({className:"fshCenter"}))),b(t,N(tn))}export default function(){const n=U()
n&&en(n)}
//# sourceMappingURL=components-cad97429.js.map
