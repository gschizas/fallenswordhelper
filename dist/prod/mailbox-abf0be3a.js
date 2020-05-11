import{y as t,z as n,g as s,p as i,P as e,Q as a,v as c,k as o,l as r,h as f,o as d,q as u,C as l,A as m}from"./calfSystem-72fdbe97.js"
import{i as p}from"./isArray-4303dc86.js"
import{c as h}from"./createInput-00d19dd2.js"
import{c as k}from"./createLabel-0393d946.js"
import{c as b}from"./createUl-43d45b37.js"
import{c as g}from"./chunk-ae5ce53e.js"
import{j as v,o as T}from"./jsonFail-b18d58c6.js"
function j(n){return function(n){return t({cmd:"tempinv",subcmd:"takeitems",item:n})}(n)}function x(t,n,s){const i=k({id:t,className:"sendLink",htmlFor:"fshQuickTake",textContent:`Toggle ${n}`})
return e(i,s),i}function y(t,n){const s=n.children[0],{tipped:i}=s.dataset,e=o.exec(i)
if(!e)return t
const a=e[1],c=e[2]
return t[a]?t[a].invIds.push(c):t[a]={invIds:[c],tipped:i.replace(/&extra=\d/,""),src:s.src},t}function L(t,n){const s=n[1],i=r(),e=r({innerHTML:`<img src="${s.src}" class="tip-dynamic" `+`data-tipped="${s.tipped}">`})
f(i,e)
const a=r({innerHTML:`<button class="fshBl fshBls" data-id="${n[0]}">Take All ${s.invIds.length}</button>`})
f(i,a),f(t,i)}function q(t){!function(t){const n=$(`#temp-inv-img-${t}`).qtip("api")
n&&n.destroy(!0)}(t.id)
const n=m(`temp-inv-${t.id}`)
n&&l("",n)}function I(t,n){v(n,t)||p(n.r)&&function(t,n){n.r.forEach(q),T(`${n.r.length.toString()} item(s) taken.`,t)}(t,n)}function M(t,n){j(n).then(c(I,t))}function Q(t,n,s){s.target.classList.contains("fshBls")&&function(t,n,s){const i=s.dataset.id,{invIds:e}=t[i]
l(`taking all ${e.length} items`,s.parentNode),g(40,e).forEach(c(M,n))}(t,n,s.target)}function C(t,n,s){const i=r({className:"fshTakeGrid"})
!function(t,n){u(n).forEach(c(L,t))}(i,t),f(n,i),d(i,c(Q,t,s))}function E(t){const n=r({id:"quickTake",innerHTML:'<div class="fshCenter"><br><font size="3"><b>Quick Take</b></font><br><br>Select which item to take all similar items from your Mailbox.</div><div></div>'}),s=function(t){const n=r(),s=b()
return f(n,s),f(t,n),s}(n)
f(n,r()),C(t,n,s),f(i,n)}function A(t,n){x("qtOn","Mailbox",n),E(t.reduce(y,{}))}export default function(){if(n())return
const t=s("a",i)
if(0===t.length)return
const o=i.lastElementChild
!function(t,n){const s=h({id:"fshQuickTake",type:"checkbox"})
e(s,n),a(s,"change",c(A,t,n))}(t,o),x("qtOff","Quick Take",o)}
//# sourceMappingURL=mailbox-abf0be3a.js.map
