import{D as n,B as t,y as e,A as a,t as s,a5 as i,a6 as l,Y as r,f as o,h as c,z as m,P as f}from"./calfSystem-1b876afa.js"
import{n as u}from"./numberIsNaN-1ac731b5.js"
import{i as d}from"./insertTextBeforeEnd-32a0aa1d.js"
import{i as p}from"./intValue-4dd66c70.js"
import{c as b}from"./createSpan-bd67d773.js"
import{p as x}from"./parseGoldUpgrades-31426871.js"
let g,h
const E={}
function S(n,e){return t(e).includes(n)}function N(n){return g.find(s(S,n))}function j(n,e,a){if(!E[n][a]){const s=function(n,t){return"amount"===t?new RegExp("\\+(\\d+) "+n):/(\d+)\xA0/}(n,a),i=t(e).match(s)[1]
E[n][a]=i}return E[n][a]}function y(n,t,e,a){const s=function(n,t){return j(n,t,"amount")}(n,t),i=function(n,t){return j(n,t.nextElementSibling,"cost")}(n,t)
let l
e*i<=h?(l=e*s,a.className="fshBlue"):(l=Math.floor(h/i)*s,a.className="fshRed"),m(`(+${l} stamina)`,a)}function M(n,t,e){const{target:a}=e,s=Number(a.value),i=function(n,t){if(E[n]||(E[n]={}),!E[n].span){const e=b()
d(t," "),c(t,e),E[n].span=e}return E[n].span}(n,t)
u(s)||0===s?i.className="fshHide":y(n,t,s,i)}function k(n){const t=N(n)
o(t.nextElementSibling.nextElementSibling.nextElementSibling.children[0].rows[0].cells[0].children[0],"keyup",s(M,n,t))}function A(){h=p(t(e("statbar-fsp"))),k("Current"),k("Maximum"),a(`<a href="${i}${l}marketplace">Sell at Marketplace</a>`,N("Gold").nextElementSibling.nextElementSibling.nextElementSibling)}function B(n,t){const e=N(n).nextElementSibling.nextElementSibling
if(e){const n=Number(/(\d+) \/ 115/.exec(e.innerHTML)[1])
r(t,n+5)}}export default function(){"1"===f("type")?x():(g=n("#pCC > table:last-of-type > tbody > tr:nth-child(even) > td:first-child"),B("+1 Max Allies","alliestotal"),B("+1 Max Enemies","enemiestotal"),A())}
//# sourceMappingURL=points-5336f0b4.js.map
