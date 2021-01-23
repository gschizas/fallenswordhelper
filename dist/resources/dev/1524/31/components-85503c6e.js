import{al as n,V as t,t as e,P as o,A as r,h as a,i as c,ak as s,aA as i,m as d,z as u,J as l,y as p,g as m,k as f,B as h,C as b,o as N,bP as g,W as C,cb as j,Q as y}from"./calfSystem-393ab895.js"
import{c as $}from"./createSpan-f9f70e5d.js"
import{c as T}from"./createTBody-528613e5.js"
import{c as k}from"./createTable-aae48322.js"
import{i as D}from"./insertTextBeforeEnd-580aaa56.js"
import{t as v}from"./toLowerCase-51740687.js"
import{a as E}from"./allthen-3a9178b8.js"
import{c as B}from"./chunk-a5250b9a.js"
import{e as x}from"./errorDialog-9d880b0d.js"
import{g as A}from"./getArrayByClassName-1bdcec20.js"
import{h as S}from"./hideElement-d4551277.js"
import"./all-6dfbd6b8.js"
import"./dialogMsg-844edf4e.js"
function L(){return n({subcmd:"loadcomponents"})}let Q,w,q
function I(n,t){return n[t.b]=n[t.b]||{a:t.a,b:t.b,count:0,del:[],v:t.v},n[t.b].count+=1,n[t.b].del.push(t.a),n}function P(n,t){return`${n}<tr><td><img src="${s}items/${t.b}.gif" class="fshTblCenter tip-dynamic" data-tipped="fetchitem.php?item_id=${t.b}&inv_id=${t.a}&t=2&p=${i()}&vcode=${t.v}"></td><td>${t.count}</td><td>[<span class="sendLink compDelType" data-compid="${t.b}">Del</span>]</td></tr>`}function R(n){const t=T()
return function(n){Q=n.r.reduce(I,{})}(n),c(t,`<tr><td colspan="3">Component Summary</td></tr>${Object.values(Q).reduce(P,"")}`),t}function V(n,t){const e=function(n){const t=n.insertRow(-1)
c(t,"<td>Total:</td>")
const e=t.insertCell(-1)
return e.colSpan=2,e}(n)
a(e,function(n){const t=n.r.length,e=$()
return r(t,e),e}(t)),D(e,` / ${t.h.cm.toString()}`)}function _(n,t){if(!o(t.r))return
const e=n.parentNode
e&&(r("",e),a(e,function(n){const t=k({className:"fshTblCenter",id:"fshTally"})
return a(t,R(n)),V(t,n),t}(t)))}function z(n){const t=d(),e=$({className:`sendLink ${v(n).replace(/ /g,"-")}`,textContent:n})
return u("[",t),a(t,e),c(t,"]"),t}function J(t){return function(t){return n({subcmd:"destroycomponent",removeIndex:t})}(t)}function M(){if(!w){const n=l("inventory-table",p("profileRightColumn"))
2===n.length&&([,w]=n)}return w}function O(n,t){return n[t.dataset.tipped.match(f)[2]]=t.parentNode.parentNode,n}function W(n,t){n[t]&&r("",n[t])}function F(n){n.forEach(e(W,function(){if(!q){const n=m("img",M())
q=n.reduce(O,{})}return q}()))}function G(n){const t=M().parentNode
if(!t)return
const e=t.children[2].children[1].children[0]
if("TABLE"!==e.tagName)return
const o=e.rows,r=o[o.length-1].cells[1].children[0]
let a=Number(h(r))
a-=n,u(a,r)}function H(n){n.s&&o(n.r)&&(F(n.r),G(n.r.length))}function K(n){n.parentNode.remove()}function U(n){return J(n).then(H)}function X(n,t,e){e.s&&(!function(n){const t=b(`#fshTally [data-compid="${n}"]`)
if(!t)return
const e=t.parentNode.parentNode.children[1],o=Number(h(e))-1
u(o,e)}(t),G(1),n.parentNode&&r("",n.parentNode))}const Y=["Enable Quick Del","Count Components","Quick Extract Components"]
function Z(n,t){return a(n,z(t)),n}function nn(n){c(n.parentNode.parentNode,'<span class="compDelBtn">Del</span>')}const tn=[["quick-extract-components",function(){t("components","insertQuickExtract"),C(j)}],["enable-quick-del",function(n){t("components","enableDelComponent")
const e=n.parentNode
S(e)
const o=e.parentNode
a(o,z("Delete All Visible")),m("img",M()).forEach(nn)}],["delete-all-visible",function(n){t("components","delAllComponent")
const e=n.parentNode.parentNode.parentNode.children[0]
A("compDelBtn",e).forEach(y)}],["compDelBtn",function(n){const{tipped:t}=n.parentNode.children[0].children[0].dataset,o=t.match(f),r=o[1]
J([o[2]]).then(x).then(e(X,n,r))}],["count-components",function(n){t("components","countComponent"),L().then(e(_,n))}],["compDelType",function(n){const t=Q[n.dataset.compid].del,o=n.parentNode
!function(n){r("",n),n.className="guildTagSpinner",n.style.backgroundImage=`url('${s}ui/misc/spinner.gif')`}(o)
const a=B(30,t).map(U)
E(a,e(K,o))}]]
function en(n){const t=n.parentNode
a(t,Y.reduce(Z,d({className:"fshCenter"}))),N(t,g(tn))}function on(){const n=M()
n&&en(n)}export default on
//# sourceMappingURL=components-85503c6e.js.map
