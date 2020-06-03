import{v as t,w as n,g as s,p as e,L as i,s as a,h as c,k as o,f as r,o as f,l as u,z as m,x as l}from"./calfSystem-6fc0cc1b.js"
import{i as d}from"./isArray-5986f48a.js"
import{c as p}from"./createInput-75e5aa25.js"
import{c as h}from"./createLabel-2a8f516e.js"
import{c as k}from"./createUl-a91b6072.js"
import{i as b}from"./insertElementBefore-6f4b88f2.js"
import{c as g}from"./chunk-e365cb08.js"
import{j as v,o as T}from"./jsonFail-0e61ede2.js"
function j(n){return function(n){return t({cmd:"tempinv",subcmd:"takeitems",item:n})}(n)}function x(t,n,s){const e=h({id:t,className:"sendLink",htmlFor:"fshQuickTake",textContent:"Toggle "+n})
return b(e,s),e}function L(t,n){const s=n.children[0],{tipped:e}=s.dataset,i=c.exec(e)
if(!i)return t
const a=i[1],o=i[2]
return t[a]?t[a].invIds.push(o):t[a]={invIds:[o],tipped:e.replace(/&extra=\d/,""),src:s.src},t}function y(t,n){const s=n[1],e=o(),i=o({innerHTML:`<img src="${s.src}" class="tip-dynamic" data-tipped="${s.tipped}">`})
r(e,i)
const a=o({innerHTML:`<button class="fshBl fshBls" data-id="${n[0]}">Take All ${s.invIds.length}</button>`})
r(e,a),r(t,e)}function E(t){!function(t){const n=$("#temp-inv-img-"+t).qtip("api")
n&&n.destroy(!0)}(t.id)
const n=l("temp-inv-"+t.id)
n&&m("",n)}function I(t,n){v(n,t)||d(n.r)&&function(t,n){n.r.forEach(E),T(n.r.length.toString()+" item(s) taken.",t)}(t,n)}function M(t,n){j(n).then(a(I,t))}function q(t,n,s){s.target.classList.contains("fshBls")&&function(t,n,s){const e=s.dataset.id,{invIds:i}=t[e]
m(`taking all ${i.length} items`,s.parentNode),g(40,i).forEach(a(M,n))}(t,n,s.target)}function B(t,n,s){const e=o({className:"fshTakeGrid"})
!function(t,n){u(n).forEach(a(y,t))}(e,t),r(n,e),f(e,a(q,t,s))}function Q(t){const n=o({id:"quickTake",innerHTML:'<div class="fshCenter"><br><font size="3"><b>Quick Take</b></font><br><br>Select which item to take all similar items from your Mailbox.</div><div></div>'}),s=function(t){const n=o(),s=k()
return r(n,s),r(t,n),s}(n)
r(n,o()),B(t,n,s),r(e,n)}function C(t,n){x("qtOn","Mailbox",n)
Q(t.reduce(L,{}))}export default function(){if(n())return
const t=s("a",e)
if(0===t.length)return
const c=e.lastElementChild
!function(t,n){const s=p({id:"fshQuickTake",type:"checkbox"})
b(s,n),i(s,"change",a(C,t,n))}(t,c),x("qtOff","Quick Take",c)}
//# sourceMappingURL=mailbox-bd82a6fd.js.map
