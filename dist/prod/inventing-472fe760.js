import{r as n,y as t,p as e,h as i,o as s,R as o,T as a,C as r,N as c,br as u,au as f,at as m,P as l,j as p}from"./calfSystem-4b4fbec4.js"
import{c as v}from"./createInput-b0cbdcde.js"
import{i as d}from"./insertTextBeforeEnd-06259f30.js"
import{j as b,o as h}from"./jsonFail-017e403e.js"
import{x as g}from"./xPath-d248cf47.js"
function j(n){return function(n){return t({cmd:"inventing",subcmd:"doinvent",recipe_id:n})}(n)}let C,y,N
function I(n){var t
b(n,N)||h((t=n.r).item?`<span class="fshGreen">You successfully invented the item [${t.item.n}].</span>`:'<span class="fshRed">You have failed to invent the item.</span>',N)}function $(n){r(n,y),r("",N)}function w(){const n=Number(C.value)
if(!n)return void $("")
const t=o('input[name="recipe_id"]').value
$(`Inventing ${String(n)} Items`)
for(let e=0;e<n;e+=1)j(t).then(I)}function x(n){const t=n.insertRow(-1).insertCell(-1)
return t.className="fshCenter",t}function _(t){var e
N=n("ol",e),i(t,N)}function k(n){!function(n){y=a(),i(n,y)}(n),_(n)}function E(n){var t
t=x(n),d(t,"Select how many to quick invent"),C=v({className:"custominput fshNumberInput",min:0,type:"number",value:1}),i(t,C),function(n){const t=v({className:"custombutton",type:"button",value:"Quick invent items"})
i(n,t),s(t,w)}(x(n)),k(x(n))}function R(n){return`${f}items${m}view&item_id=${n}`}function S(n,t){const e=function(n){if(!n)return
const t=n.src.match(/\/items\/(\d+)\.gif/)
return t?t[1]:void 0}(t)
if(!e)return
const s=function(n){return u({href:R(n),target:"_blank"})}(e)
l(s,n),i(s,n)}function T(n){S(n,n)}function P(){!function(){const n=g('.//b[.="Target Invention"]/../../following-sibling::*[1]//img')
S(o("#pCC b"),n)}(),c('#pCC img[src*="/items/"]').forEach(T)}export default function(){p()&&(P(),E(e.lastElementChild))}
//# sourceMappingURL=inventing-472fe760.js.map
