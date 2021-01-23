import{c as n}from"./createInput-cd4a36ae.js"
import{n as t,w as e,p as i,h as s,o,C as r,A as a,D as c,az as u,an as f,j as m}from"./calfSystem-7aee5245.js"
import{c as l}from"./createSpan-08d79c06.js"
import{i as p}from"./insertTextBeforeEnd-0a7068ff.js"
import{j as v,o as d}from"./jsonFail-211c760b.js"
import{c as h}from"./createAnchor-48441df8.js"
import{i as b}from"./insertElementBefore-43970b1f.js"
import{x as j}from"./xPath-7033f167.js"
function g(n){return function(n){return e({cmd:"inventing",subcmd:"doinvent",recipe_id:n})}(n)}let C,w,y
function I(n){var t
v(n,y)||d((t=n.r).item?`<span class="fshGreen">You successfully invented the item [${t.item.n}].</span>`:'<span class="fshRed">You have failed to invent the item.</span>',y)}function N(n){a(n,w),a("",y)}function $(){const n=Number(C.value)
if(!n)return void N("")
const t=r('input[name="recipe_id"]').value
N(`Inventing ${String(n)} Items`)
for(let e=0;e<n;e+=1)g(t).then(I)}function x(n){const t=n.insertRow(-1).insertCell(-1)
return t.className="fshCenter",t}function E(n){var e
y=t("ol",e),s(n,y)}function S(n){!function(n){w=l(),s(n,w)}(n),E(n)}function _(t){var e
e=x(t),p(e,"Select how many to quick invent"),C=n({className:"custominput fshNumberInput",min:0,type:"number",value:1}),s(e,C),function(t){const e=n({className:"custombutton",type:"button",value:"Quick invent items"})
s(t,e),o(e,$)}(x(t)),S(x(t))}function k(n){return`${u}items${f}view&item_id=${n}`}function A(n,t){const e=function(n){if(!n)return
const t=n.src.match(/\/items\/(\d+)\.gif/)
return t?t[1]:void 0}(t)
if(!e)return
const i=function(n){return h({href:k(n),target:"_blank"})}(e)
b(i,n),s(i,n)}function B(n){A(n,n)}function R(){!function(){const n=j('.//b[.="Target Invention"]/../../following-sibling::*[1]//img')
A(r("#pCC b"),n)}(),c('#pCC img[src*="/items/"]').forEach(B)}function T(){m()&&(R(),_(i.lastElementChild))}export default T
//# sourceMappingURL=inventing-e0d4a5b2.js.map
