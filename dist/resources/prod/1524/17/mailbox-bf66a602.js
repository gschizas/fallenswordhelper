import{v as t,w as n,g as e,p as s,L as i,s as a,h as c,k as o,f as r,o as f,l as u,z as d,x as m}from"./calfSystem-dec5e071.js"
import{i as l}from"./isArray-5ae0f2ae.js"
import{c as p}from"./createInput-6f4c3b04.js"
import{c as h}from"./createLabel-2805259f.js"
import{c as k}from"./createUl-78e7ca74.js"
import{i as b}from"./insertElementBefore-1d764477.js"
import{c as g}from"./chunk-c2bce3da.js"
import{j as v,o as T}from"./jsonFail-12ebdb03.js"
function j(n){return function(n){return t({cmd:"tempinv",subcmd:"takeitems",item:n})}(n)}function x(t,n,e){const s=h({id:t,className:"sendLink",htmlFor:"fshQuickTake",textContent:"Toggle "+n})
return b(s,e),s}function L(t,n){const e=n.children[0],{tipped:s}=e.dataset,i=c.exec(s)
if(!i)return t
const a=i[1],o=i[2]
return t[a]?t[a].invIds.push(o):t[a]={invIds:[o],tipped:s.replace(/&extra=\d/,""),src:e.src},t}function y(t,n){const e=n[1],s=o(),i=o({innerHTML:`<img src="${e.src}" class="tip-dynamic" data-tipped="${e.tipped}">`})
r(s,i)
const a=o({innerHTML:`<button class="fshBl fshBls" data-id="${n[0]}">Take All ${e.invIds.length}</button>`})
r(s,a),r(t,s)}function E(t){!function(t){const n=$("#temp-inv-img-"+t).qtip("api")
n&&n.destroy(!0)}(t.id)
const n=m("temp-inv-"+t.id)
n&&d("",n)}function I(t,n){v(n,t)||l(n.r)&&function(t,n){n.r.forEach(E),T(n.r.length.toString()+" item(s) taken.",t)}(t,n)}function M(t,n){j(n).then(a(I,t))}function q(t,n,e){e.target.classList.contains("fshBls")&&function(t,n,e){const s=e.dataset.id,{invIds:i}=t[s]
d(`taking all ${i.length} items`,e.parentNode),g(40,i).forEach(a(M,n))}(t,n,e.target)}function B(t,n,e){const s=o({className:"fshTakeGrid"})
!function(t,n){u(n).forEach(a(y,t))}(s,t),r(n,s),f(s,a(q,t,e))}function Q(t){const n=o({id:"quickTake",innerHTML:'<div class="fshCenter"><br><font size="3"><b>Quick Take</b></font><br><br>Select which item to take all similar items from your Mailbox.</div><div></div>'}),e=function(t){const n=o(),e=k()
return r(n,e),r(t,n),e}(n)
r(n,o()),B(t,n,e),r(s,n)}function C(t,n){x("qtOn","Mailbox",n)
Q(t.reduce(L,{}))}export default function(){if(n())return
const t=e("a",s)
if(0===t.length)return
const c=s.lastElementChild
!function(t,n){const e=p({id:"fshQuickTake",type:"checkbox"})
b(e,n),i(e,"change",a(C,t,n))}(t,c),x("qtOff","Quick Take",c)}
//# sourceMappingURL=mailbox-bf66a602.js.map
