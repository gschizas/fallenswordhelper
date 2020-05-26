import{v as t,w as n,g as s,p as e,K as i,s as c,h as a,k as o,f as r,o as f,l as d,z as u,x as m}from"./calfSystem-1262535f.js"
import{i as l}from"./isArray-d09fe8d1.js"
import{c as p}from"./createInput-62cab8cf.js"
import{c as h}from"./createLabel-7ec6b2f8.js"
import{c as k}from"./createUl-17d107e3.js"
import{i as b}from"./insertElementBefore-dcdbe7ae.js"
import{c as g}from"./chunk-ac937c14.js"
import{j as v,o as T}from"./jsonFail-78de8d47.js"
function j(n){return function(n){return t({cmd:"tempinv",subcmd:"takeitems",item:n})}(n)}function x(t,n,s){const e=h({id:t,className:"sendLink",htmlFor:"fshQuickTake",textContent:"Toggle "+n})
return b(e,s),e}function y(t,n){const s=n.children[0],{tipped:e}=s.dataset,i=a.exec(e)
if(!i)return t
const c=i[1],o=i[2]
return t[c]?t[c].invIds.push(o):t[c]={invIds:[o],tipped:e.replace(/&extra=\d/,""),src:s.src},t}function L(t,n){const s=n[1],e=o(),i=o({innerHTML:`<img src="${s.src}" class="tip-dynamic" data-tipped="${s.tipped}">`})
r(e,i)
const c=o({innerHTML:`<button class="fshBl fshBls" data-id="${n[0]}">Take All ${s.invIds.length}</button>`})
r(e,c),r(t,e)}function E(t){!function(t){const n=$("#temp-inv-img-"+t).qtip("api")
n&&n.destroy(!0)}(t.id)
const n=m("temp-inv-"+t.id)
n&&u("",n)}function I(t,n){v(n,t)||l(n.r)&&function(t,n){n.r.forEach(E),T(n.r.length.toString()+" item(s) taken.",t)}(t,n)}function M(t,n){j(n).then(c(I,t))}function q(t,n,s){s.target.classList.contains("fshBls")&&function(t,n,s){const e=s.dataset.id,{invIds:i}=t[e]
u(`taking all ${i.length} items`,s.parentNode),g(40,i).forEach(c(M,n))}(t,n,s.target)}function B(t,n,s){const e=o({className:"fshTakeGrid"})
!function(t,n){d(n).forEach(c(L,t))}(e,t),r(n,e),f(e,c(q,t,s))}function Q(t){const n=o({id:"quickTake",innerHTML:'<div class="fshCenter"><br><font size="3"><b>Quick Take</b></font><br><br>Select which item to take all similar items from your Mailbox.</div><div></div>'}),s=function(t){const n=o(),s=k()
return r(n,s),r(t,n),s}(n)
r(n,o()),B(t,n,s),r(e,n)}function C(t,n){x("qtOn","Mailbox",n)
Q(t.reduce(y,{}))}export default function(){if(n())return
const t=s("a",e)
if(0===t.length)return
const a=e.lastElementChild
!function(t,n){const s=p({id:"fshQuickTake",type:"checkbox"})
b(s,n),i(s,"change",c(C,t,n))}(t,a),x("qtOff","Quick Take",a)}
//# sourceMappingURL=mailbox-694ffbe7.js.map
