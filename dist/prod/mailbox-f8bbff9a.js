import{y as t,z as n,g as s,p as e,P as i,Q as a,v as c,k as o,l as r,h as f,o as d,q as u,C as l,A as m}from"./calfSystem-4b4fbec4.js"
import{i as p}from"./isArray-b95703a0.js"
import{c as h}from"./createInput-b0cbdcde.js"
import{c as k}from"./createLabel-4edbf9a6.js"
import{c as b}from"./createUl-63ded7ff.js"
import{c as g}from"./chunk-8ede4dd4.js"
import{j as v,o as T}from"./jsonFail-017e403e.js"
function j(n){return function(n){return t({cmd:"tempinv",subcmd:"takeitems",item:n})}(n)}function x(t,n,s){const e=k({id:t,className:"sendLink",htmlFor:"fshQuickTake",textContent:"Toggle "+n})
return i(e,s),e}function y(t,n){const s=n.children[0],{tipped:e}=s.dataset,i=o.exec(e)
if(!i)return t
const a=i[1],c=i[2]
return t[a]?t[a].invIds.push(c):t[a]={invIds:[c],tipped:e.replace(/&extra=\d/,""),src:s.src},t}function L(t,n){const s=n[1],e=r(),i=r({innerHTML:`<img src="${s.src}" class="tip-dynamic" data-tipped="${s.tipped}">`})
f(e,i)
const a=r({innerHTML:`<button class="fshBl fshBls" data-id="${n[0]}">Take All ${s.invIds.length}</button>`})
f(e,a),f(t,e)}function q(t){!function(t){const n=$("#temp-inv-img-"+t).qtip("api")
n&&n.destroy(!0)}(t.id)
const n=m("temp-inv-"+t.id)
n&&l("",n)}function I(t,n){v(n,t)||p(n.r)&&function(t,n){n.r.forEach(q),T(n.r.length.toString()+" item(s) taken.",t)}(t,n)}function M(t,n){j(n).then(c(I,t))}function Q(t,n,s){s.target.classList.contains("fshBls")&&function(t,n,s){const e=s.dataset.id,{invIds:i}=t[e]
l(`taking all ${i.length} items`,s.parentNode),g(40,i).forEach(c(M,n))}(t,n,s.target)}function C(t,n,s){const e=r({className:"fshTakeGrid"})
!function(t,n){u(n).forEach(c(L,t))}(e,t),f(n,e),d(e,c(Q,t,s))}function E(t){const n=r({id:"quickTake",innerHTML:'<div class="fshCenter"><br><font size="3"><b>Quick Take</b></font><br><br>Select which item to take all similar items from your Mailbox.</div><div></div>'}),s=function(t){const n=r(),s=b()
return f(n,s),f(t,n),s}(n)
f(n,r()),C(t,n,s),f(e,n)}function A(t,n){x("qtOn","Mailbox",n)
E(t.reduce(y,{}))}export default function(){if(n())return
const t=s("a",e)
if(0===t.length)return
const o=e.lastElementChild
!function(t,n){const s=h({id:"fshQuickTake",type:"checkbox"})
i(s,n),a(s,"change",c(A,t,n))}(t,o),x("qtOff","Quick Take",o)}
//# sourceMappingURL=mailbox-f8bbff9a.js.map
