import{D as n,B as e,y as t,A as a,t as s,a8 as i,a9 as l,Z as r,f as o,h as c,z as m,Q as f}from"./calfSystem-9901ad27.js"
import{n as u}from"./numberIsNaN-cb2409eb.js"
import{i as d}from"./insertTextBeforeEnd-6e52719f.js"
import{i as p}from"./intValue-0e84cdad.js"
import{c as b}from"./createSpan-b27bc4d5.js"
import{p as x}from"./parseGoldUpgrades-43930266.js"
let g,h
const E={}
function S(n,t){return e(t).includes(n)}function N(n){return g.find(s(S,n))}function j(n,t,a){if(!E[n][a]){const s=function(n,e){return"amount"===e?new RegExp("\\+(\\d+) "+n):/(\d+)\xA0/}(n,a),i=e(t).match(s)[1]
E[n][a]=i}return E[n][a]}function y(n,e,t,a){const s=function(n,e){return j(n,e,"amount")}(n,e),i=function(n,e){return j(n,e.nextElementSibling,"cost")}(n,e)
let l
t*i<=h?(l=t*s,a.className="fshBlue"):(l=Math.floor(h/i)*s,a.className="fshRed"),m(`(+${l} stamina)`,a)}function M(n,e,t){const{target:a}=t,s=Number(a.value),i=function(n,e){if(E[n]||(E[n]={}),!E[n].span){const t=b()
d(e," "),c(e,t),E[n].span=t}return E[n].span}(n,e)
u(s)||0===s?i.className="fshHide":y(n,e,s,i)}function k(n){const e=N(n)
o(e.nextElementSibling.nextElementSibling.nextElementSibling.children[0].rows[0].cells[0].children[0],"keyup",s(M,n,e))}function A(){h=p(e(t("statbar-fsp"))),k("Current"),k("Maximum"),a(`<a href="${i}${l}marketplace">Sell at Marketplace</a>`,N("Gold").nextElementSibling.nextElementSibling.nextElementSibling)}function B(n,e){const t=N(n).nextElementSibling.nextElementSibling
if(t){const n=Number(/(\d+) \/ 115/.exec(t.innerHTML)[1])
r(e,n+5)}}export default function(){"1"===f("type")?x():(g=n("#pCC > table:last-of-type > tbody > tr:nth-child(even) > td:first-child"),B("+1 Max Allies","alliestotal"),B("+1 Max Enemies","enemiestotal"),A())}
//# sourceMappingURL=points-31e50a86.js.map
