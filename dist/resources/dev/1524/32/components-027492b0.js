import{am as n,W as t,t as e,Q as o,A as c,h as r,i as a,al as s,aB as i,m as d,z as u,J as l,y as p,g as m,k as f,B as h,C as b,o as N,bQ as g,X as C,cd as j,R as y}from"./calfSystem-19a5d332.js"
import{c as $}from"./createSpan-58506d04.js"
import{c as T}from"./createTBody-d6c4e597.js"
import{c as D}from"./createTable-13078520.js"
import{i as k}from"./insertTextBeforeEnd-945fdfd8.js"
import{t as v}from"./toLowerCase-ace931b6.js"
import{a as B}from"./allthen-975bc488.js"
import{c as E}from"./chunk-b2ca1969.js"
import{e as x}from"./errorDialog-56c5d78c.js"
import{g as S}from"./getArrayByClassName-8cefca3b.js"
import{h as A}from"./hideElement-7c48eb54.js"
import"./all-31b59575.js"
import"./dialogMsg-0a235932.js"
function Q(){return n({subcmd:"loadcomponents"})}let L,w,R
function q(n,t){return n[t.b]=n[t.b]||{a:t.a,b:t.b,count:0,del:[],v:t.v},n[t.b].count+=1,n[t.b].del.push(t.a),n}function I(n,t){return`${n}<tr><td><img src="${s}items/${t.b}.gif" class="fshTblCenter tip-dynamic" data-tipped="fetchitem.php?item_id=${t.b}&inv_id=${t.a}&t=2&p=${i()}&vcode=${t.v}"></td><td>${t.count}</td><td>[<span class="sendLink compDelType" data-compid="${t.b}">Del</span>]</td></tr>`}function _(n){const t=T()
return function(n){L=n.r.reduce(q,{})}(n),a(t,`<tr><td colspan="3">Component Summary</td></tr>${Object.values(L).reduce(I,"")}`),t}function z(n,t){const e=function(n){const t=n.insertRow(-1)
a(t,"<td>Total:</td>")
const e=t.insertCell(-1)
return e.colSpan=2,e}(n)
r(e,function(n){const t=n.r.length,e=$()
return c(t,e),e}(t)),k(e,` / ${t.h.cm.toString()}`)}function J(n,t){if(!o(t.r))return
const e=n.parentNode
e&&(c("",e),r(e,function(n){const t=D({className:"fshTblCenter",id:"fshTally"})
return r(t,_(n)),z(t,n),t}(t)))}function M(n){const t=d(),e=$({className:`sendLink ${v(n).replace(/ /g,"-")}`,textContent:n})
return u("[",t),r(t,e),a(t,"]"),t}function O(t){return function(t){return n({subcmd:"destroycomponent",removeIndex:t})}(t)}function V(){if(!w){const n=l("inventory-table",p("profileRightColumn"))
2===n.length&&([,w]=n)}return w}function W(n,t){return n[t.dataset.tipped.match(f)[2]]=t.parentNode.parentNode,n}function X(n,t){n[t]&&c("",n[t])}function F(n){n.forEach(e(X,function(){if(!R){const n=m("img",V())
R=n.reduce(W,{})}return R}()))}function G(n){const t=V().parentNode
if(!t)return
const e=t.children[2].children[1].children[0]
if("TABLE"!==e.tagName)return
const o=e.rows,c=o[o.length-1].cells[1].children[0]
let r=Number(h(c))
r-=n,u(r,c)}function H(n){n.s&&o(n.r)&&(F(n.r),G(n.r.length))}function K(n){n.parentNode.remove()}function P(n){return O(n).then(H)}function U(n,t,e){e.s&&(!function(n){const t=b(`#fshTally [data-compid="${n}"]`)
if(!t)return
const e=t.parentNode.parentNode.children[1],o=Number(h(e))-1
u(o,e)}(t),G(1),n.parentNode&&c("",n.parentNode))}const Y=["Enable Quick Del","Count Components","Quick Extract Components"]
function Z(n,t){return r(n,M(t)),n}function nn(n){a(n.parentNode.parentNode,'<span class="compDelBtn">Del</span>')}const tn=[["quick-extract-components",function(){t("components","insertQuickExtract"),C(j)}],["enable-quick-del",function(n){t("components","enableDelComponent")
const e=n.parentNode
A(e)
const o=e.parentNode
r(o,M("Delete All Visible")),m("img",V()).forEach(nn)}],["delete-all-visible",function(n){t("components","delAllComponent")
const e=n.parentNode.parentNode.parentNode.children[0]
S("compDelBtn",e).forEach(y)}],["compDelBtn",function(n){const{tipped:t}=n.parentNode.children[0].children[0].dataset,o=t.match(f),c=o[1]
O([o[2]]).then(x).then(e(U,n,c))}],["count-components",function(n){t("components","countComponent"),Q().then(e(J,n))}],["compDelType",function(n){const t=L[n.dataset.compid].del,o=n.parentNode
!function(n){c("",n),n.className="guildTagSpinner",n.style.backgroundImage=`url('${s}ui/misc/spinner.gif')`}(o)
const r=E(30,t).map(P)
B(r,e(K,o))}]]
function en(n){const t=n.parentNode
r(t,Y.reduce(Z,d({className:"fshCenter"}))),N(t,g(tn))}function on(){const n=V()
n&&en(n)}export default on
//# sourceMappingURL=components-027492b0.js.map
