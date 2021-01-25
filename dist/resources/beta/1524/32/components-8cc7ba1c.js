import{bo as n,V as t,t as e,A as o,h as c,i as r,ak as a,av as s,m as i,z as u,J as d,y as l,g as p,k as m,B as f,C as b,o as h,bN as N,W as g,ca as C,Q as j}from"./calfSystem-26bcf570.js"
import{c as y}from"./createSpan-d92b45d9.js"
import{c as $}from"./createTBody-ba0acdce.js"
import{c as T}from"./createTable-94cc6b14.js"
import{i as k}from"./insertTextBeforeEnd-51cfe46b.js"
import{i as v}from"./isArray-73a21c38.js"
import{t as D}from"./toLowerCase-ace931b6.js"
import{a as E}from"./allthen-975bc488.js"
import{c as B}from"./chunk-b2ca1969.js"
import{e as x}from"./errorDialog-56c5d78c.js"
import{g as A}from"./getArrayByClassName-3eee0c79.js"
import{h as S}from"./hideElement-7c48eb54.js"
import"./all-31b59575.js"
import"./dialogMsg-0a235932.js"
function L(){return n({subcmd:"loadcomponents"})}let Q,w,q
function I(n,t){return n[t.b]=n[t.b]||{a:t.a,b:t.b,count:0,del:[],v:t.v},n[t.b].count+=1,n[t.b].del.push(t.a),n}function R(n,t){return`${n}<tr><td><img src="${a}items/${t.b}.gif" class="fshTblCenter tip-dynamic" data-tipped="fetchitem.php?item_id=${t.b}&inv_id=${t.a}&t=2&p=${s()}&vcode=${t.v}"></td><td>${t.count}</td><td>[<span class="sendLink compDelType" data-compid="${t.b}">Del</span>]</td></tr>`}function V(n){const t=$()
return function(n){Q=n.r.reduce(I,{})}(n),r(t,`<tr><td colspan="3">Component Summary</td></tr>${Object.values(Q).reduce(R,"")}`),t}function _(n,t){const e=function(n){const t=n.insertRow(-1)
r(t,"<td>Total:</td>")
const e=t.insertCell(-1)
return e.colSpan=2,e}(n)
c(e,function(n){const t=n.r.length,e=y()
return o(t,e),e}(t)),k(e,` / ${t.h.cm.toString()}`)}function z(n,t){if(!v(t.r))return
const e=n.parentNode
e&&(o("",e),c(e,function(n){const t=T({className:"fshTblCenter",id:"fshTally"})
return c(t,V(n)),_(t,n),t}(t)))}function J(n){const t=i(),e=y({className:`sendLink ${D(n).replace(/ /g,"-")}`,textContent:n})
return u("[",t),c(t,e),r(t,"]"),t}function M(t){return function(t){return n({subcmd:"destroycomponent",removeIndex:t})}(t)}function O(){if(!w){const n=d("inventory-table",l("profileRightColumn"))
2===n.length&&([,w]=n)}return w}function W(n,t){return n[t.dataset.tipped.match(m)[2]]=t.parentNode.parentNode,n}function F(n,t){n[t]&&o("",n[t])}function G(n){n.forEach(e(F,function(){if(!q){const n=p("img",O())
q=n.reduce(W,{})}return q}()))}function H(n){const t=O().parentNode
if(!t)return
const e=t.children[2].children[1].children[0]
if("TABLE"!==e.tagName)return
const o=e.rows,c=o[o.length-1].cells[1].children[0]
let r=Number(f(c))
r-=n,u(r,c)}function K(n){n.s&&v(n.r)&&(G(n.r),H(n.r.length))}function P(n){n.parentNode.remove()}function U(n){return M(n).then(K)}function X(n,t,e){e.s&&(!function(n){const t=b(`#fshTally [data-compid="${n}"]`)
if(!t)return
const e=t.parentNode.parentNode.children[1],o=Number(f(e))-1
u(o,e)}(t),H(1),n.parentNode&&o("",n.parentNode))}const Y=["Enable Quick Del","Count Components","Quick Extract Components"]
function Z(n,t){return c(n,J(t)),n}function nn(n){r(n.parentNode.parentNode,'<span class="compDelBtn">Del</span>')}const tn=[["quick-extract-components",function(){t("components","insertQuickExtract"),g(C)}],["enable-quick-del",function(n){t("components","enableDelComponent")
const e=n.parentNode
S(e)
const o=e.parentNode
c(o,J("Delete All Visible")),p("img",O()).forEach(nn)}],["delete-all-visible",function(n){t("components","delAllComponent")
const e=n.parentNode.parentNode.parentNode.children[0]
A("compDelBtn",e).forEach(j)}],["compDelBtn",function(n){const{tipped:t}=n.parentNode.children[0].children[0].dataset,o=t.match(m),c=o[1]
M([o[2]]).then(x).then(e(X,n,c))}],["count-components",function(n){t("components","countComponent"),L().then(e(z,n))}],["compDelType",function(n){const t=Q[n.dataset.compid].del,c=n.parentNode
!function(n){o("",n),n.className="guildTagSpinner",n.style.backgroundImage=`url('${a}ui/misc/spinner.gif')`}(c)
const r=B(30,t).map(U)
E(r,e(P,c))}]]
function en(n){const t=n.parentNode
c(t,Y.reduce(Z,i({className:"fshCenter"}))),h(t,N(tn))}function on(){const n=O()
n&&en(n)}export default on
//# sourceMappingURL=components-8cc7ba1c.js.map
