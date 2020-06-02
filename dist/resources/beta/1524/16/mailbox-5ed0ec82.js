import{v as t,w as n,g as s,p as i,L as e,s as a,h as c,k as o,f as r,o as f,l as u,z as m,x as d}from"./calfSystem-9554b525.js"
import{i as l}from"./isArray-7b017653.js"
import{c as p}from"./createInput-73435eda.js"
import{c as h}from"./createLabel-593790e6.js"
import{c as k}from"./createUl-260acec8.js"
import{i as b}from"./insertElementBefore-5f238f78.js"
import{c as g}from"./chunk-cb4731b2.js"
import{j as v,o as T}from"./jsonFail-87e33d99.js"
function j(n){return function(n){return t({cmd:"tempinv",subcmd:"takeitems",item:n})}(n)}function x(t,n,s){const i=h({id:t,className:"sendLink",htmlFor:"fshQuickTake",textContent:"Toggle "+n})
return b(i,s),i}function L(t,n){const s=n.children[0],{tipped:i}=s.dataset,e=c.exec(i)
if(!e)return t
const a=e[1],o=e[2]
return t[a]?t[a].invIds.push(o):t[a]={invIds:[o],tipped:i.replace(/&extra=\d/,""),src:s.src},t}function y(t,n){const s=n[1],i=o(),e=o({innerHTML:`<img src="${s.src}" class="tip-dynamic" data-tipped="${s.tipped}">`})
r(i,e)
const a=o({innerHTML:`<button class="fshBl fshBls" data-id="${n[0]}">Take All ${s.invIds.length}</button>`})
r(i,a),r(t,i)}function E(t){!function(t){const n=$("#temp-inv-img-"+t).qtip("api")
n&&n.destroy(!0)}(t.id)
const n=d("temp-inv-"+t.id)
n&&m("",n)}function I(t,n){v(n,t)||l(n.r)&&function(t,n){n.r.forEach(E),T(n.r.length.toString()+" item(s) taken.",t)}(t,n)}function M(t,n){j(n).then(a(I,t))}function q(t,n,s){s.target.classList.contains("fshBls")&&function(t,n,s){const i=s.dataset.id,{invIds:e}=t[i]
m(`taking all ${e.length} items`,s.parentNode),g(40,e).forEach(a(M,n))}(t,n,s.target)}function B(t,n,s){const i=o({className:"fshTakeGrid"})
!function(t,n){u(n).forEach(a(y,t))}(i,t),r(n,i),f(i,a(q,t,s))}function Q(t){const n=o({id:"quickTake",innerHTML:'<div class="fshCenter"><br><font size="3"><b>Quick Take</b></font><br><br>Select which item to take all similar items from your Mailbox.</div><div></div>'}),s=function(t){const n=o(),s=k()
return r(n,s),r(t,n),s}(n)
r(n,o()),B(t,n,s),r(i,n)}function C(t,n){x("qtOn","Mailbox",n)
Q(t.reduce(L,{}))}export default function(){if(n())return
const t=s("a",i)
if(0===t.length)return
const c=i.lastElementChild
!function(t,n){const s=p({id:"fshQuickTake",type:"checkbox"})
b(s,n),e(s,"change",a(C,t,n))}(t,c),x("qtOff","Quick Take",c)}
//# sourceMappingURL=mailbox-5ed0ec82.js.map
