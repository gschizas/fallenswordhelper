import{y as t,z as n,g as s,p as i,P as e,Q as a,v as c,k as o,l as r,h as f,o as u,q as d,C as l,A as m}from"./calfSystem-07c25a1c.js"
import{i as p}from"./isArray-9e480d80.js"
import{c as h}from"./createInput-2b2e8237.js"
import{c as k}from"./createLabel-758fd9df.js"
import{c as g}from"./createUl-06e31567.js"
import{c as b}from"./chunk-2669164c.js"
import{j as v,o as T}from"./jsonFail-6864ac22.js"
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
l(`taking all ${e.length} items`,s.parentNode),b(40,e).forEach(c(M,n))}(t,n,s.target)}function C(t,n,s){const i=r({className:"fshTakeGrid"})
!function(t,n){d(n).forEach(c(L,t))}(i,t),f(n,i),u(i,c(Q,t,s))}function E(t){const n=r({id:"quickTake",innerHTML:'<div class="fshCenter"><br><font size="3"><b>Quick Take</b></font><br><br>Select which item to take all similar items from your Mailbox.</div><div></div>'}),s=function(t){const n=r(),s=g()
return f(n,s),f(t,n),s}(n)
f(n,r()),C(t,n,s),f(i,n)}function A(t,n){x("qtOn","Mailbox",n),E(t.reduce(y,{}))}export default function(){if(n())return
const t=s("a",i)
if(0===t.length)return
const o=i.lastElementChild
!function(t,n){const s=h({id:"fshQuickTake",type:"checkbox"})
e(s,n),a(s,"change",c(A,t,n))}(t,o),x("qtOff","Quick Take",o)}
//# sourceMappingURL=mailbox-6657b982.js.map
