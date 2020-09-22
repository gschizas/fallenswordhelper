import{w as t,x as n,g as i,p as s,O as e,t as a,k as c,m as o,h as r,o as f,e as u,l as m,A as d,y as l}from"./calfSystem-019a589c.js"
import{i as p}from"./isArray-2519a795.js"
import{c as h}from"./createInput-62d3b51a.js"
import{c as k}from"./createLabel-7b42bf61.js"
import{i as b}from"./insertElementBefore-2ad05963.js"
import{c as g}from"./createUl-5b761c85.js"
import{c as v}from"./chunk-a9141930.js"
import{j as T,o as j}from"./jsonFail-bd816cf9.js"
function x(n){return function(n){return t({cmd:"tempinv",subcmd:"takeitems",item:n})}(n)}function y(t,n,i){const s=k({id:t,className:"sendLink",htmlFor:"fshQuickTake",textContent:"Toggle "+n})
return b(s,i),s}function E(t,n){const i=n.children[0],{tipped:s}=i.dataset,e=c.exec(s)
if(!e)return t
const a=e[1],o=e[2]
return t[a]?t[a].invIds.push(o):t[a]={invIds:[o],tipped:s.replace(/&extra=\d/,""),src:i.src},t}function I(t,n){const i=n[1],s=o(),e=o({innerHTML:`<img src="${i.src}" class="tip-dynamic" data-tipped="${i.tipped}">`})
r(s,e)
const a=o({innerHTML:`<button class="fshBl fshBls" data-id="${n[0]}">Take All ${i.invIds.length}</button>`})
r(s,a),r(t,s)}function L(t){!function(t){const n=$("#temp-inv-img-"+t).qtip("api")
n&&n.destroy(!0)}(t.id)
const n=l("temp-inv-"+t.id)
n&&d("",n)}function M(t,n){T(n,t)||p(n.r)&&function(t,n){n.r.forEach(L),j(n.r.length.toString()+" item(s) taken.",t)}(t,n)}function q(t,n){x(n).then(a(M,t))}function B(t,n,i){m("fshBls",i.target)&&function(t,n,i){const s=i.dataset.id,{invIds:e}=t[s]
d(`taking all ${e.length} items`,i.parentNode),v(40,e).forEach(a(q,n))}(t,n,i.target)}function Q(t,n,i){const s=o({className:"fshTakeGrid"})
!function(t,n){u(n).forEach(a(I,t))}(s,t),r(n,s),f(s,a(B,t,i))}function A(t){const n=o({id:"quickTake",innerHTML:'<div class="fshCenter"><br><font size="3"><b>Quick Take</b></font><br><br>Select which item to take all similar items from your Mailbox.</div><div></div>'}),i=function(t){const n=o(),i=g()
return r(n,i),r(t,n),i}(n)
r(n,o()),Q(t,n,i),r(s,n)}function C(t,n){y("qtOn","Mailbox",n)
A(t.reduce(E,{}))}function H(){if(n())return
const t=i("a",s)
if(0===t.length)return
const c=s.lastElementChild
!function(t,n){const i=h({id:"fshQuickTake",type:"checkbox"})
b(i,n),e(i,"change",a(C,t,n))}(t,c),y("qtOff","Quick Take",c)}export default H
//# sourceMappingURL=mailbox-3cd2b3de.js.map
