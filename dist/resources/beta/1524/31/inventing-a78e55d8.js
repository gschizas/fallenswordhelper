import{c as n}from"./createInput-e0371f2c.js"
import{n as t,w as e,p as i,h as s,o,C as r,A as c,D as a,aB as u,ap as f,j as m}from"./calfSystem-47fc08ae.js"
import{c as l}from"./createSpan-6b0a8c35.js"
import{i as p}from"./insertTextBeforeEnd-0d01bc1c.js"
import{j as v,o as d}from"./jsonFail-2c706648.js"
import{c as h}from"./createAnchor-33fc6750.js"
import{i as b}from"./insertElementBefore-43970b1f.js"
import{x as j}from"./xPath-15a92601.js"
function g(n){return function(n){return e({cmd:"inventing",subcmd:"doinvent",recipe_id:n})}(n)}let C,w,y
function I(n){var t
v(n,y)||d((t=n.r).item?`<span class="fshGreen">You successfully invented the item [${t.item.n}].</span>`:'<span class="fshRed">You have failed to invent the item.</span>',y)}function N(n){c(n,w),c("",y)}function $(){const n=Number(C.value)
if(!n)return void N("")
const t=r('input[name="recipe_id"]').value
N(`Inventing ${String(n)} Items`)
for(let e=0;e<n;e+=1)g(t).then(I)}function x(n){const t=n.insertRow(-1).insertCell(-1)
return t.className="fshCenter",t}function E(n){var e
y=t("ol",e),s(n,y)}function S(n){!function(n){w=l(),s(n,w)}(n),E(n)}function _(t){var e
e=x(t),p(e,"Select how many to quick invent"),C=n({className:"custominput fshNumberInput",min:0,type:"number",value:1}),s(e,C),function(t){const e=n({className:"custombutton",type:"button",value:"Quick invent items"})
s(t,e),o(e,$)}(x(t)),S(x(t))}function k(n){return`${u}items${f}view&item_id=${n}`}function B(n,t){const e=function(n){if(!n)return
const t=n.src.match(/\/items\/(\d+)\.gif/)
return t?t[1]:void 0}(t)
if(!e)return
const i=function(n){return h({href:k(n),target:"_blank"})}(e)
b(i,n),s(i,n)}function A(n){B(n,n)}function R(){!function(){const n=j('.//b[.="Target Invention"]/../../following-sibling::*[1]//img')
B(r("#pCC b"),n)}(),a('#pCC img[src*="/items/"]').forEach(A)}function T(){m()&&(R(),_(i.lastElementChild))}export default T
//# sourceMappingURL=inventing-a78e55d8.js.map
