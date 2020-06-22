import{b0 as n,V as t,t as e,P as o,A as c,h as r,i as a,aH as s,b7 as i,m as u,z as d,I as l,y as p,g as m,k as f,B as h,C as b,o as N,bS as g,W as C,cd as j,R as y}from"./calfSystem-4cc738f8.js"
import{t as T}from"./toLowerCase-e8c3179d.js"
import{i as D}from"./insertTextBeforeEnd-f2295412.js"
import{c as $}from"./createTBody-e25839cf.js"
import{c as k}from"./createTable-8f45252e.js"
import"./dialogMsg-d224def3.js"
import{c as v}from"./createSpan-273eaa7e.js"
import{h as E}from"./hideElement-22c940e2.js"
import{c as B}from"./chunk-0596700f.js"
import{e as x}from"./errorDialog-18ea8eb8.js"
import{g as S}from"./getArrayByClassName-cef24a4c.js"
import"./all-4929a748.js"
import{a as A}from"./allthen-58353ff8.js"
function L(){return n({subcmd:"loadcomponents"})}let w,I,Q
function R(n,t){return n[t.b]=n[t.b]||{a:t.a,b:t.b,count:0,del:[],v:t.v},n[t.b].count+=1,n[t.b].del.push(t.a),n}function q(n,t){return`${n}<tr><td><img src="${s}items/${t.b}.gif" class="fshTblCenter tip-dynamic" data-tipped="fetchitem.php?item_id=${t.b}&inv_id=${t.a}&t=2&p=${i()}&vcode=${t.v}"></td><td>${t.count}</td><td>[<span class="sendLink compDelType" data-compid="${t.b}">Del</span>]</td></tr>`}function V(n){const t=$()
return function(n){w=n.r.reduce(R,{})}(n),a(t,'<tr><td colspan="3">Component Summary</td></tr>'+Object.values(w).reduce(q,"")),t}function _(n,t){const e=function(n){const t=n.insertRow(-1)
a(t,"<td>Total:</td>")
const e=t.insertCell(-1)
return e.colSpan=2,e}(n)
r(e,function(n){const t=n.r.length,e=v()
return c(t,e),e}(t)),D(e," / "+t.h.cm.toString())}function z(n,t){if(!o(t.r))return
const e=n.parentNode
e&&(c("",e),r(e,function(n){const t=k({className:"fshTblCenter",id:"fshTally"})
return r(t,V(n)),_(t,n),t}(t)))}function H(n){const t=u(),e=v({className:"sendLink "+T(n).replace(/ /g,"-"),textContent:n})
return d("[",t),r(t,e),a(t,"]"),t}function M(t){return function(t){return n({subcmd:"destroycomponent",removeIndex:t})}(t)}function O(){if(!I){const n=l("inventory-table",p("profileRightColumn"))
2===n.length&&([,I]=n)}return I}function P(n,t){return n[t.dataset.tipped.match(f)[2]]=t.parentNode.parentNode,n}function W(n,t){n[t]&&c("",n[t])}function F(n){n.forEach(e(W,function(){if(!Q){const n=m("img",O())
Q=n.reduce(P,{})}return Q}()))}function G(n){const t=O().parentNode
if(!t)return
const e=t.children[2].children[1].children[0]
if("TABLE"!==e.tagName)return
const o=e.rows,c=o[o.length-1].cells[1].children[0]
let r=Number(h(c))
r-=n,d(r,c)}function J(n){n.s&&o(n.r)&&(F(n.r),G(n.r.length))}function K(n){n.parentNode.remove()}function U(n){return M(n).then(J)}function X(n,t,e){e.s&&(!function(n){const t=b(`#fshTally [data-compid="${n}"]`)
if(!t)return
const e=t.parentNode.parentNode.children[1],o=Number(h(e))-1
d(o,e)}(t),G(1),n.parentNode&&c("",n.parentNode))}const Y=["Enable Quick Del","Count Components","Quick Extract Components"]
function Z(n,t){return r(n,H(t)),n}function nn(n){a(n.parentNode.parentNode,'<span class="compDelBtn">Del</span>')}const tn=[["quick-extract-components",function(){t("components","insertQuickExtract"),C(j)}],["enable-quick-del",function(n){t("components","enableDelComponent")
const e=n.parentNode
E(e)
const o=e.parentNode
r(o,H("Delete All Visible")),m("img",O()).forEach(nn)}],["delete-all-visible",function(n){t("components","delAllComponent")
const e=n.parentNode.parentNode.parentNode.children[0]
S("compDelBtn",e).forEach(y)}],["compDelBtn",function(n){const{tipped:t}=n.parentNode.children[0].children[0].dataset,o=t.match(f),c=o[1]
M([o[2]]).then(x).then(e(X,n,c))}],["count-components",function(n){t("components","countComponent"),L().then(e(z,n))}],["compDelType",function(n){const t=w[n.dataset.compid].del,o=n.parentNode
!function(n){c("",n),n.className="guildTagSpinner",n.style.backgroundImage=`url('${s}ui/misc/spinner.gif')`}(o)
const r=B(30,t).map(U)
A(r,e(K,o))}]]
function en(n){const t=n.parentNode
r(t,Y.reduce(Z,u({className:"fshCenter"}))),N(t,g(tn))}export default function(){const n=O()
n&&en(n)}
//# sourceMappingURL=components-9f5f4b4d.js.map
