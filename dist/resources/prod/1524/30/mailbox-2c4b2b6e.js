import{w as t,x as n,g as e,p as i,O as s,t as a,k as o,m as c,h as r,o as f,e as u,l as m,A as d,y as l}from"./calfSystem-6459f18a.js"
import{i as p}from"./isArray-0709f57e.js"
import{c as h}from"./createInput-7be6e294.js"
import{c as k}from"./createLabel-f5b2081a.js"
import{i as b}from"./insertElementBefore-1b96a575.js"
import{c as g}from"./createUl-75275523.js"
import{c as v}from"./chunk-c85463de.js"
import{j as T,o as j}from"./jsonFail-7407016e.js"
function x(n){return function(n){return t({cmd:"tempinv",subcmd:"takeitems",item:n})}(n)}function y(t,n,e){const i=k({id:t,className:"sendLink",htmlFor:"fshQuickTake",textContent:"Toggle "+n})
return b(i,e),i}function E(t,n){const e=n.children[0],{tipped:i}=e.dataset,s=o.exec(i)
if(!s)return t
const a=s[1],c=s[2]
return t[a]?t[a].invIds.push(c):t[a]={invIds:[c],tipped:i.replace(/&extra=\d/,""),src:e.src},t}function I(t,n){const e=n[1],i=c(),s=c({innerHTML:`<img src="${e.src}" class="tip-dynamic" data-tipped="${e.tipped}">`})
r(i,s)
const a=c({innerHTML:`<button class="fshBl fshBls" data-id="${n[0]}">Take All ${e.invIds.length}</button>`})
r(i,a),r(t,i)}function L(t){!function(t){const n=$("#temp-inv-img-"+t).qtip("api")
n&&n.destroy(!0)}(t.id)
const n=l("temp-inv-"+t.id)
n&&d("",n)}function M(t,n){T(n,t)||p(n.r)&&function(t,n){n.r.forEach(L),j(n.r.length.toString()+" item(s) taken.",t)}(t,n)}function q(t,n){x(n).then(a(M,t))}function B(t,n,e){m("fshBls",e.target)&&function(t,n,e){const i=e.dataset.id,{invIds:s}=t[i]
d(`taking all ${s.length} items`,e.parentNode),v(40,s).forEach(a(q,n))}(t,n,e.target)}function Q(t,n,e){const i=c({className:"fshTakeGrid"})
!function(t,n){u(n).forEach(a(I,t))}(i,t),r(n,i),f(i,a(B,t,e))}function A(t){const n=c({id:"quickTake",innerHTML:'<div class="fshCenter"><br><font size="3"><b>Quick Take</b></font><br><br>Select which item to take all similar items from your Mailbox.</div><div></div>'}),e=function(t){const n=c(),e=g()
return r(n,e),r(t,n),e}(n)
r(n,c()),Q(t,n,e),r(i,n)}function C(t,n){y("qtOn","Mailbox",n)
A(t.reduce(E,{}))}function H(){if(n())return
const t=e("a",i)
if(0===t.length)return
const o=i.lastElementChild
!function(t,n){const e=h({id:"fshQuickTake",type:"checkbox"})
b(e,n),s(e,"change",a(C,t,n))}(t,o),y("qtOff","Quick Take",o)}export default H
//# sourceMappingURL=mailbox-2c4b2b6e.js.map
