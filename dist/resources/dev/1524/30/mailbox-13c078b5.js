import{w as t,x as n,g as e,p as i,O as s,t as a,k as c,m as o,h as r,o as f,e as u,l as d,A as m,P as l,y as p}from"./calfSystem-54df10e3.js"
import{c as h}from"./createInput-0ba53f77.js"
import{c as k}from"./createLabel-eb1c6e94.js"
import{i as b}from"./insertElementBefore-1b96a575.js"
import{c as g}from"./createUl-1f6da03c.js"
import{c as v}from"./chunk-c85463de.js"
import{j as T,o as j}from"./jsonFail-5c8cde17.js"
function x(n){return function(n){return t({cmd:"tempinv",subcmd:"takeitems",item:n})}(n)}function y(t,n,e){const i=k({id:t,className:"sendLink",htmlFor:"fshQuickTake",textContent:"Toggle "+n})
return b(i,e),i}function E(t,n){const e=n.children[0],{tipped:i}=e.dataset,s=c.exec(i)
if(!s)return t
const a=s[1],o=s[2]
return t[a]?t[a].invIds.push(o):t[a]={invIds:[o],tipped:i.replace(/&extra=\d/,""),src:e.src},t}function I(t,n){const e=n[1],i=o(),s=o({innerHTML:`<img src="${e.src}" class="tip-dynamic" data-tipped="${e.tipped}">`})
r(i,s)
const a=o({innerHTML:`<button class="fshBl fshBls" data-id="${n[0]}">Take All ${e.invIds.length}</button>`})
r(i,a),r(t,i)}function L(t){!function(t){const n=$("#temp-inv-img-"+t).qtip("api")
n&&n.destroy(!0)}(t.id)
const n=p("temp-inv-"+t.id)
n&&m("",n)}function M(t,n){T(n,t)||l(n.r)&&function(t,n){n.r.forEach(L),j(n.r.length.toString()+" item(s) taken.",t)}(t,n)}function q(t,n){x(n).then(a(M,t))}function B(t,n,e){d("fshBls",e.target)&&function(t,n,e){const i=e.dataset.id,{invIds:s}=t[i]
m(`taking all ${s.length} items`,e.parentNode),v(40,s).forEach(a(q,n))}(t,n,e.target)}function Q(t,n,e){const i=o({className:"fshTakeGrid"})
!function(t,n){u(n).forEach(a(I,t))}(i,t),r(n,i),f(i,a(B,t,e))}function C(t){const n=o({id:"quickTake",innerHTML:'<div class="fshCenter"><br><font size="3"><b>Quick Take</b></font><br><br>Select which item to take all similar items from your Mailbox.</div><div></div>'}),e=function(t){const n=o(),e=g()
return r(n,e),r(t,n),e}(n)
r(n,o()),Q(t,n,e),r(i,n)}function H(t,n){y("qtOn","Mailbox",n)
C(t.reduce(E,{}))}function N(){if(n())return
const t=e("a",i)
if(0===t.length)return
const c=i.lastElementChild
!function(t,n){const e=h({id:"fshQuickTake",type:"checkbox"})
b(e,n),s(e,"change",a(H,t,n))}(t,c),y("qtOff","Quick Take",c)}export default N
//# sourceMappingURL=mailbox-13c078b5.js.map
