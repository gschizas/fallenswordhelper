import{w as t,x as n,g as e,p as i,O as s,t as c,k as a,m as o,h as r,o as f,e as u,l as d,A as m,y as l}from"./calfSystem-ebf4b17d.js"
import{i as p}from"./isArray-0709f57e.js"
import{c as h}from"./createInput-31c9c0fc.js"
import{c as k}from"./createLabel-c7d42264.js"
import{i as b}from"./insertElementBefore-1b96a575.js"
import{c as g}from"./createUl-9ed188c7.js"
import{c as v}from"./chunk-c85463de.js"
import{j as T,o as j}from"./jsonFail-5a66e42f.js"
function x(n){return function(n){return t({cmd:"tempinv",subcmd:"takeitems",item:n})}(n)}function y(t,n,e){const i=k({id:t,className:"sendLink",htmlFor:"fshQuickTake",textContent:"Toggle "+n})
return b(i,e),i}function E(t,n){const e=n.children[0],{tipped:i}=e.dataset,s=a.exec(i)
if(!s)return t
const c=s[1],o=s[2]
return t[c]?t[c].invIds.push(o):t[c]={invIds:[o],tipped:i.replace(/&extra=\d/,""),src:e.src},t}function I(t,n){const e=n[1],i=o(),s=o({innerHTML:`<img src="${e.src}" class="tip-dynamic" data-tipped="${e.tipped}">`})
r(i,s)
const c=o({innerHTML:`<button class="fshBl fshBls" data-id="${n[0]}">Take All ${e.invIds.length}</button>`})
r(i,c),r(t,i)}function L(t){!function(t){const n=$("#temp-inv-img-"+t).qtip("api")
n&&n.destroy(!0)}(t.id)
const n=l("temp-inv-"+t.id)
n&&m("",n)}function M(t,n){T(n,t)||p(n.r)&&function(t,n){n.r.forEach(L),j(n.r.length.toString()+" item(s) taken.",t)}(t,n)}function q(t,n){x(n).then(c(M,t))}function B(t,n,e){d("fshBls",e.target)&&function(t,n,e){const i=e.dataset.id,{invIds:s}=t[i]
m(`taking all ${s.length} items`,e.parentNode),v(40,s).forEach(c(q,n))}(t,n,e.target)}function Q(t,n,e){const i=o({className:"fshTakeGrid"})
!function(t,n){u(n).forEach(c(I,t))}(i,t),r(n,i),f(i,c(B,t,e))}function A(t){const n=o({id:"quickTake",innerHTML:'<div class="fshCenter"><br><font size="3"><b>Quick Take</b></font><br><br>Select which item to take all similar items from your Mailbox.</div><div></div>'}),e=function(t){const n=o(),e=g()
return r(n,e),r(t,n),e}(n)
r(n,o()),Q(t,n,e),r(i,n)}function C(t,n){y("qtOn","Mailbox",n)
A(t.reduce(E,{}))}function H(){if(n())return
const t=e("a",i)
if(0===t.length)return
const a=i.lastElementChild
!function(t,n){const e=h({id:"fshQuickTake",type:"checkbox"})
b(e,n),s(e,"change",c(C,t,n))}(t,a),y("qtOff","Quick Take",a)}export default H
//# sourceMappingURL=mailbox-537a91de.js.map
