import{bd as n,V as t,t as e,A as o,h as r,i as c,aE as s,b0 as a,m as i,z as d,J as u,y as l,g as p,k as m,B as f,C as b,o as h,bK as N,W as g,c7 as C,P as j}from"./calfSystem-3bdf319e.js"
import{i as y}from"./isArray-5d976413.js"
import{t as T}from"./toLowerCase-33399b5a.js"
import{i as D}from"./insertTextBeforeEnd-6230c114.js"
import{c as $}from"./createTBody-e1fd2ed4.js"
import{c as k}from"./createTable-bf1faf4f.js"
import"./dialogMsg-9c8d1b20.js"
import{c as v}from"./createSpan-a10d5602.js"
import{h as E}from"./hideElement-b0b3e820.js"
import{c as B}from"./chunk-001468bc.js"
import{e as x}from"./errorDialog-7f9c11b0.js"
import{g as A}from"./getArrayByClassName-1fb66d0d.js"
import"./all-e81516b4.js"
import{a as S}from"./allthen-dd6cac31.js"
function L(){return n({subcmd:"loadcomponents"})}let w,Q,q
function I(n,t){return n[t.b]=n[t.b]||{a:t.a,b:t.b,count:0,del:[],v:t.v},n[t.b].count+=1,n[t.b].del.push(t.a),n}function R(n,t){return`${n}<tr><td><img src="${s}items/${t.b}.gif" class="fshTblCenter tip-dynamic" data-tipped="fetchitem.php?item_id=${t.b}&inv_id=${t.a}&t=2&p=${a()}&vcode=${t.v}"></td><td>${t.count}</td><td>[<span class="sendLink compDelType" data-compid="${t.b}">Del</span>]</td></tr>`}function V(n){const t=$()
return function(n){w=n.r.reduce(I,{})}(n),c(t,'<tr><td colspan="3">Component Summary</td></tr>'+Object.values(w).reduce(R,"")),t}function _(n,t){const e=function(n){const t=n.insertRow(-1)
c(t,"<td>Total:</td>")
const e=t.insertCell(-1)
return e.colSpan=2,e}(n)
r(e,function(n){const t=n.r.length,e=v()
return o(t,e),e}(t)),D(e," / "+t.h.cm.toString())}function z(n,t){if(!y(t.r))return
const e=n.parentNode
e&&(o("",e),r(e,function(n){const t=k({className:"fshTblCenter",id:"fshTally"})
return r(t,V(n)),_(t,n),t}(t)))}function J(n){const t=i(),e=v({className:"sendLink "+T(n).replace(/ /g,"-"),textContent:n})
return d("[",t),r(t,e),c(t,"]"),t}function K(t){return function(t){return n({subcmd:"destroycomponent",removeIndex:t})}(t)}function M(){if(!Q){const n=u("inventory-table",l("profileRightColumn"))
2===n.length&&([,Q]=n)}return Q}function O(n,t){return n[t.dataset.tipped.match(m)[2]]=t.parentNode.parentNode,n}function P(n,t){n[t]&&o("",n[t])}function W(n){n.forEach(e(P,function(){if(!q){const n=p("img",M())
q=n.reduce(O,{})}return q}()))}function F(n){const t=M().parentNode
if(!t)return
const e=t.children[2].children[1].children[0]
if("TABLE"!==e.tagName)return
const o=e.rows,r=o[o.length-1].cells[1].children[0]
let c=Number(f(r))
c-=n,d(c,r)}function G(n){n.s&&y(n.r)&&(W(n.r),F(n.r.length))}function H(n){n.parentNode.remove()}function U(n){return K(n).then(G)}function X(n,t,e){e.s&&(!function(n){const t=b(`#fshTally [data-compid="${n}"]`)
if(!t)return
const e=t.parentNode.parentNode.children[1],o=Number(f(e))-1
d(o,e)}(t),F(1),n.parentNode&&o("",n.parentNode))}const Y=["Enable Quick Del","Count Components","Quick Extract Components"]
function Z(n,t){return r(n,J(t)),n}function nn(n){c(n.parentNode.parentNode,'<span class="compDelBtn">Del</span>')}const tn=[["quick-extract-components",function(){t("components","insertQuickExtract"),g(C)}],["enable-quick-del",function(n){t("components","enableDelComponent")
const e=n.parentNode
E(e)
const o=e.parentNode
r(o,J("Delete All Visible")),p("img",M()).forEach(nn)}],["delete-all-visible",function(n){t("components","delAllComponent")
const e=n.parentNode.parentNode.parentNode.children[0]
A("compDelBtn",e).forEach(j)}],["compDelBtn",function(n){const{tipped:t}=n.parentNode.children[0].children[0].dataset,o=t.match(m),r=o[1]
K([o[2]]).then(x).then(e(X,n,r))}],["count-components",function(n){t("components","countComponent"),L().then(e(z,n))}],["compDelType",function(n){const t=w[n.dataset.compid].del,r=n.parentNode
!function(n){o("",n),n.className="guildTagSpinner",n.style.backgroundImage=`url('${s}ui/misc/spinner.gif')`}(r)
const c=B(30,t).map(U)
S(c,e(H,r))}]]
function en(n){const t=n.parentNode
r(t,Y.reduce(Z,i({className:"fshCenter"}))),h(t,N(tn))}function on(){const n=M()
n&&en(n)}export default on
//# sourceMappingURL=components-002022c7.js.map
