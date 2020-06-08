import{n,w as t,p as e,f as i,o as s,C as o,A as r,D as a,ap as c,ao as u,j as f}from"./calfSystem-05554bae.js"
import{c as m}from"./createInput-b4c4948c.js"
import{i as l}from"./insertTextBeforeEnd-0b7ac991.js"
import{i as p}from"./insertElementBefore-2ba0b318.js"
import{c as v}from"./createSpan-472d43ae.js"
import{j as b,o as d}from"./jsonFail-65f32db5.js"
import{c as h}from"./createAnchor-8b587d74.js"
import{x as j}from"./xPath-8466baf0.js"
function g(n){return function(n){return t({cmd:"inventing",subcmd:"doinvent",recipe_id:n})}(n)}let C,w,y
function I(n){var t
b(n,y)||d((t=n.r).item?`<span class="fshGreen">You successfully invented the item [${t.item.n}].</span>`:'<span class="fshRed">You have failed to invent the item.</span>',y)}function N(n){r(n,w),r("",y)}function $(){const n=Number(C.value)
if(!n)return void N("")
const t=o('input[name="recipe_id"]').value
N(`Inventing ${String(n)} Items`)
for(let e=0;e<n;e+=1)g(t).then(I)}function x(n){const t=n.insertRow(-1).insertCell(-1)
return t.className="fshCenter",t}function E(t){var e
y=n("ol",e),i(t,y)}function S(n){!function(n){w=v(),i(n,w)}(n),E(n)}function _(n){var t
t=x(n),l(t,"Select how many to quick invent"),C=m({className:"custominput fshNumberInput",min:0,type:"number",value:1}),i(t,C),function(n){const t=m({className:"custombutton",type:"button",value:"Quick invent items"})
i(n,t),s(t,$)}(x(n)),S(x(n))}function k(n){return`${c}items${u}view&item_id=${n}`}function A(n,t){const e=function(n){if(!n)return
const t=n.src.match(/\/items\/(\d+)\.gif/)
return t?t[1]:void 0}(t)
if(!e)return
const s=function(n){return h({href:k(n),target:"_blank"})}(e)
p(s,n),i(s,n)}function B(n){A(n,n)}function R(){!function(){const n=j('.//b[.="Target Invention"]/../../following-sibling::*[1]//img')
A(o("#pCC b"),n)}(),a('#pCC img[src*="/items/"]').forEach(B)}export default function(){f()&&(R(),_(e.lastElementChild))}
//# sourceMappingURL=inventing-50a739ff.js.map
