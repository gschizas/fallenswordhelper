import{a$ as n,V as t,t as e,P as o,A as r,h as c,i as a,aH as s,b6 as i,m as u,z as d,J as l,y as p,g as m,k as f,B as h,C as b,o as N,bQ as g,W as C,cc as j,Q as y}from"./calfSystem-b136673a.js"
import{t as T}from"./toLowerCase-27ea448e.js"
import{i as $}from"./insertTextBeforeEnd-131a905a.js"
import{c as D}from"./createTBody-f74b1a93.js"
import{c as k}from"./createTable-629a2fee.js"
import"./dialogMsg-8ea305bd.js"
import{c as v}from"./createSpan-65142707.js"
import{h as E}from"./hideElement-c14a94c9.js"
import{c as B}from"./chunk-07c9710c.js"
import{e as x}from"./errorDialog-326900ed.js"
import{g as S}from"./getArrayByClassName-d5f86271.js"
import"./all-7e2b4bf6.js"
import{a as A}from"./allthen-7191069a.js"
function Q(){return n({subcmd:"loadcomponents"})}let L,w,q
function I(n,t){return n[t.b]=n[t.b]||{a:t.a,b:t.b,count:0,del:[],v:t.v},n[t.b].count+=1,n[t.b].del.push(t.a),n}function R(n,t){return`${n}<tr><td><img src="${s}items/${t.b}.gif" class="fshTblCenter tip-dynamic" data-tipped="fetchitem.php?item_id=${t.b}&inv_id=${t.a}&t=2&p=${i()}&vcode=${t.v}"></td><td>${t.count}</td><td>[<span class="sendLink compDelType" data-compid="${t.b}">Del</span>]</td></tr>`}function V(n){const t=D()
return function(n){L=n.r.reduce(I,{})}(n),a(t,'<tr><td colspan="3">Component Summary</td></tr>'+Object.values(L).reduce(R,"")),t}function _(n,t){const e=function(n){const t=n.insertRow(-1)
a(t,"<td>Total:</td>")
const e=t.insertCell(-1)
return e.colSpan=2,e}(n)
c(e,function(n){const t=n.r.length,e=v()
return r(t,e),e}(t)),$(e," / "+t.h.cm.toString())}function z(n,t){if(!o(t.r))return
const e=n.parentNode
e&&(r("",e),c(e,function(n){const t=k({className:"fshTblCenter",id:"fshTally"})
return c(t,V(n)),_(t,n),t}(t)))}function H(n){const t=u(),e=v({className:"sendLink "+T(n).replace(/ /g,"-"),textContent:n})
return d("[",t),c(t,e),a(t,"]"),t}function J(t){return function(t){return n({subcmd:"destroycomponent",removeIndex:t})}(t)}function M(){if(!w){const n=l("inventory-table",p("profileRightColumn"))
2===n.length&&([,w]=n)}return w}function O(n,t){return n[t.dataset.tipped.match(f)[2]]=t.parentNode.parentNode,n}function P(n,t){n[t]&&r("",n[t])}function W(n){n.forEach(e(P,function(){if(!q){const n=m("img",M())
q=n.reduce(O,{})}return q}()))}function F(n){const t=M().parentNode
if(!t)return
const e=t.children[2].children[1].children[0]
if("TABLE"!==e.tagName)return
const o=e.rows,r=o[o.length-1].cells[1].children[0]
let c=Number(h(r))
c-=n,d(c,r)}function G(n){n.s&&o(n.r)&&(W(n.r),F(n.r.length))}function K(n){n.parentNode.remove()}function U(n){return J(n).then(G)}function X(n,t,e){e.s&&(!function(n){const t=b(`#fshTally [data-compid="${n}"]`)
if(!t)return
const e=t.parentNode.parentNode.children[1],o=Number(h(e))-1
d(o,e)}(t),F(1),n.parentNode&&r("",n.parentNode))}const Y=["Enable Quick Del","Count Components","Quick Extract Components"]
function Z(n,t){return c(n,H(t)),n}function nn(n){a(n.parentNode.parentNode,'<span class="compDelBtn">Del</span>')}const tn=[["quick-extract-components",function(){t("components","insertQuickExtract"),C(j)}],["enable-quick-del",function(n){t("components","enableDelComponent")
const e=n.parentNode
E(e)
const o=e.parentNode
c(o,H("Delete All Visible")),m("img",M()).forEach(nn)}],["delete-all-visible",function(n){t("components","delAllComponent")
const e=n.parentNode.parentNode.parentNode.children[0]
S("compDelBtn",e).forEach(y)}],["compDelBtn",function(n){const{tipped:t}=n.parentNode.children[0].children[0].dataset,o=t.match(f),r=o[1]
J([o[2]]).then(x).then(e(X,n,r))}],["count-components",function(n){t("components","countComponent"),Q().then(e(z,n))}],["compDelType",function(n){const t=L[n.dataset.compid].del,o=n.parentNode
!function(n){r("",n),n.className="guildTagSpinner",n.style.backgroundImage=`url('${s}ui/misc/spinner.gif')`}(o)
const c=B(30,t).map(U)
A(c,e(K,o))}]]
function en(n){const t=n.parentNode
c(t,Y.reduce(Z,u({className:"fshCenter"}))),N(t,g(tn))}function on(){const n=M()
n&&en(n)}export default on
//# sourceMappingURL=components-311b276d.js.map
