import{b0 as n,W as t,t as e,P as o,A as c,h as r,i as s,aI as a,b7 as i,m as d,z as u,J as l,y as p,g as m,k as f,B as b,C as h,o as N,bR as g,X as C,cd as j,Q as y}from"./calfSystem-ec5e5725.js"
import{t as T}from"./toLowerCase-33399b5a.js"
import{i as D}from"./insertTextBeforeEnd-5b2001f1.js"
import{c as $}from"./createTBody-b1c8bf61.js"
import{c as k}from"./createTable-4d32a607.js"
import"./dialogMsg-9c8d1b20.js"
import{c as v}from"./createSpan-a26e8f7c.js"
import{h as E}from"./hideElement-b0b3e820.js"
import{c as B}from"./chunk-001468bc.js"
import{e as x}from"./errorDialog-7f9c11b0.js"
import{g as S}from"./getArrayByClassName-bb31bc41.js"
import"./all-e81516b4.js"
import{a as A}from"./allthen-dd6cac31.js"
function L(){return n({subcmd:"loadcomponents"})}let Q,w,I
function R(n,t){return n[t.b]=n[t.b]||{a:t.a,b:t.b,count:0,del:[],v:t.v},n[t.b].count+=1,n[t.b].del.push(t.a),n}function q(n,t){return`${n}<tr><td><img src="${a}items/${t.b}.gif" class="fshTblCenter tip-dynamic" data-tipped="fetchitem.php?item_id=${t.b}&inv_id=${t.a}&t=2&p=${i()}&vcode=${t.v}"></td><td>${t.count}</td><td>[<span class="sendLink compDelType" data-compid="${t.b}">Del</span>]</td></tr>`}function _(n){const t=$()
return function(n){Q=n.r.reduce(R,{})}(n),s(t,'<tr><td colspan="3">Component Summary</td></tr>'+Object.values(Q).reduce(q,"")),t}function z(n,t){const e=function(n){const t=n.insertRow(-1)
s(t,"<td>Total:</td>")
const e=t.insertCell(-1)
return e.colSpan=2,e}(n)
r(e,function(n){const t=n.r.length,e=v()
return c(t,e),e}(t)),D(e," / "+t.h.cm.toString())}function J(n,t){if(!o(t.r))return
const e=n.parentNode
e&&(c("",e),r(e,function(n){const t=k({className:"fshTblCenter",id:"fshTally"})
return r(t,_(n)),z(t,n),t}(t)))}function M(n){const t=d(),e=v({className:"sendLink "+T(n).replace(/ /g,"-"),textContent:n})
return u("[",t),r(t,e),s(t,"]"),t}function O(t){return function(t){return n({subcmd:"destroycomponent",removeIndex:t})}(t)}function P(){if(!w){const n=l("inventory-table",p("profileRightColumn"))
2===n.length&&([,w]=n)}return w}function V(n,t){return n[t.dataset.tipped.match(f)[2]]=t.parentNode.parentNode,n}function W(n,t){n[t]&&c("",n[t])}function X(n){n.forEach(e(W,function(){if(!I){const n=m("img",P())
I=n.reduce(V,{})}return I}()))}function F(n){const t=P().parentNode
if(!t)return
const e=t.children[2].children[1].children[0]
if("TABLE"!==e.tagName)return
const o=e.rows,c=o[o.length-1].cells[1].children[0]
let r=Number(b(c))
r-=n,u(r,c)}function G(n){n.s&&o(n.r)&&(X(n.r),F(n.r.length))}function H(n){n.parentNode.remove()}function K(n){return O(n).then(G)}function U(n,t,e){e.s&&(!function(n){const t=h(`#fshTally [data-compid="${n}"]`)
if(!t)return
const e=t.parentNode.parentNode.children[1],o=Number(b(e))-1
u(o,e)}(t),F(1),n.parentNode&&c("",n.parentNode))}const Y=["Enable Quick Del","Count Components","Quick Extract Components"]
function Z(n,t){return r(n,M(t)),n}function nn(n){s(n.parentNode.parentNode,'<span class="compDelBtn">Del</span>')}const tn=[["quick-extract-components",function(){t("components","insertQuickExtract"),C(j)}],["enable-quick-del",function(n){t("components","enableDelComponent")
const e=n.parentNode
E(e)
const o=e.parentNode
r(o,M("Delete All Visible")),m("img",P()).forEach(nn)}],["delete-all-visible",function(n){t("components","delAllComponent")
const e=n.parentNode.parentNode.parentNode.children[0]
S("compDelBtn",e).forEach(y)}],["compDelBtn",function(n){const{tipped:t}=n.parentNode.children[0].children[0].dataset,o=t.match(f),c=o[1]
O([o[2]]).then(x).then(e(U,n,c))}],["count-components",function(n){t("components","countComponent"),L().then(e(J,n))}],["compDelType",function(n){const t=Q[n.dataset.compid].del,o=n.parentNode
!function(n){c("",n),n.className="guildTagSpinner",n.style.backgroundImage=`url('${a}ui/misc/spinner.gif')`}(o)
const r=B(30,t).map(K)
A(r,e(H,o))}]]
function en(n){const t=n.parentNode
r(t,Y.reduce(Z,d({className:"fshCenter"}))),N(t,g(tn))}function on(){const n=P()
n&&en(n)}export default on
//# sourceMappingURL=components-75812ca5.js.map
