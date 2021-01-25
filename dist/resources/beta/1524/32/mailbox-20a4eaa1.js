import{c as t}from"./chunk-b2ca1969.js"
import{w as n,x as i,g as s,p as e,P as a,t as c,k as o,m as r,h as f,o as u,e as m,l,A as d,y as p}from"./calfSystem-26bcf570.js"
import{c as h}from"./createInput-538cc410.js"
import{c as k}from"./createLabel-0085779f.js"
import{c as b}from"./createUl-720b8c49.js"
import{i as g}from"./insertElementBefore-aa28f497.js"
import{i as v}from"./isArray-73a21c38.js"
import{j as T,o as j}from"./jsonFail-29e920c6.js"
function x(t){return function(t){return n({cmd:"tempinv",subcmd:"takeitems",item:t})}(t)}function y(t,n,i){const s=k({id:t,className:"sendLink",htmlFor:"fshQuickTake",textContent:`Toggle ${n}`})
return g(s,i),s}function E(t,n){const i=n.children[0],{tipped:s}=i.dataset,e=o.exec(s)
if(!e)return t
const a=e[1],c=e[2]
return t[a]?t[a].invIds.push(c):t[a]={invIds:[c],tipped:s.replace(/&extra=\d/,""),src:i.src},t}function I(t,n){const i=n[1],s=r(),e=r({innerHTML:`<img src="${i.src}" class="tip-dynamic" data-tipped="${i.tipped}">`})
f(s,e)
const a=r({innerHTML:`<button class="fshBl fshBls" data-id="${n[0]}">Take All ${i.invIds.length}</button>`})
f(s,a),f(t,s)}function L(t){!function(t){const n=$(`#temp-inv-img-${t}`).qtip("api")
n&&n.destroy(!0)}(t.id)
const n=p(`temp-inv-${t.id}`)
n&&d("",n)}function M(t,n){T(n,t)||v(n.r)&&function(t,n){n.r.forEach(L),j(`${n.r.length.toString()} item(s) taken.`,t)}(t,n)}function q(t,n){x(n).then(c(M,t))}function B(n,i,s){l("fshBls",s.target)&&function(n,i,s){const e=s.dataset.id,{invIds:a}=n[e]
d(`taking all ${a.length} items`,s.parentNode),t(40,a).forEach(c(q,i))}(n,i,s.target)}function Q(t,n,i){const s=r({className:"fshTakeGrid"})
!function(t,n){m(n).forEach(c(I,t))}(s,t),f(n,s),u(s,c(B,t,i))}function A(t){const n=r({id:"quickTake",innerHTML:'<div class="fshCenter"><br><font size="3"><b>Quick Take</b></font><br><br>Select which item to take all similar items from your Mailbox.</div><div></div>'}),i=function(t){const n=r(),i=b()
return f(n,i),f(t,n),i}(n)
f(n,r()),Q(t,n,i),f(e,n)}function C(t,n){y("qtOn","Mailbox",n)
A(t.reduce(E,{}))}function H(){if(i())return
const t=s("a",e)
if(0===t.length)return
const n=e.lastElementChild
!function(t,n){const i=h({id:"fshQuickTake",type:"checkbox"})
g(i,n),a(i,"change",c(C,t,n))}(t,n),y("qtOff","Quick Take",n)}export default H
//# sourceMappingURL=mailbox-20a4eaa1.js.map
