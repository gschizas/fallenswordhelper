import{bh as n,U as t,t as e,A as o,h as c,i as r,aD as a,b2 as s,m as i,z as d,J as u,y as l,g as p,k as m,B as f,C as h,o as b,bQ as N,V as g,cb as C,P as j}from"./calfSystem-d3aab5a8.js"
import{i as y}from"./isArray-392e0aa1.js"
import{t as D}from"./toLowerCase-c42114e1.js"
import{i as T}from"./insertTextBeforeEnd-675fc29f.js"
import{c as $}from"./createTBody-092d90f1.js"
import{c as k}from"./createTable-17944d8c.js"
import"./dialogMsg-1f890a82.js"
import{c as v}from"./createSpan-2f44b58c.js"
import{h as E}from"./hideElement-c8e0696f.js"
import{c as B}from"./chunk-a1c62f77.js"
import{e as x}from"./errorDialog-c0c5c278.js"
import{g as A}from"./getArrayByClassName-c7a1058a.js"
import"./all-3791b7d5.js"
import{a as S}from"./allthen-ad810e11.js"
function L(){return n({subcmd:"loadcomponents"})}let Q,w,q
function I(n,t){return n[t.b]=n[t.b]||{a:t.a,b:t.b,count:0,del:[],v:t.v},n[t.b].count+=1,n[t.b].del.push(t.a),n}function R(n,t){return`${n}<tr><td><img src="${a}items/${t.b}.gif" class="fshTblCenter tip-dynamic" data-tipped="fetchitem.php?item_id=${t.b}&inv_id=${t.a}&t=2&p=${s()}&vcode=${t.v}"></td><td>${t.count}</td><td>[<span class="sendLink compDelType" data-compid="${t.b}">Del</span>]</td></tr>`}function V(n){const t=$()
return function(n){Q=n.r.reduce(I,{})}(n),r(t,'<tr><td colspan="3">Component Summary</td></tr>'+Object.values(Q).reduce(R,"")),t}function _(n,t){const e=function(n){const t=n.insertRow(-1)
r(t,"<td>Total:</td>")
const e=t.insertCell(-1)
return e.colSpan=2,e}(n)
c(e,function(n){const t=n.r.length,e=v()
return o(t,e),e}(t)),T(e," / "+t.h.cm.toString())}function z(n,t){if(!y(t.r))return
const e=n.parentNode
e&&(o("",e),c(e,function(n){const t=k({className:"fshTblCenter",id:"fshTally"})
return c(t,V(n)),_(t,n),t}(t)))}function J(n){const t=i(),e=v({className:"sendLink "+D(n).replace(/ /g,"-"),textContent:n})
return d("[",t),c(t,e),r(t,"]"),t}function M(t){return function(t){return n({subcmd:"destroycomponent",removeIndex:t})}(t)}function O(){if(!w){const n=u("inventory-table",l("profileRightColumn"))
2===n.length&&([,w]=n)}return w}function P(n,t){return n[t.dataset.tipped.match(m)[2]]=t.parentNode.parentNode,n}function U(n,t){n[t]&&o("",n[t])}function F(n){n.forEach(e(U,function(){if(!q){const n=p("img",O())
q=n.reduce(P,{})}return q}()))}function G(n){const t=O().parentNode
if(!t)return
const e=t.children[2].children[1].children[0]
if("TABLE"!==e.tagName)return
const o=e.rows,c=o[o.length-1].cells[1].children[0]
let r=Number(f(c))
r-=n,d(r,c)}function H(n){n.s&&y(n.r)&&(F(n.r),G(n.r.length))}function K(n){n.parentNode.remove()}function W(n){return M(n).then(H)}function X(n,t,e){e.s&&(!function(n){const t=h(`#fshTally [data-compid="${n}"]`)
if(!t)return
const e=t.parentNode.parentNode.children[1],o=Number(f(e))-1
d(o,e)}(t),G(1),n.parentNode&&o("",n.parentNode))}const Y=["Enable Quick Del","Count Components","Quick Extract Components"]
function Z(n,t){return c(n,J(t)),n}function nn(n){r(n.parentNode.parentNode,'<span class="compDelBtn">Del</span>')}const tn=[["quick-extract-components",function(){t("components","insertQuickExtract"),g(C)}],["enable-quick-del",function(n){t("components","enableDelComponent")
const e=n.parentNode
E(e)
const o=e.parentNode
c(o,J("Delete All Visible")),p("img",O()).forEach(nn)}],["delete-all-visible",function(n){t("components","delAllComponent")
const e=n.parentNode.parentNode.parentNode.children[0]
A("compDelBtn",e).forEach(j)}],["compDelBtn",function(n){const{tipped:t}=n.parentNode.children[0].children[0].dataset,o=t.match(m),c=o[1]
M([o[2]]).then(x).then(e(X,n,c))}],["count-components",function(n){t("components","countComponent"),L().then(e(z,n))}],["compDelType",function(n){const t=Q[n.dataset.compid].del,c=n.parentNode
!function(n){o("",n),n.className="guildTagSpinner",n.style.backgroundImage=`url('${a}ui/misc/spinner.gif')`}(c)
const r=B(30,t).map(W)
S(r,e(K,c))}]]
function en(n){const t=n.parentNode
c(t,Y.reduce(Z,i({className:"fshCenter"}))),b(t,N(tn))}function on(){const n=O()
n&&en(n)}export default on
//# sourceMappingURL=components-c5bce4b1.js.map
