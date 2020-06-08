import{b0 as n,V as t,t as e,P as o,A as c,f as r,i as a,aH as s,b7 as i,l as d,z as u,I as l,y as p,g as m,h as f,B as h,C as b,o as N,bR as g,W as C,cc as j,R as y}from"./calfSystem-a2862afc.js"
import{t as T}from"./toLowerCase-2574a84c.js"
import{i as D}from"./insertTextBeforeEnd-45ef154f.js"
import{c as $}from"./createTBody-9b48ed82.js"
import{c as v}from"./createTable-6dbc7d62.js"
import"./dialogMsg-98e801f7.js"
import{c as k}from"./createSpan-b8f0a31d.js"
import{h as E}from"./hideElement-66d2f02e.js"
import{c as B}from"./chunk-250b0675.js"
import{e as x}from"./errorDialog-a4de6042.js"
import{g as S}from"./getArrayByClassName-c1e64010.js"
import"./all-6bd68ac2.js"
import{a as A}from"./allthen-41484118.js"
function L(){return n({subcmd:"loadcomponents"})}let R,w,I
function Q(n,t){return n[t.b]=n[t.b]||{a:t.a,b:t.b,count:0,del:[],v:t.v},n[t.b].count+=1,n[t.b].del.push(t.a),n}function q(n,t){return`${n}<tr><td><img src="${s}items/${t.b}.gif" class="fshTblCenter tip-dynamic" data-tipped="fetchitem.php?item_id=${t.b}&inv_id=${t.a}&t=2&p=${i()}&vcode=${t.v}"></td><td>${t.count}</td><td>[<span class="sendLink compDelType" data-compid="${t.b}">Del</span>]</td></tr>`}function V(n){const t=$()
return function(n){R=n.r.reduce(Q,{})}(n),a(t,'<tr><td colspan="3">Component Summary</td></tr>'+Object.values(R).reduce(q,"")),t}function _(n,t){const e=function(n){const t=n.insertRow(-1)
a(t,"<td>Total:</td>")
const e=t.insertCell(-1)
return e.colSpan=2,e}(n)
r(e,function(n){const t=n.r.length,e=k()
return c(t,e),e}(t)),D(e," / "+t.h.cm.toString())}function z(n,t){if(!o(t.r))return
const e=n.parentNode
e&&(c("",e),r(e,function(n){const t=v({className:"fshTblCenter",id:"fshTally"})
return r(t,V(n)),_(t,n),t}(t)))}function H(n){const t=d(),e=k({className:"sendLink "+T(n).replace(/ /g,"-"),textContent:n})
return u("[",t),r(t,e),a(t,"]"),t}function M(t){return function(t){return n({subcmd:"destroycomponent",removeIndex:t})}(t)}function O(){if(!w){const n=l("inventory-table",p("profileRightColumn"))
2===n.length&&([,w]=n)}return w}function P(n,t){return n[t.dataset.tipped.match(f)[2]]=t.parentNode.parentNode,n}function W(n,t){n[t]&&c("",n[t])}function F(n){n.forEach(e(W,function(){if(!I){const n=m("img",O())
I=n.reduce(P,{})}return I}()))}function G(n){const t=O().parentNode
if(!t)return
const e=t.children[2].children[1].children[0]
if("TABLE"!==e.tagName)return
const o=e.rows,c=o[o.length-1].cells[1].children[0]
let r=Number(h(c))
r-=n,u(r,c)}function J(n){n.s&&o(n.r)&&(F(n.r),G(n.r.length))}function K(n){n.parentNode.remove()}function U(n){return M(n).then(J)}function X(n,t,e){e.s&&(!function(n){const t=b(`#fshTally [data-compid="${n}"]`)
if(!t)return
const e=t.parentNode.parentNode.children[1],o=Number(h(e))-1
u(o,e)}(t),G(1),n.parentNode&&c("",n.parentNode))}const Y=["Enable Quick Del","Count Components","Quick Extract Components"]
function Z(n,t){return r(n,H(t)),n}function nn(n){a(n.parentNode.parentNode,'<span class="compDelBtn">Del</span>')}const tn=[["quick-extract-components",function(){t("components","insertQuickExtract"),C(j)}],["enable-quick-del",function(n){t("components","enableDelComponent")
const e=n.parentNode
E(e)
const o=e.parentNode
r(o,H("Delete All Visible")),m("img",O()).forEach(nn)}],["delete-all-visible",function(n){t("components","delAllComponent")
const e=n.parentNode.parentNode.parentNode.children[0]
S("compDelBtn",e).forEach(y)}],["compDelBtn",function(n){const{tipped:t}=n.parentNode.children[0].children[0].dataset,o=t.match(f),c=o[1]
M([o[2]]).then(x).then(e(X,n,c))}],["count-components",function(n){t("components","countComponent"),L().then(e(z,n))}],["compDelType",function(n){const t=R[n.dataset.compid].del,o=n.parentNode
!function(n){c("",n),n.className="guildTagSpinner",n.style.backgroundImage=`url('${s}ui/misc/spinner.gif')`}(o)
const r=B(30,t).map(U)
A(r,e(K,o))}]]
function en(n){const t=n.parentNode
r(t,Y.reduce(Z,d({className:"fshCenter"}))),N(t,g(tn))}export default function(){const n=O()
n&&en(n)}
//# sourceMappingURL=components-40fa7543.js.map
