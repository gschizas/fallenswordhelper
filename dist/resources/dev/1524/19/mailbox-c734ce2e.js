import{v as t,w as n,g as s,p as i,L as e,s as c,h as a,k as o,f as r,o as f,l as u,z as d,M as l,x as m}from"./calfSystem-f7574730.js"
import{c as p}from"./createInput-ca63b3fd.js"
import{c as h}from"./createLabel-b9e7f95b.js"
import{c as k}from"./createUl-817f6f2d.js"
import{i as b}from"./insertElementBefore-b5c9c232.js"
import{c as g}from"./chunk-817a9c70.js"
import{j as v,o as T}from"./jsonFail-52476feb.js"
function j(n){return function(n){return t({cmd:"tempinv",subcmd:"takeitems",item:n})}(n)}function x(t,n,s){const i=h({id:t,className:"sendLink",htmlFor:"fshQuickTake",textContent:"Toggle "+n})
return b(i,s),i}function L(t,n){const s=n.children[0],{tipped:i}=s.dataset,e=a.exec(i)
if(!e)return t
const c=e[1],o=e[2]
return t[c]?t[c].invIds.push(o):t[c]={invIds:[o],tipped:i.replace(/&extra=\d/,""),src:s.src},t}function M(t,n){const s=n[1],i=o(),e=o({innerHTML:`<img src="${s.src}" class="tip-dynamic" data-tipped="${s.tipped}">`})
r(i,e)
const c=o({innerHTML:`<button class="fshBl fshBls" data-id="${n[0]}">Take All ${s.invIds.length}</button>`})
r(i,c),r(t,i)}function y(t){!function(t){const n=$("#temp-inv-img-"+t).qtip("api")
n&&n.destroy(!0)}(t.id)
const n=m("temp-inv-"+t.id)
n&&d("",n)}function E(t,n){v(n,t)||l(n.r)&&function(t,n){n.r.forEach(y),T(n.r.length.toString()+" item(s) taken.",t)}(t,n)}function I(t,n){j(n).then(c(E,t))}function q(t,n,s){s.target.classList.contains("fshBls")&&function(t,n,s){const i=s.dataset.id,{invIds:e}=t[i]
d(`taking all ${e.length} items`,s.parentNode),g(40,e).forEach(c(I,n))}(t,n,s.target)}function B(t,n,s){const i=o({className:"fshTakeGrid"})
!function(t,n){u(n).forEach(c(M,t))}(i,t),r(n,i),f(i,c(q,t,s))}function Q(t){const n=o({id:"quickTake",innerHTML:'<div class="fshCenter"><br><font size="3"><b>Quick Take</b></font><br><br>Select which item to take all similar items from your Mailbox.</div><div></div>'}),s=function(t){const n=o(),s=k()
return r(n,s),r(t,n),s}(n)
r(n,o()),B(t,n,s),r(i,n)}function C(t,n){x("qtOn","Mailbox",n)
Q(t.reduce(L,{}))}export default function(){if(n())return
const t=s("a",i)
if(0===t.length)return
const a=i.lastElementChild
!function(t,n){const s=p({id:"fshQuickTake",type:"checkbox"})
b(s,n),e(s,"change",c(C,t,n))}(t,a),x("qtOff","Quick Take",a)}
//# sourceMappingURL=mailbox-c734ce2e.js.map
