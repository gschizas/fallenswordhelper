import{n,w as t,p as e,h as i,o as s,C as o,A as r,D as c,aq as a,ap as u,j as f}from"./calfSystem-70c7a660.js"
import{c as m}from"./createInput-1c8df108.js"
import{i as l}from"./insertTextBeforeEnd-46662d9e.js"
import{i as p}from"./insertElementBefore-543d9ef0.js"
import{c as d}from"./createSpan-fc68466d.js"
import{j as v,o as h}from"./jsonFail-0cca5176.js"
import{c as j}from"./createAnchor-5ed3c1fe.js"
import{x as b}from"./xPath-d706fe1d.js"
function g(n){return function(n){return t({cmd:"inventing",subcmd:"doinvent",recipe_id:n})}(n)}let C,w,y
function I(n){var t
v(n,y)||h((t=n.r).item?`<span class="fshGreen">You successfully invented the item [${t.item.n}].</span>`:'<span class="fshRed">You have failed to invent the item.</span>',y)}function N(n){r(n,w),r("",y)}function $(){const n=Number(C.value)
if(!n)return void N("")
const t=o('input[name="recipe_id"]').value
N(`Inventing ${String(n)} Items`)
for(let e=0;e<n;e+=1)g(t).then(I)}function x(n){const t=n.insertRow(-1).insertCell(-1)
return t.className="fshCenter",t}function E(t){var e
y=n("ol",e),i(t,y)}function S(n){!function(n){w=d(),i(n,w)}(n),E(n)}function _(n){var t
t=x(n),l(t,"Select how many to quick invent"),C=m({className:"custominput fshNumberInput",min:0,type:"number",value:1}),i(t,C),function(n){const t=m({className:"custombutton",type:"button",value:"Quick invent items"})
i(n,t),s(t,$)}(x(n)),S(x(n))}function k(n){return`${a}items${u}view&item_id=${n}`}function q(n,t){const e=function(n){if(!n)return
const t=n.src.match(/\/items\/(\d+)\.gif/)
return t?t[1]:void 0}(t)
if(!e)return
const s=function(n){return j({href:k(n),target:"_blank"})}(e)
p(s,n),i(s,n)}function A(n){q(n,n)}function B(){!function(){const n=b('.//b[.="Target Invention"]/../../following-sibling::*[1]//img')
q(o("#pCC b"),n)}(),c('#pCC img[src*="/items/"]').forEach(A)}function R(){f()&&(B(),_(e.lastElementChild))}export default R
//# sourceMappingURL=inventing-0bdc94ed.js.map
