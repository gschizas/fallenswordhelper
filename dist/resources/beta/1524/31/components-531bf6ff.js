import{bn as n,U as t,t as e,A as o,h as r,i as c,aj as a,au as s,m as i,z as d,J as u,y as l,g as p,k as m,B as f,C as h,o as b,bM as N,V as g,c8 as j,P as C}from"./calfSystem-47fc08ae.js"
import{c as y}from"./createSpan-6b0a8c35.js"
import{c as $}from"./createTBody-f6ac95b4.js"
import{c as T}from"./createTable-c916e6a3.js"
import{i as D}from"./insertTextBeforeEnd-0d01bc1c.js"
import{i as k}from"./isArray-551d6583.js"
import{t as v}from"./toLowerCase-51740687.js"
import{a as E}from"./allthen-3a9178b8.js"
import{c as B}from"./chunk-a5250b9a.js"
import{e as x}from"./errorDialog-9d880b0d.js"
import{g as A}from"./getArrayByClassName-2a13cfae.js"
import{h as S}from"./hideElement-d4551277.js"
import"./all-6dfbd6b8.js"
import"./dialogMsg-844edf4e.js"
function L(){return n({subcmd:"loadcomponents"})}let w,Q,q
function I(n,t){return n[t.b]=n[t.b]||{a:t.a,b:t.b,count:0,del:[],v:t.v},n[t.b].count+=1,n[t.b].del.push(t.a),n}function M(n,t){return`${n}<tr><td><img src="${a}items/${t.b}.gif" class="fshTblCenter tip-dynamic" data-tipped="fetchitem.php?item_id=${t.b}&inv_id=${t.a}&t=2&p=${s()}&vcode=${t.v}"></td><td>${t.count}</td><td>[<span class="sendLink compDelType" data-compid="${t.b}">Del</span>]</td></tr>`}function R(n){const t=$()
return function(n){w=n.r.reduce(I,{})}(n),c(t,`<tr><td colspan="3">Component Summary</td></tr>${Object.values(w).reduce(M,"")}`),t}function V(n,t){const e=function(n){const t=n.insertRow(-1)
c(t,"<td>Total:</td>")
const e=t.insertCell(-1)
return e.colSpan=2,e}(n)
r(e,function(n){const t=n.r.length,e=y()
return o(t,e),e}(t)),D(e,` / ${t.h.cm.toString()}`)}function _(n,t){if(!k(t.r))return
const e=n.parentNode
e&&(o("",e),r(e,function(n){const t=T({className:"fshTblCenter",id:"fshTally"})
return r(t,R(n)),V(t,n),t}(t)))}function z(n){const t=i(),e=y({className:`sendLink ${v(n).replace(/ /g,"-")}`,textContent:n})
return d("[",t),r(t,e),c(t,"]"),t}function J(t){return function(t){return n({subcmd:"destroycomponent",removeIndex:t})}(t)}function O(){if(!Q){const n=u("inventory-table",l("profileRightColumn"))
2===n.length&&([,Q]=n)}return Q}function P(n,t){return n[t.dataset.tipped.match(m)[2]]=t.parentNode.parentNode,n}function U(n,t){n[t]&&o("",n[t])}function F(n){n.forEach(e(U,function(){if(!q){const n=p("img",O())
q=n.reduce(P,{})}return q}()))}function G(n){const t=O().parentNode
if(!t)return
const e=t.children[2].children[1].children[0]
if("TABLE"!==e.tagName)return
const o=e.rows,r=o[o.length-1].cells[1].children[0]
let c=Number(f(r))
c-=n,d(c,r)}function H(n){n.s&&k(n.r)&&(F(n.r),G(n.r.length))}function K(n){n.parentNode.remove()}function W(n){return J(n).then(H)}function X(n,t,e){e.s&&(!function(n){const t=h(`#fshTally [data-compid="${n}"]`)
if(!t)return
const e=t.parentNode.parentNode.children[1],o=Number(f(e))-1
d(o,e)}(t),G(1),n.parentNode&&o("",n.parentNode))}const Y=["Enable Quick Del","Count Components","Quick Extract Components"]
function Z(n,t){return r(n,z(t)),n}function nn(n){c(n.parentNode.parentNode,'<span class="compDelBtn">Del</span>')}const tn=[["quick-extract-components",function(){t("components","insertQuickExtract"),g(j)}],["enable-quick-del",function(n){t("components","enableDelComponent")
const e=n.parentNode
S(e)
const o=e.parentNode
r(o,z("Delete All Visible")),p("img",O()).forEach(nn)}],["delete-all-visible",function(n){t("components","delAllComponent")
const e=n.parentNode.parentNode.parentNode.children[0]
A("compDelBtn",e).forEach(C)}],["compDelBtn",function(n){const{tipped:t}=n.parentNode.children[0].children[0].dataset,o=t.match(m),r=o[1]
J([o[2]]).then(x).then(e(X,n,r))}],["count-components",function(n){t("components","countComponent"),L().then(e(_,n))}],["compDelType",function(n){const t=w[n.dataset.compid].del,r=n.parentNode
!function(n){o("",n),n.className="guildTagSpinner",n.style.backgroundImage=`url('${a}ui/misc/spinner.gif')`}(r)
const c=B(30,t).map(W)
E(c,e(K,r))}]]
function en(n){const t=n.parentNode
r(t,Y.reduce(Z,i({className:"fshCenter"}))),b(t,N(tn))}function on(){const n=O()
n&&en(n)}export default on
//# sourceMappingURL=components-531bf6ff.js.map
