import{b0 as n,V as t,t as e,P as o,A as c,h as r,i as s,aH as a,b7 as i,m as d,z as u,J as l,y as p,g as m,k as f,B as h,C as b,o as N,bS as g,W as C,cd as j,Q as y}from"./calfSystem-69dd5601.js"
import{t as T}from"./toLowerCase-c42114e1.js"
import{i as D}from"./insertTextBeforeEnd-8f07e4de.js"
import{c as $}from"./createTBody-c786127c.js"
import{c as k}from"./createTable-ba9c0bc4.js"
import"./dialogMsg-1f890a82.js"
import{c as v}from"./createSpan-71b557d6.js"
import{h as E}from"./hideElement-c8e0696f.js"
import{c as B}from"./chunk-a1c62f77.js"
import{e as x}from"./errorDialog-c0c5c278.js"
import{g as S}from"./getArrayByClassName-0f29c742.js"
import"./all-3791b7d5.js"
import{a as A}from"./allthen-ad810e11.js"
function L(){return n({subcmd:"loadcomponents"})}let Q,w,q
function I(n,t){return n[t.b]=n[t.b]||{a:t.a,b:t.b,count:0,del:[],v:t.v},n[t.b].count+=1,n[t.b].del.push(t.a),n}function R(n,t){return`${n}<tr><td><img src="${a}items/${t.b}.gif" class="fshTblCenter tip-dynamic" data-tipped="fetchitem.php?item_id=${t.b}&inv_id=${t.a}&t=2&p=${i()}&vcode=${t.v}"></td><td>${t.count}</td><td>[<span class="sendLink compDelType" data-compid="${t.b}">Del</span>]</td></tr>`}function V(n){const t=$()
return function(n){Q=n.r.reduce(I,{})}(n),s(t,'<tr><td colspan="3">Component Summary</td></tr>'+Object.values(Q).reduce(R,"")),t}function _(n,t){const e=function(n){const t=n.insertRow(-1)
s(t,"<td>Total:</td>")
const e=t.insertCell(-1)
return e.colSpan=2,e}(n)
r(e,function(n){const t=n.r.length,e=v()
return c(t,e),e}(t)),D(e," / "+t.h.cm.toString())}function z(n,t){if(!o(t.r))return
const e=n.parentNode
e&&(c("",e),r(e,function(n){const t=k({className:"fshTblCenter",id:"fshTally"})
return r(t,V(n)),_(t,n),t}(t)))}function H(n){const t=d(),e=v({className:"sendLink "+T(n).replace(/ /g,"-"),textContent:n})
return u("[",t),r(t,e),s(t,"]"),t}function J(t){return function(t){return n({subcmd:"destroycomponent",removeIndex:t})}(t)}function M(){if(!w){const n=l("inventory-table",p("profileRightColumn"))
2===n.length&&([,w]=n)}return w}function O(n,t){return n[t.dataset.tipped.match(f)[2]]=t.parentNode.parentNode,n}function P(n,t){n[t]&&c("",n[t])}function W(n){n.forEach(e(P,function(){if(!q){const n=m("img",M())
q=n.reduce(O,{})}return q}()))}function F(n){const t=M().parentNode
if(!t)return
const e=t.children[2].children[1].children[0]
if("TABLE"!==e.tagName)return
const o=e.rows,c=o[o.length-1].cells[1].children[0]
let r=Number(h(c))
r-=n,u(r,c)}function G(n){n.s&&o(n.r)&&(W(n.r),F(n.r.length))}function K(n){n.parentNode.remove()}function U(n){return J(n).then(G)}function X(n,t,e){e.s&&(!function(n){const t=b(`#fshTally [data-compid="${n}"]`)
if(!t)return
const e=t.parentNode.parentNode.children[1],o=Number(h(e))-1
u(o,e)}(t),F(1),n.parentNode&&c("",n.parentNode))}const Y=["Enable Quick Del","Count Components","Quick Extract Components"]
function Z(n,t){return r(n,H(t)),n}function nn(n){s(n.parentNode.parentNode,'<span class="compDelBtn">Del</span>')}const tn=[["quick-extract-components",function(){t("components","insertQuickExtract"),C(j)}],["enable-quick-del",function(n){t("components","enableDelComponent")
const e=n.parentNode
E(e)
const o=e.parentNode
r(o,H("Delete All Visible")),m("img",M()).forEach(nn)}],["delete-all-visible",function(n){t("components","delAllComponent")
const e=n.parentNode.parentNode.parentNode.children[0]
S("compDelBtn",e).forEach(y)}],["compDelBtn",function(n){const{tipped:t}=n.parentNode.children[0].children[0].dataset,o=t.match(f),c=o[1]
J([o[2]]).then(x).then(e(X,n,c))}],["count-components",function(n){t("components","countComponent"),L().then(e(z,n))}],["compDelType",function(n){const t=Q[n.dataset.compid].del,o=n.parentNode
!function(n){c("",n),n.className="guildTagSpinner",n.style.backgroundImage=`url('${a}ui/misc/spinner.gif')`}(o)
const r=B(30,t).map(U)
A(r,e(K,o))}]]
function en(n){const t=n.parentNode
r(t,Y.reduce(Z,d({className:"fshCenter"}))),N(t,g(tn))}function on(){const n=M()
n&&en(n)}export default on
//# sourceMappingURL=components-b8708098.js.map
