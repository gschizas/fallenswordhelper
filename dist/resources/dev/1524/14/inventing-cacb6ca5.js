import{q as n,x as t,p as e,f as i,o as s,R as o,T as a,B as r,M as c,bx as u,aw as f,av as m,O as l,j as p}from"./calfSystem-d96a3efd.js"
import{c as v}from"./createInput-2717f905.js"
import{i as d}from"./insertTextBeforeEnd-4a698b23.js"
import{j as h,o as b}from"./jsonFail-7894563a.js"
import{x as g}from"./xPath-0b50606c.js"
function j(n){return function(n){return t({cmd:"inventing",subcmd:"doinvent",recipe_id:n})}(n)}let C,x,w
function y(n){var t
h(n,w)||b((t=n.r).item?`<span class="fshGreen">You successfully invented the item [${t.item.n}].</span>`:'<span class="fshRed">You have failed to invent the item.</span>',w)}function I(n){r(n,x),r("",w)}function N(){const n=Number(C.value)
if(!n)return void I("")
const t=o('input[name="recipe_id"]').value
I(`Inventing ${String(n)} Items`)
for(let e=0;e<n;e+=1)j(t).then(y)}function $(n){const t=n.insertRow(-1).insertCell(-1)
return t.className="fshCenter",t}function _(t){var e
w=n("ol",e),i(t,w)}function k(n){!function(n){x=a(),i(n,x)}(n),_(n)}function E(n){var t
t=$(n),d(t,"Select how many to quick invent"),C=v({className:"custominput fshNumberInput",min:0,type:"number",value:1}),i(t,C),function(n){const t=v({className:"custombutton",type:"button",value:"Quick invent items"})
i(n,t),s(t,N)}($(n)),k($(n))}function R(n){return`${f}items${m}view&item_id=${n}`}function S(n,t){const e=function(n){if(!n)return
const t=n.src.match(/\/items\/(\d+)\.gif/)
return t?t[1]:void 0}(t)
if(!e)return
const s=function(n){return u({href:R(n),target:"_blank"})}(e)
l(s,n),i(s,n)}function T(n){S(n,n)}function q(){!function(){const n=g('.//b[.="Target Invention"]/../../following-sibling::*[1]//img')
S(o("#pCC b"),n)}(),c('#pCC img[src*="/items/"]').forEach(T)}export default function(){p()&&(q(),E(e.lastElementChild))}
//# sourceMappingURL=inventing-cacb6ca5.js.map
