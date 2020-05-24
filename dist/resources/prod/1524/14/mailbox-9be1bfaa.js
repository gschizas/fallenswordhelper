import{x as t,y as n,g as s,p as i,O as e,P as a,u as c,h as o,k as r,f,o as d,n as u,B as l,z as m}from"./calfSystem-d587d232.js"
import{i as p}from"./isArray-5dbf2807.js"
import{c as h}from"./createInput-f5f615ed.js"
import{c as k}from"./createLabel-d01980d0.js"
import{c as b}from"./createUl-8fcf56ef.js"
import{c as g}from"./chunk-7bfa3ec6.js"
import{j as v,o as T}from"./jsonFail-669d98d1.js"
function j(n){return function(n){return t({cmd:"tempinv",subcmd:"takeitems",item:n})}(n)}function x(t,n,s){const i=k({id:t,className:"sendLink",htmlFor:"fshQuickTake",textContent:"Toggle "+n})
return e(i,s),i}function y(t,n){const s=n.children[0],{tipped:i}=s.dataset,e=o.exec(i)
if(!e)return t
const a=e[1],c=e[2]
return t[a]?t[a].invIds.push(c):t[a]={invIds:[c],tipped:i.replace(/&extra=\d/,""),src:s.src},t}function L(t,n){const s=n[1],i=r(),e=r({innerHTML:`<img src="${s.src}" class="tip-dynamic" data-tipped="${s.tipped}">`})
f(i,e)
const a=r({innerHTML:`<button class="fshBl fshBls" data-id="${n[0]}">Take All ${s.invIds.length}</button>`})
f(i,a),f(t,i)}function I(t){!function(t){const n=$("#temp-inv-img-"+t).qtip("api")
n&&n.destroy(!0)}(t.id)
const n=m("temp-inv-"+t.id)
n&&l("",n)}function M(t,n){v(n,t)||p(n.r)&&function(t,n){n.r.forEach(I),T(n.r.length.toString()+" item(s) taken.",t)}(t,n)}function q(t,n){j(n).then(c(M,t))}function B(t,n,s){s.target.classList.contains("fshBls")&&function(t,n,s){const i=s.dataset.id,{invIds:e}=t[i]
l(`taking all ${e.length} items`,s.parentNode),g(40,e).forEach(c(q,n))}(t,n,s.target)}function E(t,n,s){const i=r({className:"fshTakeGrid"})
!function(t,n){u(n).forEach(c(L,t))}(i,t),f(n,i),d(i,c(B,t,s))}function Q(t){const n=r({id:"quickTake",innerHTML:'<div class="fshCenter"><br><font size="3"><b>Quick Take</b></font><br><br>Select which item to take all similar items from your Mailbox.</div><div></div>'}),s=function(t){const n=r(),s=b()
return f(n,s),f(t,n),s}(n)
f(n,r()),E(t,n,s),f(i,n)}function C(t,n){x("qtOn","Mailbox",n)
Q(t.reduce(y,{}))}export default function(){if(n())return
const t=s("a",i)
if(0===t.length)return
const o=i.lastElementChild
!function(t,n){const s=h({id:"fshQuickTake",type:"checkbox"})
e(s,n),a(s,"change",c(C,t,n))}(t,o),x("qtOff","Quick Take",o)}
//# sourceMappingURL=mailbox-9be1bfaa.js.map
