import{q as n,x as t,p as e,f as i,o as s,Q as o,S as a,B as c,M as r,bs as u,at as f,as as m,O as l,j as p}from"./calfSystem-371c414c.js"
import{c as d}from"./createInput-d378f9d2.js"
import{i as v}from"./insertTextBeforeEnd-b8da3766.js"
import{j as h,o as b}from"./jsonFail-5c3d9e04.js"
import{x as g}from"./xPath-5ba71fda.js"
function j(n){return function(n){return t({cmd:"inventing",subcmd:"doinvent",recipe_id:n})}(n)}let C,x,y
function I(n){var t
h(n,y)||b((t=n.r).item?`<span class="fshGreen">You successfully invented the item [${t.item.n}].</span>`:'<span class="fshRed">You have failed to invent the item.</span>',y)}function N(n){c(n,x),c("",y)}function $(){const n=Number(C.value)
if(!n)return void N("")
const t=o('input[name="recipe_id"]').value
N(`Inventing ${String(n)} Items`)
for(let e=0;e<n;e+=1)j(t).then(I)}function w(n){const t=n.insertRow(-1).insertCell(-1)
return t.className="fshCenter",t}function S(t){var e
y=n("ol",e),i(t,y)}function _(n){!function(n){x=a(),i(n,x)}(n),S(n)}function k(n){var t
t=w(n),v(t,"Select how many to quick invent"),C=d({className:"custominput fshNumberInput",min:0,type:"number",value:1}),i(t,C),function(n){const t=d({className:"custombutton",type:"button",value:"Quick invent items"})
i(n,t),s(t,$)}(w(n)),_(w(n))}function E(n){return`${f}items${m}view&item_id=${n}`}function q(n,t){const e=function(n){if(!n)return
const t=n.src.match(/\/items\/(\d+)\.gif/)
return t?t[1]:void 0}(t)
if(!e)return
const s=function(n){return u({href:E(n),target:"_blank"})}(e)
l(s,n),i(s,n)}function B(n){q(n,n)}function Q(){!function(){const n=g('.//b[.="Target Invention"]/../../following-sibling::*[1]//img')
q(o("#pCC b"),n)}(),r('#pCC img[src*="/items/"]').forEach(B)}export default function(){p()&&(Q(),k(e.lastElementChild))}
//# sourceMappingURL=inventing-46b28b7a.js.map
