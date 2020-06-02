import{m as n,v as t,p as e,f as i,o as s,N as o,z as r,I as a,at as c,as as u,j as f}from"./calfSystem-d49dbbd3.js"
import{c as m}from"./createInput-1699d448.js"
import{i as l}from"./insertTextBeforeEnd-15fdfab0.js"
import{i as d}from"./insertElementBefore-5eb6d41d.js"
import{c as p}from"./createSpan-d12a564e.js"
import{j as v,o as h}from"./jsonFail-6914cee9.js"
import{c as b}from"./createAnchor-040d02de.js"
import{x as j}from"./xPath-e6d86637.js"
function g(n){return function(n){return t({cmd:"inventing",subcmd:"doinvent",recipe_id:n})}(n)}let C,I,N
function y(n){var t
v(n,N)||h((t=n.r).item?`<span class="fshGreen">You successfully invented the item [${t.item.n}].</span>`:'<span class="fshRed">You have failed to invent the item.</span>',N)}function $(n){r(n,I),r("",N)}function w(){const n=Number(C.value)
if(!n)return void $("")
const t=o('input[name="recipe_id"]').value
$(`Inventing ${String(n)} Items`)
for(let e=0;e<n;e+=1)g(t).then(y)}function x(n){const t=n.insertRow(-1).insertCell(-1)
return t.className="fshCenter",t}function E(t){var e
N=n("ol",e),i(t,N)}function S(n){!function(n){I=p(),i(n,I)}(n),E(n)}function _(n){var t
t=x(n),l(t,"Select how many to quick invent"),C=m({className:"custominput fshNumberInput",min:0,type:"number",value:1}),i(t,C),function(n){const t=m({className:"custombutton",type:"button",value:"Quick invent items"})
i(n,t),s(t,w)}(x(n)),S(x(n))}function k(n){return`${c}items${u}view&item_id=${n}`}function B(n,t){const e=function(n){if(!n)return
const t=n.src.match(/\/items\/(\d+)\.gif/)
return t?t[1]:void 0}(t)
if(!e)return
const s=function(n){return b({href:k(n),target:"_blank"})}(e)
d(s,n),i(s,n)}function R(n){B(n,n)}function T(){!function(){const n=j('.//b[.="Target Invention"]/../../following-sibling::*[1]//img')
B(o("#pCC b"),n)}(),a('#pCC img[src*="/items/"]').forEach(R)}export default function(){f()&&(T(),_(e.lastElementChild))}
//# sourceMappingURL=inventing-6036214a.js.map
