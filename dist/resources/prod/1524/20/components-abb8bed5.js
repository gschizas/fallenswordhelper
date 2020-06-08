import{bf as n,U as t,t as e,A as o,f as r,i as c,aD as a,b0 as s,l as i,z as d,I as u,y as l,g as p,h as m,B as f,C as h,o as b,bK as N,V as g,c6 as C,Q as j}from"./calfSystem-03970067.js"
import{i as y}from"./isArray-aff0783a.js"
import{t as D}from"./toLowerCase-5a7ad345.js"
import{i as T}from"./insertTextBeforeEnd-2cd4288e.js"
import{c as $}from"./createTBody-63c3fb8b.js"
import{c as v}from"./createTable-fdc4e68e.js"
import"./dialogMsg-9c4f0c44.js"
import{c as k}from"./createSpan-3c9a32c0.js"
import{h as E}from"./hideElement-ee7e2bbb.js"
import{c as B}from"./chunk-91fd5f70.js"
import{e as x}from"./errorDialog-2397605e.js"
import{g as A}from"./getArrayByClassName-24024eda.js"
import"./all-34a43a38.js"
import{a as S}from"./allthen-0b78a490.js"
function L(){return n({subcmd:"loadcomponents"})}let Q,w,I
function q(n,t){return n[t.b]=n[t.b]||{a:t.a,b:t.b,count:0,del:[],v:t.v},n[t.b].count+=1,n[t.b].del.push(t.a),n}function R(n,t){return`${n}<tr><td><img src="${a}items/${t.b}.gif" class="fshTblCenter tip-dynamic" data-tipped="fetchitem.php?item_id=${t.b}&inv_id=${t.a}&t=2&p=${s()}&vcode=${t.v}"></td><td>${t.count}</td><td>[<span class="sendLink compDelType" data-compid="${t.b}">Del</span>]</td></tr>`}function V(n){const t=$()
return function(n){Q=n.r.reduce(q,{})}(n),c(t,'<tr><td colspan="3">Component Summary</td></tr>'+Object.values(Q).reduce(R,"")),t}function _(n,t){const e=function(n){const t=n.insertRow(-1)
c(t,"<td>Total:</td>")
const e=t.insertCell(-1)
return e.colSpan=2,e}(n)
r(e,function(n){const t=n.r.length,e=k()
return o(t,e),e}(t)),T(e," / "+t.h.cm.toString())}function z(n,t){if(!y(t.r))return
const e=n.parentNode
e&&(o("",e),r(e,function(n){const t=v({className:"fshTblCenter",id:"fshTally"})
return r(t,V(n)),_(t,n),t}(t)))}function K(n){const t=i(),e=k({className:"sendLink "+D(n).replace(/ /g,"-"),textContent:n})
return d("[",t),r(t,e),c(t,"]"),t}function M(t){return function(t){return n({subcmd:"destroycomponent",removeIndex:t})}(t)}function O(){if(!w){const n=u("inventory-table",l("profileRightColumn"))
2===n.length&&([,w]=n)}return w}function U(n,t){return n[t.dataset.tipped.match(m)[2]]=t.parentNode.parentNode,n}function F(n,t){n[t]&&o("",n[t])}function G(n){n.forEach(e(F,function(){if(!I){const n=p("img",O())
I=n.reduce(U,{})}return I}()))}function H(n){const t=O().parentNode
if(!t)return
const e=t.children[2].children[1].children[0]
if("TABLE"!==e.tagName)return
const o=e.rows,r=o[o.length-1].cells[1].children[0]
let c=Number(f(r))
c-=n,d(c,r)}function J(n){n.s&&y(n.r)&&(G(n.r),H(n.r.length))}function P(n){n.parentNode.remove()}function W(n){return M(n).then(J)}function X(n,t,e){e.s&&(!function(n){const t=h(`#fshTally [data-compid="${n}"]`)
if(!t)return
const e=t.parentNode.parentNode.children[1],o=Number(f(e))-1
d(o,e)}(t),H(1),n.parentNode&&o("",n.parentNode))}const Y=["Enable Quick Del","Count Components","Quick Extract Components"]
function Z(n,t){return r(n,K(t)),n}function nn(n){c(n.parentNode.parentNode,'<span class="compDelBtn">Del</span>')}const tn=[["quick-extract-components",function(){t("components","insertQuickExtract"),g(C)}],["enable-quick-del",function(n){t("components","enableDelComponent")
const e=n.parentNode
E(e)
const o=e.parentNode
r(o,K("Delete All Visible")),p("img",O()).forEach(nn)}],["delete-all-visible",function(n){t("components","delAllComponent")
const e=n.parentNode.parentNode.parentNode.children[0]
A("compDelBtn",e).forEach(j)}],["compDelBtn",function(n){const{tipped:t}=n.parentNode.children[0].children[0].dataset,o=t.match(m),r=o[1]
M([o[2]]).then(x).then(e(X,n,r))}],["count-components",function(n){t("components","countComponent"),L().then(e(z,n))}],["compDelType",function(n){const t=Q[n.dataset.compid].del,r=n.parentNode
!function(n){o("",n),n.className="guildTagSpinner",n.style.backgroundImage=`url('${a}ui/misc/spinner.gif')`}(r)
const c=B(30,t).map(W)
S(c,e(P,r))}]]
function en(n){const t=n.parentNode
r(t,Y.reduce(Z,i({className:"fshCenter"}))),b(t,N(tn))}export default function(){const n=O()
n&&en(n)}
//# sourceMappingURL=components-abb8bed5.js.map
