import{m as n,v as t,p as e,f as i,o as s,M as o,z as a,I as r,ao as c,an as f,j as u}from"./calfSystem-6fc0cc1b.js"
import{c as m}from"./createInput-75e5aa25.js"
import{i as l}from"./insertTextBeforeEnd-d2b1d9ce.js"
import{i as p}from"./insertElementBefore-6f4b88f2.js"
import{c as v}from"./createSpan-12ee4f1a.js"
import{j as d,o as h}from"./jsonFail-0e61ede2.js"
import{c as b}from"./createAnchor-255afa0c.js"
import{x as j}from"./xPath-9b3cad75.js"
function g(n){return function(n){return t({cmd:"inventing",subcmd:"doinvent",recipe_id:n})}(n)}let C,I,y
function N(n){var t
d(n,y)||h((t=n.r).item?`<span class="fshGreen">You successfully invented the item [${t.item.n}].</span>`:'<span class="fshRed">You have failed to invent the item.</span>',y)}function $(n){a(n,I),a("",y)}function w(){const n=Number(C.value)
if(!n)return void $("")
const t=o('input[name="recipe_id"]').value
$(`Inventing ${String(n)} Items`)
for(let e=0;e<n;e+=1)g(t).then(N)}function x(n){const t=n.insertRow(-1).insertCell(-1)
return t.className="fshCenter",t}function E(t){var e
y=n("ol",e),i(t,y)}function S(n){!function(n){I=v(),i(n,I)}(n),E(n)}function _(n){var t
t=x(n),l(t,"Select how many to quick invent"),C=m({className:"custominput fshNumberInput",min:0,type:"number",value:1}),i(t,C),function(n){const t=m({className:"custombutton",type:"button",value:"Quick invent items"})
i(n,t),s(t,w)}(x(n)),S(x(n))}function k(n){return`${c}items${f}view&item_id=${n}`}function B(n,t){const e=function(n){if(!n)return
const t=n.src.match(/\/items\/(\d+)\.gif/)
return t?t[1]:void 0}(t)
if(!e)return
const s=function(n){return b({href:k(n),target:"_blank"})}(e)
p(s,n),i(s,n)}function R(n){B(n,n)}function T(){!function(){const n=j('.//b[.="Target Invention"]/../../following-sibling::*[1]//img')
B(o("#pCC b"),n)}(),r('#pCC img[src*="/items/"]').forEach(R)}export default function(){u()&&(T(),_(e.lastElementChild))}
//# sourceMappingURL=inventing-40660b96.js.map
