import{be as n,U as t,t as e,A as o,h as r,i as c,aD as s,b1 as a,m as i,z as d,J as u,y as l,g as p,k as m,B as f,C as h,o as b,bO as N,V as g,ca as C,P as j}from"./calfSystem-ebf4b17d.js"
import{i as y}from"./isArray-0709f57e.js"
import{t as D}from"./toLowerCase-5e186769.js"
import{i as T}from"./insertTextBeforeEnd-008f8df5.js"
import{c as $}from"./createTBody-e9c845f8.js"
import{c as k}from"./createTable-eb87c534.js"
import"./dialogMsg-27e2dc98.js"
import{c as v}from"./createSpan-2a49124f.js"
import{h as E}from"./hideElement-f7381055.js"
import{c as B}from"./chunk-c85463de.js"
import{e as x}from"./errorDialog-f6569d61.js"
import{g as A}from"./getArrayByClassName-f55d7526.js"
import"./all-36f83e81.js"
import{a as S}from"./allthen-7d061027.js"
function L(){return n({subcmd:"loadcomponents"})}let w,Q,q
function I(n,t){return n[t.b]=n[t.b]||{a:t.a,b:t.b,count:0,del:[],v:t.v},n[t.b].count+=1,n[t.b].del.push(t.a),n}function O(n,t){return`${n}<tr><td><img src="${s}items/${t.b}.gif" class="fshTblCenter tip-dynamic" data-tipped="fetchitem.php?item_id=${t.b}&inv_id=${t.a}&t=2&p=${a()}&vcode=${t.v}"></td><td>${t.count}</td><td>[<span class="sendLink compDelType" data-compid="${t.b}">Del</span>]</td></tr>`}function R(n){const t=$()
return function(n){w=n.r.reduce(I,{})}(n),c(t,'<tr><td colspan="3">Component Summary</td></tr>'+Object.values(w).reduce(O,"")),t}function V(n,t){const e=function(n){const t=n.insertRow(-1)
c(t,"<td>Total:</td>")
const e=t.insertCell(-1)
return e.colSpan=2,e}(n)
r(e,function(n){const t=n.r.length,e=v()
return o(t,e),e}(t)),T(e," / "+t.h.cm.toString())}function _(n,t){if(!y(t.r))return
const e=n.parentNode
e&&(o("",e),r(e,function(n){const t=k({className:"fshTblCenter",id:"fshTally"})
return r(t,R(n)),V(t,n),t}(t)))}function z(n){const t=i(),e=v({className:"sendLink "+D(n).replace(/ /g,"-"),textContent:n})
return d("[",t),r(t,e),c(t,"]"),t}function J(t){return function(t){return n({subcmd:"destroycomponent",removeIndex:t})}(t)}function M(){if(!Q){const n=u("inventory-table",l("profileRightColumn"))
2===n.length&&([,Q]=n)}return Q}function P(n,t){return n[t.dataset.tipped.match(m)[2]]=t.parentNode.parentNode,n}function U(n,t){n[t]&&o("",n[t])}function F(n){n.forEach(e(U,function(){if(!q){const n=p("img",M())
q=n.reduce(P,{})}return q}()))}function G(n){const t=M().parentNode
if(!t)return
const e=t.children[2].children[1].children[0]
if("TABLE"!==e.tagName)return
const o=e.rows,r=o[o.length-1].cells[1].children[0]
let c=Number(f(r))
c-=n,d(c,r)}function H(n){n.s&&y(n.r)&&(F(n.r),G(n.r.length))}function K(n){n.parentNode.remove()}function W(n){return J(n).then(H)}function X(n,t,e){e.s&&(!function(n){const t=h(`#fshTally [data-compid="${n}"]`)
if(!t)return
const e=t.parentNode.parentNode.children[1],o=Number(f(e))-1
d(o,e)}(t),G(1),n.parentNode&&o("",n.parentNode))}const Y=["Enable Quick Del","Count Components","Quick Extract Components"]
function Z(n,t){return r(n,z(t)),n}function nn(n){c(n.parentNode.parentNode,'<span class="compDelBtn">Del</span>')}const tn=[["quick-extract-components",function(){t("components","insertQuickExtract"),g(C)}],["enable-quick-del",function(n){t("components","enableDelComponent")
const e=n.parentNode
E(e)
const o=e.parentNode
r(o,z("Delete All Visible")),p("img",M()).forEach(nn)}],["delete-all-visible",function(n){t("components","delAllComponent")
const e=n.parentNode.parentNode.parentNode.children[0]
A("compDelBtn",e).forEach(j)}],["compDelBtn",function(n){const{tipped:t}=n.parentNode.children[0].children[0].dataset,o=t.match(m),r=o[1]
J([o[2]]).then(x).then(e(X,n,r))}],["count-components",function(n){t("components","countComponent"),L().then(e(_,n))}],["compDelType",function(n){const t=w[n.dataset.compid].del,r=n.parentNode
!function(n){o("",n),n.className="guildTagSpinner",n.style.backgroundImage=`url('${s}ui/misc/spinner.gif')`}(r)
const c=B(30,t).map(W)
S(c,e(K,r))}]]
function en(n){const t=n.parentNode
r(t,Y.reduce(Z,i({className:"fshCenter"}))),b(t,N(tn))}function on(){const n=M()
n&&en(n)}export default on
//# sourceMappingURL=components-d330aa10.js.map
