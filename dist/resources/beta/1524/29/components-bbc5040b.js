import{be as n,U as t,t as e,A as o,h as c,i as r,aD as a,b1 as s,m as i,z as d,J as u,y as l,g as p,k as m,B as f,C as h,o as b,bO as N,V as g,ca as C,P as j}from"./calfSystem-f9a27018.js"
import{i as y}from"./isArray-26644043.js"
import{t as D}from"./toLowerCase-0a22477f.js"
import{i as T}from"./insertTextBeforeEnd-1841d6cf.js"
import{c as $}from"./createTBody-d6b63075.js"
import{c as k}from"./createTable-1203d2c6.js"
import"./dialogMsg-920f7637.js"
import{c as v}from"./createSpan-7dc30d50.js"
import{h as E}from"./hideElement-a8c1e8d6.js"
import{c as B}from"./chunk-a86d7cea.js"
import{e as x}from"./errorDialog-48ca89f9.js"
import{g as A}from"./getArrayByClassName-b5f38e7c.js"
import"./all-01203f8c.js"
import{a as S}from"./allthen-ca11bf0c.js"
function L(){return n({subcmd:"loadcomponents"})}let w,Q,q
function I(n,t){return n[t.b]=n[t.b]||{a:t.a,b:t.b,count:0,del:[],v:t.v},n[t.b].count+=1,n[t.b].del.push(t.a),n}function O(n,t){return`${n}<tr><td><img src="${a}items/${t.b}.gif" class="fshTblCenter tip-dynamic" data-tipped="fetchitem.php?item_id=${t.b}&inv_id=${t.a}&t=2&p=${s()}&vcode=${t.v}"></td><td>${t.count}</td><td>[<span class="sendLink compDelType" data-compid="${t.b}">Del</span>]</td></tr>`}function R(n){const t=$()
return function(n){w=n.r.reduce(I,{})}(n),r(t,'<tr><td colspan="3">Component Summary</td></tr>'+Object.values(w).reduce(O,"")),t}function V(n,t){const e=function(n){const t=n.insertRow(-1)
r(t,"<td>Total:</td>")
const e=t.insertCell(-1)
return e.colSpan=2,e}(n)
c(e,function(n){const t=n.r.length,e=v()
return o(t,e),e}(t)),T(e," / "+t.h.cm.toString())}function _(n,t){if(!y(t.r))return
const e=n.parentNode
e&&(o("",e),c(e,function(n){const t=k({className:"fshTblCenter",id:"fshTally"})
return c(t,R(n)),V(t,n),t}(t)))}function z(n){const t=i(),e=v({className:"sendLink "+D(n).replace(/ /g,"-"),textContent:n})
return d("[",t),c(t,e),r(t,"]"),t}function J(t){return function(t){return n({subcmd:"destroycomponent",removeIndex:t})}(t)}function M(){if(!Q){const n=u("inventory-table",l("profileRightColumn"))
2===n.length&&([,Q]=n)}return Q}function P(n,t){return n[t.dataset.tipped.match(m)[2]]=t.parentNode.parentNode,n}function U(n,t){n[t]&&o("",n[t])}function F(n){n.forEach(e(U,function(){if(!q){const n=p("img",M())
q=n.reduce(P,{})}return q}()))}function G(n){const t=M().parentNode
if(!t)return
const e=t.children[2].children[1].children[0]
if("TABLE"!==e.tagName)return
const o=e.rows,c=o[o.length-1].cells[1].children[0]
let r=Number(f(c))
r-=n,d(r,c)}function H(n){n.s&&y(n.r)&&(F(n.r),G(n.r.length))}function K(n){n.parentNode.remove()}function W(n){return J(n).then(H)}function X(n,t,e){e.s&&(!function(n){const t=h(`#fshTally [data-compid="${n}"]`)
if(!t)return
const e=t.parentNode.parentNode.children[1],o=Number(f(e))-1
d(o,e)}(t),G(1),n.parentNode&&o("",n.parentNode))}const Y=["Enable Quick Del","Count Components","Quick Extract Components"]
function Z(n,t){return c(n,z(t)),n}function nn(n){r(n.parentNode.parentNode,'<span class="compDelBtn">Del</span>')}const tn=[["quick-extract-components",function(){t("components","insertQuickExtract"),g(C)}],["enable-quick-del",function(n){t("components","enableDelComponent")
const e=n.parentNode
E(e)
const o=e.parentNode
c(o,z("Delete All Visible")),p("img",M()).forEach(nn)}],["delete-all-visible",function(n){t("components","delAllComponent")
const e=n.parentNode.parentNode.parentNode.children[0]
A("compDelBtn",e).forEach(j)}],["compDelBtn",function(n){const{tipped:t}=n.parentNode.children[0].children[0].dataset,o=t.match(m),c=o[1]
J([o[2]]).then(x).then(e(X,n,c))}],["count-components",function(n){t("components","countComponent"),L().then(e(_,n))}],["compDelType",function(n){const t=w[n.dataset.compid].del,c=n.parentNode
!function(n){o("",n),n.className="guildTagSpinner",n.style.backgroundImage=`url('${a}ui/misc/spinner.gif')`}(c)
const r=B(30,t).map(W)
S(r,e(K,c))}]]
function en(n){const t=n.parentNode
c(t,Y.reduce(Z,i({className:"fshCenter"}))),b(t,N(tn))}function on(){const n=M()
n&&en(n)}export default on
//# sourceMappingURL=components-bbc5040b.js.map
